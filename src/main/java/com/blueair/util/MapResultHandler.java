package com.blueair.util;

import java.util.Map;

import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.reflection.ReflectorFactory;
import org.apache.ibatis.reflection.factory.ObjectFactory;
import org.apache.ibatis.reflection.wrapper.ObjectWrapperFactory;
import org.apache.ibatis.session.ResultContext;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.SqlSession;

public class MapResultHandler implements ResultHandler {
	@SuppressWarnings("rawtypes")
	private final Map mappedResults;
	private final String mapKey;
	private final ObjectFactory objectFactory;
	private final ObjectWrapperFactory objectWrapperFactory;
	private final ReflectorFactory reflectorFactory;
	private final String mapValue;
	
	public MapResultHandler(String mapKey,String mapValue,SqlSession sqlSession){
		this.mapKey=mapKey;
		this.mapValue=mapValue;
		this.objectFactory=sqlSession.getConfiguration().getObjectFactory();
		this.mappedResults=objectFactory.create(Map.class);
		this.objectWrapperFactory=sqlSession.getConfiguration().getObjectWrapperFactory();
		this.reflectorFactory=sqlSession.getConfiguration().getReflectorFactory();
	}

	@SuppressWarnings("unchecked")
	@Override
	public void handleResult(ResultContext context) {
		Object value=context.getResultObject();
		Object key=null;
		
		if(value instanceof Map){
			Map<String, Object> params=(Map<String, Object>) value;
			value=params.get(this.mapValue);
			key=params.get(this.mapKey);
		}
		if(key==null){
			MetaObject mo=MetaObject.forObject(context.getResultObject(), this.objectFactory, this.objectWrapperFactory,this.reflectorFactory);
			key=mo.getValue(this.mapKey);
		}
		
		this.mappedResults.put(key, value);
	}

	@SuppressWarnings("unchecked")
	public Map<String, Object> getMappedResults(){
		return this.mappedResults;
	}
}
