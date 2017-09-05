/*
Navicat MySQL Data Transfer

Source Server         : cycrm
Source Server Version : 50716
Source Host           : localhost:3306
Source Database       : cycrm

Target Server Type    : MYSQL
Target Server Version : 50716
File Encoding         : 65001

Date: 2017-09-05 18:06:00
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
-- Table structure for cy_user_info_table
-- ----------------------------
DROP TABLE IF EXISTS `cy_user_info_table`;
CREATE TABLE `cy_user_info_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `area_code` int(255) DEFAULT '0',
  `type` varchar(255) NOT NULL COMMENT '管理员类型 0为普通权限；1为全部区域权限；2为超级管理员权限',
  `last_log` varchar(255) DEFAULT NULL COMMENT '上次登录时间',
  `login_times` bigint(20) DEFAULT '0' COMMENT '登录次数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cy_user_info_table
-- ----------------------------
INSERT INTO `cy_user_info_table` VALUES ('1', 'athoulen', '1113114', '0', '2', null, '0');
