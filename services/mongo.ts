const mongoose = require("mongoose");

const pass = process.env.mongo_pass;
const uri = `mongodb+srv://admin:${pass}>@cluster0.xjlfz.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const options = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}

export const mongo = async () => {
  try {
    mongoose.connect(uri, options, () => console.log("Mongoose is connected"))
  } catch (err) {
    console.error(`Mongoose cant connect. ${err}`);
  }  
} 
 