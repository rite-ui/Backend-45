const http = require("node:http");
const fs = require("node:fs");
const {Transform} = require("node:stream")

const server = http.createServer((req,res)=>{
    //* Downloading files ( bad way)

    // fs.readFile("./sample.txt","utf-8",(err , data)=>{
    //     if(err){
    //         console.log(err);
    //         res.end();
    //     }
    //     else{
    //         res.end(data);
    //     }
    // })

      //* 2. Downloading files ( good way)

    //   const readstream = fs.createReadStream("./sample.txt","utf-8")

    //   readstream.on("data",(chunk)=>{
    //     res.write(chunk);
    //   })

    //   readstream.on("end",()=>{
    //     res.end();
    //   })

// * Copy file from sample2.txt --> output.txt ( bad appraoch  , good appraoch)


 //*bad way

   
// const rs = fs.createReadStream("./sample.txt");
// const ws = fs.createWriteStream("./output.txt");

// rs.on("data", (chunk) => {
//   ws.write(chunk);   // ❌ ignoring backpressure
// });

// rs.on("end", () => {
//   ws.end();
// });

//* good way

// const rs = fs.createReadStream("./sample.txt");
// const ws = fs.createWriteStream("./output.txt");

// rs.on("data", (chunk) => {
//   if (!ws.write(chunk)) {
//     rs.pause(); // ✅ stop reading when buffer is full
//   }
// });

// ws.on("drain", () => {
//   rs.resume(); // ✅ resume when buffer is free
// });

// rs.on("end", () => {
//   ws.end();
// });





//bad way

//   sampleFileStream.on("data", (chunk) => {
//     const modified = chunk
//       .toString()
//       .toUpperCase()
//       .replaceAll(/SURAJ/gi, "SIGMA");

//     outputfileStream.write(modified);
//   });

 const sampleFileStream = fs.createReadStream("./sample2.txt");
  const outputfileStream = fs.createWriteStream("./output2.txt");

  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
     const modified =  chunk.toString().toUpperCase().replaceAll(/SURAJ/gi, "Ashwin");
      callback(null , modified)
    },
  });

  sampleFileStream.pipe(transformStream).pipe(outputfileStream).on("finish" , ()=>{
    console.log('Done✅')
})

});



server.listen(3000,()=>{ 
    console.log("Server is listening on port 3000");
});