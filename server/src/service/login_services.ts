import pool from '../mysql-pool';
import type { RowDataPacket, ResultSetHeader,  } from 'mysql2';

export type Login_Content = {
  user_id: number;
  google_id: string;
  username: string;  
  email: string;
};

class Service {

    

    
}
export const loginService = new Service(); 
