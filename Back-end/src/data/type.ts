export interface Node {
  id: string;
  x: number;
  y: number;
}

export interface LinkNode extends Node{
  building: string;
  level: string;
}

export interface Edge {
  from: string;
  to: string;
  distance: number;
}

export interface Level{
  image: string;
  bounds: [[number, number], [number, number]];
  nodes: Node[];
  edges: Edge[];
}

export interface Building {
  name: string;
  floors: number;
  levels: Record<string, Level>;
}

export interface InterlinkEdge {
  from: string;
  to: string;
  weight: number;
}
