import { nanoid } from 'nanoid';
import Job from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';

export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find({});
        res.status(StatusCodes.OK).json({ jobs });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
    }
};

export const createJob = async (req, res) => {
    const { company, position } = req.body;
    try {
        const job = await Job.create({ company, position });
        res.status(StatusCodes.CREATED).json({ job });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
    }
};

export const getJob = async (req, res) => {
    const { id } = req.params;
    try {
        const job = await Job.findById(id);
        if (!job) {
            throw new NotFoundError(`No job with id: ${id}`);
        }
        res.status(StatusCodes.OK).json({ job });
    } catch (error) {
        console.error(error);
        if (error instanceof NotFoundError) {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: error.message });
        }
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
    }
};

export const updateJob = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedJob) {
            throw new NotFoundError(`No job with id: ${id}`);
        }
        res.status(StatusCodes.OK).json({ job: updatedJob });
    } catch (error) {
        console.error(error);
        if (error instanceof NotFoundError) {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: error.message });
        }
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
    }
};

export const deleteJob = async (req, res) => {
    const { id } = req.params;
    try {
        const removedJob = await Job.findByIdAndDelete(id);
        if (!removedJob) {
            throw new NotFoundError(`No job with id: ${id}`);
        }
        res.status(StatusCodes.GONE).json({ msg: 'Job deleted' });
    } catch (error) {
        console.error(error);
        if (error instanceof NotFoundError) {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: error.message });
        }
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
    }
};
