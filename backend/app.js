const experss=require("express");
require("dotenv").config()
const app=experss();
const router=require("./routes/router")
const notFound=require("./middleware/not-found")
var cors = require('cors')
const mongoose=require("mongoose")


//middlware
app.use(experss.json({limit: '25mb'}));
app.use(cors())


//routes
app.use("/api",router);
app.use(notFound)

const port=process.env.PORT || 5000;

const start =async()=>{
    try {
        // Connect to MongoDB  
      await  mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
          .then(() => console.log("MongoDB connected ✅"))
          .catch((err) => console.error("MongoDB connection error ❌", err));

     app.listen(port,function(){
            console.log(`server running on port ${port}`);
        })

    } catch (error) {
        console.log(error);
    }
}
start()