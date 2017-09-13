/*
Navicat MySQL Data Transfer

Source Server         : cycrm
Source Server Version : 50716
Source Host           : localhost:3306
Source Database       : cycrm

Target Server Type    : MYSQL
Target Server Version : 50716
File Encoding         : 65001

Date: 2017-09-13 17:11:59
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cy_area_info_table
-- ----------------------------
DROP TABLE IF EXISTS `cy_area_info_table`;
CREATE TABLE `cy_area_info_table` (
  `area_id` int(11) NOT NULL,
  `area_name` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`area_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cy_area_info_table
-- ----------------------------
INSERT INTO `cy_area_info_table` VALUES ('1', '豫东大区', null);
INSERT INTO `cy_area_info_table` VALUES ('2', '豫西大区', null);
INSERT INTO `cy_area_info_table` VALUES ('3', '豫南大区', null);
INSERT INTO `cy_area_info_table` VALUES ('4', '豫北大区', null);
INSERT INTO `cy_area_info_table` VALUES ('5', '郑州大区', null);

-- ----------------------------
-- Table structure for cy_city_info_table
-- ----------------------------
DROP TABLE IF EXISTS `cy_city_info_table`;
CREATE TABLE `cy_city_info_table` (
  `city_id` int(11) NOT NULL,
  `area_id` int(11) DEFAULT NULL,
  `city_name` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`city_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cy_city_info_table
-- ----------------------------
INSERT INTO `cy_city_info_table` VALUES ('1', '1', '商丘', null);
INSERT INTO `cy_city_info_table` VALUES ('2', '1', '许昌', null);
INSERT INTO `cy_city_info_table` VALUES ('3', '1', '开封', null);
INSERT INTO `cy_city_info_table` VALUES ('4', '1', '周口', null);
INSERT INTO `cy_city_info_table` VALUES ('5', '1', '漯河', null);

-- ----------------------------
-- Table structure for cy_customer_protocol_table
-- ----------------------------
DROP TABLE IF EXISTS `cy_customer_protocol_table`;
CREATE TABLE `cy_customer_protocol_table` (
  `protocol_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL COMMENT '客户ID',
  `area_id` int(11) NOT NULL COMMENT '大区ID',
  `city_id` int(11) NOT NULL COMMENT '地市ID',
  `upper_merchan` int(255) DEFAULT NULL COMMENT '一级商业ID',
  `lower_merchan` int(11) DEFAULT NULL COMMENT '二级商业ID',
  `hospital` varchar(255) NOT NULL COMMENT '医院名称',
  `product_id` int(255) NOT NULL COMMENT '药品ID',
  `promotion_expense` double(255,2) NOT NULL COMMENT '推广费',
  `bail` double(255,2) NOT NULL DEFAULT '0.00' COMMENT '保证金',
  `bail_desc` varchar(255) DEFAULT NULL,
  `switch_expense` double(255,2) DEFAULT NULL COMMENT '推广费变更价',
  `switch_standard` tinyint(255) DEFAULT NULL COMMENT '变更标准，高于：1；低于：0',
  `switch_amount` bigint(255) DEFAULT NULL COMMENT '考核数量 与switch_standard配合使用',
  `back_period` int(255) NOT NULL COMMENT '返款周期类型  1、月结 2、压批压月 3、60天 4、90天 5、120天',
  `rebate_payer` tinyint(255) NOT NULL DEFAULT '1' COMMENT '客户或公司支付   1：公司支付；0：客户支付',
  `rebate` double(255,2) DEFAULT NULL COMMENT '二级返利金额',
  `is_honour` tinyint(255) NOT NULL DEFAULT '0' COMMENT '是否折算承兑  1、是；0、否',
  `protocol_start` varchar(255) NOT NULL COMMENT '合约开始时间',
  `protocol_end` varchar(255) NOT NULL COMMENT '合约结束时间',
  `type` int(255) NOT NULL COMMENT '合约类型  1、县级以上  2、县级以下',
  `is_valid` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否执行 1、执行 0、作废',
  `create_by` varchar(255) NOT NULL,
  `create_time` varchar(255) NOT NULL,
  `update_by` varchar(255) DEFAULT NULL,
  `update_time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`protocol_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cy_customer_protocol_table
-- ----------------------------
INSERT INTO `cy_customer_protocol_table` VALUES ('1', '1', '1', '5', '1', '5', '济源市人民医院', '1', '18.60', '5000.00', null, '19.60', '1', '2000', '2', '1', '3.60', '1', '2313465464', '12312464644', '1', '1', 'admin', '135646461651', null, null);

-- ----------------------------
-- Table structure for cy_customer_table
-- ----------------------------
DROP TABLE IF EXISTS `cy_customer_table`;
CREATE TABLE `cy_customer_table` (
  `customer_id` int(11) NOT NULL AUTO_INCREMENT,
  `serial_code` varchar(255) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `deposit_bank` varchar(255) NOT NULL COMMENT '开户行',
  `account_name` varchar(255) NOT NULL COMMENT '账户名称',
  `account_code` varchar(255) NOT NULL COMMENT '账号',
  `desc` varchar(255) DEFAULT NULL,
  `is_corp` tinyint(4) NOT NULL DEFAULT '0' COMMENT '客户是否有效  1、有效 0、无效',
  `create_by` varchar(255) NOT NULL,
  `create_time` varchar(255) NOT NULL,
  `update_by` varchar(255) DEFAULT NULL,
  `update_time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cy_customer_table
-- ----------------------------
INSERT INTO `cy_customer_table` VALUES ('1', 'Y-001', '阿兰', '131222', '招商银行', '阿兰', '1234564', null, '1', 'admin', '2132142414', null, null);

-- ----------------------------
-- Table structure for cy_merchandiser_table
-- ----------------------------
DROP TABLE IF EXISTS `cy_merchandiser_table`;
CREATE TABLE `cy_merchandiser_table` (
  `merch_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `class_type` int(255) NOT NULL,
  `parent_id` int(11) DEFAULT '0',
  `desc` varchar(255) DEFAULT NULL,
  `create_by` varchar(255) NOT NULL,
  `create_time` varchar(255) NOT NULL,
  `update_by` varchar(255) DEFAULT NULL,
  `update_time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`merch_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cy_merchandiser_table
-- ----------------------------

-- ----------------------------
-- Table structure for cy_product_table
-- ----------------------------
DROP TABLE IF EXISTS `cy_product_table`;
CREATE TABLE `cy_product_table` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) NOT NULL,
  `product_norms` varchar(255) NOT NULL,
  `manufacture` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cy_product_table
-- ----------------------------
INSERT INTO `cy_product_table` VALUES ('1', '草乌甲素片', '0.4mg*12s', '昆明中药');
INSERT INTO `cy_product_table` VALUES ('2', '宫炎平片', '0.26g*48片', '昆明中药');
INSERT INTO `cy_product_table` VALUES ('3', '醋酸钙颗粒', '0.2g*20袋', '贵州人和');
INSERT INTO `cy_product_table` VALUES ('4', '复方风湿宁胶囊', '0.3g*60S', '武汉百灵');
INSERT INTO `cy_product_table` VALUES ('5', '银盏心脉滴丸', '25mg*150s', '豫西制药');
INSERT INTO `cy_product_table` VALUES ('6', '贞芪扶正胶囊', '12.5g/6S*66S', '贵州人和');
INSERT INTO `cy_product_table` VALUES ('7', '葛酮通络胶囊', '0.25g*12s', '昆明中药');
INSERT INTO `cy_product_table` VALUES ('8', '草乌甲素片', '0.5mg*12s', '昆明中药');

-- ----------------------------
-- Table structure for cy_user_info_table
-- ----------------------------
DROP TABLE IF EXISTS `cy_user_info_table`;
CREATE TABLE `cy_user_info_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `area_code` int(255) DEFAULT '0',
  `type` varchar(255) NOT NULL DEFAULT '0' COMMENT '管理员类型 0为普通权限；1为全部区域权限；2为超级管理员权限',
  `last_log` varchar(255) DEFAULT NULL COMMENT '上次登录时间',
  `login_times` bigint(20) DEFAULT '0' COMMENT '登录次数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cy_user_info_table
-- ----------------------------
INSERT INTO `cy_user_info_table` VALUES ('1', 'athoulen', '1113114', '0', '2', null, '0');
