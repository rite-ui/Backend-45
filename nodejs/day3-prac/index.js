const fs = require("node:fs");

//* 1. write file ( sync & async)

// fs.writeFileSync("./data.txt","Hello world from Ritesh");

// fs.writeFile("./data-async.txt","Hello from async side",(err)=>{
//     console.log(err);
// });

//* 2. readifle , readfilesync

// const res = fs.readFileSync("./data.txt","utf-8");
// console.log(res);

//try and catch 

// try {
//   const data = fs.readFileSync("./data.txt", "utf-8");
//   console.log(data);
// } catch (err) {
//   console.log("File nahi mili 😢");
// }

// fs.readFile("./data-async.txt","utf-8",(err , data)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(data)
//     }
// });


// fs.appendFileSync("./data.txt","\nHello yadav ji\n")

// fs.appendFile("./data-async.txt"," hello ji kaise ho\n",(err)=>{
//     console.log(err);
// });

// fs.cpSync("./data-async.txt" , "./data-async-copy.txt")

// fs.unlinkSync("./data-async-copy.txt")

console.log(fs.statSync("./data.txt"));