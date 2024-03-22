import express from "express";
import { PORT } from "./config";

// Routes
import authRoutes from "./routes/auth.routes";
import tasksRoutes from "./routes/article.routes";

export class Application {
  app: express.Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/api/v1/auth", authRoutes);
    this.app.use("/api/v1/article", tasksRoutes);

  }

  start(): void {
    this.app.listen(PORT, () => {
      console.log("Server is running at", PORT);
    });
  }
}
