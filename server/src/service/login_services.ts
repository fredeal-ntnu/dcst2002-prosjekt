// vi trenger getUser, createUser, updateUser

import pool from '../mysql-pool';
import type { RowDataPacket, ResultSetHeader,  } from 'mysql2';

export type Login_Content = {
  user_name: string;
  password: string;  
};

class Service {

    
}
export const loginService = new Service(); 
