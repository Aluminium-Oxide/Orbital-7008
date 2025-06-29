interface Node {
  id: string;
  x: number;
  y: number;
}

interface Edge {
  from: string;
  to: string;
  distance: number;
}

export interface levels {
  image: string;
  bounds: [[number, number], [number, number]];
  nodes: Node[];
  edges: Edge[];
}

export interface Building {
  name: string;
  floors: number;
  levels:Record<string, levels>
}