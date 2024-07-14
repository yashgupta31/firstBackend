const express= require("express");
const connection= require("./config/db")
const userRouter= require("./routes/user.route")
const noteRouter= require("./routes/note.route")
const cors = require("cors"); // Import cors
const dotenv= require("dotenv")
dotenv.config();

const PORT= process.env.PORT || 4000
const app= express();

// const corsOptions = {
//     origin: '*',  // Allow this origin
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow these methods
//     allowedHeaders: ['Content-Type', 'Authorization'],  // Allow these headers
// };

app.use(cors());
app.options('*', cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());
app.use('/user',userRouter)
app.use('/note', noteRouter)


app.get('/', (req, res)=>{
    res.send('health check')
})

app.listen(PORT, async()=>{
    try {
        await connection;
        console.log(`Server is running on port ${PORT} & db connected`)
    } catch (error) {
        console.log(`error in connecting to db ${error}`)
    }
    
})