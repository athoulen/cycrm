/*
Navicat MySQL Data Transfer

Source Server         : db
Source Server Version : 50717
Source Host           : 192.168.1.41:3306
Source Database       : cycrm

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-10-09 19:41:07
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
  PRIMARY KEY (`area_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

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
  PRIMARY KEY (`back_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of cy_back_info_table
-- ----------------------------
INSERT INTO `cy_back_info_table` VALUES ('1', '季度', '现金');
INSERT INTO `cy_back_info_table` VALUES ('2', '季度', '票折');
INSERT INTO `cy_back_info_table` VALUES ('3', '月结', '现金');
INSERT INTO `cy_back_info_table` VALUES ('4', '月结', '电汇');
INSERT INTO `cy_back_info_table` VALUES ('5', '季度', '电汇');

-- ----------------------------
-- Table structure for cy_back_period_table
-- ----------------------------
DROP TABLE IF EXISTS `cy_back_period_table`;
CREATE TABLE `cy_back_period_table` (
  `back_period_id` int(11) NOT NULL COMMENT '二级返利周期id',
  `back_period_name` varchar(255) NOT NULL COMMENT '二级返利周期名称',
  PRIMARY KEY (`back_period_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cy_back_period_table
-- ----------------------------

-- ----------------------------
-- Table structure for cy_back_style_table
-- ----------------------------
DROP TABLE IF EXISTS `cy_back_style_table`;
CREATE TABLE `cy_back_style_table` (
  `back_style_id` int(11) NOT NULL COMMENT '二级返利方式id',
  `back_style_name` varchar(255) NOT NULL COMMENT '二级返利形式名称',
  PRIMARY KEY (`back_style_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cy_back_style_table
-- ----------------------------

-- ----------------------------
-- Table structure for cy_business_flow_table
-- ----------------------------
DROP TABLE IF EXISTS `cy_business_flow_table`;
CREATE TABLE `cy_business_flow_table` (
  `flow_id` bigint(32) NOT NULL AUTO_INCREMENT COMMENT '商业流向id',
  `sold_unit_id` varchar(32) NOT NULL COMMENT '销售单位id',
  `accept_unit_id` varchar(32) NOT NULL COMMENT '接收单位id',
  `customer_id` varchar(32) DEFAULT NULL COMMENT '客户ID',
  `product_id` varchar(32) NOT NULL COMMENT '产品id',
  `batch_no` varchar(32) NOT NULL COMMENT '批号',
  `sold_date` varchar(30) DEFAULT NULL COMMENT '出售日期',
  `sold_year` varchar(10) DEFAULT NULL COMMENT '出售年份',
  `sold_month` varchar(10) DEFAULT NULL COMMENT '出售月份',
  `file_type` varchar(10) DEFAULT NULL COMMENT '文件类型(1-国控 2-华润 3-九州通)',
  `allocate_goods_num` int(11) DEFAULT NULL COMMENT '调货数量',
  `sold_goods_num` int(11) DEFAULT NULL COMMENT '销售数量',
  `sold_price` decimal(10,2) DEFAULT NULL COMMENT '销售价格',
  `allocate_price` decimal(10,2) DEFAULT NULL COMMENT '调拨价格',
  `sold_money` decimal(10,2) DEFAULT NULL COMMENT '销售金额',
  `flow_flag` char(2) DEFAULT NULL COMMENT '流向标志,01-一级流向, 02-二级流向',
  `is_terminal` char(1) DEFAULT NULL COMMENT '是否终端(0-否 1-是)',
  `department` varchar(255) DEFAULT NULL COMMENT '部门',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `create_time` varchar(255) DEFAULT NULL COMMENT '创建时间',
  `update_time` varchar(255) DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`flow_id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cy_business_flow_table
-- ----------------------------
INSERT INTO `cy_business_flow_table` VALUES ('49', '5', '4', '3', '10', '170131/3', '2017-07-01 09:40:53', '2017', '7', '1', null, '30', '54.00', '54.00', '84.00', '01', '1', '商务部', null, '2017-10-14 15:19:19', '2017-10-14 15:19:19');
INSERT INTO `cy_business_flow_table` VALUES ('50', '5', '4', '3', '10', '170131/3', '2017-07-05 10:06:13', '2017', '7', '1', null, '50', '54.00', '54.00', '104.00', '01', '1', '商务部', null, '2017-10-14 15:19:19', '2017-10-14 15:19:19');
INSERT INTO `cy_business_flow_table` VALUES ('51', '5', '4', '4', '11', 'L17E021', '2017-07-10 08:56:37', '2017', '7', '1', null, '30', '24.86', '24.86', '54.86', '01', '1', '商务部', null, '2017-10-14 15:19:19', '2017-10-14 15:19:19');
INSERT INTO `cy_business_flow_table` VALUES ('52', '5', '4', '4', '11', 'L17E281', '2017-07-13 14:46:07', '2017', '7', '1', null, '20', '24.86', '24.86', '44.86', '01', '1', '商务部', null, '2017-10-14 15:19:19', '2017-10-14 15:19:19');
INSERT INTO `cy_business_flow_table` VALUES ('53', '5', '4', '4', '11', 'L17E281', '2017-07-25 08:50:02', '2017', '7', '1', null, '30', '24.86', '24.86', '54.86', '01', '1', '商务部', null, '2017-10-14 15:19:19', '2017-10-14 15:19:19');
INSERT INTO `cy_business_flow_table` VALUES ('54', '5', '4', '3', '10', '170131/3', '2017-07-25 09:01:20', '2017', '7', '1', null, '50', '54.00', '54.00', '104.00', '01', '1', '商务部', null, '2017-10-14 15:19:19', '2017-10-14 15:19:19');
INSERT INTO `cy_business_flow_table` VALUES ('55', '5', '4', '4', '11', 'L17E281', '2017-07-26 16:36:28', '2017', '7', '1', null, '30', '24.86', '24.86', '54.86', '01', '1', '商务部', null, '2017-10-14 15:19:19', '2017-10-14 15:19:19');
INSERT INTO `cy_business_flow_table` VALUES ('56', '4', '5', null, '10', '170131/3', '2017-07-03 08:47:50', '2017', '7', '1', '100', null, '54.00', '50.18', '54.00', '01', '0', '商务部', null, '2017-10-14 15:19:19', '2017-10-14 15:19:19');
INSERT INTO `cy_business_flow_table` VALUES ('57', '4', '5', null, '11', 'L17E281', '2017-07-12 17:05:58', '2017', '7', '1', '350', null, '24.86', '23.40', '24.86', '01', '0', '商务部', null, '2017-10-14 15:19:19', '2017-10-14 15:19:19');
INSERT INTO `cy_business_flow_table` VALUES ('58', '4', '5', null, '11', 'L17E281', '2017-07-25 08:43:30', '2017', '7', '1', '50', null, '24.86', '23.40', '24.86', '01', '0', '商务部', null, '2017-10-14 15:19:19', '2017-10-14 15:19:19');
INSERT INTO `cy_business_flow_table` VALUES ('59', '4', '5', null, '11', 'L17E281', '2017-07-27 17:01:00', '2017', '7', '1', '300', null, '24.86', '23.40', '24.86', '01', '0', '商务部', null, '2017-10-14 15:19:19', '2017-10-14 15:19:19');


-- ----------------------------
-- Table structure for cy_impfile_record_table
-- ----------------------------
DROP TABLE IF EXISTS `cy_impfile_record_table`;
CREATE TABLE `cy_impfile_record_table` (
  `imp_year` varchar(4) NOT NULL COMMENT '导入年度',
  `imp_month` varchar(2) NOT NULL COMMENT '导入月份',
  `file_type` varchar(32) NOT NULL COMMENT '文件类型(1-国控 2-华润 3-九州通)',
  `file_name` varchar(255) DEFAULT NULL COMMENT '文件名',
  PRIMARY KEY (`imp_year`,`imp_month`,`file_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cy_impfile_record_table
-- ----------------------------
INSERT INTO `cy_impfile_record_table` VALUES ('2017', '7', '1', '国控海王一级 - copy.xls');

-- ----------------------------
-- Table structure for cy_city_info_table
-- ----------------------------
DROP TABLE IF EXISTS `cy_city_info_table`;
CREATE TABLE `cy_city_info_table` (
  `city_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '地市id',
  `area_id` int(11) DEFAULT NULL COMMENT '大区id',
  `city_name` varchar(255) DEFAULT NULL COMMENT '地市名称',
  `desc` varchar(255) DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`city_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

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
-- Table structure for cy_customer_protocol_table
-- ----------------------------
DROP TABLE IF EXISTS `cy_customer_protocol_table`;
CREATE TABLE `cy_customer_protocol_table` (
  `protocol_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '协议id',
  `protocol_code` varchar(255) DEFAULT NULL,
  `customer_id` int(11) NOT NULL COMMENT '客户ID',
  `area_id` int(11) NOT NULL COMMENT '大区ID',
  `city_id` int(11) NOT NULL COMMENT '地市ID',
  `upper_merchan` int(255) DEFAULT NULL COMMENT '一级商业ID',
  `lower_merchan` int(11) DEFAULT NULL COMMENT '二级商业ID',
  `hospital_id` int(11) NOT NULL COMMENT '医院id',
  `product_id` int(255) NOT NULL COMMENT '药品ID',
  `sale_price` decimal(10,2) DEFAULT NULL COMMENT '销售单价',
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
  PRIMARY KEY (`protocol_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of cy_customer_protocol_table
-- ----------------------------
INSERT INTO `cy_customer_protocol_table` VALUES ('1', null, '1', '1', '5', '1', '5', '1', '1', '0.00', '18.60', '5000.00', null, '19.60', '1', '2000', '2', '1', '3.60', '1', '2313465464', '12312464644', '1', '1', 'admin', '135646461651', null, null);
INSERT INTO `cy_customer_protocol_table` VALUES ('2', null, '1', '1', '2', '1', '2', '1', '2', '0.00', '20.52', '5000.00', '', '21.31', '1', '2000', '3', '1', '12.83', '0', '7643220654', '7643220654', '1', '0', 'null', '1506865450328', 'null', '1506906657714');
INSERT INTO `cy_customer_protocol_table` VALUES ('3', null, '1', '1', '2', '1', '2', '1', '2', '0.00', '20.52', '5000.00', '', '21.31', '1', '2000', '3', '1', '12.83', '0', '7643220654', '7643220654', '1', '1', 'null', '1506906807330', null, null);
INSERT INTO `cy_customer_protocol_table` VALUES ('4', 'Y-019', '3', '3', '10', '4', '5', '4', '10', '54.00', '9.74', '0.00', null, '10.00', '1', '2000', '3', '1', '2.88', '0', '1506176500932', '1506676500932', '1', '1', 'admin', '1506176500932', null, null);
INSERT INTO `cy_customer_protocol_table` VALUES ('5', 'Y-137', '4', '3', '10', '4', '5', '4', '11', '24.86', '9.56', '0.00', null, '10.00', '1', '2000', '3', '1', '1.99', '0', '1506176500932', '1506676500932', '1', '1', 'admin', '1506176500932', null, null);

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
  PRIMARY KEY (`customer_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of cy_customer_table
-- ----------------------------
INSERT INTO `cy_customer_table` VALUES ('1', 'Y-001', '阿兰', '131222', '招商银行', '阿兰', '1234564', null, '1', 'admin', '2132142414', null, null);
INSERT INTO `cy_customer_table` VALUES ('2', 'Y-002', '德龙A', '18661828126', '工商银行', '李德龙', '123456467162', 'vip商户', '1', 'admin', '1506176500932', 'admin', null);
INSERT INTO `cy_customer_table` VALUES ('3', 'Y-019', '杨小东', '13803968299', '工商银行', '杨小东', '6222106243010927', null, '1', 'admin', '1506176500932', null, null);
INSERT INTO `cy_customer_table` VALUES ('4', 'Y-137', '王宝康', '18137633499', '工商银行', '赵淑婷', '6222021715001648189', null, '1', 'admin', '1506176500932', null, null);

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
  PRIMARY KEY (`hospital_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of cy_hospital_table
-- ----------------------------
INSERT INTO `cy_hospital_table` VALUES ('1', '商丘市人民医院', '1', null, null, 'admin', '121346789754', null, null);
INSERT INTO `cy_hospital_table` VALUES ('2', '郑州市人民医院', '1', '5', '18', 'admin', '1506157205758', null, null);
INSERT INTO `cy_hospital_table` VALUES ('3', '大大区人民医院', '1', '5', '18', 'admin', '1506157952168', null, null);
INSERT INTO `cy_hospital_table` VALUES ('4', '驻马店市中心医院', '1', '3', '10', 'admin', '1506157952168', null, null);

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
  `up_merchan` int(11) DEFAULT NULL COMMENT '一级商业ID',
  `lo_merchan` int(255) DEFAULT NULL COMMENT '二级商业ID',
  `hospital_id` int(11) NOT NULL COMMENT '终端医院id',
  `up_back` double(255,0) NOT NULL COMMENT '一级返利',
  `lo_back` double(255,0) NOT NULL COMMENT '二级返利',
  `back_period_style` int(255) NOT NULL COMMENT '返利周期  从cy_back_info_table中获取',
  `start_time` varchar(255) NOT NULL COMMENT '协议生效时间',
  `end_time` varchar(255) NOT NULL COMMENT '协议终止时间',
  `contactor` varchar(255) DEFAULT NULL COMMENT '返利联系人',
  `phone` varchar(255) DEFAULT NULL COMMENT '联系电话',
  `qq` varchar(255) DEFAULT NULL COMMENT 'QQ号码',
  `is_valid` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否可用 1、可用 0、不可用',
  `create_by` varchar(255) DEFAULT NULL COMMENT '创建人',
  `create_time` varchar(255) NOT NULL COMMENT '创建时间',
  `update_by` varchar(255) DEFAULT NULL COMMENT '修改人',
  `update_time` varchar(255) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`protocol_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of cy_merchandiser_protocol_table
-- ----------------------------
INSERT INTO `cy_merchandiser_protocol_table` VALUES ('3', 'CY-1001', '1', '2', '8', '38.52', '1', '2', '3', '9', '12', '1', '151021234564', '151021234564', '王文林', '13867237251', '7643220654', '1', null, '1506767606656', null, null);
INSERT INTO `cy_merchandiser_protocol_table` VALUES ('4', 'CY-1002', '2', '2', '8', '38.52', '1', '2', '3', '9', '12', '1', '151021234564', '151021234564', '王文林', '13867237251', '7643220654', '1', null, '1506853253788', null, '1506856464794');
INSERT INTO `cy_merchandiser_protocol_table` VALUES ('5', 'CY-1003', '3', '2', '8', '38.52', '1', '2', '2', '9', '12', '1', '151021234564', '151021234564', '王文林', '13867237251', '7643220654', '1', null, '1506855845124', null, null);

-- ----------------------------
-- Table structure for cy_merchandiser_table
-- ----------------------------
DROP TABLE IF EXISTS `cy_merchandiser_table`;
CREATE TABLE `cy_merchandiser_table` (
  `merch_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商业公司id',
  `name` varchar(255) NOT NULL COMMENT '名称',
  `class_type` int(255) NOT NULL COMMENT '级别  1、一级商业  2、国有二级商业  3、非国有二级商业',
  `desc` varchar(255) DEFAULT NULL COMMENT '描述',
  `create_by` varchar(255) NOT NULL COMMENT '创建人',
  `create_time` varchar(255) NOT NULL COMMENT '创建时间',
  `update_by` varchar(255) DEFAULT NULL COMMENT '修改人',
  `update_time` varchar(255) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`merch_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of cy_merchandiser_table
-- ----------------------------
INSERT INTO `cy_merchandiser_table` VALUES ('1', '九州通河南有限公司', '1', '九州通河南', 'admin', '1506425747781', null, null);
INSERT INTO `cy_merchandiser_table` VALUES ('2', '九州通开封有限公司', '2', '九州通开封', 'admin', '1506426459592', null, null);
INSERT INTO `cy_merchandiser_table` VALUES ('3', '临客药业有限公司', '3', '临客药业', 'admin', '1506426499824', null, null);
INSERT INTO `cy_merchandiser_table` VALUES ('4', '国药控股河南股份有限公司', '1', '国控河南', 'admin', '1506426499824', null, null);
INSERT INTO `cy_merchandiser_table` VALUES ('5', '国药控股驻马店有限公司', '2', '国控驻马店', 'admin', '1506426499824', null, null);

-- ----------------------------
-- Table structure for cy_product_table
-- ----------------------------
DROP TABLE IF EXISTS `cy_product_table`;
CREATE TABLE `cy_product_table` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '产品id',
  `product_name` varchar(255) NOT NULL COMMENT '产品名称',
  `product_norms` varchar(255) NOT NULL COMMENT '产品规格',
  `product_price` decimal(10,2) NOT NULL COMMENT '产品价格',
  `manufacture` varchar(255) DEFAULT NULL COMMENT '制造厂名称',
  PRIMARY KEY (`product_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of cy_product_table
-- ----------------------------
INSERT INTO `cy_product_table` VALUES ('1', '草乌甲素片', '0.4mg*12s', '0.00', '昆明中药');
INSERT INTO `cy_product_table` VALUES ('2', '宫炎平片', '0.26g*48片', '0.00', '昆明中药');
INSERT INTO `cy_product_table` VALUES ('3', '醋酸钙颗粒', '0.2g*20袋', '0.00', '贵州人和');
INSERT INTO `cy_product_table` VALUES ('4', '复方风湿宁胶囊', '0.3g*60S', '0.00', '武汉百灵');
INSERT INTO `cy_product_table` VALUES ('5', '银盏心脉滴丸', '25mg*150s', '0.00', '豫西制药');
INSERT INTO `cy_product_table` VALUES ('6', '贞芪扶正胶囊', '12.5g/6S*66S', '0.00', '贵州人和');
INSERT INTO `cy_product_table` VALUES ('7', '葛酮通络胶囊', '0.25g*12s', '0.00', '昆明中药');
INSERT INTO `cy_product_table` VALUES ('8', '草乌甲素片', '0.5mg*12s', '0.00', '昆明中药');
INSERT INTO `cy_product_table` VALUES ('9', '葛酮通络胶囊', '0.4g*12粒', '0.00', '安徽九方');
INSERT INTO `cy_product_table` VALUES ('10', '草乌甲素片', '0.4mg*6T*3板', '54.00', '云南昊邦制药有限公司');
INSERT INTO `cy_product_table` VALUES ('11', '宫炎平片', '0.26g*48T', '24.86', '广东罗浮山国药股份有限公司(原广东罗浮山国药有限公司)');

-- ----------------------------
-- Table structure for cy_rebate_period_table
-- ----------------------------
DROP TABLE IF EXISTS `cy_rebate_period_table`;
CREATE TABLE `cy_rebate_period_table` (
  `rebate_period_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '返佣金周期id',
  `rebate_period_name` varchar(255) NOT NULL COMMENT '返佣金周期名称',
  PRIMARY KEY (`rebate_period_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

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
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of cy_user_info_table
-- ----------------------------
INSERT INTO `cy_user_info_table` VALUES ('1', 'athoulen', '1113114', '0', '2', null, '0');
