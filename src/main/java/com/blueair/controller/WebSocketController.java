package com.blueair.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blueair.util.PropertiesUtil;
@RequestMapping("websocket")
@RestController
public class WebSocketController extends BaseController {
	@RequestMapping("/inetAddress")
	public ModelMap queryForWebSocketInetAddress(HttpServletRequest request){
		String ip=PropertiesUtil.getString("system", "inetIpAddress");
		return rightObjectResult(null, "查询成功！", "ip", ip);
	}
}
