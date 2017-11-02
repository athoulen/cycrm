package com.blueair.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blueair.service.IRebateStyleService;
@RestController
@RequestMapping("rebateStyle")
public class RebateStyleController extends BaseController {
	@Autowired
	private IRebateStyleService styleService;

	@RequestMapping("list")
	public ModelMap queryForRebateStyleList(){
		
		return rightObjectResult(null, "查询成功！", "result", styleService.queryForRebateStyleList());
	}
}
