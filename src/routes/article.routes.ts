import { Router } from "express";
import {
    createArticle,
    getAllArticles,
    getArticleById,
    deleteArticle
} from "../controllers/article.controller";
import { verifyToken } from "../middleware";

const router = Router();

router.use(verifyToken);

router.post(
    "/",
 createArticle
 );

router.get("/", 
getAllArticles
);

router.get(
    "/:id",
    getArticleById
     );

router.delete(
    "/:id",
     deleteArticle
     );

export default router;
