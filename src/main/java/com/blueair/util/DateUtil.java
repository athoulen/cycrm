package com.blueair.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.apache.poi.hssf.usermodel.HSSFDateUtil;

public final class DateUtil {
	/** Private Constructor **/
	private DateUtil() {
	}

	/** 日期格式 **/
	public interface DATE_PATTERN {
		String HHMMSS = "HHmmss";
		String HH_MM_SS = "HH:mm:ss";
		String YYYYMMDD = "yyyyMMdd";
		String YYYYMMDDHHMMSS = "yyyyMMddHHmmss";
		String YYYY_MM_DD = "yyyy.MM.dd";
		String YYYYMMDDHH_MM_SS = "yyyy/MM/dd HH:mm:ss";
		String YYYY_MM_DD_HH_MM = "yyyy/MM/dd HH:mm";
	}

	/**
	 * 将Date类型转换成String类型
	 * 
	 * @param date
	 *            Date对象
	 * @return 形如:"yyyy-MM-dd HH:mm:ss"
	 */
	public static String date2String(Date date) {
		return date2String(date, DATE_PATTERN.YYYY_MM_DD);
	}

	/**
	 * 将Date类型转换成String类型
	 *
	 * @param date
	 *            Date对象
	 * @return 形如:"yyyy/MM/dd HH:mm:ss"
	 */
	public static String date2StringFrom(Date date) {
		return date2String(date, DATE_PATTERN.YYYYMMDDHH_MM_SS);
	}
	/**
	 *  将Date类型转换成String类型
	 *  @author chenqiuxu
	 *
	 * @param date
	 * Date 对象
	 * @return 形如 yyyy-MM-dd
     */
	public static String date3String(Date date) {
		return date2String(date, DATE_PATTERN.YYYY_MM_DD);
	}

	/**
	 * 将Date按格式转化成String
	 * 
	 * @param date
	 *            Date对象
	 * @param pattern
	 *            日期类型
	 * @return String
	 */
	public static String date2String(Date date, String pattern) {
		if (date == null || pattern == null){
			return null;
		}
		return new SimpleDateFormat(pattern).format(date);
	}
	
	/**
	 * 将String类型转换成Date类型
	 * 
	 * @param date
	 *            Date对象
	 * @return
	 */
	public static Date string2Date(String date,String pattern) {
		SimpleDateFormat format = new SimpleDateFormat(pattern);
		try {
			return format.parse(date);
		} catch (ParseException e) {
			return null;
		}
	}

	/**
	 *
	 * @param time
	 * @return
	 */
	public static long fromDateStringToLong(String time) { //此方法计算时间毫秒
		SimpleDateFormat inputFormat = new SimpleDateFormat(DATE_PATTERN.YYYY_MM_DD);
		try {
			return inputFormat.parse(time).getTime(); //将字符型转换成日期型
		} catch (ParseException e) {
			return 0L;
		}
	}
	
	
	public static String dateDifference(long time){

//		long startT = fromDateStringToLong(time);
		long endT = System.currentTimeMillis();

		long ss = (endT-time)/(1000); //共计秒数
//		int MM  =  (int)ss/60;          //共计分钟数
		int hh  = (int)ss/3600;         //共计小时数
		int dd  = (int)hh/24;           //共计天数
		int currenthh = (hh-dd*24);
//		Date date = new Date();  //实例化日期类型
//		System.out.println("共"+dd+"天 准确时间是："+currenthh+" 小时 "+MM+" 分钟"+ss+" 秒 共计："+ss*1000+" 毫秒");

		return dd==0 ? currenthh+"小时" : dd+"天:"+currenthh+"小时";

	}

	/**
	 *
	 * @param time
	 * @return
	 */
	public static Date getDateByTime(long time){
//		SimpleDateFormat sdf = new SimpleDateFormat(DATE_PATTERN.YYYY_MM_DD_HH_MM_SS);
		Date date= new Date(time);
		return date;
//		return sdf.format(date);
	}

