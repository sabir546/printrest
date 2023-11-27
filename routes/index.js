var express = require('express');
const passport = require('passport');
var router = express.Router();
 const localStrategy=require('passport-local');
const User = require('../models/usermodel');
const post =require('../models/postmodel')
 passport.use(new localStrategy(User.authenticate()));
 const upload=require('./multer');
// const postmodel = require('../models/postmodel');
/* GET home page. */


router.get('/', function(req, res, next) {
  // console.log(req.flash('error'))
  res.render('index',{error:req.flash('error')});
});

router.get('/feed', function(req, res, next) {
  res.render('feed');
});

// router.get('/signin', function(req, res, next) {
//   res.render('index')
// });
router.get('/profile', isLoggedIn , async function(req, res, next) {
  const user=await User.findOne({
    username:req.session.passport.user
  })
  .populate("posts")
  console.log(user)
  res.render("profile" ,{user1:user})
});
router.get('/signup' , function(req, res, next) {
  res.render("signup")
});

router.post('/signup', async function(req, res, ) {
  await database.register({
    username:req.body.username,
    email:req.body.email,
    fullname:req.body.fullname,
  },
  req.body.password
  )
      res.redirect('/')
});

  router.post('/signin',passport.authenticate ("local",{
  
successRedirect:'/profile',
failureRedirect:'/',
failureFlash:true,
  }),
  function(req, res,next){})

  
  router.get('/logout', function(req, res, next){
req.logOut(function(err){
  if(err){return next(err);}
  res.redirect('/')
})
  });

function isLoggedIn (req, res, next){
  if(req.isAuthenticated()) 
    return next();
  
  res.redirect('/');
}


router.post('/upload',isLoggedIn ,upload.single('file'),async function(req, res, next) {
  if(!req.file){
   return res.status(404).send('no files were given');
  }
const user =await User.findOne({username:req.session.passport.user})

const post1 =await post.create({
  image:req.file.filename,
  imageText:req.body.filecaption,
  user:user._id
 })
  user.posts.push(post1._id);
  await user.save()
 res.redirect('/profile')
 console.log('post')
  // res.send('file uploaded successfully')
});



module.exports = router;
