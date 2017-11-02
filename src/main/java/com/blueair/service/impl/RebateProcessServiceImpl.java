package com.blueair.service.impl;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.blueair.bean.PageListBean;
import com.blueair.bean.rebate.ProtocolForRebate;
import com.blueair.bean.rebate.RebateMain;
import com.blueair.bean.rebate.RebateProcess;
import com.blueair.constant.HandleCode;
import com.blueair.service.IRebateProcessService;
import com.blueair.util.DateUtil;
import com.blueair.util.LongUtil;
import com.blueair.web.exception.ServiceException;

@Service("rebateProcessService")
public class RebateProcessServiceImpl extends BaseServiceImpl implements IRebateProcessService {

	private Logger logger = LoggerFactory.getLogger(RebateProcessServiceImpl.class);

	@Override
	public boolean AsynDealFlow() throws ServiceException {
		// 查询出所有未返佣金的流向
		List<RebateProcess> processes = getBaseDao().queryForListForObject("RebateProcessMapper.queryUnRebateList",
				null, RebateProcess.class);
		for (Iterator<RebateProcess> iterator = processes.iterator(); iterator.hasNext();) {
			RebateProcess rebateProcess = (RebateProcess) iterator.next();
			// 获取流向相关协议
			ProtocolForRebate protocol = FetchProtocol(rebateProcess);
			if (protocol == null) {
				logger.debug("客户ID{},药品ID{}未录入相关协议", rebateProcess.getCustomerId(), rebateProcess.getProductId());
				throw new ServiceException(HandleCode.FAIL,"客户ID:"+rebateProcess.getCustomerId()+"产品ID:"+rebateProcess.getProductId()+"销售医院ID为"+rebateProcess.getAcceptUnitId()+"未录入相关的客户协议");
			}
			int months = fetchRebateDate(protocol.getRebatePeriod());
			// 如果现在时间在返佣金时间则将此流向移除返佣金列表
			if (System.currentTimeMillis() < DateUtil.setFirstDayOfMonths(rebateProcess.getSoldDate(), months)) {
				iterator.remove();
				continue;
			}
			// 是否符合调货条件
			boolean flag = protocol.getType() == 1 ? multipleHospitalRebate(rebateProcess)
					: multipleClinicRebate(rebateProcess);
			if (!flag) {
				iterator.remove();
				continue;
			}
			setSwitchRebate(rebateProcess, protocol, false);
			rebateProcess.setSwitch(false);
			if (LongUtil.isEmpty(protocol.getSwitchAmount())) {
				continue;
			} else {
				// 查询协议下流向前的总调货数量
				Map<String, Object> params = new HashMap<>();
				params.put("productId", protocol.getProductId());
				params.put("customerId", protocol.getCustomerId());
				params.put("acceptUnitId", protocol.getHospitalId());
				params.put("soldDate", rebateProcess.getSoldDate());
				Long foreSum = getBaseDao().queryForObject("RebateProcessMapper.getForeFlowSum", params, Long.class);
				foreSum = foreSum == null ? 0 : foreSum;
				// 根据以前的总量确定是否执行考核价
				if (protocol.getSwitchStandard() == 1) {
					if (foreSum >= protocol.getSwitchAmount()) {
						setSwitchRebate(rebateProcess, protocol, true);
						rebateProcess.setSwitch(true);
					}
				} else if (protocol.getSwitchStandard() == 0) {
					if (foreSum < protocol.getSwitchAmount()) {
						setSwitchRebate(rebateProcess, protocol, true);
						rebateProcess.setSwitch(true);
					}
				}
			}
		}
		boolean written=true;
		if(processes!=null&&!processes.isEmpty()){
			written= writeInfoToTable(processes);
			if (written) {
				logger.info("{}已写入佣金信息", new Date());
			}
		}
		return written;
	}

	@Override
	public PageListBean queryRebateList(Map<String, Object> params,int firstItem, int pageSize) throws ServiceException {
		params = params==null?new HashMap<String, Object>():params;
		params.put("firstItem", firstItem);
		params.put("pageSize", pageSize);
		List<RebateMain> rebates = getBaseDao().queryForListForObject("RebateProcessMapper.getRebateList", params,
				RebateMain.class);
		for (RebateMain rebateMain : rebates) {
			if (rebateMain.getMerProtocol() == null) {
				throw new ServiceException(HandleCode.FAIL,
						"客户" + rebateMain.getCustomerName() + rebateMain.getSoldDate() + "向医院"
								+ rebateMain.getHospitalName() + "销售的产品" + rebateMain.getProductName() + "流向缺少商业协议");
			}
			rebateMain.setBalance();
		}
		Long totalCount = getBaseDao().queryForObject("RebateProcessMapper.getRebateListCount", params, Long.class);
		PageListBean bean = new PageListBean(rebates, totalCount);
		return bean;
	}

