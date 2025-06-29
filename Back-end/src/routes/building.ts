import { Router } from 'express';
import { buildingData } from '../data/data';

const router = Router();


router.get('/:buildingName', (req, res) => {
  const key = req.params.buildingName.toUpperCase();
  const data = buildingData [key];
  if (!data) {
    res.status(404).json({ error: "Building not found" });
  }
  res.json(data);
});

export default router;
