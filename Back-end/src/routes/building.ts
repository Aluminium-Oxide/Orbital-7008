import { Router } from 'express';

const router = Router();

const buildingData: Record<string, {
  name: string;
  floors: number;
  nodes: { id: string; x: number; y: number }[];
  edges: { from: string; to: string; distance: number }[];
}> = {
  "EA": {
    name: "EA",
    floors: 3,
    nodes: [
      { id: "A1", x: 10, y: 20 },
      { id: "A2", x: 50, y: 20 },
      { id: "A3", x: 50, y: 60 }
    ],
    edges: [
      { from: "A1", to: "A2", distance: 40 },
      { from: "A2", to: "A3", distance: 40 }
    ]
  }
};

router.get('/:buildingName', (req, res) => {
  const { buildingName } = req.params;
  const data = buildingData[buildingName.toLowerCase()];
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ error: "Building not found" });
  }
});

export default router;