	/**
	 * 从当前月获取前12个月
	 * @return
     */
	public static String[] getLast12Months(){

		String[] last12Months = new String[12];

		Calendar cal = Calendar.getInstance();
		for(int i=0; i<12; i++){


			if(cal.get(Calendar.MONTH)-i<1){
				last12Months[11-i] = cal.get(Calendar.YEAR)-1+ "-" + fillZero((cal.get(Calendar.MONTH)-i+12*1));
			}else{
				last12Months[11-i] = cal.get(Calendar.YEAR)+ "-" + fillZero((cal.get(Calendar.MONTH)-i));
			}


		}

		return last12Months;
	}
	public static String fillZero(int i){
		String str;
		if(i>0&&i<10){
			str = "0" + i;
		}else{
			str = Integer.toString(i);
		}
		return str;

	}

	/**
	 * 计算时间差
	 * @param datetime
	 * @param datetime2
	 * @return
	 */
	public static long diffOfDatetimes(Date datetime,Date datetime2){
		long diff = 0L;
		if(datetime != null && datetime2 != null){
			long count = datetime.getTime();
			long count2 = datetime2.getTime();
			diff = count2 - count;
		}
		return diff;
	}
	/**
	 * 计算两个日期的时间差
	 * @param date
	 * @param date2
	 * @return
	 */
	public static long diffOfDates(Date date,Date date2){
		long diff = 0L;
		if(date != null && date2 != null){
			Date d = string2Date(date3String(date), DATE_PATTERN.YYYY_MM_DD);
			Date d2 = string2Date(date3String(date2), DATE_PATTERN.YYYY_MM_DD);
			diff = d2.getTime() - d.getTime();
		}
		return diff;
	}
	
	public static long diffOfDates(Date date,String date2){
		long diff = 0L;
		if(date != null && date2 != null){
			Date d = string2Date(date3String(date), DATE_PATTERN.YYYY_MM_DD);
			Date d2 = string2Date(date2, DATE_PATTERN.YYYY_MM_DD);
			diff = d2.getTime() - d.getTime();
		}
		return diff;
	}
	
	public static long diffOfDatetimes(String datetime,String datetime2){
		long diff = 0L;
		if(datetime != null && datetime2 != null && !datetime.isEmpty() && !datetime2.isEmpty()){
			long count = fromDateStringToLong(datetime);
			long count2 = fromDateStringToLong(datetime2);
			diff = count2 - count;
		}
		return diff;
	}
	public static long diffOfDatetimes(Date datetime,String datetime2){
		long diff = 0L;
		if(datetime != null && datetime2 != null && !datetime2.isEmpty()){
			long count = datetime.getTime();
			long count2 = fromDateStringToLong(datetime2);
			diff = count2 - count;
		}
		return diff;
	}
	/**
	 * 获取时间格式为2016-12-01 11:50格式的日期字符串
	 * @param date
	 * @return
	 */
	public static String date4String(Date date) {
		return date2String(date, DATE_PATTERN.YYYY_MM_DD_HH_MM);
	}
	
	/**
	 * 获取当前时间字符串
	 * @return
	 */
	public static String getSysDateString(){
		return date2String(new Date(), DATE_PATTERN.YYYYMMDDHHMMSS);
	}
	
	/**
	 * 返回date加上days天数后的日期字符串
	 * @param date
	 * @param days
	 * @return
	 */
	public static String addDay(Date date, int days){
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.DAY_OF_MONTH, days);
		return date3String(calendar.getTime());
	}
	
	public static void main(String[] args) {
//		Date date = string2Date("2017-06-01", DATE_PATTERN.YYYY_MM_DD);
//		int days = -1;
//		String s = addDay(date, days);
//		System.out.println(s);
		long j = DateUtil.diffOfDatetimes(DateUtil.string2Date("2017-06-19 20:12:25", DATE_PATTERN.YYYY_MM_DD),DateUtil.string2Date(DateUtil.date3String(new Date()), DATE_PATTERN.YYYY_MM_DD));
		System.out.println(j);
	}
}
