SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS;
SET FOREIGN_KEY_CHECKS=0;
CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    google_id VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE Questions (
    question_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    text VARCHAR(1000) NOT NULL,
    view_count INT DEFAULT 0,
    has_answer BOOLEAN DEFAULT FALSE,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
); 

CREATE TABLE Question_comments (
    question_comment_id INT PRIMARY KEY AUTO_INCREMENT,
    text VARCHAR(1000) NOT NULL,
    question_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (question_id) REFERENCES Questions(question_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE Answers (
    answer_id INT PRIMARY KEY AUTO_INCREMENT,
    text VARCHAR(1000) NOT NULL,
    confirmed_answer BOOLEAN DEFAULT FALSE,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    question_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (question_id) REFERENCES Questions(question_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE Votes (
    user_id INT NOT NULL,
    answer_id INT NOT NULL,
    vote_type BOOLEAN,
    PRIMARY KEY (user_id, answer_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (answer_id) REFERENCES Answers(answer_id) ON DELETE CASCADE
);

CREATE TABLE Answer_comments (
    answer_comment_id INT PRIMARY KEY AUTO_INCREMENT,
    text VARCHAR(1000) NOT NULL,
    answer_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (answer_id) REFERENCES Answers(answer_id) ON DELETE CASCADE,
    FOREIGN key (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE Tags (
    tag_id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

INSERT INTO Tags (tag_id, name) VALUES 
(1, 'SQL'),
(2, 'Python'),
(3, 'JavaScript'),
(4, 'HTML'),
(5, 'CSS'),
(6, 'Bootstrap'),
(7, 'Frontend'),
(8, 'Backend')


CREATE TABLE Tag_question_relation (
    tag_id INT,
    question_id INT,
    PRIMARY KEY (tag_id, question_id),
    FOREIGN KEY (tag_id) REFERENCES Tags(tag_id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES Questions(question_id) ON DELETE CASCADE
);

CREATE TABLE Answer_user_favourite (
    answer_id INT,
    user_id INT,
    PRIMARY KEY (answer_id, user_id),
    FOREIGN KEY (answer_id) REFERENCES Answers(answer_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;




