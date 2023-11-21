SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS;
SET FOREIGN_KEY_CHECKS=0;

CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    google_id VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
)ENGINE=InnoDB;

CREATE TABLE Questions (
    question_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    text VARCHAR(255) NOT NULL,
    view_count INT DEFAULT 0,
    has_answer BOOLEAN DEFAULT FALSE,
    user_id INT NOT NULL
    )ENGINE=InnoDB;

CREATE TABLE Question_comments (
    question_comment_id INT PRIMARY KEY AUTO_INCREMENT,
    text VARCHAR(255) NOT NULL,
    question_id INT NOT NULL,
    user_id INT NOT NULL
    
)ENGINE=InnoDB;

CREATE TABLE Answers (
    answer_id INT PRIMARY KEY AUTO_INCREMENT,
    text VARCHAR(255) NOT NULL,
    confirmed_answer BOOLEAN DEFAULT FALSE,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    question_id INT NOT NULL,
    user_id INT NOT NULL
)ENGINE=InnoDB;

CREATE TABLE Votes (
    user_id INT NOT NULL,
    answer_id INT NOT NULL,
    vote_type BOOLEAN,
    PRIMARY KEY (user_id, answer_id)
)ENGINE=InnoDB;

CREATE TABLE Answer_comments (
    answer_comment_id INT PRIMARY KEY AUTO_INCREMENT,
    text VARCHAR(255) NOT NULL,
    answer_id INT NOT NULL,
    user_id INT NOT NULL
)ENGINE=InnoDB;

CREATE TABLE Tags (
    tag_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
)ENGINE=InnoDB;

CREATE TABLE Tag_question_relation (
    tag_id INT,
    question_id INT,
    PRIMARY KEY (tag_id, question_id)
)ENGINE=InnoDB;

CREATE TABLE Answer_user_favourite (
    answer_id INT,
    user_id INT,
    PRIMARY KEY (answer_id, user_id)
)ENGINE=InnoDB;

SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;




