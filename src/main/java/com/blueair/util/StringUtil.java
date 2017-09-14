package com.blueair.util;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

/**
 * 字符串工具类
 */
public final class StringUtil {
	/** Private Constructor **/
	private StringUtil() {
	}

	/**
	 * 判断字符串是否非null && 非空字符
	 * 
	 * @param param
	 * @return
	 */
	public static boolean isNotEmpty(String param) {
		return param != null && !"".equals(param.trim());
	}

	/**
	 * 判断字符串是否为null || 空字符串
	 * 
	 * @param param
	 * @return
	 */
	public static boolean isEmpty(String param) {
		return param == null || "".equals(param.trim());
	}

	/**
	 * 字符串替换 将"-"替换为"."
	 * 
	 * @param param
	 * @return
	 */
	public static String replaceStr(String param) {
		String newStr = param.replaceAll("-", ".");
		return newStr;
	}
	public static String replaceStr2(String param) {
		String newStr = param.replaceAll("`", "");
		return newStr;
	}
	public static String replaceStr3(String param) {
		String newStr = param.replaceAll(" ", "");
		return newStr;
	}

	/**
	 * 截取文件后缀
	 * 
	 * @param param
	 * @return
	 */
	public static String subStr(String param) {
		String newStr = param.substring(param.lastIndexOf(".") + 1);
		return newStr;
	}

	/**
	 * 截取字符串的前i个字符
	 */
	public static String subIndexStr(String param, int i) {
		String newStr = param.substring(0, i); // or
												// str=str.Remove(i,str.Length-i);
		return newStr;
	}

	/**
	 * 字符串转换成日期
	 * 
	 * @param str
	 * @return date
	 */
	public static String strToDate(String str) {
		SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
		Date date = null;
		String result = null;
		try {
			date = format.parse(str);
			format = new SimpleDateFormat("YYYY-MM-dd");
			result = format.format(date);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return result;
	}
	
	public static String strToDate2(String str) {
		SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd HH:mm:ss");
		Date date = null;
		String result = null;
		try {
			date = format.parse(str);
			format = new SimpleDateFormat("YYYY-MM-dd HH:mm:ss");
			result = format.format(date);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return result;
	}
	
	/**
	 * double转BigDecimal
	 * 保留2位，四舍五入
	 */
	public static String doubleToBigDecimal(double str) {
		BigDecimal b = BigDecimal.valueOf(str);
		String newStr = b.setScale(2, BigDecimal.ROUND_HALF_UP).toString();
		return newStr;
	}
	
	/**
	 * 6位随机数
	 * @return
	 */
	public static String random() {
		Random random=new Random();
		int result =random.nextInt(100000)+100000;
		return String.valueOf(result);
	}
	
	
	public static boolean hasValue(Object o){
		if(o==null||"".equals(o.toString().trim())){
			return false;
		}
		return true;
	}

	public static void main(String[] args) {
		
		System.out.println(StringUtil.subIndexStr("2016040421001004020224008922", 8));
	}
}
