CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    google_id VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE Questions (
    question_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    text TEXT,
    view_count INT DEFAULT 0,
    has_answer BOOLEAN DEFAULT FALSE,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
); 

CREATE TABLE question_comments (
    question_comment_id INT PRIMARY KEY AUTO_INCREMENT,
    text TEXT NOT NULL,
    question_id INT,
    FOREIGN KEY (question_id) REFERENCES Questions(question_id) ON DELETE CASCADE
);

CREATE TABLE Answers (
    answer_id INT PRIMARY KEY AUTO_INCREMENT,
    text TEXT NOT NULL,
    confirmed_answer BOOLEAN DEFAULT FALSE,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    question_id INT,
    user_id INT,
    FOREIGN KEY (question_id) REFERENCES Questions(question_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE Votes (
    user_id INT,
    answer_id INT,
    vote_type BOOLEAN,
    PRIMARY KEY (user_id, answer_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (answer_id) REFERENCES Answers(answer_id) ON DELETE CASCADE
);

CREATE TABLE answer_comments (
    answer_comment_id INT PRIMARY KEY AUTO_INCREMENT,
    text TEXT NOT NULL,
    answer_id INT,
    FOREIGN KEY (answer_id) REFERENCES Answers(answer_id) ON DELETE CASCADE
);

CREATE TABLE Tags (
    tag_id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE tag_question_relation (
    tag_id INT,
    question_id INT,
    PRIMARY KEY (tag_id, question_id),
    FOREIGN KEY (tag_id) REFERENCES Tags(tag_id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES Questions(question_id) ON DELETE CASCADE
);

CREATE TABLE question_user_favourite (
    question_id INT,
    user_id INT,
    PRIMARY KEY (question_id, user_id),
    FOREIGN KEY (question_id) REFERENCES Questions(question_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

--Eksempeldata:

-- User Table
INSERT INTO Users( user_id, google_id, username, email) VALUES 
(1, "asdasda" ,'alice', "alice@gmail.com"),
(2, "asdasdads" ,'bob', "bob@gmail.com"),
(3, "qfafsf" ,'charlie', "charlie@gmail.com"),
(4, "fdafadf" ,'david', "david@gmail.com"),
(5, "dasdasda" ,'eve', "eve@gmail.com"),
(6, "lkafnjasl" ,'frank', "frank@gmail.com");

-- Question Table
INSERT INTO Questions(question_id, title, text, view_count, has_answer, user_id) VALUES 
(1, 'How to code in Python?', 'Need help with Python.', 100, TRUE, 2),
(2, 'Java vs C#?', 'Which is better?', 50, FALSE, 2),
(3, 'HTML basics?', 'Help with HTML.', 75, FALSE, 2),
(4, 'JavaScript frameworks?', 'Which one is the best?', 60, TRUE, 2),
(5, 'SQL or NoSQL?', 'Database types?', 80, TRUE, 2),
(6, 'How to deploy an app?', 'Deployment strategies.', 90, FALSE, 2);

-- question_comment Table
INSERT INTO question_comments(question_comment_id, text, question_id) VALUES 
(1, 'I recommend checking out online tutorials.', 1),
(2, 'Java is versatile but C# has its perks.', 2),
(3, 'W3Schools is a good start.', 3),
(4, 'React has been quite popular lately.', 4),
(5, 'Depends on the use case.', 5),
(6, 'Look into cloud platforms.', 6);

-- Answer Table
INSERT INTO Answers(answer_id, text, confirmed_answer, question_id, user_id) VALUES 
(1, 'Python is easy. Start with basics.', 0, 1,2),
(2, 'Both have their strengths.', 0, 2,2),
(3, 'HTML is a markup language.', 0, 3,2),
(4, 'Vue.js is also gaining traction.', 0, 4,2),
(5, 'SQL for structured, NoSQL for flexible.', 0, 5,2),
(6, 'AWS or Azure could be a good choice.', 0, 6,2);

-- answer_comment Table
INSERT INTO answer_comments(answer_comment_id, text, answer_id) VALUES 
(1, 'Agree with this!', 1),
(2, 'Not sure about this.', 2),
(3, 'Good point.', 3),
(4, 'Angular is also good.', 4),
(5, 'I prefer NoSQL for scalability.', 5),
(6, 'Heroku is simpler for beginners.', 6);

-- Tag Table
INSERT INTO Tags(tag_id, name) VALUES 
(1, 'Python'),
(2, 'Java'),
(3, 'HTML'),
(4, 'JavaScript'),
(5, 'Database'),
(6, 'Deployment');

-- tag_question_relation Table
INSERT INTO tag_question_relation(tag_id, question_id) VALUES 
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6);

-- question_user_favourite Table
INSERT INTO question_user_favourite(question_id, user_id) VALUES 
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6);


insert into `Answers` (`text`, `confirmed_answer`, `question_id`) values ('heii', 0, 1);





-- First, drop the existing foreign key constraints
ALTER TABLE question_user_favourite
DROP FOREIGN KEY question_user_favourite_ibfk_1, 
DROP FOREIGN KEY question_user_favourite_ibfk_2;

-- Change the table name and rename the columns
ALTER TABLE question_user_favourite
CHANGE COLUMN question_id answer_id INT,
CHANGE COLUMN user_id answer_id INT,
CHANGE COLUMN question_user_favourite_id answer_user_favourite_id INT AUTO_INCREMENT,
ADD PRIMARY KEY (answer_user_favourite_id);

-- Recreate the foreign key constraints with the updated column names
ALTER TABLE question_user_favourite
ADD CONSTRAINT fk_answer_user_favourite_answer_id
FOREIGN KEY (answer_id) REFERENCES Answers(answer_id) ON DELETE CASCADE;

ALTER TABLE question_user_favourite
ADD CONSTRAINT fk_answer_user_favourite_user_id
FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE;

-- Rename the table
RENAME TABLE question_user_favourite TO answer_user_favourite;
