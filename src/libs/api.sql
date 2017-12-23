-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2017-12-23 09:44:55
-- 服务器版本： 5.5.53
-- PHP Version: 7.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `api`
--

-- --------------------------------------------------------

--
-- 表的结构 `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `nickname` varchar(50) NOT NULL,
  `access_token` varchar(32) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `password_reset_token` varchar(255) DEFAULT NULL,
  `status` smallint(6) NOT NULL DEFAULT '10',
  `login_ip` int(11) NOT NULL DEFAULT '0' COMMENT '最后登入IP',
  `login_time` int(11) NOT NULL DEFAULT '0' COMMENT '最后登入时间',
  `avatar` varchar(100) NOT NULL COMMENT '头像地址',
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `admin`
--

INSERT INTO `admin` (`id`, `email`, `nickname`, `access_token`, `password_hash`, `password_reset_token`, `status`, `login_ip`, `login_time`, `avatar`, `created_at`, `updated_at`) VALUES
(1, '75386834@qq.com', '可爱的大中盛6', '4H1VYC8CTTtsRyQ9M1672Y037ZIQNZZv', '$2y$13$cnwvnaQKShd/NxR43Yvpb.4SBd4BXPCWDskCPQ8V.n4qBsOYFnnh.', NULL, 10, 127, 1514012737, 'http://imagescloud.muntime.com/FlPtknU3Fpvk55RV39wOD1sgVHMg?imageView2/1/w/100/h/100/', 1497953610, 1514012737),
(15, 'a07@qq.com', 'a07@qq.com', '', '$2y$13$16m/ihXTnkFsCr4icKL5r.V9tS8q9OcVKez98DJPqA4xGTSly9CQK', NULL, 10, 0, 0, '', 1512811094, 1512811094),
(16, 'a08@qq.com', 'a08@qq.com', '', '$2y$13$/KXdDjRuCOEmqB5giJeaduoPuA5IRJ2HgaSUq.atGmApEV7dvALNS', NULL, 10, 0, 0, '', 1512811103, 1512811103),
(17, 'a09@qq.com', 'a09@qq.com', '', '$2y$13$Dlhhxsyzhd1Onv1kzn4q4uQTVP5NVv25yy3/eX3.bLLCkspV0W1Jy', NULL, 10, 0, 0, '', 1512811113, 1512811113),
(18, 'a10@qq.com', 'a10@qq.com', '', '$2y$13$0USTw1WPNZeBQAJJnomysePj4Dhit02ihG9BcM/tLqK4lGlkNn2me', NULL, 10, 0, 0, '', 1512811124, 1512811124),
(19, 'a1222222222222222222@qq.com', 'a11@qq.com', '', '$2y$13$5kM6TRyuHTtrH.WgapJl.ezz2h7M./P7LrnUOb.rRTgFCqtQiq.FC', NULL, 10, 0, 0, '', 1512811134, 1512815180),
(20, 'a12@qq.com', 'a12@qq.com', '', '$2y$13$agdInROBNpsghVw0HmbMIeWn0jyRX29K/ehi51um5Sd9KGUoSxcaG', NULL, 10, 0, 0, '', 1512811146, 1512811146),
(21, 'a13@qq.com', 'a13@qq.com', '', '$2y$13$R.zlhdnMdrLG/Jawz3E16uEYXlVvfQ0pGLGUT9fOv4WSoJGkzFh4S', NULL, 10, 0, 0, '', 1512811160, 1512811160),
(22, 'a14@qq.com', 'a14@qq.com', '', '$2y$13$j2EytWK0dO4dHlJIaj7rvuo7kKtxJGs3g3v7sbhkejxabJeSNuqmK', NULL, 10, 0, 0, '', 1512811170, 1512811170),
(23, 'a15@qq.com', 'a15@qq.com', '', '$2y$13$4Qunnpi6eS3sDIKjnbRau.WXBktmPNrJZEoiquBSNZQIybIU2QWd6', NULL, 10, 0, 0, '', 1512811184, 1512811184);

-- --------------------------------------------------------

--
-- 表的结构 `assign`
--

DROP TABLE IF EXISTS `assign`;
CREATE TABLE `assign` (
  `aid` int(11) DEFAULT NULL,
  `rid` int(11) NOT NULL DEFAULT '0' COMMENT '角色ID',
  `pid` int(11) DEFAULT NULL COMMENT '权限ID'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='管理员角色关联表';

--
-- 转存表中的数据 `assign`
--

INSERT INTO `assign` (`aid`, `rid`, `pid`) VALUES
(NULL, 2, 4),
(NULL, 2, 5),
(NULL, 2, 6),
(NULL, 1, 1),
(NULL, 1, 2),
(NULL, 1, 4),
(NULL, 1, 5),
(NULL, 1, 6),
(NULL, 1, 3);

-- --------------------------------------------------------

--
-- 表的结构 `page`
--

DROP TABLE IF EXISTS `page`;
CREATE TABLE `page` (
  `id` smallint(5) UNSIGNED NOT NULL COMMENT 'ID',
  `catname` varchar(50) DEFAULT NULL,
  `title` varchar(100) NOT NULL COMMENT '标题',
  `content` text COMMENT '内容',
  `status` tinyint(4) DEFAULT NULL COMMENT '状态',
  `seo_title` varchar(100) NOT NULL COMMENT 'SEO标题',
  `seo_keywords` varchar(100) NOT NULL COMMENT '关键词',
  `seo_description` varchar(100) NOT NULL COMMENT '描述',
  `created_at` int(10) UNSIGNED NOT NULL COMMENT '添加时间',
  `updated_at` int(10) UNSIGNED NOT NULL COMMENT '修改时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='单页';

--
-- 转存表中的数据 `page`
--

INSERT INTO `page` (`id`, `catname`, `title`, `content`, `status`, `seo_title`, `seo_keywords`, `seo_description`, `created_at`, `updated_at`) VALUES
(1, 'about', '关于我们', '关于我们......', NULL, '关于我们', '关于我们', '关于我们', 1500000000, 1500000000),
(3, 'phone', '联系我们', '联系我们。。。', NULL, '联系我们', '联系我们', '联系我们', 1500000000, 1500000000);

-- --------------------------------------------------------

--
-- 表的结构 `permission`
--

DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission` (
  `id` int(11) NOT NULL COMMENT '权限ID',
  `name` varchar(50) NOT NULL COMMENT '权限名称',
  `title` varchar(50) NOT NULL COMMENT '权限标题',
  `description` varchar(50) NOT NULL COMMENT '权限描述',
  `created_at` int(11) NOT NULL COMMENT '创建时间',
  `updated_at` int(11) NOT NULL COMMENT '修改时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色表';

--
-- 转存表中的数据 `permission`
--

INSERT INTO `permission` (`id`, `name`, `title`, `description`, `created_at`, `updated_at`) VALUES
(1, 'admin/*', '管理员设置', '管理员设置所有权限', 1513496501, 1513496761),
(2, 'role/*', '角色管理', '角色管理所有权限', 1513496668, 1513496751),
(3, 'permission/*', '权限设置', '权限设置所有权限', 1513496740, 1513496740),
(4, 'auth/*', '核心权限', '用户核心所有权限', 1513497565, 1513590074),
(5, 'admin/profile', '个人中心', '个人中心权限', 1513499450, 1513499450),
(6, 'admin/password', '修改密码', '修改密码权限', 1513499480, 1513499480);

-- --------------------------------------------------------

--
-- 表的结构 `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` tinyint(4) NOT NULL COMMENT '角色ID',
  `name` varchar(50) NOT NULL COMMENT '角色名称',
  `description` varchar(100) NOT NULL COMMENT '角色描述',
  `created_at` int(11) NOT NULL COMMENT '创建时间',
  `updated_at` int(11) NOT NULL COMMENT '修改时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色表';

--
-- 转存表中的数据 `role`
--

INSERT INTO `role` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, '超级管理员', '拥有所有权限', 1513408103, 1513408103),
(2, '普通用户', '普通权限', 1513408113, 1513490123);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`nickname`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `password_reset_token` (`password_reset_token`);

--
-- Indexes for table `assign`
--
ALTER TABLE `assign`
  ADD KEY `rid` (`rid`),
  ADD KEY `aid` (`aid`),
  ADD KEY `pid` (`pid`);

--
-- Indexes for table `page`
--
ALTER TABLE `page`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `catname` (`catname`);

--
-- Indexes for table `permission`
--
ALTER TABLE `permission`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- 使用表AUTO_INCREMENT `page`
--
ALTER TABLE `page`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID', AUTO_INCREMENT=4;
--
-- 使用表AUTO_INCREMENT `permission`
--
ALTER TABLE `permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '权限ID', AUTO_INCREMENT=7;
--
-- 使用表AUTO_INCREMENT `role`
--
ALTER TABLE `role`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT COMMENT '角色ID', AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
