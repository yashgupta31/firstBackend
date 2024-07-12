const express= require("express");
const connection= require("./config/db")
const userRouter= require("./routes/user.route")
const noteRouter= require("./routes/note.route")
const dotenv= require("dotenv")
dotenv.config();

const PORT= process.env.PORT
const app= express();
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