package com.blueair.shiro.session;

import java.io.Serializable;
import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.shiro.session.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.blueair.util.SerializeUtil;

public class ShiroSessionManager implements ShiroSessionRepository{
	
	private static Map<String,Session> sessionMap=new ConcurrentHashMap<>();
	private static final String SHIRO_SESSION_KEY="shiro_session";
	private static Logger logger = LoggerFactory.getLogger(ShiroSessionManager.class);

	@Override
	public void saveSession(Session session) {
		if (session == null || session.getId() == null)
			throw new NullPointerException("session is empty");
		try {
			String sessionKey = buildRedisSessionKey(session.getId());
			sessionMap.put(sessionKey, session);
		} catch (Exception e) {
			logger.error("saveSession error ", e);
		}
	}

	@Override
	public void deleteSession(Serializable sessionId) {
		if (sessionId == null) {
			throw new NullPointerException("session id is empty");
		}
		try {
			sessionMap.remove(buildRedisSessionKey(sessionId));
		} catch (Exception e) {
			logger.error("deleteSession error ", e);
		}
		
	}

	@Override
	public Session getSession(Serializable sessionId) {
		if (sessionId == null)
			throw new NullPointerException("session id is empty");
		Session session = null;
		try {
			String sessionKey = buildRedisSessionKey(sessionId);
			session =sessionMap.get(SerializeUtil.serialize(sessionKey));
		} catch (Exception e) {
			logger.error("getSession error ", e);
		}
		return session;
	}

	@Override
	public Collection<Session> getAllSessions() {
		return sessionMap.values();
	}

	private String buildRedisSessionKey(Serializable sessionId) {
		return SHIRO_SESSION_KEY+sessionId;
	}
}
