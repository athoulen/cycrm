package com.blueair.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.blueair.constant.HandleCode;
import com.blueair.web.exception.ServiceException;

public class BaseController {

	private static final Logger LOGGER = LoggerFactory.getLogger(BaseController.class);

	/** 基于@ExceptionHandler异常处理 */
	@ExceptionHandler
	@ResponseBody
	public ModelMap exp(HttpServletRequest request, Exception ex) {
		request.setAttribute("ex", ex);
		LOGGER.error("Controller Exception:", ex);
		// 根据不同错误转向不同页面
		if (ex instanceof ServiceException) {
			return failResult("服务器错误，请稍后重试！");
		} else {
			return failResult("系统错误，请稍后重试！");
		}
	}

	public ModelMap errorResult(String mssage) {
		ModelMap map = new ModelMap();
		map.put("code", HandleCode.SERVER_ERROR);
		map.put("message", mssage);
		return map;
	}

	public ModelMap failResult(String mssage) {
		ModelMap map = new ModelMap();
		map.put("code", HandleCode.FAIL);
		map.put("message", mssage);
		return map;
	}

	public ModelMap parameterResult(String mssage) {
		ModelMap map = new ModelMap();
		map.put("code", HandleCode.PARAMETER_ERROR);
		map.put("message", mssage);
		return map;
	}

	public ModelMap rightResult(ModelMap map, String mssage) {
		ModelMap output = map;
		if (output == null) {
			output = new ModelMap();
		}
		output.put("code", HandleCode.SUCCESS);
		output.put("message", mssage);
		return output;
	}
	
	public ModelMap rightObjectResult(ModelMap map,String message,String objectName,Object object){
		ModelMap output = map;
		if (output == null) {
			output = new ModelMap();
		}
		output.put("code", HandleCode.SUCCESS);
		output.put("message", message);
		output.put(objectName, object);
		return output;
	}
	
	public ModelMap rightPageListResult(ModelMap map,String message,String objectName,HashMap<String, Object> bean) {
		ModelMap output = map;
		if (output == null) {
			output = new ModelMap();
		}
		output.put("code", HandleCode.SUCCESS);
		output.put("message", message);
		output.put(objectName, bean.get("list"));
		output.put("totalCount", bean.get("totalCount"));
		return output;
	}
	
	public ModelMap timeOutResult(ModelMap model,String message){
		ModelMap output = model;
		if (output == null) {
			output = new ModelMap();
		}
		output.put("code", HandleCode.SESSION_TIMEOUT);
		output.put("message", message);
		return output;
	}

	/**
	 * session失效处理
	 * 
	 * @param mssage
	 * @return
	 */
	public ModelMap sessionTimoutResult(String mssage) {
		ModelMap map = new ModelMap();
		map.put("code", HandleCode.SESSION_TIMEOUT);
		map.put("message", "session已失效");
		return map;
	}
	
	public ModelMap noPermissionResult(String mssage) {
		ModelMap map = new ModelMap();
		map.put("code", HandleCode.NO_PERMISSION);
		map.put("message", mssage);
		return map;
	}
	
	protected String readFromRequest(HttpServletRequest request)
			throws IOException {
		request.setCharacterEncoding("UTF-8");
		int size = request.getContentLength();
		InputStream is = request.getInputStream();
		byte[] reqBodyBytes = readBytes(is, size);
		String json = new String(reqBodyBytes);
		is.close();
		return json;
	}

	public static final byte[] readBytes(InputStream is, int contentLen) {
		if (contentLen > 0) {
			int readLen = 0;
			int readLengthThisTime = 0;
			byte[] message = new byte[contentLen];
			try {
				while (readLen != contentLen) {
					readLengthThisTime = is.read(message, readLen, contentLen
							- readLen);
					if (readLengthThisTime == -1) {// Should not happen.
						break;
					}
					readLen += readLengthThisTime;
				}
				return message;
			} catch (IOException e) {
				LOGGER.error("抛出异常：", e);
			}
		}
		return new byte[] {};
	}
}
