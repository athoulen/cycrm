package com.blueair.interceptor;

import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.springframework.web.servlet.resource.DefaultServletHttpRequestHandler;
import org.springframework.web.servlet.support.WebContentGenerator;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.blueair.constant.HandleCode;

public class LoginIntercepter extends HandlerInterceptorAdapter {

    /**
     * 用于在登录前验证 csrftoken 参数
     *
     * @param request
     * @param response
     * @param handler
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (handler instanceof DefaultServletHttpRequestHandler) {
            return true;
        }

        if (!request.getMethod().equalsIgnoreCase(
                WebContentGenerator.METHOD_POST)) {
            // 忽略非POST请求
            return true;
        } else {
            String referer = request.getHeader("Referer");
            String host = request.getHeader("Host");
            //空 refferer 攻击
            if(StringUtils.isEmpty(referer) || !StringUtils.contains(referer,host)){
                attackTip(response);
                return false;
            }else{
                //登录验证
                Subject currentUser = SecurityUtils.getSubject();
                if(currentUser.isAuthenticated()){
                	return true;
                }else{
                	unLoginMessage(response);
                	return false;
                }
            }
        }
    }

    private void unLoginMessage(HttpServletResponse response) throws IOException {
    	response.setContentType("text/html;charset=utf-8");
    	response.setStatus(404);
    	Map<String, Object> out=new HashMap<>();
    	out.put("code", HandleCode.SERVER_ERROR);
    	out.put("message", "用户未登录");
    	OutputStream oStream = response.getOutputStream();
    	oStream.write(JSONObject.toJSONBytes(out, SerializerFeature.WriteMapNullValue));
	}

	private void attackTip(HttpServletResponse response) throws IOException {
        response.setContentType("text/html;charset=utf-8");
        response.setStatus(403);
        Map<String, Object> out = new HashMap<String, Object>();
        out.put("imgCode", null);
        out.put("code", 900);
        out.put("message", "csrf攻击");
        //页面友好提示信息
        OutputStream oStream = response.getOutputStream();
        oStream.write(JSONObject.toJSONBytes(out, SerializerFeature.WriteMapNullValue));
    }
}
