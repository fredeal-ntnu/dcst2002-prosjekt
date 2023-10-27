questions
    id(pk)
    title
    text

answers
    id(pk)
    text
    score

tags
    id(pk)
    name






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

-- Users table
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL, -- Consider appropriate hashing
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -- other necessary fields like user status, roles, etc.
);

-- Tags table
CREATE TABLE tags (
    tag_id INT AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Questions table
CREATE TABLE questions (
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    created_by INT, -- user_id from the 'users' table
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    view_count INT DEFAULT 0,
    FOREIGN KEY (created_by) REFERENCES users(user_id)
    -- any other necessary fields
);

-- Question tags relationship table
CREATE TABLE question_tags (
    question_id INT,
    tag_id INT,
    PRIMARY KEY (question_id, tag_id),
    FOREIGN KEY (question_id) REFERENCES questions(question_id),
    FOREIGN KEY (tag_id) REFERENCES tags(tag_id)
);
-- Answers table
CREATE TABLE answers (
    answer_id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT,
    body TEXT NOT NULL,
    created_by INT, -- user_id from the 'users' table
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    upvotes INT DEFAULT 0,
    downvotes INT DEFAULT 0,
    accepted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (question_id) REFERENCES questions(question_id),
    FOREIGN KEY (created_by) REFERENCES users(user_id)
    -- any other necessary fields
);

-- Comments table
CREATE TABLE comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    body TEXT NOT NULL,
    created_by INT, -- user_id from the 'users' table
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    question_id INT,
    answer_id INT,
    FOREIGN KEY (created_by) REFERENCES users(user_id),
    FOREIGN KEY (question_id) REFERENCES questions(question_id),
    FOREIGN KEY (answer_id) REFERENCES answers(answer_id)
    -- Depending on your requirements, either question_id or answer_id could be NULL.
    -- any other necessary fields
);

-- Favorites table (assuming a user can favorite an answer)
CREATE TABLE favorites (
    user_id INT,
    answer_id INT,
    PRIMARY KEY (user_id, answer_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (answer_id) REFERENCES answers(answer_id)
);