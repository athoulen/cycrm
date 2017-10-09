package com.blueair.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.executor.result.DefaultResultContext;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.blueair.dao.IBaseDao;
import com.blueair.util.ConvertUtil;
import com.blueair.util.MapResultHandler;
import com.blueair.util.SqlHelper;
 

/**
 * 用户Dao基类
 */
@Repository(value="baseDao")
public class BaseDaoImpl implements IBaseDao {
	@Autowired
	private SqlSession sqlSession;
	
	/**
	 * 根据Id获取对象
	 * 
	 * @param sqlId
	 *            脚本编号
	 * @param id
	 *            主键
	 * @return Object对象
	 */
	public Object queryForObject(String sqlId, int id) {
		return sqlSession.selectOne(sqlId, id);
	}

	/**
	 * 根据Id获取对象
	 * 
	 * @param sqlId
	 *            脚本编号
	 * @param id
	 *            主键
	 * @param cls
	 *            返回的对象Class
	 * @return cls对应的类
	 */
	@SuppressWarnings("unchecked")
	public <T> T queryForObject(String sqlId, int id, Class<T> cls) {
		return (T) sqlSession.selectOne(sqlId, id);
	}

	/**
	 * 根据Id获取对象
	 * 
	 * @param sqlId
	 *            脚本编号
	 * @param id
	 *            主键
	 * @param cls
	 *            返回的对象Class
	 * @return cls对应的类
	 */
	@SuppressWarnings("unchecked")
	public <T> T queryForObject(String sqlId, long id, Class<T> cls) {
		return (T) sqlSession.selectOne(sqlId, id);
	}
	
	/**
	 * 根据条件获取对象
	 * 
	 * @param sqlId
	 *            脚本编号
	 * @param params
	 *            参数
	 * @return
	 */
	public Object queryForObject(String sqlId, Map<String, Object> params) {
		return sqlSession.selectOne(sqlId, params);
	}

	/**
	 * 根据条件获取对象
	 * 
	 * @param sqlId
	 *            脚本编号
	 * @param params
	 *            参数
	 * @param cls
	 *            返回的对象Class
	 * @return cls对应的类
	 */
	@SuppressWarnings("unchecked")
	public <T> T queryForObject(String sqlId, Map<String, Object> params,
			Class<T> cls) {
		return (T) sqlSession.selectOne(sqlId, params);
	}

	/**
	 * 获取数据总条数
	 * 
	 * @param sqlId
	 *            脚本编号
	 * @param params
	 *            参数
	 * @return 条数
	 */
	public int getTotalCount(String sqlId, Map<String, String> params) {
		return (Integer) sqlSession.selectOne(sqlId, params);
	}

	/**
	 * 查询列表
	 * 
	 * @param sqlId
	 *            脚本编号
	 * @param params
	 *            参数
	 * @param cls
	 *            返回的对象Class
	 * @return 列表<cls对应的类>
	 */
	public <T> List<T> queryForList(String sqlId, Map<String, String> params,
			Class<T> cls) {
		return sqlSession.selectList(sqlId, params);
	}
	
	/**
	 * 查询列表
	 * 
	 * @param sqlId
	 *            脚本编号
	 * @param params
	 *            参数
	 * @param cls
	 *            返回的对象Class
	 * @return 列表<cls对应的类>
	 */
	public <T> List<T> queryForListForObject(String sqlId, Map<String, Object> params,
			Class<T> cls) {
		return sqlSession.selectList(sqlId, params);
	}

	/**
	 * 查询列表
	 * 
	 * @param sqlId
	 *            脚本编号
	 * @param params
	 *            参数
	 * @return 列表
	 */
	public List<Map<String, Object>> queryForList(String sqlId,
			Map<String, Object> param) {
		List<Map<String, Object>> list = sqlSession.selectList(sqlId, param);
		List<Map<String, Object>> beans = ConvertUtil.convertSqlMap2JavaMap(list);
		return beans;
	}
	
	/**
	 * 查询Map集合
	 * 
	 * @param sqlId
	 *            脚本编号
	 * @param params
	 *            参数
	 * @return 列表
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Map queryForMap(String sqlId, Map<String, Object> param, String mapKey, String mapValue) {

		List list = this.sqlSession.selectList(sqlId, param, RowBounds.DEFAULT);
		MapResultHandler mapResultHandler = new MapResultHandler(mapKey, mapValue, this.sqlSession);
		DefaultResultContext context = new DefaultResultContext();

		for (Iterator it = list.iterator(); it.hasNext();) {
			Object o = it.next();
			context.nextResultObject(o);
			mapResultHandler.handleResult(context);
		}

		Map selectedMap = mapResultHandler.getMappedResults();
		return selectedMap;
	}

	/**
	 * 修改数据
	 * 
	 * @param sqlId
	 *            脚本编号
	 * @param object
	 *            对象
	 */
	public int update(String sqlId, Object object) {
		return sqlSession.update(sqlId, object);
	}

	/**
	 * 插入数据
	 * 
	 * @param sqlId
	 *            脚本编号
	 * @param object
	 *            待插入的对象
	 * @return 插入条数
	 */
	public int insert(String sqlId, Object object) {
		return (Integer) sqlSession.insert(sqlId, object);
	}

	/**
	 * 删除数据
	 * 
	 * @param sqlId
	 *            脚本编号
	 * @param id
	 *            主键
	 * @return 主键
	 */
	public int delete(String sqlId, int id) {
		return sqlSession.delete(sqlId, id);
	}
	
	/**
	 * 删除数据
	 * 
	 * @param sqlId
	 *            脚本编号
	 * @param id
	 *            主键
	 * @return 主键
	 */
	public int delete(String sqlId, long id) {
		return sqlSession.delete(sqlId, id);
	}
	
	/**
	 * 删除数据
	 * 
	 * @param sqlId
	 *            脚本编号
	 * @param map
	 *            待删除的对象
	 * @return 主键
	 */
	public int delete(String sqlId, Map<String, Object> map) {
		return sqlSession.delete(sqlId, map);
	}
	
	/**
	 * 查询列表
	 *
	 * @param sqlId
	 *            脚本编号
	 * @param params
	 *            参数
	 * @param cls
	 *            返回的对象Class
	 * @return 列表<cls对应的类>
	 */
	public <T> List<T> queryList(String sqlId, Map<String, Object> params, Class<T> cls) {
		return sqlSession.selectList(sqlId, params);
	}


    public <T> List<T> queryForList(String sqlId, Object object, Class<T> cls) {
        return sqlSession.selectList(sqlId, object);
    }
    
    
    
	/**
	 * 批量插入
	 * @param mapperId
	 * @param obj
	 * @param sqlsession
	 * @return
	 * @throws SQLException
	 */
	public int[] insertBatch(String mapperId, Object params) throws SQLException {
		// MyBatis的Configuration配置
		Configuration configuration = sqlSession.getConfiguration();
		//获取执行SQL
		String sql = SqlHelper.getExecuteSql(mapperId, SqlHelper.wrapCollection(params), configuration);
		// 获取数据库连接
		Connection conn = sqlSession.getConnection();
		// 准备批量执行SQL语句
		PreparedStatement pst = conn.prepareStatement("");
		pst.addBatch(sql);
		pst.close();
		// 批量执行
		return pst.executeBatch();
	}
}