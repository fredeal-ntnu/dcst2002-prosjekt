* CREATE TABLE Question (
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    text TEXT,
    view_count INT DEFAULT 0,
    confirmed_answer BOOLEAN DEFAULT 0,
    user_id INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES User (user_id)
    );

    * Bytte confirmed_answer til is_answered?
        * Vise liste over ubersvarte spm

* Få inn tidspunkt for endring av svar i DB (pga sortering)

* Hvordan markere svar som akseptert/best?

* Spørsmål MÅ ha tags




    