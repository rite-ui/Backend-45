const {Readable,Writable} = require("node:stream");

const readableStream = new Readable({
    highWaterMark:2,
    read(){

    }
});

readableStream.on("data",(chunk)=>{
    // console.log(chunk);
    writeableStream.write(chunk)
})

readableStream.push("Hello world my name is Ritesh");

const writeableStream = new Writable({
    write(chunk){
     console.log("writing" , chunk.toString())
    }
})