package com.blueair.websocket;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.apache.shiro.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.blueair.shiro.util.Generator;

@ServerEndpoint("/websocketTest")
public class WebSocketTest {
	private Logger logger=LoggerFactory.getLogger(WebSocketTest.class);
	private static Map<String,Session> sessionMap=new ConcurrentHashMap<>();
	
	public static Map<String, Session> getSessionMap() {
		return sessionMap;
	}
	
	public static void logoutSessionMap(String username) {
		sessionMap.remove(username);
	}

	@OnMessage
    public void onMessage(String message, Session session) throws IOException, InterruptedException {
		if(message==null||message.isEmpty()){
			return;
		}
		Session sessionEl=sessionMap.get(message);
		if(sessionEl!=null&&sessionEl!=session){
			try {
				sessionEl.getAsyncRemote().sendText("用户已从其它设备登录，消息系统已退出！");
			} catch (Exception e) {
				logger.debug("发送远程消息失败:{}",e);
			}
		}
		
		sessionMap.put(message, session);
        // Print the client message for testing purposes
        System.out.println("Received: " + message);
        
        // Send the first message to the client
//        session.getBasicRemote().sendText("This is the first server message");

        // Send 3 messages to the client every 5 seconds
        /*while (true) {
            Thread.sleep(60000);
            for (Entry<String, Session> entry : sessionMap.entrySet()) {
				Session eternalSession=entry.getValue();
				eternalSession.getAsyncRemote().sendText("alive");
			}
        }*/
    }

    @OnOpen
    public void onOpen() {
        System.out.println("Client connected");
        if(!SecurityUtils.getSubject().isAuthenticated()){
			onClose();
			return;
		}
    }

    @OnClose
    public void onClose() {
        System.out.println("Connection closed");
    }
}