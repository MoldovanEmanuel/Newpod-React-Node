import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';

import formsRouter   from './routes/forms';
import reviewsRouter from './routes/reviews';
import adminRouter   from './routes/admin';

dotenv.config();

const app        = express();
const PORT       = process.env.PORT      ?? 3001;
const CLIENT_URL = process.env.CLIENT_URL ?? 'http://localhost:5173';

const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [CLIENT_URL]
  : [CLIENT_URL, 'http://localhost:5173', 'http://localhost:4173'];
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/forms',   formsRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/admin',   adminRouter);

if (process.env.NODE_ENV === 'production') {
  const clientBuild = path.join(__dirname, '../../client/dist');
  app.use(express.static(clientBuild));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(clientBuild, 'index.html'));
  });
}

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

export default app;
