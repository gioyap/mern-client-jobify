import mongoose from 'mongoose';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
const JobSchema = new mongoose.Schema(
  {
    company: String,
    position: String,
    jobStatus: {
      type: String,
      enum: Object.values(JOB_STATUS),
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPE),
    },
    jobLocation: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Job', JobSchema);