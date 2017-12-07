package com.blueair.service.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.CountDownLatch;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blueair.bean.ProductBanlance;
import com.blueair.bean.alertbean.AlertObject;
import com.blueair.bean.alertbean.NoticeBean;
import com.blueair.bean.alertbean.StockExpInfo;
import com.blueair.bean.alertbean.merchanpro.MerchanProductBean;
import com.blueair.constant.HandleCode;
import com.blueair.service.IStockService;
import com.blueair.util.ConvertUtil;
import com.blueair.util.HandleAlertUtil;
import com.blueair.util.HandleType;
import com.blueair.util.JsonUtil;
import com.blueair.util.MultiHandler;
import com.blueair.websocket.InStream;
@Service
public class StockServiceImpl extends BaseServiceImpl implements IStockService {
	@Autowired
	private MultiHandler multiHandler;
	
	private Logger logger=LoggerFactory.getLogger(StockServiceImpl.class);

	@Override
	public void autoCheckStock() throws IOException {
		List<ProductBanlance> products=getBaseDao().queryForList("ProductMapper.queryForAllProduct", null, ProductBanlance.class);
		for (ProductBanlance product : products) {
			Long sum=getBaseDao().queryForObject("BusinessFlowMapper.calSumOProduct", ConvertUtil.convertBean2Map(product), Long.class);
			product.setSum(sum);
		}
		List<ProductBanlance> alertProducts=new ArrayList<>();
		for (Iterator<ProductBanlance> iterator = products.iterator(); iterator.hasNext();) {
			ProductBanlance product=iterator.next();
			if(product.getSum()<0){
				alertProducts.add(product);
				iterator.remove();
			}
		}
		ProductBanlance e=new ProductBanlance();
		alertProducts.add(e);
		if(alertProducts==null||alertProducts.isEmpty()){
			//将扫描时间写入数据库
			writeIntoDatabase(HandleCode.NOTICE_ALERT, HandleType.STOCK_CAL_TYPE, "商品库存量正常 ");
			return;
		}
		for (ProductBanlance productBanlance : alertProducts) {
			List<ProductBanlance> similarProduct=new ArrayList<>();
			for (ProductBanlance product : products) {
				if(productBanlance.getProductName().trim().equals(product.getProductName().trim())){
					similarProduct.add(product);
				}
			}
			productBanlance.setProducts(similarProduct);
		}
		InStream.sendMessage2Users(HandleAlertUtil.produceAlertJson(alertProducts, HandleType.EMERGENCY_TYPE, "商品库存量异常 "), "ceshi");
		//将通知时间写入数据库
		writeIntoDatabase(HandleCode.NOTICE_ALERT, HandleType.STOCK_CAL_TYPE, "商品库存量异常 ");
	}
	
	//检查二级供应商库存
	@Override
	public void checkLowerMerchanStock(String soldYear,String soldMonth,String fileType,boolean isDelete){
		if(isDelete){
			//查找到需要删除的流向中的二级商业+产品 供销差
			Map<String, Object> params=new HashMap<>();
			params.put("soldYear", soldYear);
			params.put("soldMonth", soldMonth);
			List<MerchanProductBean> merProduct = getBaseDao().queryForList("BusinessFlowMapper.queryForDemissMerchanProductSoldSum", params, MerchanProductBean.class);
			List<MerchanProductBean> allocMerProduct = getBaseDao().queryForList("BusinessFlowMapper.queryForDemissMerchanProductAllocSum", params, MerchanProductBean.class);
			getBaseDao().update("BusinessFlowMapper.updateDemissMerProduct", merProduct);
			getBaseDao().update("BusinessFlowMapper.updateDemissMerProduct", allocMerProduct);
		}else{
			//查找到商业库存最后计算的流向id
			Object lastFlowIdEl=getBaseDao().queryForObject("BusinessFlowMapper.queryForLastFlowIdEl", null);
			List<MerchanProductBean> merProduct = getBaseDao().queryForList("BusinessFlowMapper.queryForMerchanProduct", lastFlowIdEl, MerchanProductBean.class);
			//分开计算总量
			CountDownLatch finish=new CountDownLatch(merProduct.size());
			List<MerchanProductBean> list=new CopyOnWriteArrayList<>();
			for (MerchanProductBean merchanProductBean : merProduct) {
				multiHandler.getAllocateSum(merchanProductBean,list,finish);
			}
			try {
				finish.await();
			} catch (InterruptedException e) {
				logger.debug("并发处理异常{}",e);
			}
			if(!list.isEmpty()){
				Object lastFlowId=getBaseDao().queryForObject("BusinessFlowMapper.queryForLastFlowId", null);
				CountDownLatch finish2=new CountDownLatch(list.size());
				for (MerchanProductBean merchanProductBean : list) {
					multiHandler.writeInMerchanStock(merchanProductBean, lastFlowId,finish2);
				}
				try {
					finish2.await();
				} catch (InterruptedException e) {
					logger.debug("并发处理2异常{}",e);
				}
			}
		}
	}
	
	//发送库存信息
		@Override
	public void sendExpStockInfo() throws IOException{
		List<StockExpInfo> stockExps = getBaseDao().queryForList("BusinessFlowMapper.queryExpMerchanStock", null, StockExpInfo.class);
		if(stockExps!=null&&!stockExps.isEmpty()){
			AlertObject object=new AlertObject();
			object.setAlertCode(HandleType.STOCK_EXC_NOTE);
			object.setAlertMessage(HandleType.STOCK_EXC_MESSAGE_NOTE);
			object.setBeans(ConvertUtil.convertBeans2List(stockExps));
			String message=JsonUtil.convertObject2Json(object);
			String username="ceshi";
			InStream.sendMessage2Users(message, username);
		}
	}
		
	@Override
	public void updateStockState(List<StockExpInfo> stockExpInfos){
		getBaseDao().update("BusinessFlowMapper.updateStockState", stockExpInfos);
	}

	//将通知时间写入数据库
	public void writeIntoDatabase(String noticeStyle,String noticeType,String noticeMessage){
		NoticeBean notice=new NoticeBean();
		notice.setNoticeStyle(noticeStyle);
		notice.setNoticeType(noticeType);
		notice.setNoticeMessage(noticeMessage);
		getBaseDao().insert("NoticeMapper.insertNoticeRecord", notice);
	}
}
