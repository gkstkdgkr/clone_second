import "dotenv/config"
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server";

const PORT = process.env.PORT || 4000;

const handleListening = () => console.log(`Server listening on port localhost:${PORT}✨`);

app.listen(PORT, handleListening) // port_number