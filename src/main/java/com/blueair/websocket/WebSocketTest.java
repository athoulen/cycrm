package com.blueair.websocket;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.ConcurrentHashMap;

import javax.websocket.EndpointConfig;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@ServerEndpoint("/websocketTest/{userno}")
@Component
public class WebSocketTest {
	 //静态变量，用来记录当前在线连接数。应该把它设计成线程安全的。
    private static int onlineCount = 0;
    //concurrent包的线程安全Set，用来存放每个客户端对应的MyWebSocket对象。若要实现服务端与单一客户端通信的话，可以使用Map来存放，其中Key可以为用户标识
    private static ConcurrentHashMap<String, WebSocketTest> webSocketSet = new ConcurrentHashMap<String, WebSocketTest>();
    //与某个客户端的连接会话，需要通过它来给客户端发送数据
    private Session session;
    //当前发消息的人员编号
    private String userno = "";

    private static Logger logger=LoggerFactory.getLogger(WebSocketTest.class);
    /**
     * 连接建立成功调用的方法
     *
     * @param session 可选的参数。session为与某个客户端的连接会话，需要通过它来给客户端发送数据
     */
    @OnOpen
    public void onOpen(@PathParam(value = "userno") String param, Session session, EndpointConfig config) {
    	logger.info("[Websocket]登录用户:{}"+param);
        userno = param;//接收到发送消息的人员编号
        this.session = session;
        webSocketSet.put(param, this);//加入map中
        addOnlineCount();           //在线数加1
        logger.info("有新连接加入！当前在线人数为{}" , getOnlineCount());
    }

    /**
     * 连接关闭调用的方法
     */
    @OnClose
    public void onClose() {
        if (!userno.equals("")) {
            webSocketSet.remove(userno);  //从set中删除
            subOnlineCount();           //在线数减1
            logger.info("有一连接关闭！当前在线人数为{}" , getOnlineCount());
        }
    }

    /**
     * 收到客户端消息后调用的方法
     *
     * @param message 客户端发送过来的消息
     * @param session 可选的参数
     */
    @OnMessage
    public void onMessage(String message, Session session) {
        logger.info("来自客户端的消息:{}" , message);
        String[] msgs=message.split("[|]");
        //群发消息
        if (msgs.length<2) {
            sendAll(message);
        } else {
            //给指定的人发消息
            sendToUser(message);
        }
    }

    /**
     * 给指定的人发送消息
     * @param message
     */
    private void sendToUser(String message) {
        String sendUserno = message.split("[|]")[1];
        String sendMessage = message.split("[|]")[0];
        String now = getNowTime();
        try {
            if (webSocketSet.get(sendUserno) != null) {
                webSocketSet.get(sendUserno).sendMessage(now + "用户" + userno + "发来消息：" + " <br/> " + sendMessage);
            } else {
                logger.info("当前用户不在线");
            }
        } catch (IOException e) {
            logger.debug("发送用户消息时出错{}",e);
        }
    }

    /**
     * 给所有人发消息
     * @param message
     */
    private void sendAll(String message) {
        String now = getNowTime();
        String sendMessage = message.split("[|]")[0];
        //遍历HashMap
        for (String key : webSocketSet.keySet()) {
            try {
                //判断接收用户是否是当前发消息的用户
                if (!userno.equals(key)) {
                    webSocketSet.get(key).sendMessage(now + "用户" + userno + "发来消息：" + " <br/> " + sendMessage);
                    logger.info("key = " + key);
                }
            } catch (IOException e) {
                logger.debug("向所有用户发信息时发生错误,{}",e);
            }
        }
    }
    
    /**
     * 后台主动发出
     * @param message
     */
    public static void sendToUserCom(String message,String userName) {
    	try {
			webSocketSet.get(userName).sendMessage(message);
		} catch (IOException e) {
			
		} catch (NullPointerException e) {
			logger.debug("未找到用户：{}",userName);
		}
    }
    
    /**
     * 后台主动发出
     * @param message
     */
    public static void sendToAllCom(String message) {
    	for (String key : webSocketSet.keySet()) {
		    try {
		        //判断接收用户是否是当前发消息的用户
		         webSocketSet.get(key).sendMessage(getNowTime() + "来自系统的消息：" + " <br/> " + message);
		         logger.info("key = " + key);
		    } catch (IOException e) {
		    	logger.debug("向后台发信息时发生错误,{}",e);
		    }
		}
    }
    /**
     * 获取当前时间
     *
     * @return
     */
    private static String getNowTime() {
        Date date = new Date();
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String time = format.format(date);
        return time;
    }
    /**
     * 发生错误时调用
     *
     * @param session
     * @param error
     */
    @OnError
    public void onError(Session session, Throwable error) {
        logger.debug("发生错误,{}",error);
    }

    /**
     * 这个方法与上面几个方法不一样。没有用注解，是根据自己需要添加的方法。
     *
     * @param message
     * @throws IOException
     */
    public void sendMessage(String message) throws IOException {
        this.session.getBasicRemote().sendText(message);
        //this.session.getAsyncRemote().sendText(message);
    }

    public static synchronized int getOnlineCount() {
        return onlineCount;
    }

    public static synchronized void addOnlineCount() {
        WebSocketTest.onlineCount++;
    }

    public static synchronized void subOnlineCount() {
        WebSocketTest.onlineCount--;
    }

	public static void logoutSessionMap(String username) {
		webSocketSet.remove(username);
	}
    
}