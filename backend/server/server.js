import express from 'express';
import cors from 'cors';
import userRoutes from '../src/service/users/routes/user-routes.js';
import predictRoutes from "../src/service/predict/routes/index.js";
import calculateRoutes from '../src/service/calculate/routes/index.js';
import chatbotRoutes from '../src/service/chatbot/routes/index.js'
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../src/docs/swagger.js';

app.use(cors({ origin: 'https://gizimeal.vercel.app' }));
const app = express();

app.use(express.json());
app.use("/", predictRoutes);
app.use('/calculate', calculateRoutes);
app.use('/users', userRoutes);
app.use("/chatbot", chatbotRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;