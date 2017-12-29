package com.blueair.websocket;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.websocket.EncodeException;
import javax.websocket.Session;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class InStream {
	
	private static Logger logger=LoggerFactory.getLogger(InStream.class);
	//WebSocket发送消息给所有前端用户
	public static void sendMessage2AllFront(String json) throws IOException{
		 Map<String, Session> userMap = WebSocketTest.getSessionMap();
		 for (Entry<String, Session> entry : userMap.entrySet()) {
			Session session=entry.getValue();
			session.getBasicRemote().sendText(json);
		}
	}
	//WebSocket发送消息给指定前端用户
	public static void sendMessage2Users(String json,String... username) throws IOException{
		 Map<String, Session> userMap = WebSocketTest.getSessionMap();
		 List<String> nameList=Arrays.asList(username);
		 if(nameList==null||nameList.isEmpty()){
			 logger.debug("需要选择用户");
			 return ;
		 }
		 for (String name : nameList) {
			 Session session=userMap.get(name);
			 if(session==null){
				 logger.debug("用户"+name+"未连接websocket");
				 continue;
			 }
			 try {
				synchronized (session) {
					session.getBasicRemote().sendText(json);
					logger.info("消息发送成功：{}",json);
				}
			} catch (Exception e) {
				logger.debug("远程连接可能已关闭{}",e);
			}
		}
	}
	
	public static void sendObject2AllFront(Object object) throws IOException, EncodeException {
		Map<String, Session> userMap = WebSocketTest.getSessionMap();
		 for (Entry<String, Session> entry : userMap.entrySet()) {
			Session session=entry.getValue();
			session.getBasicRemote().sendObject(object);
		}
	}
	
	//WebSocket发送对象给指定前端用户
		public static void sendMessage2Users(Object object,String... username) throws IOException, EncodeException{
			 Map<String, Session> userMap = WebSocketTest.getSessionMap();
			 List<String> nameList=Arrays.asList(username);
			 for (String name : nameList) {
				 Session session=userMap.get(name);
				 session.getBasicRemote().sendObject(object);
			}
		}
}