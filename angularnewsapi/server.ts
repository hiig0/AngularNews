import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/routes';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas protegidas
app.use('/api', router);

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});
