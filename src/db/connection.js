const mongoose = require("mongoose");


 mongoose.connect('mongodb://localhost:27017/swiper', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(()=>{
    console.log('connection successfull')
}).catch((e)=>{
    console.log('Not Connection')
});


