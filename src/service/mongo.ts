import mongoose from "mongoose";

const pass = encodeURIComponent(process.env.mongodb_pass || 'cytmEt_x6V@@fq*')
const uri = `mongodb+srv://admin:${pass}@cluster0.xjlfz.mongodb.net/users?retryWrites=true&w=majority`;

mongoose.connect(uri);

const db = mongoose.connection

db.on('connected', function () {
  console.log("Mongoose connected");
})

db.on('error', function (err) {
  console.log("Mongoose error:");
  console.log(err)
})
