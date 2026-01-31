import express from "express";

const app = express();

app.use(express.json());


let aiTools = [
  {
    id: "tool_001",
    name: "ChatGPT",
    category: "AI Assistant",
    company: "OpenAI",
    pricing: "Freemium",
    rating: 4.8,
    tags: ["chat", "nlp"],
    isActive: true
  }
];

//*post

app.post("/tools",(req , res)=>{
    const {name,category,company} = req.body;
    

    if(!name|| !category|| !company){
        return res.status(400).json({
            message:"Required fields is missing"
        });
    }

    const newTool ={
        id:`tool_${Date.now()}`,
        name,
        category,
        company,
        pricing: "Freemium",
        rating: 0,
        tags: [],
        isActive: true
    };
    aiTools.push(newTool);
    res.status(201).json(newTool);
});

//*get

app.get("/tools",(req ,res)=>{
    res.json(aiTools);
});

//*get id

app.get("/tools/:id",(req, res)=>{
    const tool = aiTools.find(
        t=> t.id === req.params.id
    )
    if (!tool){
        return res.status(404).json({
            message:"Tool not found"
        })
    }
    
    res.json(tool);
});

//*put

app.put("/tools/:id",(req, res)=>{
    const tool = aiTools.findIndex(
        t=> t.id === req.params.id
    )
    if (index===-1){
        return res.status(404).json({
            message:"Tool not found"
        })
    }

    aiTools[index] = {
        ...aiTools[index],
        ...req.body
    };
    
    res.json(tool);
});

//*delete

app.delete("/tools/:id", (req, res) => {
  aiTools = aiTools.filter(
    t => t.id !== req.params.id
  );

  res.json({
    message: "Tool deleted successfully"
  });
});

app.listen(3000,()=>{
    console.log("server is up and running🐇")
})