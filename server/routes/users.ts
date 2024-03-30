import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    let users = [
        {id: 1, name: "Pandamini"},
        {id: 2, name: "Sabrina"},
        {id: 3, name: "KJ"},
        {id: 4, name: "sdcdc"}
    ]
    res.send(users);
});

router.post('/', (req, res) => {
    
})

export default router;