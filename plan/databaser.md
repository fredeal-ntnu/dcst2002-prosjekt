


    For å bruke tegne-program i VSCode, last ned UMLet, lag en fil med extension .uxf

    Vi må ha en felles database vi jobber mot, kan være hvem som helst sin.
    Så oppretter vi alle tabellene vi trenger i denne.


    Vi kommer til å trenge:
    User (bruker-informasjon)
    Question (informasjon om spørsmålet og alt som tilhører det kan upvotes og inneholde tags)
    Answer (svaret må svare på et eksisterende spørsmål og kan upvotes)
    Favourite (bruker kan sette et spørsmål som favoritt, ikke en kommentar.)
    Tags (her lagres alle tagsene som kan brukes i spørsmålene (kan bruker lage egne eller ha en pre-defined tag-liste?))
    Upvotes (en bruker kan upvote et spørsmål eller en kommentar)
    Comment (en kommentar til et eksisterende spørsmål fra samme bruker eller en annen, kan upvotes)


    Favourite_question (hvilket spørsmål om er lagret som favoritt)
    answer_comment (forholdet mellom spørsmål og kommentar)
    Tags_question_relation (for å lagre info om hvilke spørsmål som inneholder hvilke tags)
    Comment_upvote (relasjonen mellom en kommentar og en upvote)

    Forslag til databaser:



User(__user_name__, password)
Question(__question_id__, title, text, view_count, confirmed_answer, user_name)
question_comment(__question_comment_id__, text, question_id*)
Answer(__answer_id__, text, score, question_id*)
answer_comment(__answer_comment_id__, text, answer_id*)
Tag(__tag_id__, name)
tag_question_relation(__tag_id, question_id__)
question_user_favourite(__question_id, user_name__)








CREATE TABLE User (
    user_name VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Question (
    question_id INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    text TEXT,
    view_count INT DEFAULT 0,
    confirmed_answer INT,
    user_NAME VARCHAR(255),
    FOREIGN KEY (user_name) REFERENCES User(user_name)
);

CREATE TABLE question_comment (
    question_comment_id INT PRIMARY KEY,
    text TEXT NOT NULL,
    question_id INT,
    FOREIGN KEY (question_id) REFERENCES Question(question_id)
);

CREATE TABLE Answer (
    answer_id INT PRIMARY KEY,
    text TEXT NOT NULL,
    score INT DEFAULT 0,
    question_id INT,
    FOREIGN KEY (question_id) REFERENCES Question(question_id)
);

CREATE TABLE answer_comment (
    answer_comment_id INT PRIMARY KEY,
    text TEXT NOT NULL,
    answer_id INT,
    FOREIGN KEY (answer_id) REFERENCES Answer(answer_id)
);

CREATE TABLE Tag (
    tag_id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE tag_question_relation (
    tag_id INT,
    question_id INT,
    PRIMARY KEY (tag_id, question_id),
    FOREIGN KEY (tag_id) REFERENCES Tag(tag_id),
    FOREIGN KEY (question_id) REFERENCES Question(question_id)
);

CREATE TABLE question_user_favourite (
    question_id INT,
    user_name VARCHAR(255),
    PRIMARY KEY (question_id, user_name),
    FOREIGN KEY (question_id) REFERENCES Question(question_id),
    FOREIGN KEY (user_name) REFERENCES User(user_name)
);


Eksempeldata:

-- User Table
INSERT INTO User( user_name, password) VALUES 
('Alice', 'password123'),
('Bob', 'bobpass'),
('Charlie', 'charliepass'),
('David', 'davidpass'),
('Eve', 'evepass'),
('Frank', 'frankpass');

-- Question Table
INSERT INTO Question(question_id, title, text, view_count, confirmed_answer, user_name) VALUES 
(1, 'How to code in Python?', 'Need help with Python.', 100, NULL, 1),
(2, 'Java vs C#?', 'Which is better?', 50, NULL, 2),
(3, 'HTML basics?', 'Help with HTML.', 75, NULL, 3),
(4, 'JavaScript frameworks?', 'Which one is the best?', 60, NULL, 4),
(5, 'SQL or NoSQL?', 'Database types?', 80, NULL, 5),
(6, 'How to deploy an app?', 'Deployment strategies.', 90, NULL, 6);

-- question_comment Table
INSERT INTO question_comment(question_comment_id, text, question_id) VALUES 
(1, 'I recommend checking out online tutorials.', 1),
(2, 'Java is versatile but C# has its perks.', 2),
(3, 'W3Schools is a good start.', 3),
(4, 'React has been quite popular lately.', 4),
(5, 'Depends on the use case.', 5),
(6, 'Look into cloud platforms.', 6);

-- Answer Table
INSERT INTO Answer(answer_id, text, score, question_id) VALUES 
(1, 'Python is easy. Start with basics.', 5, 1),
(2, 'Both have their strengths.', 3, 2),
(3, 'HTML is a markup language.', 4, 3),
(4, 'Vue.js is also gaining traction.', 2, 4),
(5, 'SQL for structured, NoSQL for flexible.', 6, 5),
(6, 'AWS or Azure could be a good choice.', 1, 6);

-- answer_comment Table
INSERT INTO answer_comment(answer_comment_id, text, answer_id) VALUES 
(1, 'Agree with this!', 1),
(2, 'Not sure about this.', 2),
(3, 'Good point.', 3),
(4, 'Angular is also good.', 4),
(5, 'I prefer NoSQL for scalability.', 5),
(6, 'Heroku is simpler for beginners.', 6);

-- Tag Table
INSERT INTO Tag(tag_id, name) VALUES 
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
INSERT INTO question_user_favourite(question_id, user_name) VALUES 
(1, "Alice"),
(2, "Bob"),
(3, "Charlie"),
(4, "David"),
(5, "David"),
(6, "Frank");


