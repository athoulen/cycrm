package com.blueair.shiro.filter;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.authz.AuthorizationFilter;
/**
 * 由于Shiro filterChainDefinitions中 roles默认是and，比如：roles[system,general] ，表示同时需要“system”和“general” 2个角色才通过认证
 * 
 */
public class RolesAuthorizationFilter extends AuthorizationFilter {
	    protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue)  throws Exception {  
	        Subject subject = getSubject(request, response);   
	        String[] rolesArray = (String[]) mappedValue;   
	        if (rolesArray == null || rolesArray.length == 0) {   
	            return true;   
	        }   
	        for(int i=0;i<rolesArray.length;i++){    
	            if(subject.hasRole(rolesArray[i])){    
	                return true;    
	            }    
	        }
			return false;    
	    }  
}
