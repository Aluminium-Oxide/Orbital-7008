import express from 'express';
import cors from 'cors';
import buildingRoutes from './routes/building';
import pathRoute from './routes/path';
import path from 'path';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/buildings', buildingRoutes);
app.use('/api/path', pathRoute);

app.get('/', (req, res) => {
  res.send('Hello from Express + TypeScript!');
});

app.use(express.static(path.join(__dirname, '../../Front-end/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../Front-end/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



