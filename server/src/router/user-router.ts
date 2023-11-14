import {Router} from 'express';
import passport from 'passport';
import { User , userService} from '../service/user_services';

const router = Router();

router.get('/profile/:id', (req,res) =>{

    const user_id = Number(req.params.id);
    userService.get(user_id)
    .then((user) => { 
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    })
    .catch((error) => { res.status(500).send(error); });
});

export default router;