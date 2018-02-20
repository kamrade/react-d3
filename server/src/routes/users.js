import express from 'express';
let router = express.Router();

router.post('/', (req, res) => {
  res.json({ success: true });
});

export default router;
