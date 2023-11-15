DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS question;
DROP TABLE IF EXISTS question_comment;
DROP TABLE IF EXISTS answer;
DROP TABLE IF EXISTS votes;
DROP TABLE IF EXISTS answer_comment;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS tag_question_relation;
DROP TABLE IF EXISTS question_user_favorite;

CREATE TABLE user(
user_id     INT UNSIGNED NOT NULL AUTO_INCREMENT,
google_id   VARCHAR(255) NOT NULL,
username    VARCHAR(255) NOT NULL,
email       VARCHAR(255) NOT NULL,
CONSTRAINT user_pk PRIMARY KEY(user_id))ENGINE=INNODB;

CREATE TABLE question(
question_id    INT UNSIGNED NOT NULL AUTO_INCREMENT,
title          VARCHAR(250) NOT NULL,
text           VARCHAR(5000),
view_count     INT UNSIGNED DEFAULT 0,
has_answer     BOOLEAN DEFAULT FALSE,
user_id        INT UNSIGNED NOT NULL,
CONSTRAINT question_pk PRIMARY KEY(question_id),
CONSTRAINT question_fk FOREIGN KEY (user_id) REFERENCES user(user_id))ENGINE=INNODB;

CREATE TABLE question_comment(
question_comment_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
text                VARCHAR(1000) NOT NULL,
question_id         INT UNSIGNED NOT NULL,
CONSTRAINT question_comment_pk PRIMARY KEY(question_comment_id),
CONSTRAINT question_comment_fk FOREIGN KEY (question_id) REFERENCES question(question_id) ON DELETE CASCADE)ENGINE=INNODB;

CREATE TABLE answer(
answer_id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
text              VARCHAR(5000) NOT NULL,
confirmed_answer  BOOLEAN DEFAULT FALSE,
last_updated      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
question_id       INT UNSIGNED NOT NULL,
user_id           INT UNSIGNED NOT NULL,
CONSTRAINT answer_pk PRIMARY KEY (answer_id),
CONSTRAINT answer_fk FOREIGN KEY (question_id) REFERENCES question(question_id) ON DELETE CASCADE,
CONSTRAINT answer_fk FOREIGN KEY (user_id) REFERENCES user(user_id))ENGINE=INNODB;

CREATE TABLE votes(
user_id      INT UNSIGNED NOT NULL,
answer_id    INT UNSIGNED NOT NULL,
vote_type    BOOLEAN NOT NULL,
CONSTRAINT votes_pk PRIMARY KEY (user_id, answer_id),
CONSTRAINT votesOne_fk FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
CONSTRAINT votesTwo_fk FOREIGN KEY (answer_id) REFERENCES answer(answer_id) ON DELETE CASCADE)ENGINE=INNODB;

CREATE TABLE answer_comment(
answer_comment_id   INT UNSIGNED NOT NULL AUTO_INCREMENT,
text                VARCHAR(5000) NOT NULL,
answer_id           INT UNSIGNED NOT NULL,
CONSTRAINT answer_comment_pk PRIMARY KEY(answer_comment_id),
CONSTRAINT answer_comment_fk FOREIGN KEY (answer_id) REFERENCES answer(answer_id) ON DELETE CASCADE)ENGINE=INNODB;

CREATE TABLE tags(
tag_id  INT UNSIGNED NOT NULL AUTO_INCREMENT,
name    VARCHAR(255),
CONSTRAINT tag_pk PRIMARY KEY(tag_id))ENGINE=INNODB;

CREATE TABLE tag_question_relation(
tag_id      INT UNSIGNED NOT NULL,
question_id INT UNSIGNED NOT NULL,
CONSTRAINT tag_question_relation_pk PRIMARY KEY (tag_id, question_id),
CONSTRAINT tag_question_relationOne_fk FOREIGN KEY (tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE,
CONSTRAINT tag_question_relationTwo_fk FOREIGN KEY (question_id) REFERENCES question(question_id) ON DELETE CASCADE)ENGINE=INNODB;

CREATE TABLE question_user_favorite(
question_id     INT UNSIGNED NOT NULL,
user_id         INT UNSIGNED NOT NULL,
CONSTRAINT question_user_favorite_pk PRIMARY KEY (question_id, user_id),
CONSTRAINT question_user_favoriteOne_fk FOREIGN KEY (question_id) REFERENCES question(question_id) ON DELETE CASCADE,
CONSTRAINT question_user_favoriteTwo_fk FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE)ENGINE=INNODB;