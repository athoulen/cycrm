package com.blueair.service;

import java.io.IOException;
import java.util.List;

import com.blueair.bean.alertbean.StockExpInfo;

public interface IStockService {

	public void autoCheckStock() throws IOException;

//	public void checkLowerMerchanStock();

	public void checkLowerMerchanStock(String soldYear, String soldMonth,String fileType, boolean isDelete);

	public void sendExpStockInfo() throws IOException;

	public void updateStockState(List<StockExpInfo> stockExpInfos);
}
