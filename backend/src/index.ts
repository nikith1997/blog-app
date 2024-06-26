import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import userRoutes from "./routes/UserRoutes"
import postRoutes from "./routes/PostRoutes"
import morgan from 'morgan'
import cors from 'cors'

dotenv.config()

const app = express();
app.use(cors())
const port = process.env.SERVER_PORT || 3000;
app.use(express.json())
app.use(morgan('common'))

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

app.use("/api/user", userRoutes)
app.use("/api/post", postRoutes)

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});