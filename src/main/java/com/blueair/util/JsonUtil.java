package com.blueair.util;

import java.text.SimpleDateFormat;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.blueair.controller.LoginController;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Json格式处理类
 */
public final class JsonUtil {
	private static ObjectMapper objectMapper = new ObjectMapper();
	private static Logger logger = LoggerFactory
			.getLogger(LoginController.class);

	static {
		objectMapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
	}

	/** 私有构造器 **/
	private JsonUtil() {
	}

	/**
	 * 将Object对象转换成Json
	 * 
	 * @param object
	 *            Object对象
	 * @return Json字符串
	 */
	public static String convertObject2Json(Object object) {
		try {
			return objectMapper.writeValueAsString(object);
		} catch (Exception e) {
			logger.error("convertObject2Json", e);
		}
		return null;
	}

	/**
	 * 将Json转换成Object对象
	 * 
	 * @param json
	 *            Json字符串
	 * @param cls
	 *            转换成的对象类型
	 * @return 转换之后的对象
	 */
	public static <T> T convertJson2Object(String json, Class<T> cls) {
		try {
			return objectMapper.readValue(json, cls);
		} catch (Exception e) {
			logger.error("convert json error.", e);
		}
		return null;
	}

	/**
	 * 将Json转换成List<Object>对象
	 * 
	 * @param <T>
	 * 
	 * @param json
	 *            Json字符串
	 * @param cls
	 *            转换成的对象类型
	 * @return 转换之后的对象
	 */
	public static <T> List<T> convertJson2ListObject(String json, Class<T> cls) {
		try {
			return objectMapper.readValue(json, objectMapper.getTypeFactory().constructCollectionType(List.class, cls));
		} catch (Exception e) {
			logger.error("convert json error.", e);
		}
		return null;
	}

}
