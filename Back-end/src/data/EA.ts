import { Building } from './type';

export const EA: Building = {
    name: "EA",
    floors: 7,
    nodes: [
      //L1
      { id: "EA-01-05", x: 765, y: 723, floor: 1 },
      { id: "EA-01-06", x: 806, y: 723, floor: 1 },
      { id: "EA-01-L1", x: 887, y: 723, floor: 1 }
      //L2

    ],
    edges: [
      { from: "A1", to: "A2", distance: 40 },
      { from: "A2", to: "A3", distance: 40 }
    ] 
  };
