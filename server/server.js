import express from 'express';
import cors from 'cors';
import userRoutes from '../src/service/users/routes/user-routes.js';
import predictRoutes from "../src/service/predict/routes/index.js";
import calculateRoutes from '../src/service/calculate/routes/index.js';
import chatbotRoutes from '../src/service/chatbot/routes/index.js'

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use("/api", predictRoutes);
app.use('/api/calculate', calculateRoutes);
app.use('/api/users', userRoutes);
app.use("/api/chatbot", chatbotRoutes);

export default app;