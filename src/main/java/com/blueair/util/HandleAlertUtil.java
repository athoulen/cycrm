package com.blueair.util;

import java.util.List;

import com.blueair.bean.alertbean.AlertObject;
import com.blueair.constant.HandleCode;

public class HandleAlertUtil{

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static String produceAlertJson(List list,String alertType,String message){
		AlertObject alert=new AlertObject();
		alert.setAlertCode(HandleCode.NOTICE_ALERT);
		alert.setAlertMessage(message);
		alert.setAlertType(alertType);
		alert.setBeans(ConvertUtil.convertBeans2List(list));
		return JsonUtil.convertObject2Json(alert);
	}
}
