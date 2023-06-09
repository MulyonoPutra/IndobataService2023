import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/app-error';
import contactSchema from '../models/contact.schema';

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await contactSchema.find({}).select('-__v');
    return res.status(200).json({
      message: 'Successfully retrieved!',
      data,
    });
  } catch (e) {
    return next(new AppError('Internal Server Error!', 500));
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullname, phone, email, message } = req.body;
    const newCategory = await contactSchema.create({
      fullname,
      phone,
      email,
      message,
    });

    return res.status(201).json({
      message: 'New Category Created!',
      data: newCategory,
    });
  } catch (e) {
    return next(new AppError('Internal Server Error!', 500));
  }
};
