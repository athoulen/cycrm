package com.blueair.controller;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blueair.bean.User;
import com.blueair.constant.AdminConstants;
import com.blueair.service.IUserService;
import com.blueair.shiro.util.Generator;
import com.blueair.util.JsonUtil;

@RestController
@RequestMapping("user")
public class UserController extends BaseController {
	@Autowired
	private IUserService userService;

	/**
	 * 新用户注册
	 * @return
	 */
	@RequestMapping("/register/add")
	public ModelMap registerUser(HttpServletRequest request, String json){
		if(!AdminConstants.SUPERVIOR_TYPE.equals(Generator.getAdminTypeId().toString())){
			return noPermissionResult("没有权限注册用户");
		}
		User user=JsonUtil.convertJson2Object(json, User.class);
		if(StringUtils.isEmpty(user.getUsername())){
			return errorResult("用户名不能为空！");
		}
		if(StringUtils.isEmpty(user.getPassword())){
			return errorResult("密码不能为空");
		}
		if(StringUtils.isEmpty(user.getType())){
			return errorResult("用户类型不能为空");
		}
		int flag = userService.registerUser(user);
		if(flag>0){
			return rightResult(null, "注册成功！");
		}else if(flag<0){
			return errorResult("用户名已被使用");
		}else{
			return errorResult("注册失败！");
		}
	}
	/**
	 * 查询用户名
	 * @param request
	 * @return
	 */
	@RequestMapping("/username")
	public ModelMap queryLoginUserName(HttpServletRequest request){
		return rightObjectResult(null, "查询成功！", "username", Generator.getUsername());
	}
}
