-- -------------------------------------------------------------
-- TablePlus 3.5.3(314)
--
-- https://tableplus.com/
--
-- Database: moviebay
-- Generation Time: 2020-06-03 21:20:43.4470
-- -------------------------------------------------------------


DROP TABLE IF EXISTS "public"."cms_celebrity";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS cms_celebrity_id_seq;

-- Table Definition
CREATE TABLE "public"."cms_celebrity" (
    "id" int4 NOT NULL DEFAULT nextval('cms_celebrity_id_seq'::regclass),
    "name" varchar NOT NULL,
    "avatar" varchar,
    "intro" varchar NOT NULL,
    "gender" varchar NOT NULL,
    "birthday" timestamp NOT NULL,
    "birthplace" varchar NOT NULL,
    "professions" varchar NOT NULL,
    "constellation" varchar NOT NULL,
    "photos" varchar,
    "works" varchar,
    "created_at" timestamp NOT NULL,
    "created_by" varchar NOT NULL,
    "updated_at" timestamp,
    "updated_by" varchar,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."cms_comment";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS cms_comment_id_seq;

-- Table Definition
CREATE TABLE "public"."cms_comment" (
    "id" int4 NOT NULL DEFAULT nextval('cms_comment_id_seq'::regclass),
    "pid" int4 NOT NULL,
    "author" varchar NOT NULL,
    "link" varchar NOT NULL,
    "email" varchar NOT NULL,
    "agent" varchar NOT NULL,
    "content" varchar NOT NULL,
    "url" varchar NOT NULL,
    "approved" bool NOT NULL,
    "created_at" timestamp NOT NULL,
    "created_by" varchar NOT NULL,
    "updated_at" timestamp,
    "updated_by" varchar,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."cms_comment_meta";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS cms_comment_meta_id_seq;

-- Table Definition
CREATE TABLE "public"."cms_comment_meta" (
    "id" int4 NOT NULL DEFAULT nextval('cms_comment_meta_id_seq'::regclass),
    "comment_id" varchar NOT NULL,
    "meta_key" varchar NOT NULL,
    "meta_val" varchar NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."cms_episode";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS cms_episode_id_seq;

-- Table Definition
CREATE TABLE "public"."cms_episode" (
    "id" int4 NOT NULL DEFAULT nextval('cms_episode_id_seq'::regclass),
    "imdb_id" varchar NOT NULL,
    "name" varchar NOT NULL,
    "src" varchar NOT NULL,
    "season" int4 NOT NULL,
    "episode" int4 NOT NULL,
    "release_season" int4 NOT NULL,
    "release_episode" int4 NOT NULL,
    "created_at" timestamp NOT NULL,
    "created_by" varchar NOT NULL,
    "updated_at" timestamp,
    "updated_by" varchar,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."cms_link";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS cms_link_id_seq;

-- Table Definition
CREATE TABLE "public"."cms_link" (
    "id" int4 NOT NULL DEFAULT nextval('cms_link_id_seq'::regclass),
    "url" varchar NOT NULL,
    "title" varchar NOT NULL,
    "image" varchar NOT NULL,
    "target" varchar NOT NULL,
    "notes" varchar NOT NULL,
    "visible" bool NOT NULL,
    "rss" varchar NOT NULL,
    "created_at" timestamp NOT NULL,
    "created_by" varchar NOT NULL,
    "updated_at" timestamp,
    "updated_by" varchar,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."cms_video";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS cms_video_id_seq;

-- Table Definition
CREATE TABLE "public"."cms_video" (
    "id" int4 NOT NULL DEFAULT nextval('cms_video_id_seq'::regclass),
    "name" varchar NOT NULL,
    "title" varchar NOT NULL,
    "aka" _varchar NOT NULL,
    "year" int4 NOT NULL,
    "released" int8 NOT NULL,
    "runtime" int4 NOT NULL,
    "status" bit NOT NULL,
    "type" varchar NOT NULL,
    "src" varchar NOT NULL,
    "tags" _varchar NOT NULL,
    "genres" _varchar NOT NULL,
    "countries" _varchar NOT NULL,
    "languages" _varchar NOT NULL,
    "directors" _varchar NOT NULL,
    "writers" _varchar NOT NULL,
    "actors" _varchar NOT NULL,
    "subtitles" _varchar,
    "plot" text NOT NULL,
    "poster" varchar NOT NULL,
    "poster_thumb" varchar NOT NULL,
    "poster_slide" varchar,
    "imdb_id" varchar NOT NULL,
    "imdb_rating" numeric(2,1) NOT NULL,
    "created_at" timestamp NOT NULL,
    "created_by" varchar NOT NULL,
    "updated_at" timestamp,
    "updated_by" varchar,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."cms_video_meta";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS cms_video_meta_id_seq;

-- Table Definition
CREATE TABLE "public"."cms_video_meta" (
    "id" int4 NOT NULL DEFAULT nextval('cms_video_meta_id_seq'::regclass),
    "vod_id" varchar NOT NULL,
    "meta_key" varchar NOT NULL,
    "meta_val" varchar NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."cms_visit";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS cms_visit_id_seq;

-- Table Definition
CREATE TABLE "public"."cms_visit" (
    "id" int4 NOT NULL DEFAULT nextval('cms_visit_id_seq'::regclass),
    "times" int4 NOT NULL,
    "title" varchar NOT NULL,
    "url" varchar NOT NULL,
    "created_at" timestamp NOT NULL,
    "created_by" varchar NOT NULL,
    "updated_at" timestamp,
    "updated_by" varchar,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."sys_auth";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS sys_auth_id_seq;

-- Table Definition
CREATE TABLE "public"."sys_auth" (
    "id" int4 NOT NULL DEFAULT nextval('sys_auth_id_seq'::regclass),
    "username" varchar NOT NULL,
    "device" varchar,
    "refresh_token" varchar NOT NULL,
    "created_at" timestamp NOT NULL,
    "expired_at" timestamp NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."sys_dict";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS sys_dict_id_seq;

-- Table Definition
CREATE TABLE "public"."sys_dict" (
    "id" int4 NOT NULL DEFAULT nextval('sys_dict_id_seq'::regclass),
    "label" varchar NOT NULL,
    "value" varchar NOT NULL,
    "seq" int4 NOT NULL,
    "tag" varchar NOT NULL,
    "remark" varchar NOT NULL,
    "created_at" timestamp NOT NULL,
    "created_by" varchar NOT NULL,
    "updated_at" timestamp,
    "updated_by" varchar,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."sys_perm";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS sys_perm_id_seq;

-- Table Definition
CREATE TABLE "public"."sys_perm" (
    "id" int4 NOT NULL DEFAULT nextval('sys_perm_id_seq'::regclass),
    "code" varchar NOT NULL,
    "name" varchar NOT NULL,
    "type" varchar NOT NULL,
    "icon" varchar,
    "url" varchar,
    "seq" int4 NOT NULL,
    "is_parent" bit NOT NULL,
    "pid" int4,
    "created_at" timestamp NOT NULL,
    "created_by" varchar NOT NULL,
    "updated_at" timestamp,
    "updated_by" varchar,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."sys_role";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS sys_role_id_seq;

-- Table Definition
CREATE TABLE "public"."sys_role" (
    "id" int4 NOT NULL DEFAULT nextval('sys_role_id_seq'::regclass),
    "code" varchar NOT NULL,
    "name" varchar NOT NULL,
    "remark" varchar,
    "created_at" timestamp NOT NULL,
    "created_by" varchar NOT NULL,
    "updated_at" timestamp,
    "updated_by" varchar,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."sys_role_perm";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."sys_role_perm" (
    "role_id" int4 NOT NULL,
    "perm_id" int4 NOT NULL,
    PRIMARY KEY ("role_id","perm_id")
);

DROP TABLE IF EXISTS "public"."sys_user";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS sys_user_id_seq;

-- Table Definition
CREATE TABLE "public"."sys_user" (
    "id" int4 NOT NULL DEFAULT nextval('sys_user_id_seq'::regclass),
    "username" varchar NOT NULL,
    "password" varchar NOT NULL,
    "nickname" varchar,
    "salt" varchar,
    "phone" varchar,
    "email" varchar,
    "avatar" varchar,
    "activated" bool NOT NULL,
    "activation_key" varchar,
    "reset_key" varchar,
    "reset_date" timestamp,
    "created_at" timestamp NOT NULL,
    "created_by" varchar NOT NULL,
    "updated_at" timestamp,
    "updated_by" varchar,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."sys_user_meta";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS sys_user_meta_id_seq;

-- Table Definition
CREATE TABLE "public"."sys_user_meta" (
    "id" int4 NOT NULL DEFAULT nextval('sys_user_meta_id_seq'::regclass),
    "user_id" varchar NOT NULL,
    "meta_key" varchar NOT NULL,
    "meta_val" varchar NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."sys_user_role";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."sys_user_role" (
    "user_id" int4 NOT NULL,
    "role_id" int4 NOT NULL,
    PRIMARY KEY ("user_id","role_id")
);

INSERT INTO "public"."cms_video" ("id", "name", "title", "aka", "year", "released", "runtime", "status", "type", "src", "tags", "genres", "countries", "languages", "directors", "writers", "actors", "subtitles", "plot", "poster", "poster_thumb", "poster_slide", "imdb_id", "imdb_rating", "created_at", "created_by", "updated_at", "updated_by") VALUES
('45', 'The Shawshank Redemption', '肖申克的救赎', '{月黑高飞(港),刺激1995(台)}', '1994', '19941014', '142', '1', 'movie', 'https://diskapp-my.sharepoint.com/personal/moviebay_diskapp_onmicrosoft_com/_layouts/15/download.aspx?share=EeEkdno_jrBLg14yKTZLitcBfO9J3RpYEW6jYlIR5AqFNg', '{720P,HD}', '{drama,crime}', '{美国}', '{英语}', '{弗兰克·德拉邦特}', '{弗兰克·德拉邦特,斯蒂芬·金}', '{蒂姆·罗宾斯,摩根·弗里曼,鲍勃·冈顿,威廉姆·赛德勒}', NULL, '20世纪40年代末，小有成就的青年银行家安迪（蒂姆·罗宾斯 Tim Robbins 饰）因涉嫌杀害妻子及她的情人而锒铛入狱。在这座名为肖申克的监狱内，希望似乎虚无缥缈，终身监禁的惩罚无疑注定了安迪接下来灰暗绝望的人生。未过多久，安迪尝试接近囚犯中颇有声望的瑞德（摩根·弗里曼 Morgan Freeman 饰），请求对方帮自己搞来小锤子。以此为契机，二人逐渐熟稔，安迪也仿佛在鱼龙混杂、罪恶横生、黑白混淆的牢狱中找到属于自己的求生之道。他利用自身的专业知识，帮助监狱管理层逃税、洗黑钱，同时凭借与瑞德的交往在犯人中间也渐渐受到礼遇。表面看来，他已如瑞德那样对那堵高墙从憎恨转变为处之泰然，但是对自由的渴望仍促使他朝着心中的希望和目标前进。而关于其罪行的真相，似乎更使这一切朝前推进了一步......', 'https://wx2.sbimg.cn/2020/05/31/the-shawshank-redemption-1994.md.jpg', 'https://wx2.sbimg.cn/2020/05/31/the-shawshank-redemption-1994.th.jpg', 'https://wx2.sbimg.cn/2020/05/31/the-shawshank-redemption-1994.jpg', 'tt0111161', '9.3', '2020-06-02 22:45:28.623', 'system', NULL, NULL),
('46', 'Drishyam', '误杀瞒天记', '{视觉,瞒天过海}', '2015', '20150731', '163', '1', 'movie', 'https://diskapp-my.sharepoint.com/personal/moviebay_diskapp_onmicrosoft_com/_layouts/15/download.aspx?share=EXCHMOc9WnFOg4KA9zJ4YGYBkGC9fnRW6hP391gYWjnddQ', '{720P,HD}', '{drama,crime,mystery}', '{印度}', '{印地语}', '{尼西卡特·卡马特}', '{乌皮德拉·塞德海耶}', '{阿贾耶·德乌干,施芮娅·萨兰,拉贾特·卡普尔,伊西塔·杜塔}', NULL, '生活在印度小镇的四口之家——父亲维杰（阿贾耶·德乌干饰）、母亲娜迪妮（施芮娅·萨兰饰）两个女儿安玖（伊西塔·杜塔饰）和安努（莫伦诺·贾达夫饰），幸福和乐的生活却被安玖的同学萨姆（Rishabh Chaddha饰）破坏。安玖参加野营认识了男同学萨姆，他偷拍安玖的裸照并意图威胁强奸，安玖错手杀死了这位要挟她和她的母亲的不速之客。只读了小学四年级但沉迷于各种电影的父亲维杰把尸体埋了，并用电影里学来的反侦察手法和家人串口供、制造不在场证据和警察斗智斗勇......', 'https://wx1.sbimg.cn/2020/05/31/drishyam-2015.md.jpg', 'https://wx1.sbimg.cn/2020/05/31/drishyam-2015.th.jpg', 'https://wx1.sbimg.cn/2020/05/31/drishyam-2015.jpg', 'tt4430212', '8.2', '2020-06-02 22:45:28.623', 'system', NULL, NULL),
('47', '老男孩', '老男孩', '{11度青春之《老男孩》,"The bright eleven - Old Boys"}', '2010', '20101028', '42', '1', 'movie', 'https://diskapp-my.sharepoint.com/personal/moviebay_diskapp_onmicrosoft_com/_layouts/15/download.aspx?share=EW_kWieUAH5LiDeqjzYR44sB6BuVlT7vvc5xR9dfjWEoJA', '{720P,HD}', '{drama,comedy}', '{中国大陆}', '{汉语普通话}', '{肖央}', '{肖央}', '{肖央,王太利,韩秋池,于蓓蓓}', NULL, '故事发生在中学校园中，两个中学时的文艺爱好者——肖大宝（肖央饰）和王小帅（王太利饰）有着共同的苦闷，那就是被心仪的校花拒绝，后来两人因为对迈克尔·杰克逊的喜爱，成为了好朋友；多年后，他们一个当了婚礼主持，一个成为理发师，而迈克尔·杰克逊去世的消息，让人到中年的他们再拾青春梦，决定组成“筷子兄弟”乐队，作为最大龄的草根参加“欢乐男生”选秀比赛。一首《老男孩》让他们想起了曾经的青春岁月，并以此歌感动了评委，歌声和舞姿均受到肯定，虽然最终止步于50强，却对生活有了新的理解......', 'https://wx2.sbimg.cn/2020/05/31/old-boys-2010.jpg', 'https://wx2.sbimg.cn/2020/05/31/old-boys-2010.th.jpg', 'https://wx2.sbimg.cn/2020/05/31/old-boys-2010.jpg', 'tt10811140', '7.8', '2020-06-02 22:45:28.623', 'system', NULL, NULL),
('48', '2012', '2012', '{2012末日预言(港),2012世界末日,2012地球毁灭}', '2009', '20091113', '158', '1', 'movie', 'https://diskapp-my.sharepoint.com/personal/moviebay_diskapp_onmicrosoft_com/_layouts/15/download.aspx?share=EYQ62UNTXLhEixCbbjrqxFoB909TmLSz7ZSXGlkPUds2og', '{720P,HD}', '{action,fantasy,disaster,adventure}', '{美国,加拿大}', '{英语}', '{罗兰·艾默里奇}', '{罗兰·艾默里奇,哈洛德·克卢瑟}', '{约翰·库萨克,阿曼达·皮特,切瓦特·埃加福,坦迪·牛顿,奥利弗·普莱特}', NULL, '太阳活动异常，地球内部的能量平衡系统面临崩溃，玛雅人的预言即将实现，人类将遭遇灭顶之灾。各国政府已经联手开始秘密制造方舟，希望能躲过这一浩劫。以写科幻小说谋生的杰克逊（约翰·库萨克 John Cusack 饰）在带孩子们到黄石公园渡周末时发生一连串怪事，而且遇到了神经兮兮的查理（伍迪·哈里森 Woody Harrelson 饰)，查理告诉他世界末日即将来临。伴随着火山爆发，强烈地震以及海啸，杰克逊带领自己的家人驾驶一架临时租来的飞机冲出被死神阴霾瞬间笼罩的城市上空，开始寻找查理口中各国政府正在联合秘密制造的方舟。在生死攸关的时刻，一些伟大的鬼魂将脱颖而出，而一些自私的心灵将无所遁形，当千千万万个生灵通过各种方法来到方舟制造基地之时，方舟有限的容纳数量引发前所未有的恐慌。最终，仅存的人们用互爱和对生命的尊重渡过了难关......', 'https://wx1.sbimg.cn/2020/05/31/2012-2009.md.jpg', 'https://wx1.sbimg.cn/2020/05/31/2012-2009.th.jpg', 'https://wx1.sbimg.cn/2020/05/31/2012-2009.jpg', 'tt1190080', '5.8', '2020-06-02 22:45:28.623', 'system', NULL, NULL),
('49', '3 Idiots', '三傻大闹宝莱坞', '{三个白痴,"Three Idiots"}', '2009', '20091225', '171', '1', 'movie', 'https://diskapp-my.sharepoint.com/personal/moviebay_diskapp_onmicrosoft_com/_layouts/15/download.aspx?share=ET3FxMdb1-5BtL1yJst9FpAB-CpQOe646Cv0nClrHDh6uw', '{720P,HD}', '{drama,comedy,romance}', '{印度}', '{印地语}', '{拉吉库马尔·希拉尼}', '{维德胡·维诺德·乔普拉,拉吉库马尔·希拉尼,阿希贾特·乔希}', '{阿米尔·汗,卡琳娜·卡普尔,马达范,沙尔曼·乔希,奥米·瓦依达}', NULL, '本片根据印度畅销书作家奇坦·巴哈特（Chetan Bhagat）的处女作小说《五点人》（Five Point Someone）改编而成。法兰（马德哈万 R Madhavan 饰）、拉杜（沙曼·乔希 Sharman Joshi 饰）与兰乔（阿米尔·汗 Aamir Khan 饰）是皇家工程学院的学生，三人共居一室，结为好友。在以严格著称的学院里，兰乔是个非常与众不同的学生，他不死记硬背，甚至还公然顶撞校长“病毒”（波曼·伊拉尼 Boman Irani 饰），质疑他的教学方法。他不仅鼓动法兰与拉杜去勇敢追寻理想，还劝说校长的二女儿碧雅（卡琳娜·卡普 Kareena Kapoor 饰）离开满眼铜臭的未婚夫。兰乔的特立独行引起了模范学生“消音器”（奥米·维嘉 Omi Vaidya 饰）的不满，他约定十年后再与兰乔一决高下，看哪种生活方式更能取得成功......', 'https://wx1.sbimg.cn/2020/05/31/3-Idiots-2009.md.jpg', 'https://wx1.sbimg.cn/2020/05/31/3-Idiots-2009.th.jpg', 'https://wx1.sbimg.cn/2020/05/31/3-Idiots-2009.jpg', 'tt1187043', '8.4', '2020-06-02 22:45:28.623', 'system', NULL, NULL),
('50', '倩女幽魂', '倩女幽魂', '{倩女幽魂：妖魔道,"A Chinese Ghost Story"}', '1987', '19870718', '98', '1', 'movie', 'https://diskapp-my.sharepoint.com/personal/moviebay_diskapp_onmicrosoft_com/_layouts/15/download.aspx?share=EaSHtQLfBHBHnTGWAUtyYK4B_Vw60p0A5XF8cgVJzaMt9Q', '{720P,HD}', '{action,romance}', '{中国香港}', '{粤语}', '{程小东}', '{阮继志}', '{张国荣,王祖贤,午马,刘兆铭}', NULL, '书生宁采臣（张国荣饰）收账不成，无处可归，遂夜宿鬼寺兰若寺，遇上侠士燕赤霞（午马饰），二人成为邻居。一日偶遇艳女小倩（王祖贤饰），二人两情相悦，但小倩乃是被树妖姥姥控制的鬼魂，专门迷惑精壮男子代姥姥吸取阳气。小倩见宁采臣心地善良不忍加害，并与他感情逐渐加深。宁采臣欲救小倩脱离姥姥魔掌，但苦于姥姥功力深厚，小倩无法脱离其魔掌。二人遂向燕赤霞求救......', 'https://wx1.sbimg.cn/2020/05/31/a-chinese-ghost-story-1987.md.jpg', 'https://wx1.sbimg.cn/2020/05/31/a-chinese-ghost-story-1987.th.jpg', 'https://wx1.sbimg.cn/2020/05/31/a-chinese-ghost-story-1987.jpg', 'tt0093978', '7.5', '2020-06-02 22:45:28.623', 'system', NULL, NULL),
('51', '倩女幽魂II 人間道', '倩女幽魂2：人间道', '{倩女幽魂2,"A Chinese Ghost Story II"}', '1990', '19900713', '104', '1', 'movie', 'https://diskapp-my.sharepoint.com/personal/moviebay_diskapp_onmicrosoft_com/_layouts/15/download.aspx?share=Ecdjwy-Z9j5JmJUEMYLs_UABQ8Ei5yku3LYM3Xw5GP2N9Q', '{720P,HD}', '{action,romance}', '{中国香港}', '{粤语}', '{程小东}', '{梁耀明,林纪陶,刘大木}', '{张国荣,王祖贤,张学友,午马}', NULL, '宁采臣（张国荣 饰）与燕赤霞（午马 饰）安葬好小倩的骨灰后，分道扬镳。宁采臣回到世间，正是奸臣当道，朝政混乱，民生困苦的时代。宁偶入一家黑店，险被残杀之际又被捕快误抓入狱，遇到名士诸葛卧龙（谷峰 饰），得其相救。逃出狱后路经一所荒寺，被年青鬼马道士知秋一叶（张学友 饰）缠上，误会不断。山庄中阴森恐布，隐藏着一只巨尸，然巨尸未现，却出现一伙白衣鬼魂。宁偶摘掉其中一女子面具，发现其竟与昔日恋人小倩（王祖贤 饰）一模一样……', 'https://wx2.sbimg.cn/2020/05/31/a-chinese-ghost-story-1990.md.jpg', 'https://wx2.sbimg.cn/2020/05/31/a-chinese-ghost-story-1990.th.jpg', 'https://wx2.sbimg.cn/2020/05/31/a-chinese-ghost-story-1990.jpg', 'tt0100625', '7.0', '2020-06-02 22:45:28.623', 'system', NULL, NULL),
('52', '倩女幽魂Ⅲ 道道道', '倩女幽魂3：道道道', '{倩女幽魂3,"A Chinese Ghost Story III"}', '1991', '19910718', '109', '1', 'movie', 'https://diskapp-my.sharepoint.com/personal/moviebay_diskapp_onmicrosoft_com/_layouts/15/download.aspx?share=Ef0xjsKAf8RLiMdqAuKk7lwBucYbivqArpmz-j-07eH6sA', '{720P,HD}', '{action,romance}', '{中国香港}', '{粤语}', '{程小东}', '{徐克,司徒慧焯}', '{梁朝伟,张学友,王祖贤,利智}', NULL, '小和尚十方（梁朝伟 饰）随师父白云（刘洵 饰）护送金佛去五台山。路上偶遇痞子道士燕赤霞（张学友 饰）杀死强盗无数，三人结下梁子。十方与师父夜宿鬼寺兰若寺。师父外出打探时，十方遭遇女鬼小卓（王祖贤 饰）。十方不受其诱惑，二人争斗，十方念咒将其制服，但仍好心将其放走。十方将金佛不慎丢失，找到后已破成两段，树妖姥姥趁机发难，白云被活捉。十方在小卓帮助下逃出，外出求人修补金佛却不幸被骗。幸得再遇小道士燕亦霞，得其相助。小卓死敌小蝶（利智 饰）出击勾引二人不成，恼怒之际识破小卓与十方的计划，引姥姥到三人藏匿之处。十方在小卓再次帮助下逃出，并救得师父，小卓却被姥姥抓回折磨。十方与燕赤霞掘出小卓骨灰逃出兰若寺，但姥姥已布下天罗地网，众人危在旦夕，最后关头，十方化成佛祖金身，对付树妖……', 'https://wx2.sbimg.cn/2020/05/31/a-chinese-ghost-story-1991.md.jpg', 'https://wx2.sbimg.cn/2020/05/31/a-chinese-ghost-story-1991.th.jpg', 'https://wx2.sbimg.cn/2020/05/31/a-chinese-ghost-story-1991.jpg', 'tt0102932', '6.7', '2020-06-02 22:45:28.623', 'system', NULL, NULL),
('53', 'Lara Croft: Tomb Raider', '古墓丽影', '{古墓奇兵,盗墓者罗拉}', '2001', '20010615', '100', '1', 'movie', 'https://diskapp-my.sharepoint.com/personal/moviebay_diskapp_onmicrosoft_com/_layouts/15/download.aspx?share=EZFV4PIJoXhHkaFQuDDFNoIBeUX3jz2l9VpK4qv3Iwn-7g', '{720P,HD}', '{action,adventure}', '{美国,英国,德国,日本}', '{英语}', '{西蒙·韦斯特}', '{"Sara B. Cooper",麦克·韦柏}', '{安吉丽娜·朱莉,强·沃特,伊恩·格雷,诺亚·泰勒}', NULL, '20年前罗拉（安吉丽娜•朱莉 饰）的父亲（乔恩•沃伊特 饰）挖掘古墓得到的一个箱子里收藏了一个神秘的钟。罗拉从父亲那里知道，这个钟与一个神秘组织有关。这个叫光明会的组织相信当他们找到这个古钟后，便有了把时间与空间打开的钥匙，一把三角形的金属钥匙，多年来该组织一直在苦苦寻觅。光明会希望通过这把钥匙让他们的组织始祖复活，但首先要找到钥匙，而且时间紧迫，两天后将出现日全蚀，这个时候三角钥匙内在的力量便会达到最大，光明会不想错过这个大好机会。罗拉扛上了这个艰巨的任务，在重重困难中寻找拯救宇宙的三角钥匙。', 'https://wx2.sbimg.cn/2020/05/31/lara-croft-tomb-raider-2001.md.jpg', 'https://wx2.sbimg.cn/2020/05/31/lara-croft-tomb-raider-2001.th.jpg', 'https://wx2.sbimg.cn/2020/05/31/lara-croft-tomb-raider-2001.jpg', 'tt0146316', '5.8', '2020-06-02 22:45:28.623', 'system', NULL, NULL),
('54', 'Lara Croft Tomb Raider: The Cradle of Life', '古墓丽影2', '{古墓奇兵：风起云涌,盗墓者罗拉：生命之匙}', '2003', '20030721', '117', '1', 'movie', 'https://diskapp-my.sharepoint.com/personal/moviebay_diskapp_onmicrosoft_com/_layouts/15/download.aspx?share=ESgQO9tcQvlIlMXJdvfeFLMBGG_s_sIW0fjJI6sNOb-m3Q', '{720P,HD}', '{action,adventure}', '{美国,英国,德国,日本}', '{英语}', '{扬·德·邦特}', '{迪恩·乔格瑞斯,斯蒂芬·E.德·索萨,詹姆士·V·哈特}', '{安吉丽娜·朱莉,杰拉德·巴特勒,塞伦·希德,克里斯·巴里}', NULL, '罗拉•克劳福特（安吉丽娜•朱莉 饰）这名勇于挑战的探险家继续她的探索之路。这次是寻找早已沉入大海的月神庙。根据资料显示，月神庙内埋藏了传说中的“潘朵拉魔盒”。而一股巨大的能量正存在与这个魔盒当中，同时间邪恶的势力也对这个股力量虎视眈眈。因为这股力量的巨大能足以摧毁整个人类世界，邪恶的势力企图利用的话后果不堪设想。罗拉一边寻找这股传说中的神奇力量，一边与香港黑帮的头目斗智斗勇。到底罗拉能不能顺利获得这股力量，保卫整个人类世界的安全呢？', 'https://wx2.sbimg.cn/2020/05/31/lara-croft-tomb-raider-2003.md.jpg', 'https://wx2.sbimg.cn/2020/05/31/lara-croft-tomb-raider-2003.th.jpg', 'https://wx2.sbimg.cn/2020/05/31/lara-croft-tomb-raider-2003.jpg', 'tt0325703', '5.5', '2020-06-02 22:45:28.623', 'system', NULL, NULL),
('55', 'Tomb Raider', '古墓丽影：源起之战', '{新古墓丽影}', '2018', '20180316', '118', '1', 'movie', 'https://diskapp-my.sharepoint.com/personal/moviebay_diskapp_onmicrosoft_com/_layouts/15/download.aspx?share=EdxfeMQlKn9CuhO2aptmA04Bim-RZuyi8y0OQ-HdTnvGOQ', '{720P,HD}', '{action,adventure}', '{美国}', '{英语}', '{罗阿尔·乌索格}', '{吉内瓦·德沃莱特-罗宾森,阿拉斯泰尔·西登斯,埃文·达赫迪}', '{艾丽西亚·维坎德,多米尼克·韦斯特,沃尔顿·戈金斯,吴彦祖}', NULL, '劳拉（艾丽西亚·维坎德 Alicia Vikander 饰）的父亲一生都致力于研究古墓，在劳拉尚且年幼的时候，父亲在一场冒险之中失踪了。一晃眼多年过去，劳拉一直拒绝承认父亲已死的消息，也拒绝接手父亲手下的商业帝国。一次偶然中，劳拉发现了父亲遗留下的冒险笔记，父亲希望劳拉能把这些资料付之一炬，但为了寻找父亲的下落，劳拉决定寻找笔记中记载的岛屿。劳拉找到了名为陆仁（吴彦祖 饰）的男子，两人结伴踏上了旅途。刚一上岛，劳拉和陆仁就遇见了一直和父亲作对的马赛亚斯（沃特·戈金斯 Walton Goggins 饰）以及他的雇佣兵团队。马赛亚斯一心想要找到古墓的踪迹，不惜杀死了不肯透露半点消息的劳拉的父亲，如今，劳拉亦落入了他的魔爪之中，会遭遇怎样的命运呢？', 'https://wx1.sbimg.cn/2020/05/31/tomb-raider-2018.md.jpg', 'https://wx1.sbimg.cn/2020/05/31/tomb-raider-2018.th.jpg', 'https://wx1.sbimg.cn/2020/05/31/tomb-raider-2018.jpg', 'tt1365519', '6.3', '2020-06-02 22:45:28.623', 'system', NULL, NULL);

INSERT INTO "public"."sys_auth" ("id", "username", "device", "refresh_token", "created_at", "expired_at") VALUES
('5', 'admin', NULL, 'ISf5cOZ79zhOLH5qPj9', '2020-05-30 17:30:51.029', '2020-06-29 17:30:51.029'),
('6', 'admin', NULL, '06ZfKAgW1loTeoQ7sd6', '2020-05-30 22:21:44.234', '2020-06-29 22:21:44.234'),
('7', 'admin', NULL, 'yyHqJO23tZ2mrg5HUBQ', '2020-05-30 22:23:23.812', '2020-06-29 22:23:23.812');

INSERT INTO "public"."sys_dict" ("id", "label", "value", "seq", "tag", "remark", "created_at", "created_by", "updated_at", "updated_by") VALUES
('64', '动作', 'action', '1', 'movie-genre', '电影分类', '2020-05-08 22:16:31.87', 'system', NULL, NULL),
('65', '喜剧', 'comedy', '2', 'movie-genre', '电影分类', '2020-05-08 22:16:31.87', 'system', NULL, NULL),
('66', '爱情', 'romance', '3', 'movie-genre', '电影分类', '2020-05-08 22:16:31.87', 'system', NULL, NULL),
('67', '科幻', 'fantasy', '4', 'movie-genre', '电影分类', '2020-05-08 22:16:31.87', 'system', NULL, NULL),
('68', '恐怖', 'horror', '5', 'movie-genre', '电影分类', '2020-05-08 22:16:31.87', 'system', NULL, NULL),
('69', '剧情', 'drama', '6', 'movie-genre', '电影分类', '2020-05-08 22:16:31.87', 'system', NULL, NULL),
('70', '犯罪', 'crime', '7', 'movie-genre', '电影分类', '2020-05-08 22:16:31.87', 'system', NULL, NULL),
('71', '灾难', 'disaster', '8', 'movie-genre', '电影分类', '2020-05-08 22:16:31.87', 'system', NULL, NULL),
('72', '冒险', 'adventure', '9', 'movie-genre', '电影分类', '2020-05-08 22:16:31.87', 'system', NULL, NULL),
('73', '悬疑', 'mystery', '10', 'movie-genre', '电影分类', '2020-05-08 22:16:31.87', 'system', NULL, NULL),
('74', '战争', 'war', '11', 'movie-genre', '电影分类', '2020-05-08 22:16:31.87', 'system', NULL, NULL),
('75', '纪录', 'documentary', '12', 'movie-genre', '电影分类', '2020-05-08 22:16:31.87', 'system', NULL, NULL),
('76', '国产', 'CN', '1', 'drama-genre', '电视剧分类', '2020-05-08 22:16:31.87', 'system', NULL, NULL),
('77', '港台', 'HK-TW', '2', 'drama-genre', '电视剧分类', '2020-05-08 22:16:31.87', 'system', NULL, NULL),
('78', '日韩', 'JP-KR', '3', 'drama-genre', '电视剧分类', '2020-05-08 22:16:31.87', 'system', NULL, NULL),
('79', '欧美', 'US-EU', '4', 'drama-genre', '电视剧分类', '2020-05-08 22:16:31.87', 'system', NULL, NULL),
('80', '其他', 'OTHER', '5', 'drama-genre', '电视剧分类', '2020-05-08 22:16:31.87', 'system', NULL, NULL);

INSERT INTO "public"."sys_perm" ("id", "code", "name", "type", "icon", "url", "seq", "is_parent", "pid", "created_at", "created_by", "updated_at", "updated_by") VALUES
('1', 'user:query', '用户查询', 'FUNC', NULL, NULL, '1', '0', '0', '2020-05-30 10:44:42.47101', 'SYSTEM', NULL, NULL);

INSERT INTO "public"."sys_role" ("id", "code", "name", "remark", "created_at", "created_by", "updated_at", "updated_by") VALUES
('1', 'admin', '管理员', NULL, '2020-05-30 10:42:45.88863', 'system', NULL, NULL);

INSERT INTO "public"."sys_role_perm" ("role_id", "perm_id") VALUES
('1', '1');

INSERT INTO "public"."sys_user" ("id", "username", "password", "nickname", "salt", "phone", "email", "avatar", "activated", "activation_key", "reset_key", "reset_date", "created_at", "created_by", "updated_at", "updated_by") VALUES
('6', 'admin', 'f0fa9bfd2bab5000dd765eb8bb0ab15a', NULL, 'aNTHmOueamV7GNSwzwr', NULL, 'admin@gmail.com', NULL, 't', NULL, NULL, NULL, '2020-05-05 12:52:28.173', 'system', NULL, NULL);

INSERT INTO "public"."sys_user_role" ("user_id", "role_id") VALUES
('6', '1');

ALTER TABLE "public"."sys_role_perm" ADD FOREIGN KEY ("perm_id") REFERENCES "public"."sys_perm"("id") ON DELETE CASCADE;
ALTER TABLE "public"."sys_role_perm" ADD FOREIGN KEY ("role_id") REFERENCES "public"."sys_role"("id") ON DELETE CASCADE;
ALTER TABLE "public"."sys_user_role" ADD FOREIGN KEY ("role_id") REFERENCES "public"."sys_role"("id") ON DELETE CASCADE;
ALTER TABLE "public"."sys_user_role" ADD FOREIGN KEY ("user_id") REFERENCES "public"."sys_user"("id") ON DELETE CASCADE;
