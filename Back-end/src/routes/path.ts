import { Router, Request, Response } from 'express';

const router = Router();

// 定义请求体的类型
interface PathRequestBody {
  building: string;
  from: string;
  to: string;
}

// 示例建筑图数据
const buildingGraphs: Record<string, {
  nodes: string[];
  edges: { from: string; to: string; distance: number }[];
}> = {
  tlab: {
    nodes: ["A1", "A2", "A3"],
    edges: [
      { from: "A1", to: "A2", distance: 40 },
      { from: "A2", to: "A3", distance: 40 },
      { from: "A1", to: "A3", distance: 100 }  // 多路径，测试最短路径
    ]
  }
};

// 最短路径算法Z
function dijkstra(
  nodes: string[],
  edges: { from: string; to: string; distance: number }[],
  start: string,
  end: string
): { path: string[]; distance: number } | null {
  const distances: Record<string, number> = {};
  const previous: Record<string, string | null> = {};
  const unvisited = new Set(nodes);

  // 初始化所有节点
  for (const node of nodes) {
    distances[node] = node === start ? 0 : Infinity;
    previous[node] = null;
  }

  while (unvisited.size > 0) {
    const current = [...unvisited].reduce((a, b) =>
      distances[a] < distances[b] ? a : b
    );
    unvisited.delete(current);

    if (current === end) break;

    for (const edge of edges) {
      if (edge.from === current && unvisited.has(edge.to)) {
        const alt = distances[current] + edge.distance;
        if (alt < distances[edge.to]) {
          distances[edge.to] = alt;
          previous[edge.to] = current;
        }
      }
    }
  }

  if (distances[end] === Infinity) return null;

  const path: string[] = [];
  for (let at: string | null = end; at; at = previous[at]) {
    path.unshift(at);
  }

  return { path, distance: distances[end] };
}

// POST /api/path
router.post('/', (req: Request, res: Response): void => {
  const { building, from, to } = req.body;

  if (!building || !from || !to) {
    res.status(400).json({ error: 'Missing parameters' });
    return;
  }

  const graph = buildingGraphs[building.toLowerCase()];
  if (!graph) {
    res.status(404).json({ error: 'Building not found' });
    return;
  }

  const result = dijkstra(graph.nodes, graph.edges, from, to);
  if (!result) {
    res.status(400).json({ error: 'Path not found' });
    return;
  }
  
  res.json(result);
});

export default router;
