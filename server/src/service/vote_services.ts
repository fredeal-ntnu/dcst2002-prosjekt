//vi trenger getAllVotes for Answer

import pool from '../mysql-pool';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

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
    createVote(user_id: number, answer_id: number, vote_type: number) {
      console.log(user_id)
      console.log(answer_id)
      console.log(vote_type)
      return new Promise<void>((resolve, reject) => {
        pool.query(
          'INSERT INTO Votes (user_id, answer_id, vote_type) VALUES (?, ?, ?)', [user_id, answer_id, vote_type],
          (error) => {
            if (error) return reject(error);

            resolve();
          },
        )
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
