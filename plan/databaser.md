


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



User(__user_id__, user_name, password)
Question(__question_id__, title, text, view_count, confirmed_answer, user_id)
question_comment(__question_comment_id__, text, question_id*)
Answer(__answer_id__, text, score, question_id*)
answer_comment(__answer_comment_id__, text, answer_id*)
Tag(__tag_id__, name)
tag_question_relation(__tag_id, question_id__)
question_user_favourite(__question_id, user_id__)









CREATE TABLE Question (
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    text TEXT,
    view_count INT,
    confirmed_answer BOOLEAN,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES User (user_id)
    );

CREATE TABLE question_comment (
    question_comment_id INT AUTO_INCREMENT PRIMARY KEY,
    text TEXT,
    question_id INT,
    FOREIGN KEY (question_id) REFERENCES Question(question_id)
);

CREATE TABLE Answer (
    answer_id INT AUTO_INCREMENT PRIMARY KEY,
    text TEXT,
    score INT,
    question_id INT,
    FOREIGN KEY (question_id) REFERENCES Question(question_id)
);

CREATE TABLE answer_comment (
    answer_comment_id INT AUTO_INCREMENT PRIMARY KEY,
    text TEXT,
    answer_id INT,
    FOREIGN KEY (answer_id) REFERENCES Answer(answer_id)
);

CREATE TABLE Tag (
    tag_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE tag_question_relation (
    tag_id INT,
    question_id INT,
    PRIMARY KEY (tag_id, question_id),
    FOREIGN KEY (tag_id) REFERENCES Tag(tag_id),
    FOREIGN KEY (question_id) REFERENCES Question(question_id)
);

CREATE TABLE User (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE question_user_favourite (
    question_id INT,
    user_id INT,
    PRIMARY KEY (question_id, user_id),
    FOREIGN KEY (question_id) REFERENCES Question(question_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);
