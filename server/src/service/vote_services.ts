//vi trenger getAllVotes for Answer

import pool from '../mysql-pool';
import type { RowDataPacket, ResultSetHeader, OkPacket } from 'mysql2';

export type Vote_Content = {
  user_id: number;
  answer_id: number;
  vote_type: boolean;
};

class Service {   
  // create a vote for answer
  // Her bør vi kommentere hva som skjer i koden, hva som skjer i de forskjellige if-setningene
createVote(user_id: number, answer_id: number, vote_type: boolean) {
  console.log("første sted")
  return new Promise<void>((resolve, reject) => {
      // Check if there is an existing vote for the user and answer
      pool.query(
          'SELECT vote_type FROM Votes WHERE user_id = ? AND answer_id = ?',
          [user_id, answer_id],
          (selectError, selectResult) => {
            console.log("andre sted")
              if (selectError) {
                  reject(selectError);
              }

              if (Array.isArray(selectResult) && selectResult.length === 0) {
                console.log("tredje sted")
                // No existing vote, insert the new vote
                pool.query(
                  'INSERT INTO Votes (user_id, answer_id, vote_type) VALUES (?, ?, ?)',
                  [user_id, answer_id, vote_type],
                  (insertError) => {
                    if (insertError) {
                      reject(insertError);
                    }
                    resolve();
                  }
                );
              } else {
                const existingVoteType = (selectResult[0] as RowDataPacket)?.vote_type;


                  if (existingVoteType === vote_type || (existingVoteType === 0 && vote_type === 0)) {
                    console.log("det funker ikke")
                      // Existing vote is the same as the new vote or both are 0, delete the entry
                      pool.query(
                          'DELETE FROM Votes WHERE user_id = ? AND answer_id = ?',
                          [user_id, answer_id],
                          (deleteError) => {
                              if (deleteError) {
                                  reject(deleteError);
                              }
                              resolve();
                          }
                      );
                  } else {console.log("det funker")
                      // Existing vote is different from the new vote, update the entry
                      pool.query(
                          'UPDATE Votes SET vote_type = ? WHERE user_id = ? AND answer_id = ?',
                          [vote_type, user_id, answer_id],
                          (updateError) => {
                              if (updateError) {
                                  reject(updateError);
                              }
                              resolve();
                          }
                      );
                  }
              }
          }
      );
  });
}

getAllVotesByAnswerId(answer_id: number) {
    return new Promise<Vote_Content[]>((resolve, reject) => {
      pool.query(
        'SELECT * FROM Votes WHERE answer_id = ?',
        [answer_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);
          if (results.length === 0) return reject('Votes not found');

          resolve(results as Vote_Content[]);
        },
      );
    });
}




            
}
export const voteService = new Service();
