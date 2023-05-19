import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";


const PORT = 4000

const app = express();
const logger = morgan("dev");
app.use(logger)


app.use("/",globalRouter);
app.use("/videos",videoRouter);
app.use("/users",userRouter);


// const home = (req, res)=> {
//   console.log("I will respond.")
//   return res.send("www.naver.com");
// }
// const login = (req,res)=>{
//   return res.send("login")
// }

const handleListening = () => console.log(`Server listening on port localhost:${PORT}✨`);

app.listen(PORT, handleListening) // port_numberb
