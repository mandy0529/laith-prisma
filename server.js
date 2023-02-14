import express from 'express';
import userRouter from './routes/userRoute.js';
import postRouter from './routes/postRoute.js';
// --------------------------------------

const app = express();
const port = 5000;

app.use(express.json());

// routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/post', postRouter);

app.get('/', (req, res) => {
  res.send('I am working');
});

//  start server
const startServer = () => {
  try {
    app.listen(port, console.log(`server started on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
