package com.blueair.util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.mapping.ParameterMapping;
import org.apache.ibatis.mapping.ParameterMode;
import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.TypeHandlerRegistry;

/**
 * Mybatis - 获取Mybatis查询sql工具
 * 
 * @author Administrator
 */
public class SqlHelper {

	/**
	 * 运行期获取MyBatis执行的SQL及参数
	 * 
	 * @param id
	 *            Mapper.xml文件里的 Id
	 * @param params
	 *            参数
	 * @param configuration
	 * @return
	 */
	public static String getExecuteSql(String id, Object params, Configuration configuration) {
		MappedStatement ms = configuration.getMappedStatement(id);
		TypeHandlerRegistry typeHandlerRegistry = ms.getConfiguration().getTypeHandlerRegistry();
		BoundSql boundSql = ms.getBoundSql(params);
		String sql = boundSql.getSql();
		List<ParameterMapping> parameterMappings = boundSql.getParameterMappings();
		if (parameterMappings != null) {
			for (int i = 0; i < parameterMappings.size(); i++) {
				ParameterMapping parameterMapping = parameterMappings.get(i);
				if (parameterMapping.getMode() != ParameterMode.OUT) {
					Object value;
					String propertyName = parameterMapping.getProperty();
					if (boundSql.hasAdditionalParameter(propertyName)) {
						value = boundSql.getAdditionalParameter(propertyName);
					} else if (params == null) {
						value = null;
					} else if (typeHandlerRegistry.hasTypeHandler(params.getClass())) {
						value = params;
					} else {
						MetaObject metaObject = configuration.newMetaObject(params);
						value = metaObject.getValue(propertyName);
					}
					JdbcType jdbcType = parameterMapping.getJdbcType();
					if (value == null && jdbcType == null)
						jdbcType = configuration.getJdbcTypeForNull();
					sql = replaceParameter(sql, value, jdbcType, parameterMapping.getJavaType());
				}
			}
		}
		return sql.replace("\n", "").replace("\t", "");
	}

	
	
	/**
	 * 根据类型替换参数 仅作为数字和字符串两种类型进行处理，需要特殊处理的可以继续完善这里
	 * 
	 * @param sql
	 * @param value
	 * @param jdbcType
	 * @param javaType
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	private static String replaceParameter(String sql, Object value, JdbcType jdbcType, Class javaType) {
		String strValue = String.valueOf(value);
		if (jdbcType != null) {
			switch (jdbcType) {
			// 数字
			case BIT:
			case TINYINT:
			case SMALLINT:
			case INTEGER:
			case BIGINT:
			case FLOAT:
			case REAL:
			case DOUBLE:
			case NUMERIC:
			case DECIMAL:
				break;
			// 日期
			case DATE:
			case TIME:
			case TIMESTAMP:
				// 其他，包含字符串和其他特殊类型
			default:
				strValue = "null".equals(strValue) ? strValue : "'" + strValue + "'";
			}
		} else if (Number.class.isAssignableFrom(javaType)) {
			// 不加单引号
		} else {
			strValue = "null".equals(strValue) ? strValue : "'" + strValue + "'";
		}
		return sql.replaceFirst("\\?", strValue);
	}

	
	
	/**
	 * 简单包装参数
	 * 
	 * @param object
	 * @return
	 */
	public static Object wrapCollection(final Object object) {
		if (object instanceof List) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("list", object);
			return map;
		} else if (object != null && object.getClass().isArray()) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("array", object);
			return map;
		}
		return object;
	}

}
