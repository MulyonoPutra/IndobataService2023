import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/app-error';
import productCategorySchema from '../models/product-category.schema';
import { ProductCategory } from '../domain/category';

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await productCategorySchema.find({}).select('-__v');
    return res.status(200).json({
      message: 'Successfully retrieved!',
      data,
    });
  } catch (e) {
    return next(new AppError('Internal Server Error!', 500));
  }
};

export const findById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const data = await productCategorySchema.findOne({ _id: id }).select('-__v') as unknown as ProductCategory;

		return res.status(200).json({
			message: 'Data successfully retrieved',
			data,
		});

	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { name, description } = req.body;
		const newCategory = await productCategorySchema.create({
			name,
			description,
		});

		return res.status(201).json({
			message: 'New Category Created!',
			data: newCategory,
		});
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;

		await productCategorySchema.findByIdAndRemove(id);
		return res.status(200).json({
			message: 'Data successfully removed',
		});
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const { name, description } = req.body;
		await productCategorySchema.findByIdAndUpdate(id, {
			name,
			description,
		});

		return res.status(200).json({
			message: 'Data successfully updated',
		});
		
	} catch (e) {
		return next(new AppError('Internal Server Error!', 500));
	}
};