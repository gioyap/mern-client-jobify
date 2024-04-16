import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
import { nanoid } from 'nanoid';
import jobRouter from './routes/jobRouter.js'
import mongoose from 'mongoose';
import 'express-async-errors';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';

// try {
//   const response = await fetch(
//     'https://www.course-api.com/react-useReducer-cart-project'
//   );
//   const cartData = await response.json();
//   console.log(cartData);
// } catch (error) {
//   console.log(error);
// }
const port = process.env.PORT || 5100;

// Middleware Order: Ensure that middleware is set up before defining routes. 
// This is to make sure that the requests are properly parsed and handled.
//middleware setup
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//middleware
app.use(express.json()); //is necessary if your application expects JSON data in the request body
app.use(morgan('dev')); // it will log incoming requests to the console with colored status codes

//routes - this is necessary to have multiple jobRouter in this order
// place here at below, so that the create and update of job will work
app.use('/api/v1/jobs', jobRouter);
app.use(errorHandlerMiddleware);


//get all 
app.get('/', (req, res) => {
  res.send('Hello World');
});

//post
app.post('/', (req, res) => {
  console.log(req);
  res.json({ message: 'Data received', data: req.body });
});

// get all jobs
app.get('/api/v1/jobs', (req, res) => {
  res.status(200).json({ jobs });
});

// CREATE JOB
app.post('/api/v1/jobs', (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(400).json({ msg: 'please provide company and position' });
  }
  const id = nanoid(10);
  // console.log(id);
  const job = { id, company, position };
  jobs.push(job);
  res.status(200).json({ job });
});

// GET SINGLE JOB
app.get('/api/v1/jobs/:id', (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  res.status(200).json({ job });
});

// UPDATE JOB
app.patch('/api/v1/jobs/:id', (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(400).json({ msg: 'please provide company and position' });
  }
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }

  job.company = company;
  job.position = position;
  res.status(200).json({ msg: 'job modified', job });
});

// DELETE JOB
app.delete('/api/v1/jobs/:id', (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  const newJobs = jobs.filter((job) => job.id !== id);
  jobs = newJobs;

  res.status(200).json({ msg: 'job deleted' });
});

// MongoDB connection and server start
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}

//not found middleware
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});
//error middleware
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: 'Invalid JSON payload' });
});

