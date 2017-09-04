package com.blueair.shiro.realm;

import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.PrincipalCollection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blueair.bean.User;
import com.blueair.service.IUserService;
import com.blueair.shiro.util.Generator;
  
 /** 
 * 
 * 自定义的指定Shiro验证用户登录的类 
 * @see 在本例中定义了2个用户:shilei和other,shilei具有admin角色和admin:manage权限,other不具有任何角色和权限 
 */  
@Service
public class UserRealm extends AuthorizingRealm {
	private static final Logger logger = LoggerFactory.getLogger(UserRealm.class);
	@Autowired
	private IUserService userService;
	/** 
     * 为当前登录的Subject授予角色和权限 
     * @see 经测试:本例中该方法的调用时机为需授权资源被访问时 
     * @see 经测试:并且每次访问需授权资源时都会执行该方法中的逻辑,这表明本例中默认并未启用AuthorizationCache 
      */   
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals){  
        //获取当前登录的用户名,等价于(String)principals.fromRealm(this.getName()).iterator().next()  
        String currentUsername = (String)super.getAvailablePrincipal(principals);  
        logger.info("当前用户:"+currentUsername);
//      List<String> roleList = new ArrayList<String>();  
//      List<String> permissionList = new ArrayList<String>();  
//      //从数据库中获取当前登录用户的详细信息  
//      User user = userService.getByUsername(currentUsername);  
//      if(null != user){  
//          //实体类User中包含有用户角色的实体类信息  
//          if(null!=user.getRoles() && user.getRoles().size()>0){  
//              //获取当前登录用户的角色  
//              for(Role role : user.getRoles()){  
//                  roleList.add(role.getName());  
//                  //实体类Role中包含有角色权限的实体类信息  
//                  if(null!=role.getPermissions() && role.getPermissions().size()>0){  
//                      //获取权限  
//                      for(Permission pmss : role.getPermissions()){  
//                          if(!StringUtils.isEmpty(pmss.getPermission())){  
//                              permissionList.add(pmss.getPermission());  
//                          }  
//                      }  
//                  }  
//              }  
//          }  
//      }else{  
//          throw new AuthorizationException();  
//      }  
//      //为当前用户设置角色和权限  
//      SimpleAuthorizationInfo simpleAuthorInfo = new SimpleAuthorizationInfo();  
//      simpleAuthorInfo.addRoles(roleList);  
//      simpleAuthorInfo.addStringPermissions(permissionList);  
        SimpleAuthorizationInfo simpleAuthorInfo = new SimpleAuthorizationInfo();  
        //实际中可能会像上面注释的那样从数据库取得  
        return null;  
    }  
  
      
    
	/** 
     * 验证当前登录的Subject 
     * @see 经测试:本例中该方法的调用时机为LoginController.login()方法中执行Subject.login()时 
     */ 
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authcToken) throws AuthenticationException {
    	Session session = SecurityUtils.getSubject().getSession();
        //获取基于用户名和密码的令牌  
        //实际上这个authcToken是从LoginController里面currentUser.login(token)传过来的  
        //两个token的引用都是一样的,本例中是org.apache.shiro.authc.UsernamePasswordToken@33799a1e  
    	UsernamePasswordToken token = (UsernamePasswordToken) authcToken; 
//        System.out.println("验证当前Subject时获取到token为" + ReflectionToStringBuilder.toString(token, ToStringStyle.MULTI_LINE_STYLE));  
        String name = token.getUsername();
        User user=getLoginUser(name);
        String pwd;
        if(user!=null){
        	pwd =(String) user.getPassword();
        }else{
        	throw new UnknownAccountException("没有查找到管理员");
        }
        //验证帐号
        if(StringUtils.equals(pwd, new String(token.getPassword()))){
        	session.setAttribute(Generator.ADMIN_KEY, user.getId());
        	session.setAttribute(Generator.AREA_CODE, user.getAreaCode());
        	session.setAttribute(Generator.OPERATOR_TYPE, user.getType());
        	AuthenticationInfo authcInfo = new SimpleAuthenticationInfo(name, pwd, name);  
        	return authcInfo;
        }
		return null;
    }  
  
    /**
     * 获得用户的密码
     * @param username
     * @return
     */
	private User getLoginUser(String username){
		return userService.getUserInfo(username);
    }
    
}
 