//vi trenger getAllVotes for Answer

import pool from '../mysql-pool';
import type { RowDataPacket, ResultSetHeader, OkPacket } from 'mysql2';

export type Vote_Content = {
  user_id: number;
  answer_id: number;
  vote_type: boolean;
};

class Service {
 
    //get all votes for answer
    getAllVotesForAnswer(answer_id: number) {
        return new Promise<number>((resolve, reject) => {
            pool.query(
            'SELECT answer_id, SUM(CASE WHEN vote_type = 1 THEN 1 ELSE -1 END) AS total_votes FROM Votes WHERE answer_id = ? GROUP BY answer_id;',
            [answer_id],
            (error, results: RowDataPacket[]) => {
                if (error) return reject(error);
                
                const totalVotes: number = results.length > 0 ? results[0].total_votes : 0;
                resolve(totalVotes);
            },
            );
        });
    }


    // //create vote for answer
    // createVote(user_id: number, answer_id: number, vote_type: number) {
    //     return new Promise<void>((resolve, reject) => {
    //         pool.query(
    //         'INSERT INTO Votes (user_id, answer_id, vote_type) VALUES (?, ?, ?)',
    //         [user_id, answer_id, vote_type],
    //         (error) => {
    //             if (error) return reject(error);
    
    //             resolve();
    //         },
    //         );
    //     });
    //     }


    //create a vote for answer
  //   createVote(user_id: number, answer_id: number, vote_type: number) {
  //     return new Promise<void>((resolve, reject) => {
  //         pool.query(
  //             'INSERT IGNORE INTO Votes (user_id, answer_id, vote_type) VALUES (?, ?, ?)',
  //             [user_id, answer_id, vote_type],
  //             (insertError, result) => {
  //                 if (insertError) {
  //                     console.error('Error inserting record:', insertError);
  //                     reject(insertError);  // Reject the promise with the error
  //                     return;
  //                 }
  
  //                 // Check if a new record was inserted (affectedRows will be 1 in that case)
  //                 if ((result as OkPacket).affectedRows === 1) {
  //                     console.log('Record inserted successfully');
  //                 } else {
  //                     // If no new record was inserted, it means the record already exists,
  //                     // so delete it.
  //                     pool.query(
  //                         'DELETE FROM Votes WHERE user_id = ? AND answer_id = ? AND vote_type = ?',
  //                         [user_id, answer_id, vote_type],
  //                         (deleteError) => {
  //                             if (deleteError) {
  //                                 console.error('Error deleting record:', deleteError);
  //                                 reject(deleteError);  // Reject the promise with the error
  //                                 return;
  //                             }
  //                             console.log('Record deleted successfully');
  //                         }
  //                     );
  //                 }
  
  //                 // Resolve the promise after successful insertion or deletion
  //                 resolve();
  //             }
  //         );
  //     });
  // }


  // create a vote for answer
createVote(user_id: number, answer_id: number, vote_type: number) {
  return new Promise<void>((resolve, reject) => {
      // Check if there is an existing vote for the user and answer
      pool.query(
          'SELECT vote_type FROM Votes WHERE user_id = ? AND answer_id = ?',
          [user_id, answer_id],
          (selectError, selectResult) => {
              if (selectError) {
                  console.error('Error checking existing vote:', selectError);
                  reject(selectError);
                  return;
              }

              if (selectResult.length === 0) {
                  // No existing vote, insert the new vote
                  pool.query(
                      'INSERT INTO Votes (user_id, answer_id, vote_type) VALUES (?, ?, ?)',
                      [user_id, answer_id, vote_type],
                      (insertError) => {
                          if (insertError) {
                              console.error('Error inserting record:', insertError);
                              reject(insertError);
                              return;
                          }
                          console.log('Record inserted successfully');
                          resolve();
                      }
                  );
              } else {
                  const existingVoteType = selectResult[0].vote_type;

                  if (existingVoteType === vote_type || (existingVoteType === 0 && vote_type === 0)) {
                      // Existing vote is the same as the new vote or both are 0, delete the entry
                      pool.query(
                          'DELETE FROM Votes WHERE user_id = ? AND answer_id = ?',
                          [user_id, answer_id],
                          (deleteError) => {
                              if (deleteError) {
                                  console.error('Error deleting record:', deleteError);
                                  reject(deleteError);
                                  return;
                              }
                              console.log('Record deleted successfully');
                              resolve();
                          }
                      );
                  } else {
                      // Existing vote is different from the new vote, update the entry
                      pool.query(
                          'UPDATE Votes SET vote_type = ? WHERE user_id = ? AND answer_id = ?',
                          [vote_type, user_id, answer_id],
                          (updateError) => {
                              if (updateError) {
                                  console.error('Error updating record:', updateError);
                                  reject(updateError);
                                  return;
                              }
                              console.log('Record updated successfully');
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

          resolve(results as Vote_Content[]);
        },
      );
    });
}


// // Get all votes for an answer and calculate total votes
// getAllVotesForAnswer(answer_id: number) {
//     return new Promise<number>((resolve, reject) => {
//       pool.query(
//         'SELECT * FROM Votes WHERE answer_id = ?',
//         [answer_id],
//         (error, results: RowDataPacket[]) => {
//           if (error) return reject(error);

//           const votes: Vote_Content[] = results as Vote_Content[];

//           // Calculate total votes
//           const totalVotes = votes.reduce((total, vote) => {
//             return total + (vote.vote_type ? 1 : -1);
//           }, 0);

//           resolve(totalVotes);
//         },
//       );
//     });
//   }



}
export const voteService = new Service();
