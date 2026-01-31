const path = require("node:path");
const fs = require("node:fs")

// console.log(__filename);
// console.log(__dirname);

//* Custom paths 

//  const customPath = path.join(__dirname,"data","students","data.json");
//  fs.mkdirSync(path.dirname(customPath),{recursive:true});

//  fs.mkdir(path.dirname(path.join(__dirname, "async", "students", "data.json")), {recursive:true} , (err)=>{
//     console.log(err)
// })




const filename = path.join(__dirname,"data","students","data.json");
console.log(path.parse(filename))

console.log(path.resolve(filename))

console.log(path.extname(filename))

console.log(path.basename(filename))

console.log(path.dirname(filename))