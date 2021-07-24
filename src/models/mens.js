const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const employswiper = new mongoose.Schema({
    fristname:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        required:true,
        validator(value){
            if(this.validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    gender:{
        type:String,
        required:true,
    },
    age:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    confirmpassword:{
        type:String,
        required:true,
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})


                      // middlewere
employswiper.methods.generatAuthToken = async function(){
    try{
        console.log(this._id);
        const token = jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY);
        console.log(token);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(error){
        res.send('the error path'+ error);
        console.log('the error path'+error);
    }
}



            //  passwor create database
            employswiper.pre("save" ,async function (next){
                if(this.isModified(`password`)){
                    // console.log(`the current password is ${this.password}`);
                    this.password = await bcrypt.hash(this.password, 10);
                    console.log(`the current password is ${this.password}`);
                    this.confirmpassword=await bcrypt.hash(this.password, 10);
                }
                
               next();
            })

// we will created a new collaction
const Register = mongoose.model('Register',employswiper);

module.exports = Register;