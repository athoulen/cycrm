package com.blueair.controller;

import java.awt.Color;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.HashMap;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.util.WebUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blueair.service.IUserService;
import com.blueair.shiro.util.Generator;
import com.blueair.util.RemoteUtil;
import com.blueair.util.VerifyCodeUtil;

@RestController
@RequestMapping("login")
public class LoginController extends BaseController {
	@Autowired
	private IUserService userService;
	private static Logger logger = LoggerFactory
			.getLogger(LoginController.class);
	
	/**
	 * 获取验证码图片和文本(验证码文本会保存在HttpSession中)
	 */
	@RequestMapping(value="/getVerifyCodeImage")
	public void getVerifyCodeImage(HttpServletRequest request,
			HttpServletResponse response) throws IOException {

		// 设置页面不缓存
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expires", 0);
		String verifyCode = VerifyCodeUtil.generateTextCode(
				VerifyCodeUtil.TYPE_NUM_ONLY, 4, null);
		// 将验证码放到HttpSession里面
		SecurityUtils.getSubject().getSession()
				.setAttribute(Generator.VERIFY_CODE, verifyCode);
		// 设置输出的内容的类型为JPEG图像
		response.setContentType("image/jpeg");
		BufferedImage bufferedImage = VerifyCodeUtil.generateImageCode(
				verifyCode, 90, 30, 3, true, Color.WHITE, Color.BLACK, null);
		// 写给浏览器
		ImageIO.write(bufferedImage, "JPEG", response.getOutputStream());
	}
	
	@RequestMapping("/login")
	public ModelMap login(HttpServletRequest request){
//		验证图形验证码
	/*	String verifyCode = Generator.getVerifyCode();
		String submitCode = WebUtils.getCleanParam(request, "verifyCode");
		if (submitCode == null || "".equals(submitCode)
				|| !submitCode.equalsIgnoreCase(verifyCode)) {
			return parameterResult("验证码输入有误");
		}
		logger.info("LoginController.login ===> verifyCode is checkedIn");*/
		
		String username = request.getParameter("username");
		if (username == null || "".equals(username)) {
			return parameterResult("账号不能为空");
		}
		logger.info("LoginController.login ===> username is checkedIn");

		String password = request.getParameter("password");
		if (password == null || "".equals(password)) {
			return parameterResult("密码不能为空");
		}
		logger.info("LoginController.login ===> password is checkedIn");
		// 用户登录验证
		HashMap<String, Object> userMap = new HashMap<>();
		userMap.put("username", username);
		logger.info("LoginController.login ===>parameters are ready");
		String ip=RemoteUtil.getIpAddr(request);
		UsernamePasswordToken token = new UsernamePasswordToken(
				username,password,ip);
		Subject currentUser = Generator.getSubject();
		currentUser.logout();
		try {
			// 7.传入上一步骤创建的token对象，登录，即进行身份验证操作。
			currentUser.login(token);

		}catch (UnknownAccountException uae) {
			logger.error("抛出异常：用户不存在{}", uae);
			// 用户名未知...
			return errorResult("账号或者密码不正确");
		} catch (IncorrectCredentialsException ice) {
			logger.error("抛出异常：密码不正确{}", ice);
			// 凭据不正确，例如密码不正确 ...
			currentUser.logout();
			return errorResult("账号或者密码不正确");
		} catch (LockedAccountException lae) {
			logger.error("抛出异常：用户被禁用或超期{}", lae);
			// 用户被锁定，例如管理员把某个用户禁用...
			return errorResult("用户被禁用或过期");
		} catch (AuthenticationException ae) {
			logger.error("抛出异常：未知错误，无法完成登录{}", ae);
			// 其他未指定异常
			return errorResult("未知错误，无法完成登录");
		}
		// 未抛出异常，程序正常向下执行。
		userService.refreshUserInfo(currentUser.getPrincipal().toString());
		return rightResult(null, "登陆成功");
	}
	
}
