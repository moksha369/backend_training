const express = require('express');
const router = express.Router();
router.post('/', (req, res, next) => {
    res.status(201).json({ _id: 'temp_id_123', email: req.body.email });
});

router.post('/login', (req, res, next) => {
    res.status(200).json({ token: 'temp_token_abc' });
});

router.post('/renovar', (req, res, next) => {
    res.status(200).json({ token: 'temp_token_xyz' });
});

router.delete('/:id', (req, res, next) => {
    res.status(204).send(); 
});

module.exports = router;