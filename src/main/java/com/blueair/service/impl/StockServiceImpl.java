package com.blueair.service.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.stereotype.Service;

import com.blueair.bean.ProductBanlance;
import com.blueair.bean.alertbean.NoticeBean;
import com.blueair.constant.HandleCode;
import com.blueair.service.IStockService;
import com.blueair.util.ConvertUtil;
import com.blueair.util.HandleAlertUtil;
import com.blueair.util.HandleType;
import com.blueair.websocket.InStream;
@Service
public class StockServiceImpl extends BaseServiceImpl implements IStockService {

	@Override
	public void autoCheckStock() throws IOException {
		List<ProductBanlance> products=getBaseDao().queryForList("ProductMapper.queryForAllProduct", null, ProductBanlance.class);
		for (ProductBanlance product : products) {
			Long sum=getBaseDao().queryForObject("BusinessFlowMapper.calSumOProduct", ConvertUtil.convertBean2Map(product), Long.class);
			product.setSum(sum);
		}
		List<ProductBanlance> alertProducts=new ArrayList<>();
		for (Iterator iterator = products.iterator(); iterator.hasNext();) {
			ProductBanlance product=(ProductBanlance) iterator.next();
			if(product.getSum()<0){
				alertProducts.add(product);
				iterator.remove();
			}
		}
		if(alertProducts==null||alertProducts.isEmpty()){
			//将扫描时间写入数据库
			writeIntoDatabase(HandleCode.NOTICE_ALERT, HandleType.EMERGENCY_TYPE, "商品库存量异常 ");
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
		writeIntoDatabase(HandleCode.NOTICE_ALERT, HandleType.EMERGENCY_TYPE, "商品库存量异常 ");
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
