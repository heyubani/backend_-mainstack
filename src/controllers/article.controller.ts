import { Request, Response } from 'express';
import articleSchema from '../models/article.model';
import { CreateTaskType, createTaskSchema } from '../schemas/task.schema';
const { ObjectId } = require('mongoose').Types;
// Create a new article
export const createArticle = async (
  req: Request<{}, {}, CreateTaskType>,
  res: Response
) => {
  try {
    const user = (req as any).user;
    const { title, content } = createTaskSchema.parse(req.body);
    // Check if an article with the same title already exists
    const existingArticle = await articleSchema.findOne({ title, 'user._id': user._id });
    if (existingArticle) {
      return res.status(409).json({
        status: 'success',
        code: 409,
        message: `Article with this title ${title} already exists`
      });
    }

    // Create the article if it doesn't already exist
    const article = await articleSchema.create({ title, content, createdBy: user._id, });
    return res.status(201).json({
      status: 'success',
      code: 201,
      message: 'Article created successfully.',
      data: article
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

// Retrieve all articles
export const getAllArticles = async (
  req: Request,
  res: Response
) => {
  try {
    const { page = 1, perPage = 10, startDate, endDate } = req.query;
    const parsedPage = parseInt(page as string);
    const parsedLimit = parseInt(perPage as string);

    let query: any = {};
    if (startDate && endDate) {
      query.createdAt = { $gte: new Date(startDate as string), $lte: new Date(endDate as string) };
    } else if (startDate) {
      query.createdAt = { $gte: new Date(startDate as string) };
    } else if (endDate) {
      query.createdAt = { $lte: new Date(endDate as string) };
    } else {
      query = {}
    }

    const articles = await articleSchema.find(query)
      .skip((parsedPage - 1) * parsedLimit)
      .limit(parsedLimit);

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Articles retrieved successfully.',
      data: articles
    });
  } catch (error) {
    throw new Error('Failed to retrieve articles');
  }
};

// Retrieve a single article by ID
export const getArticleById = async (
  req: Request,
  res: Response
) => {
  try {
    const article = await articleSchema.findOne({ _id: req.params.id }).lean();
    if (!article) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Article not found',
      });
    }
    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Article fetch successfully.',
      data: article
    });
  } catch (error) {
    throw new Error(`Failed to retrieve article::: ${error.message}`);
  }
};

// Delete an article by ID
export const deleteArticle = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const article = await articleSchema.findOne({ _id: id }).lean();
    if (!article) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Article not found',
      });
    }
    await articleSchema.findByIdAndDelete(id).lean();
    res.status(200).json({
      status: 'success',
      message: 'Article deleted successfully',
    });
  } catch (error) {
    throw new Error(`Failed to delete article:: ${error.message}`);
  }
};
