const express = require("express");
const bodyParser = require('body-parser');
const userModel = require('../models/UserModel');
const passport = require('passport')
const jwt = require('jsonwebtoken');



const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));



app.post("/register",function(req,res){
    userModel.register(new userModel({
        email:req.body.email,
        name:req.body.name,
        hash: '',
        salt: '',
    }),req.body.password,function(err,user){
        if(err){
          return res.status(500).json({message: "User Exists"});
        }else{
            passport.authenticate("local")(req,res,function(){
                if(err)
                  return res.status(500).json({message: "User Exists"});

                return res.status(200).send();
            })
        }
    })
})

app.post("/login", function(req, res) {
    passport.authenticate("local", function(err, user, info) {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      req.logIn(user, function(err) {
        if (err) {
          return res.status(500).json({ message: "Internal server error" });
        }
        console.log(user);
        if(user.email.endsWith('@crew11.com'))
           return res.status(200).json({isAdmin:true})
        else
           return res.status(200).json({isAdmin:false})
      });
    })(req, res);
  });
  
  

module.exports = app;