	@Override
	public boolean payRebateDeal(Long id, int payment) {
		Map<String, Object> params = new HashMap<>();
		params.put("id", id);
		params.put("payment", payment);
		int result = getBaseDao().update("RebateProcessMapper.payRebate", params);
		if(payment==0){
			Object flowId=getBaseDao().queryForObject("RebateProcessMapper.queryForFlowId", params);
			params.put("flowId", flowId);
			getBaseDao().update("RebateProcessMapper.cancelFlowType", params);
		}
		if (result > 0) {
			return true;
		}
		return false;
	}
	
	@Override
	public Date getLatestDataTime(){
		return getBaseDao().queryForObject("RebateProcessMapper.getLatestDataTime", null,Date.class);
	}

	// 设置应返佣金
	private void setSwitchRebate(RebateProcess rebateProcess, ProtocolForRebate protocol, boolean flag) {
		BigDecimal singleRebate;
		BigDecimal totalRebate;
		if (flag) {
			singleRebate = new BigDecimal(protocol.getSwitchExpense() + "");
		} else {
			singleRebate = new BigDecimal(protocol.getPromotionExpense() + "");
		}
		BigDecimal secRebate=new BigDecimal(rebateProcess.getSecExpense());
		BigDecimal amount=new BigDecimal(rebateProcess.getSoldGoodsNum());
		totalRebate = (singleRebate.subtract(secRebate)).multiply(amount);
		rebateProcess.setSingleRebate(singleRebate.toString());
		rebateProcess.setTotalRebate(totalRebate.toString());
	}

	// 1、将可返佣金流向类型更改为可返
	// 2、将信息写入佣金表
	private boolean writeInfoToTable(List<RebateProcess> rebateProcesses) {
		// 修改流向表中的状态
		Map<String, Object> params = new HashMap<>();
		params.put("processes", rebateProcesses);
		params.put("sysTime", new Date());
		getBaseDao().update("BusinessFlowMapper.setFlowType", params);
		getBaseDao().insert("RebateProcessMapper.insertRebateInfo", params);
		return true;
	}

	// 计算非医院类型后期调货是否满足原调货量的1/2
	private boolean multipleClinicRebate(RebateProcess rebateProcess) {
		Map<String, Object> params = new HashMap<>();
		params.put("customerId", rebateProcess.getCustomerId());
		params.put("productId", rebateProcess.getProductId());
		params.put("acceptUnitId", rebateProcess.getAcceptUnitId());
		params.put("soldDate", rebateProcess.getSoldDate());
		Integer sum = getBaseDao().queryForObject("RebateProcessMapper.getFlowSum", params, Integer.class);
		sum=sum==null?0:sum;
		return sum >= rebateProcess.getSoldGoodsNum() / 2;
	}

	// 计算医院类型后期是否调货
	private boolean multipleHospitalRebate(RebateProcess rebateProcess) {
		Map<String, Object> params = new HashMap<>();
		params.put("customerId", rebateProcess.getCustomerId());
		params.put("productId", rebateProcess.getProductId());
		params.put("acceptUnitId", rebateProcess.getAcceptUnitId());
		params.put("soldDate", rebateProcess.getSoldDate());
		Integer count = getBaseDao().queryForObject("RebateProcessMapper.getFlowCount", params, Integer.class);
		return count > 0;
	}

	// 获取协议需要增加多少个月
	private int fetchRebateDate(Integer rebatePeriod) {
		int months = 2;
		switch (rebatePeriod) {
		case 1:
			months = 0;
			break;
		case 2:
			months = 1;
			break;
		case 3:
			months = 2;
			break;
		case 4:
			months = 3;
			break;
		case 5:
			months = 4;
			break;
		default:
			break;
		}
		return months;
	}

	// 获取相关协议信息
	private ProtocolForRebate FetchProtocol(RebateProcess rebateProcess) {
		Map<String, Object> params = new HashMap<>();
		params.put("customerId", rebateProcess.getCustomerId());
		params.put("productId", rebateProcess.getProductId());
		params.put("acceptUnitId", rebateProcess.getAcceptUnitId());
		params.put("soldDate", DateUtil.fromDateStringToLong(rebateProcess.getSoldDate()));
		ProtocolForRebate protocol = getBaseDao().queryForObject("ProtocolMapper.findRelaProtocol", params,
				ProtocolForRebate.class);
		if (protocol == null) {
			protocol = getBaseDao().queryForObject("ProtocolMapper.findRelaProtocolAgain", params,
					ProtocolForRebate.class);

		}
		return protocol;
	}
}
