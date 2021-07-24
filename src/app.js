require('dotenv').config();
const express = require('express');
const hbs = require('hbs');
const path=require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
const app = express();
const auth = require("./middlewere/auth");



require('../src/db/connection');
const Register = require('../src/models/mens');

const port = process.env.PORT || 8200 ;




const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname , "../templates/partials");


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));



app.use(express.static(static_path));
 app.set('view engine', 'hbs');
app.set("views",templates_path);
hbs.registerPartials(partials_path);


// console.log(process.env.SECRET_KEY);


              //  routing
app.get('', (req, res) =>{
    res.render('index')
  });
app.get('/about', (req,res)=>{
  res.render('about');
})
app.get("/registar" , (req,res)=>{
  res.render("registar")
});

app.get("/secret" ,auth, (req,res)=>{
  // console.log(`this is cookie awesome ${req.cookies.jwt}`);
  res.render("secret")
});



app.get('/login',(req,res)=>{
  res.render('login')
});


// cerated a new user on our database

app.post("/registar" ,async (req,res)=>{
    try{
      const password = req.body.password;
      const cpassword = req.body.confirmpassword;
    if(password === cpassword){
      const empolyeeregister = new Register({
        fristname:req.body.fristname,
        lastname:req.body.lastname,
        email:req.body.email,
        gender:req.body.gender,
        age:req.body.age,
        phone:req.body.phone,
        password:req.body.password,
        confirmpassword:req.body.confirmpassword,
      })


                 //================= generating token parth ============================
  //  console.log('the success parth' +empolyeeregister);

 const token = await empolyeeregister.generatAuthToken();
//  console.log('the token parth'+ token);

                        //  then genaret cookie
res.cookie("jwt",token,{
  expires:new Date(Date.now() +30000),
  httpOnly:true,
})
// console.log(cookie);


     const registers = await empolyeeregister.save();
    //  console.log('the token parth'+ registers);


     res.status(201).render("index");

    }else{
      res.send('password are not match');
    }
    }catch(error){
      res.status(400).send(error);
    }
});


                        // ================= user login identity =============================
app.post('/login',async(req,res)=>{
    try{
      const email = req.body.email;
      const password = req.body.password;
      const useremail = await Register.findOne({email:email});

      // user password same aour collaction password same then new password render(index)
       const isMatch = await bcrypt.compare(password ,useremail.password);
    

                  // the token parth
     const token = await useremail.generatAuthToken();
     console.log('the token parth'+ token);
   
      // then generet cookie
      res.cookie("jwt",token,{
        expires:new Date(Date.now() +30000),
        httpOnly:true,
        // secure:true,
      })

      if(isMatch){
          res.status(201).render("index");
      }else{
        res.send('invaild password');
      }
    }catch(error){
      res.status(400).send('Invalid iogin Details');
    }    


  // res.render('login')
});


app.get("/logout",auth,async(req,res)=>{
  try{
  console.log(req.user);
   
                  // for single dives logout
  // req.user.tokens = req.user.tokens.filter((currElement)=>{
  // return currElement.token !== req.token
  // })

    // log out for all devices
    req.user.tokens = [];


  res.clearCookie('jwt');
  console.log('logout success full')
         

  await req.user.save();
  res.render('login');
  }catch(error){
    res.status(500).send(error);
  }
})



  app.listen(port,()=>{
    console.log(`connection is set up ${port}`)
  })