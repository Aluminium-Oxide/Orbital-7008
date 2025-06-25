import express from 'express';
import cors from 'cors';
import buildingRoutes from './routes/building';
import pathRoute from './routes/path';

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use('/api/buildings', buildingRoutes);
app.use('/api/path', pathRoute);

app.get('/', (req, res) => {
  res.send('Hello from Express + TypeScript!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
