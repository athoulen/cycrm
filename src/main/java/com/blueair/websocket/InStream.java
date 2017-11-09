package com.blueair.websocket;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.websocket.EncodeException;
import javax.websocket.Session;

public class InStream {
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
		 for (String name : nameList) {
			 Session session=userMap.get(name);
			 session.getBasicRemote().sendText(json);
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
