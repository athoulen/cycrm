package com.blueair.util;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.Reader;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.sql.Blob;
import java.sql.Clob;
import java.sql.Date;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.json.JSONObject;

/**
 * 
 */
public final class ConvertUtil {
	private static Logger logger = LoggerFactory.getLogger(ConvertUtil.class);
	private static final char[] HEXCHAR = { '0', '1', '2', '3', '4', '5', '6',
			'7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };

	/** 私有构造器 **/
	private ConvertUtil() {
	}
	
	/**
	 * 将sql对象转换成java对象
	 * 
	 * @param list 
	 * @return
	 */
	public static List<Map<String, Object>> convertSqlMap2JavaMap(
			List<Map<String, Object>> list) {
		List<Map<String, Object>> beans = new ArrayList<Map<String, Object>>();
		try {
			for (Map<String, Object> map : list) {
				Map<String, Object> bean = new HashMap<>();
				Iterator<?> iter = map.entrySet().iterator();
				while (iter.hasNext()) {
					@SuppressWarnings("rawtypes")
					Map.Entry entry = (Map.Entry) iter.next();
					Object key = entry.getKey();
					Object val = entry.getValue();
					if (val == null) {
						bean.put(key.toString(), "");
						continue;
					} else {
						if (val instanceof Date) {
							SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
							val = dateFormat.format(val);
							bean.put(key.toString(), val.toString());
							continue;
						} else if (val instanceof Clob) {
							try {
								val = clobToString((Clob) val);// 自己处理
								bean.put(key.toString(), val.toString());
								continue;
							} catch (Exception e) {
								logger.error("convertSqlMap2JavaMap-clobToString", e);
							}
						} else if (val instanceof Blob) {
							try {
								val = blobToString((Blob) val);// 自己处理
								bean.put(key.toString(), val.toString());
								continue;
							} catch (Exception e) {
								logger.error("convertSqlMap2JavaMap-blobToString", e);
							}
						} else if (val.getClass() == byte[].class) {
							try {
								val = new String((byte[]) val, "UTF-8");
								bean.put(key.toString(), val.toString());
								continue;
							} catch (UnsupportedEncodingException e) {
								logger.error(   "convertSqlMap2JavaMap-byte[]ToString", e);
							}
						} else if (val instanceof Byte) {
							val = val.toString();
							bean.put(key.toString(), val.toString());
							continue;
						} else { 
							val = String.valueOf(val);
							bean.put(key.toString(), val.toString());
							continue;
						}
					}
				}
				beans.add(bean);
			}
		} catch (Exception e) {
			logger.error("convertSqlMap2JavaMap", e);
		}
		return beans;
	}

	/**
	 * 将Blob 转换成 String
	 * 
	 * @param val
	 * @return String
	 */

	public static String blobToString(Blob blob) throws SQLException{
		byte[] returnValue = blob.getBytes(1L, (int) blob.length());
		return bytes2String(returnValue);
	}

	/**
	 * Clob数据转为String
	 * 
	 * @param clob
	 * @return
	 */
	public static String clobToString(Clob val){
		if (null == val) {
			return null;
		}
		Reader reader = null;
		StringBuilder buf = new StringBuilder();
		BufferedReader bfReader = null;
		try {
			reader = val.getCharacterStream();
			// 得到流
			bfReader = new BufferedReader(reader);
			String s = bfReader.readLine();
			while (null != s) {// 执行循环将字符串全部取出付值给StringBuffer由StringBuffer转成String
				buf.append(s);
				s = bfReader.readLine();
			}
		} catch (Exception e) {
			logger.error("clobToString", e);
		} finally {
			try {
				if (null != reader) {
					reader.close();
				}
				if (null != bfReader) {
					bfReader.close();
				}
			} catch (IOException e) {
				logger.error("clobToString", e);
			}
		}
		return buf.toString();
	}

	/**
	 * convert byte[] to String
	 * 
	 * @param bytes
	 * @return
	 */
	public static String bytes2String(byte[] bytes) {
		StringBuilder builder = new StringBuilder(bytes.length * 2);
		for (int i = 0; i < bytes.length; i++) {
			builder.append(HEXCHAR[(bytes[i] & 0xf0) >>> 4]);
			builder.append(HEXCHAR[bytes[i] & 0x0f]);
		}
		return builder.toString();
	}

	/**
	 * convert String to byte[]
	 * 
	 * @param str
	 * @return
	 */
	public static byte[] string2Bytes(String str) {
		byte[] bytes = new byte[str.length() / 2];
		for (int i = 0; i < bytes.length; i++) {
			bytes[i] = (byte) Integer.parseInt(str.substring(2 * i, 2 * i + 2), 16);
		}
		return bytes;
	}
		
	/**
	 * Convert InputStream to String
	 * 
	 * @param str
	 * @return
	 */
	public static InputStream string2InputStream(String str) {
		try {
			return new ByteArrayInputStream(string2Bytes(str));
		} catch (Exception e) {
			logger.error("string2InputStream", e);
		}
		return null;
	}
	
	public static String inputStream2String(InputStream inputStream) throws IOException{
		ByteArrayOutputStream swapStream = new ByteArrayOutputStream(); 
		byte[] buff = new byte[100]; //buff用于存放循环读取的临时数据 
		int rc; 
		while ((rc = inputStream.read(buff, 0, 100)) > 0) { 
		swapStream.write(buff, 0, rc); 
		} 
		byte[] in_b = swapStream.toByteArray(); //in_b为转换之后的结果
		return bytes2String(in_b);
	}
	
	/** 通过属性名获取get方法名 **/
	public static String getMethodByField(String field) {
		if (field == null) {
			return null;
		}
		return "get" + field.substring(0, 1).toUpperCase() + field.substring(1);
	}
	
	/**
	 * 将List<对象>转换成List< Map>，并将结果set到beans中
	 * 
	 * @param List<对象>
	 */
	public static <T> List<Map<String, Object>> convertBeans2List(List<T> list) {
		List<Map<String, Object>> beans = new ArrayList<Map<String, Object>>();
		if(list != null){
			try {
				for (Object object : list) {
					Map<String, Object> bean = BeanUtil.convertBean2Map(object);
					if (bean != null && bean.size() != 0) {
						beans.add(bean);
					}
				}
			} catch (Exception e) {
				logger.error("convertBeans2List", e);
			}
		}
		return beans;
	}
	
	public static <T> List<T> convertList2Beans(List<Map<String, Object>> list, Class<T> clz) {
		return BeanUtil.convertList2Beans(list, clz);
	}
	
	public static List<Map<String, Object>> convertBeans2List(Object... objects) {
		return BeanUtil.convertBeans2List(objects);
	}
	
	/**
	 * 将对象转换成Map<String,String>,并将结果set到bean中
	 */
	public static HashMap<String, Object> convertBean2Map(Object object) {
		return BeanUtil.convertBean2Map(object);
	}
	
	/**
	 * 将bean属性转换成<T>对象
	 * 
	 * (修改了之前的实现逻辑，并将转换方法提出公用)
	 */
	public static <T> T convertParams2Bean(Map<String, Object> params, Class<T> clz) {
		return BeanUtil.convertMap2Bean(params, clz);
	}
	
	/**
	 * 对List对象按照某个成员变量进行排序
	 * @param list       List对象
	 * @param sortField  排序的属性名称
	 * @param sortMode   排序方式：ASC，DESC 任选其一
	 */
	public static <T> void sortList(List<T> list, final String sortField, final String sortMode) {
		if(list == null || list.size() < 2) {
			return;
		}
		Collections.sort(list, new Comparator<T>() {
			@Override
			public int compare(T o1, T o2) {
				try {
					Class<? extends Object> clazz = o1.getClass();
					Field field = clazz.getDeclaredField(sortField); //获取成员变量
					field.setAccessible(true); //设置成可访问状态
					String typeName = field.getType().getName().toLowerCase(); //转换成小写

					Object v1 = field.get(o1); //获取field的值
					Object v2 = field.get(o2); //获取field的值

					boolean ASC_order = (sortMode == null || "ASC".equalsIgnoreCase(sortMode));

					//判断字段数据类型，并比较大小
					if (typeName.endsWith("string")) {
						String value1 = v1.toString();
						String value2 = v2.toString();
						return ASC_order ? value1.compareTo(value2) : value2.compareTo(value1);
					} else if (typeName.endsWith("short")) {
						Short value1 = Short.parseShort(v1.toString());
						Short value2 = Short.parseShort(v2.toString());
						return ASC_order ? value1.compareTo(value2) : value2.compareTo(value1);
					} else if (typeName.endsWith("byte")) {
						Byte value1 = Byte.parseByte(v1.toString());
						Byte value2 = Byte.parseByte(v2.toString());
						return ASC_order ? value1.compareTo(value2) : value2.compareTo(value1);
					} else if (typeName.endsWith("char")) {
						Integer value1 = (int) (v1.toString().charAt(0));
						Integer value2 = (int) (v2.toString().charAt(0));
						return ASC_order ? value1.compareTo(value2) : value2.compareTo(value1);
					} else if (typeName.endsWith("int") || typeName.endsWith("integer")) {
						Integer value1 = Integer.parseInt(v1.toString());
						Integer value2 = Integer.parseInt(v2.toString());
						return ASC_order ? value1.compareTo(value2) : value2.compareTo(value1);
					} else if (typeName.endsWith("long")) {
						Long value1 = Long.parseLong(v1.toString());
						Long value2 = Long.parseLong(v2.toString());
						return ASC_order ? value1.compareTo(value2) : value2.compareTo(value1);
					} else if (typeName.endsWith("float")) {
						Float value1 = Float.parseFloat(v1.toString());
						Float value2 = Float.parseFloat(v2.toString());
						return ASC_order ? value1.compareTo(value2) : value2.compareTo(value1);
					} else if (typeName.endsWith("double")) {
						Double value1 = Double.parseDouble(v1.toString());
						Double value2 = Double.parseDouble(v2.toString());
						return ASC_order ? value1.compareTo(value2) : value2.compareTo(value1);
					} else if (typeName.endsWith("boolean")) {
						Boolean value1 = Boolean.parseBoolean(v1.toString());
						Boolean value2 = Boolean.parseBoolean(v2.toString());
						return ASC_order ? value1.compareTo(value2) : value2.compareTo(value1);
					} else if (typeName.endsWith("date")) {
						Date value1 = (Date) (v1);
						Date value2 = (Date) (v2);
						return ASC_order ? value1.compareTo(value2) : value2.compareTo(value1);
					} else if (typeName.endsWith("timestamp")) {
						Timestamp value1 = (Timestamp) (v1);
						Timestamp value2 = (Timestamp) (v2);
						return ASC_order ? value1.compareTo(value2) : value2.compareTo(value1);
					} else {
						//调用对象的compareTo()方法比较大小
						Method method = field.getType().getDeclaredMethod("compareTo", new Class[]{field.getType()});
						method.setAccessible(true); //设置可访问权限
						int result = (Integer) method.invoke(v1, new Object[]{v2});
						return ASC_order ? result : result * (-1);
					}
				} catch (Exception e) {
					logger.error("sortList", e);
				}

				return 0; //未知类型，无法比较大小
			}
		});
	}
	
	/**
	 * 转换成json字符串
	 * @param obj
	 * @return
	 */
	public static String toJson(Object obj) {
        JSONObject jSONObject = JSONObject.fromObject(obj);
        return jSONObject.toString();
    }
	
	/**
	 * 获取公司编号
	 * @param object
	 * @return
	 */
	public static String getCompanyCode4Bean(Object object) {
		return BeanUtil.getCompanyCode4Bean(object);
	}
}
