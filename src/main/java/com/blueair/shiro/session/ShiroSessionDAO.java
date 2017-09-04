package com.blueair.shiro.session;

import java.io.Serializable;

import org.apache.shiro.session.Session;
import org.apache.shiro.session.mgt.eis.CachingSessionDAO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ShiroSessionDAO extends CachingSessionDAO {
	private static final Logger logger = LoggerFactory.getLogger(ShiroSessionDAO.class);

    private ShiroSessionRepository shiroSessionRepository;

	protected void doUpdate(Session session) {
		logger.info("update session:{}", session);
        getShiroSessionRepository().saveSession(session);
	}

	protected void doDelete(Session session) {
		if (session == null) {
            return;
        }
        Serializable id = session.getId();
        if (id != null) {
            logger.info("delete session:{}", session);
            getShiroSessionRepository().deleteSession(id);
        }
	}

    protected Serializable doCreate(Session session) {
        logger.info("do create session:{}", session);
        Serializable sessionId = this.generateSessionId(session);
        this.assignSessionId(session, sessionId);
        getShiroSessionRepository().saveSession(session);
        return sessionId;
    }

    protected Session doReadSession(Serializable sessionId) {
        logger.info("do read session:{}", sessionId);
        return getShiroSessionRepository().getSession(sessionId);
    }

    public ShiroSessionRepository getShiroSessionRepository() {
        return shiroSessionRepository;
    }

    public void setShiroSessionRepository(
            ShiroSessionRepository shiroSessionRepository) {
        this.shiroSessionRepository = shiroSessionRepository;
    }

}
