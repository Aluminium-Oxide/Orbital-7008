interface Node {
  id: string;
  x: number;
  y: number;
  floor: number;
}

interface Edge {
  from: string;
  to: string;
  distance: number;
}

export interface Building {
  name: string;
  floors: number;
  nodes: Node[];
  edges: Edge[];
}
