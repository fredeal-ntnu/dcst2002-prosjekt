import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v2';


export type User = {
  user_name: string;
  password: string;
};


class Service {

  //get a user
  getUser(user: User) {
    return axios.get<User>('/users/' + user.user_name).then((response) => response.data);
  }


}

const userService = new Service();
export default userService;
