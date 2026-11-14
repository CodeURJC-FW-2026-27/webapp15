import express from 'express';

const router = express.Router();

export default router;


router.get('/home', (req,res) => {
  res.render('home');
});

router.get('/new_element', (req,res) => {
  res.render('new_element');
});

router.get('/detail', (req,res) => {
  res.render('detail');
});