package com.blueair.cycrm.base;

import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.transaction.annotation.Transactional;

//使用junit4进行测试 
@SuppressWarnings("deprecation")
@RunWith(SpringJUnit4ClassRunner.class) 

// 加载配置文件
@ContextConfiguration({ "classpath:spring/spring-all.xml" })

// 控制事务
@Transactional

// 事务配置
@TransactionConfiguration(transactionManager = "transactionManager", defaultRollback = false)
public class JunitTestBase {

}
