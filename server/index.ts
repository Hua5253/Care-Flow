import express from 'express';
import userRouter from './routes/users';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: "https://care-flow.vercel.app",
    credentials: true
}))

app.use(express.json());

app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.send("Many Users");
})

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})