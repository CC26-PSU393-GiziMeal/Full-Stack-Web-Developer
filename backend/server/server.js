import express from 'express';
import cors from 'cors';
import userRoutes from '../src/service/users/routes/user-routes.js';
import predictRoutes from "../src/service/predict/routes/index.js";
import calculateRoutes from '../src/service/calculate/routes/index.js';
import chatbotRoutes from '../src/service/chatbot/routes/index.js'
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../src/docs/swagger.js';

const app = express();
app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Railway hidup"
  });
});

app.use(cors({ origin: 'https://gizimeal.vercel.app' }));
app.use(express.json());
app.use("/", predictRoutes);
app.use('/calculate', calculateRoutes);
app.use('/users', userRoutes);
app.use("/chatbot", chatbotRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;