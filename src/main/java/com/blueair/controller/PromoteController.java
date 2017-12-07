package com.blueair.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blueair.bean.alertbean.promotereb.PromoteRebateInfo;
import com.blueair.service.IPromoteService;
import com.blueair.util.JsonUtil;

@RequestMapping("promote")
@RestController
public class PromoteController extends BaseController {
	@Autowired
	private IPromoteService promoteService;

	@RequestMapping("update/state")
	public ModelMap updateStockState(HttpServletRequest request,String json){
		List<PromoteRebateInfo> proRebateInfos = JsonUtil.convertJson2ListObject(json, PromoteRebateInfo.class);
		if(proRebateInfos!=null&&!proRebateInfos.isEmpty()){
			promoteService.updatePromoteState(proRebateInfos);
		}
		return rightResult(null, "确认状态成功！");
	}
}
