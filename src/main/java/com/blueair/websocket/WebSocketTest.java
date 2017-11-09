package com.blueair.websocket;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.apache.shiro.SecurityUtils;

import com.blueair.shiro.util.Generator;

@ServerEndpoint("/websocketTest")
public class WebSocketTest {
	
	private static Map<String,Session> sessionMap=new HashMap<>();
	
	public static Map<String, Session> getSessionMap() {
		return sessionMap;
	}
	@OnMessage
    public void onMessage(String message, Session session) throws IOException, InterruptedException {
		if(!SecurityUtils.getSubject().isAuthenticated()){
			session.close();
			return;
		}
		sessionMap.put(String.valueOf(Generator.getUsername()), session);
        // Print the client message for testing purposes
        System.out.println("Received: " + message);

        // Send the first message to the client
        session.getBasicRemote().sendText("This is the first server message");

        // Send 3 messages to the client every 5 seconds
        int sentMessages = 0;
        while (sentMessages < 3) {
            Thread.sleep(5000);
            session.getBasicRemote().sendText("This is an intermediate server message. Count: " + sentMessages);
            sentMessages++;
        }

        // Send a final message to the client
        session.getBasicRemote().sendText("This is the last server message");
    }

    @OnOpen
    public void onOpen() {
        System.out.println("Client connected");
    }

    @OnClose
    public void onClose() {
        System.out.println("Connection closed");
    }
}