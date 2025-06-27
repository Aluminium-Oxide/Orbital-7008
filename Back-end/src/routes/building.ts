import { Router } from 'express';
import { buildingData } from '../data/data';

const router = Router();

<<<<<<< HEAD
router.get('/:buildingName', (req, res) => {
  const key = req.params.buildingName.toUpperCase();
  const data = buildingData [key];
  if (!data) {
=======
const buildingData: Record<string, {
  name: string;
  floors: number;
  levels:Record<string,{
    image: string;
    bounds: [[number, number], [number, number]];
    nodes: { id: string; x: number; y: number }[];
    edges: { from: string; to: string; distance: number }[];
  }>
}> = {
  "EA": {
    name: "EA",
    floors: 7,
    levels:{
      "L1":
      {image:"/EAL1.png",
       bounds: [[0, 0], [990, 1424]],
       nodes: [
          { id: "LT7", x: 1056, y: 525 },
          { id: "EA", x: 1052, y: 312 },
          { id: "EA-04-05", x: 768, y: 270 }],
        edges: [
          { from: "LT7", to: "EA", distance: 40 },
          { from: "A2", to: "A3", distance: 40 }]},    
      "L2":
      {image:"/EAL2.png",
       bounds: [[0, 0], [1640, 2360]],
       nodes: [
          { id: "EA-02-09", x: 972, y: 433 },
          { id: "EA-02-10", x: 1023, y: 433 },
          { id: "EA-02-11", x: 1147, y: 433 },
          { id: "EA-02-14", x: 1293, y: 470 },
          { id: "EA-02-15", x: 1152, y: 470 },
          { id: "EA-02-16", x: 1018, y: 470 },
          { id: "EA-02-17", x: 982, y: 470 },
          { id: "EA-02-18", x: 736, y: 457 },
          { id: "EA-02-21", x: 1403, y: 871 },
          ],
        edges: [
          { from: "A1", to: "A2", distance: 40 },
          { from: "A2", to: "A3", distance: 40 }]},
      "L3":
      {image:"/EAL3.png",
       bounds: [[0, 0], [1640, 2360]],
       nodes:[
        
        {id: "EA-03-01", x: 694, y: 537},
        {id: "EA-03-02", x: 694, y: 537},
        {id: "EA-03-04", x: 694, y: 537},
        {id: "EA-03-05", x: 753, y: 537},
        {id: "EA-03-06", x: 977, y: 537},
        {id: "EA-03-07", x: 1023, y: 537},
        {id: "EA-03-08", x: 1102, y: 537},
        {id: "EA-03-09", x: 1216, y: 537},
        {id: "EA-03-node1", x: 1483, y: 537},
        {id: "EA-03-lift1", x: 1483, y: 440},
        {id: "EA-03-10", x: 1555, y: 537}, 
        {id: "EA-03-node2", x: 1664, y: 691},
        {id: "EA-03-node3", x: 1483, y: 870},
        {id: "EA-03-lift2", x: 1483, y: 940},
        {id: "EA-03-node4", x: 1307, y: 870},
        {id: "EA-03-11", x: 1307, y: 1010}],   
        
               
       edges:[
        { from: "EA-03-02", to: "EA-03-04", distance: 0 },
        { from: "EA-03-04", to: "EA-03-05", distance: 59},
        { from: "EA-03-05", to: "EA-03-06", distance: 224 },
        { from: "EA-03-06", to: "EA-03-07", distance: 46 },
        { from: "EA-03-07", to: "EA-03-08", distance: 79 },
        { from: "EA-03-08", to: "EA-03-09", distance: 114 },
        { from: "EA-03-09", to: "EA-03-node1", distance: 267 },
        { from: "EA-03-node1", to: "EA-03-lift1", distance: 97 },
        { from: "EA-03-node1", to: "EA-03-10", distance: 72 },
        { from: "EA-03-10", to: "EA-03-node2", distance: 189 },
        { from: "EA-03-node2", to: "EA-03-node3", distance: 255 },
        { from: "EA-03-node3", to: "EA-03-lift2", distance: 70 },
        { from: "EA-03-node3", to: "EA-03-node4", distance: 176 },
        { from: "EA-03-node4", to: "EA-03-11", distance: 140 },
        //backwards 
        { from: "EA-03-11", to: "EA-03-node4", distance: 140 },
        { from: "EA-03-node4", to: "EA-03-node3", distance: 176 },
        { from: "EA-03-node3", to: "EA-03-lift2", distance: 70 },
        { from: "EA-03-node3", to: "EA-03-node2", distance: 255 },
        { from: "EA-03-node2", to: "EA-03-10", distance: 189 },
        { from: "EA-03-10", to: "EA-03-node1", distance: 72 },
        { from: "EA-03-node1", to: "EA-03-lift1", distance: 97 },
        { from: "EA-03-node1", to: "EA-03-09", distance: 267 },
        { from: "EA-03-09", to: "EA-03-08", distance: 114 },
        { from: "EA-03-08", to: "EA-03-07", distance: 79 },
        { from: "EA-03-07", to: "EA-03-06", distance: 46 },
        { from: "EA-03-06", to: "EA-03-05", distance: 224 },
        { from: "EA-03-05", to: "EA-03-04", distance: 59 },
        { from: "EA-03-04", to: "EA-03-02", distance: 0 },]},
       }
      }
};

router.get('/:buildingName', (req, res) => {
  const { buildingName } = req.params;
  const data = buildingData[buildingName];
  if (data) {
    res.json(data);
  } else {
>>>>>>> 61bd2add (save my local work)
    res.status(404).json({ error: "Building not found" });
  }
  res.json(data);
});

export default router;
