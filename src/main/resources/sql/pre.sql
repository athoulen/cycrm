/*
Navicat MySQL Data Transfer

Source Server         : crm
Source Server Version : 50716
Source Host           : localhost:3306
Source Database       : cycrm

Target Server Type    : MYSQL
Target Server Version : 50716
File Encoding         : 65001

Date: 2017-09-19 17:13:18
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cy_area_info_table
-- ----------------------------
DROP TABLE IF EXISTS `cy_area_info_table`;
CREATE TABLE `cy_area_info_table` (
  `area_id` int(11) NOT NULL COMMENT '大区id',
  `area_name` varchar(255) DEFAULT NULL COMMENT '大区名称',
  `desc` varchar(255) DEFAULT NULL COMMENT '描述',
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
-- Table structure for cy_back_info_table
-- ----------------------------
DROP TABLE IF EXISTS `cy_back_info_table`;
CREATE TABLE `cy_back_info_table` (
  `back_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '二级返利方法ID',
  `back_period_name` varchar(255) NOT NULL COMMENT '二级返利周期名称',
  `back_style_name` varchar(255) NOT NULL COMMENT '二级返利形式名称',
  PRIMARY KEY (`back_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cy_back_info_table
-- ----------------------------
INSERT INTO `cy_back_info_table` VALUES ('1', '季度', '现金');
INSERT INTO `cy_back_info_table` VALUES ('2', '季度', '票折');
INSERT INTO `cy_back_info_table` VALUES ('3', '月结', '现金');
INSERT INTO `cy_back_info_table` VALUES ('4', '月结', '电汇');
INSERT INTO `cy_back_info_table` VALUES ('5', '季度', '电汇');

-- ----------------------------
-- Table structure for cy_business_flow_table
-- ----------------------------
DROP TABLE IF EXISTS `cy_business_flow_table`;
CREATE TABLE `cy_business_flow_table` (
  `flow_id` varchar(32) NOT NULL COMMENT '商业流向id',
  `sold_unit_id` varchar(32) DEFAULT NULL COMMENT '销售单位id',
  `accept_unit_id` varchar(32) DEFAULT NULL COMMENT '接收单位id',
  `company_city_id` varchar(32) DEFAULT NULL COMMENT '公司城市ID',
  `customer_id` varchar(32) DEFAULT NULL COMMENT '客户ID',
  `product_id` varchar(32) DEFAULT NULL COMMENT '产品id',
  `sold_date` varchar(30) DEFAULT NULL COMMENT '出售日期',
  `sold_month` varchar(10) DEFAULT NULL COMMENT '出售月份',
  `allocate_goods_num` int(11) DEFAULT NULL COMMENT '调货数量',
  `sold_goods_num` int(11) DEFAULT NULL COMMENT '销售数量',
  `sold_price` decimal(10,2) DEFAULT NULL COMMENT '销售价格',
  `allocate_price` decimal(10,2) DEFAULT NULL COMMENT '调拨价格',
  `sold_money` decimal(10,2) DEFAULT NULL COMMENT '销售金额',
  `flag` char(2) DEFAULT NULL COMMENT '记录流向标志,即一级到二级,二级到三级...',
  `department` varchar(255) DEFAULT NULL COMMENT '部门',
  `hospital` varchar(255) DEFAULT NULL COMMENT '医院',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `create_time` varchar(255) DEFAULT NULL COMMENT '创建时间',
  `update_time` varchar(255) DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`flow_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cy_business_flow_table
-- ----------------------------

-- ----------------------------
-- Table structure for cy_city_info_table
-- ----------------------------
DROP TABLE IF EXISTS `cy_city_info_table`;
CREATE TABLE `cy_city_info_table` (
  `city_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '地市id',
  `area_id` int(11) DEFAULT NULL COMMENT '大区id',
  `city_name` varchar(255) DEFAULT NULL COMMENT '地市名称',
  `desc` varchar(255) DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cy_city_info_table
-- ----------------------------
INSERT INTO `cy_city_info_table` VALUES ('1', '1', '商丘', null);
INSERT INTO `cy_city_info_table` VALUES ('2', '1', '许昌', null);
INSERT INTO `cy_city_info_table` VALUES ('3', '1', '开封', null);
INSERT INTO `cy_city_info_table` VALUES ('4', '1', '周口', null);
INSERT INTO `cy_city_info_table` VALUES ('5', '1', '漯河', null);
INSERT INTO `cy_city_info_table` VALUES ('6', '2', '洛阳', null);
INSERT INTO `cy_city_info_table` VALUES ('7', '2', '新乡', null);
INSERT INTO `cy_city_info_table` VALUES ('8', '2', '三门峡', null);
INSERT INTO `cy_city_info_table` VALUES ('9', '3', '平顶山', null);
INSERT INTO `cy_city_info_table` VALUES ('10', '3', '驻马店', null);
INSERT INTO `cy_city_info_table` VALUES ('11', '3', '信阳', null);
INSERT INTO `cy_city_info_table` VALUES ('12', '3', '南阳', null);
INSERT INTO `cy_city_info_table` VALUES ('13', '4', '鹤壁', null);
INSERT INTO `cy_city_info_table` VALUES ('14', '4', '焦作', null);
INSERT INTO `cy_city_info_table` VALUES ('15', '4', '济源', null);
INSERT INTO `cy_city_info_table` VALUES ('16', '4', '安阳', null);
INSERT INTO `cy_city_info_table` VALUES ('17', '4', '濮阳', null);
INSERT INTO `cy_city_info_table` VALUES ('18', '5', '郑州', null);

-- ----------------------------
-- Table structure for cy_company_city_table
-- ----------------------------
DROP TABLE IF EXISTS `cy_company_city_table`;
CREATE TABLE `cy_company_city_table` (
  `company_city_id` varchar(32) NOT NULL COMMENT '公司城市ID',
  `company_id` varchar(32) DEFAULT NULL COMMENT '公司id',
  `city_id` varchar(255) DEFAULT NULL COMMENT '城市id',
  `area_name` varchar(255) DEFAULT NULL COMMENT '区域名称',
  `create_time` varchar(30) DEFAULT NULL COMMENT '创建时间',
  `update_time` varchar(30) DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`company_city_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cy_company_city_table
-- ----------------------------

-- ----------------------------
-- Table structure for cy_customer_protocol_table
-- ----------------------------
DROP TABLE IF EXISTS `cy_customer_protocol_table`;
CREATE TABLE `cy_customer_protocol_table` (
  `protocol_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '协议id',
  `customer_id` int(11) NOT NULL COMMENT '客户ID',
  `area_id` int(11) NOT NULL COMMENT '大区ID',
  `city_id` int(11) NOT NULL COMMENT '地市ID',
  `upper_merchan` int(255) DEFAULT NULL COMMENT '一级商业ID',
  `lower_merchan` int(11) DEFAULT NULL COMMENT '二级商业ID',
  `hospital_id` int(11) NOT NULL COMMENT '医院id',
  `product_id` int(255) NOT NULL COMMENT '药品ID',
  `promotion_expense` double(255,2) NOT NULL COMMENT '推广费',
  `bail` double(255,2) NOT NULL DEFAULT '0.00' COMMENT '保证金',
  `desc` varchar(255) DEFAULT NULL COMMENT '描述',
  `switch_expense` double(255,2) DEFAULT NULL COMMENT '推广费变更价',
  `switch_standard` tinyint(255) DEFAULT NULL COMMENT '变更标准，高于：1；低于：0',
  `switch_amount` bigint(255) DEFAULT NULL COMMENT '考核数量 与switch_standard配合使用',
  `rebate_period` int(255) NOT NULL COMMENT '返款周期类型  与cy_rebate_period_table关联',
  `rebate_payer` tinyint(255) NOT NULL DEFAULT '1' COMMENT '客户或公司支付   1：公司支付；0：客户支付',
  `rebate` double(255,2) DEFAULT NULL COMMENT '二级返利金额',
  `is_honour` tinyint(255) NOT NULL DEFAULT '0' COMMENT '是否折算承兑  1、是；0、否',
  `protocol_start` varchar(255) NOT NULL COMMENT '合约开始时间',
  `protocol_end` varchar(255) NOT NULL COMMENT '合约结束时间',
  `type` int(255) NOT NULL COMMENT '合约类型  1、县级以上  2、县级以下',
  `is_valid` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否执行 1、执行 0、作废',
  `create_by` varchar(255) NOT NULL COMMENT '创建人',
  `create_time` varchar(255) NOT NULL COMMENT '创建时间',
  `update_by` varchar(255) DEFAULT NULL COMMENT '修改人',
  `update_time` varchar(255) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`protocol_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cy_customer_protocol_table
-- ----------------------------
INSERT INTO `cy_customer_protocol_table` VALUES ('1', '1', '1', '5', '1', '5', '1', '1', '18.60', '5000.00', null, '19.60', '1', '2000', '2', '1', '3.60', '1', '2313465464', '12312464644', '1', '1', 'admin', '135646461651', null, null);

-- ----------------------------
-- Table structure for cy_customer_table
-- ----------------------------
DROP TABLE IF EXISTS `cy_customer_table`;
CREATE TABLE `cy_customer_table` (
  `customer_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '客户id',
  `serial_code` varchar(255) NOT NULL COMMENT '客户编号',
  `customer_name` varchar(255) NOT NULL COMMENT '客户姓名',
  `phone` varchar(255) NOT NULL COMMENT '联系电话',
  `deposit_bank` varchar(255) NOT NULL COMMENT '开户行',
  `account_name` varchar(255) NOT NULL COMMENT '账户名称',
  `account_code` varchar(255) NOT NULL COMMENT '账号',
  `desc` varchar(255) DEFAULT NULL COMMENT '描述',
  `is_corp` tinyint(4) NOT NULL DEFAULT '0' COMMENT '客户是否有效  1、有效 0、无效',
  `create_by` varchar(255) NOT NULL COMMENT '创建人',
  `create_time` varchar(255) NOT NULL COMMENT '创建时间',
  `update_by` varchar(255) DEFAULT NULL COMMENT '修改人',
  `update_time` varchar(255) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cy_customer_table
-- ----------------------------
INSERT INTO `cy_customer_table` VALUES ('1', 'Y-001', '阿兰', '131222', '招商银行', '阿兰', '1234564', null, '1', 'admin', '2132142414', null, null);

-- ----------------------------
-- Table structure for cy_hospital_table
-- ----------------------------
DROP TABLE IF EXISTS `cy_hospital_table`;
CREATE TABLE `cy_hospital_table` (
  `hospital_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '医院id',
  `hospital_name` varchar(255) NOT NULL COMMENT '医院名称',
  `type` tinyint(255) NOT NULL COMMENT '医院类型   1、县级以上医院   2、县级卫生院 3、其它',
  `area_id` int(11) DEFAULT NULL COMMENT '区域ID',
  `city_id` int(11) DEFAULT NULL COMMENT '地市ID',
  `create_by` varchar(255) NOT NULL COMMENT '创建人',
  `create_time` varchar(255) NOT NULL COMMENT '创建时间',
  `update_by` varchar(255) DEFAULT NULL COMMENT '修改人',
  `update_time` varchar(255) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`hospital_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cy_hospital_table
-- ----------------------------
INSERT INTO `cy_hospital_table` VALUES ('1', '商丘市人民医院', '1', null, null, 'admin', '121346789754', null, null);

-- ----------------------------
-- Table structure for cy_merchandiser_protocol_table
-- ----------------------------
DROP TABLE IF EXISTS `cy_merchandiser_protocol_table`;
CREATE TABLE `cy_merchandiser_protocol_table` (
  `protocol_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '协议ID',
  `protocol_code` varchar(255) NOT NULL COMMENT '协议编号',
  `product_id` int(11) NOT NULL COMMENT '产品ID',
  `area_id` int(11) NOT NULL COMMENT '区域id',
  `city_id` int(11) NOT NULL COMMENT '地市id',
  `bid_price` double(10,2) NOT NULL COMMENT '中标价',
  `up_merchan` int(11) NOT NULL COMMENT '一级商业ID',
  `lo_merchan` int(255) NOT NULL COMMENT '二级商业ID',
  `hospital_id` int(11) NOT NULL COMMENT '终端医院id',
  `up_back` double(255,0) NOT NULL COMMENT '一级返利',
  `lo_back` double(255,0) NOT NULL COMMENT '二级返利',
  `back_period` int(255) NOT NULL COMMENT '返利周期  从cy_back_period_table中获取',
  `back_style` int(255) NOT NULL COMMENT '返利类型  从cy_back_style_table中获取',
  `start_time` varchar(255) NOT NULL COMMENT '协议生效时间',
  `end_time` varchar(255) NOT NULL COMMENT '协议终止时间',
  `contactor` varchar(255) DEFAULT NULL COMMENT '返利联系人',
  `phone` varchar(255) DEFAULT NULL COMMENT '联系电话',
  `qq` varchar(255) DEFAULT NULL COMMENT 'QQ号码',
  `is_valid` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否可用 1、可用 0、不可用',
  `create_by` varchar(255) NOT NULL COMMENT '创建人',
  `create_time` varchar(255) NOT NULL COMMENT '创建时间',
  `update_by` varchar(255) NOT NULL COMMENT '修改人',
  `update_time` varchar(255) NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`protocol_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cy_merchandiser_protocol_table
-- ----------------------------

-- ----------------------------
-- Table structure for cy_merchandiser_table
-- ----------------------------
DROP TABLE IF EXISTS `cy_merchandiser_table`;
CREATE TABLE `cy_merchandiser_table` (
  `merch_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商业公司id',
  `name` varchar(255) NOT NULL COMMENT '名称',
  `class_type` int(255) NOT NULL COMMENT '级别  1、一级商业  2、国有二级商业  3、非国有二级商业',
  `parent_id` int(11) DEFAULT '0' COMMENT '上一级商业ID',
  `desc` varchar(255) DEFAULT NULL COMMENT '描述',
  `create_by` varchar(255) NOT NULL COMMENT '创建人',
  `create_time` varchar(255) NOT NULL COMMENT '创建时间',
  `update_by` varchar(255) DEFAULT NULL COMMENT '修改人',
  `update_time` varchar(255) DEFAULT NULL COMMENT '修改时间',
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
  `product_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '产品id',
  `product_name` varchar(255) NOT NULL COMMENT '产品名称',
  `product_norms` varchar(255) NOT NULL COMMENT '产品规格',
  `manufacture` varchar(255) DEFAULT NULL COMMENT '制造厂名称',
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
-- Table structure for cy_rebate_period_table
-- ----------------------------
DROP TABLE IF EXISTS `cy_rebate_period_table`;
CREATE TABLE `cy_rebate_period_table` (
  `rebate_period_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '返佣金周期id',
  `rebate_period_name` varchar(255) NOT NULL COMMENT '返佣金周期名称',
  PRIMARY KEY (`rebate_period_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cy_rebate_period_table
-- ----------------------------
INSERT INTO `cy_rebate_period_table` VALUES ('1', '月结');
INSERT INTO `cy_rebate_period_table` VALUES ('2', '压批压月');
INSERT INTO `cy_rebate_period_table` VALUES ('3', '60天');
INSERT INTO `cy_rebate_period_table` VALUES ('4', '90天');
INSERT INTO `cy_rebate_period_table` VALUES ('5', '120天');

-- ----------------------------
-- Table structure for cy_user_info_table
-- ----------------------------
DROP TABLE IF EXISTS `cy_user_info_table`;
CREATE TABLE `cy_user_info_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(255) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `area_id` int(255) DEFAULT '0' COMMENT '区域id',
  `type` varchar(255) NOT NULL DEFAULT '0' COMMENT '管理员类型 0为普通权限；1为全部区域权限；2为超级管理员权限',
  `last_log` varchar(255) DEFAULT NULL COMMENT '上次登录时间',
  `login_times` bigint(20) DEFAULT '0' COMMENT '登录次数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cy_user_info_table
-- ----------------------------
INSERT INTO `cy_user_info_table` VALUES ('1', 'athoulen', '1113114', '0', '2', null, '0');
