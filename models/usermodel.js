
const mongoose= require("mongoose")
mongoose.connect ('mongodb://127.0.0.1:27017/printrest2');
const plm=require('passport-local-mongoose')
const database=new mongoose.Schema({
username:{
    type:String,
    require:true,
    unique:true,
},
email:{
    type:String,
    require:true,
    unique:true,
},
posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Post"
  } ],

fullname:String,

password:{
    type:String,
   
}
});
database.plugin(plm);
module.exports=mongoose.model('User' ,database)