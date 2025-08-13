import { Router, Request, Response } from 'express';
import { buildingData } from '../data/data';
import { linkNodes, interlinkEdges } from '../data/linknodes';

const router = Router();

interface PathRequestBody {
  building?: string;
  level?: string;
  from: string;
  to: string;
  toBuilding?: string;
  toLevel?: string;
}

// Dijkstra
function dijkstra(
  nodes: string[],
  edges: { from: string; to: string; distance: number }[],
  start: string,
  end: string
): { path: string[]; distance: number } | null {
  const distances: Record<string, number> = {};
  const previous: Record<string, string | null> = {};
  const unvisited = new Set(nodes);

  for (const node of nodes) {
    distances[node] = node === start ? 0 : Infinity;
    previous[node] = null;
  }

  while (unvisited.size > 0) {
    let current = '';
    let minDistance = Infinity;
    for (const node of unvisited) {
      if (distances[node] < minDistance) {
        minDistance = distances[node];
        current = node;
      }
    }

    if (current === '' || minDistance === Infinity) break;
    
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
      if (edge.to === current && unvisited.has(edge.from)) {
        const alt = distances[current] + edge.distance;
        if (alt < distances[edge.from]) {
          distances[edge.from] = alt;
          previous[edge.from] = current;
        }
      }
    }
  }

  if (distances[end] === Infinity) return null;

  const path: string[] = [];
  for (let at: string | null = end; at; at = previous[at]) {
    path.unshift(at);
  }

  const optimizedPath: string[] = [];
  for (let i = 0; i < path.length; i++) {
    if (i === 0 || path[i] !== path[i-1]) {
      optimizedPath.push(path[i]);
    }
  }

  return { path: optimizedPath, distance: distances[end] };
}

function getBuildingNodes(buildingName: string, level?: string): string[] {
  const building = buildingData[buildingName.toUpperCase()];
  if (!building) return [];

  if (level) {
    const levelData = building.levels[level];
    return levelData ? levelData.nodes.map(node => node.id) : [];
  } else {
    const allNodes: string[] = [];
    for (const levelData of Object.values(building.levels)) {
      allNodes.push(...levelData.nodes.map(node => node.id));
    }
    return allNodes;
  }
}

function getBuildingEdges(buildingName: string, level?: string): { from: string; to: string; distance: number }[] {
  const building = buildingData[buildingName.toUpperCase()];
  if (!building) return [];

  if (level) {
    const levelData = building.levels[level];
    return levelData ? levelData.edges : [];
  } else {
    const allEdges: { from: string; to: string; distance: number }[] = [];
    for (const levelData of Object.values(building.levels)) {
      allEdges.push(...levelData.edges);
    }
    return allEdges;
  }
}

function getAllNodesAndEdges() {
  const allNodes: string[] = [];
  const allEdges: { from: string; to: string; distance: number }[] = [];

  for (const building of Object.values(buildingData)) {
    for (const levelData of Object.values(building.levels)) {
      allNodes.push(...levelData.nodes.map(node => node.id));
      allEdges.push(...levelData.edges);
    }
  }
  
  for (const linkNode of linkNodes) {
    if (!allNodes.includes(linkNode.id)) {
      allNodes.push(linkNode.id);
    }
  }
  
  for (const interlinkEdge of interlinkEdges) {
    allEdges.push({
      from: interlinkEdge.from,
      to: interlinkEdge.to,
      distance: interlinkEdge.weight
    });
  }
  
  const optimizedEdges = allEdges.filter(edge => {
    if (edge.distance === 0 && (edge.from.includes('lift') || edge.to.includes('lift'))) {
      return true;
    }
    return edge.distance > 0;
  });
  
  return { allNodes, allEdges: optimizedEdges };
}

router.post('/', (req: Request, res: Response): void => {
  const { from, to, building, level, toBuilding, toLevel } = req.body;
  if (!from || !to) {
    res.status(400).json({ error: 'important parameter lacking: from, to' });
    return;
  }
  
  console.log('Path request:', { from, to, building, level, toBuilding, toLevel });
  
  const { allNodes, allEdges } = getAllNodesAndEdges();
  
  // Log available nodes for debugging
  console.log('Available nodes count:', allNodes.length);
  console.log('Available edges count:', allEdges.length);
  
  if (!allNodes.includes(from)) {
    res.status(400).json({ 
      error: `starting point '${from}' not found`, 
      availableNodes: allNodes.slice(0, 20), // Show first 20 nodes for debugging
      totalNodes: allNodes.length
    });
    return;
  }
  if (!allNodes.includes(to)) {
    res.status(400).json({ 
      error: `destination '${to}' not found`, 
      availableNodes: allNodes.slice(0, 20), // Show first 20 nodes for debugging
      totalNodes: allNodes.length
    });
    return;
  }
  
  const result = dijkstra(allNodes, allEdges, from, to);
  if (!result) {
    res.status(400).json({ 
      error: 'no path found', 
      from, 
      to,
      availableNodes: allNodes.slice(0, 20),
      totalNodes: allNodes.length
    });
    return;
  }
  
  console.log('route planning result:', {
    from,
    to,
    path: result.path,
    distance: result.distance,
    pathLength: result.path.length
  });
  
  res.json({ ...result, from, to });
});

router.get('/nodes/:building', (req: Request, res: Response): void => {
  const { building } = req.params;
  const { level } = req.query;

  if (!buildingData[building.toUpperCase()]) {
    res.status(404).json({ 
      error: 'building not found',
      availableBuildings: Object.keys(buildingData)
    });
    return;
  }

  const nodes = getBuildingNodes(building, level as string);
  res.json({
    building,
    level: level || 'all',
    nodes,
    count: nodes.length
  });
});

router.get('/buildings', (req: Request, res: Response): void => {
  const buildings = Object.keys(buildingData).map(key => ({
    name: buildingData[key].name,
    floors: buildingData[key].floors,
    levels: Object.keys(buildingData[key].levels)
  }));
  
  res.json({
    buildings,
    count: buildings.length
  });
});

router.get('/all-nodes', (req: Request, res: Response): void => {
  const { allNodes } = getAllNodesAndEdges();
  
  res.json({
    nodes: allNodes,
    count: allNodes.length
  });
});

router.get('/debug/:from/:to', (req: Request, res: Response): void => {
  const { from, to } = req.params;
  const { allNodes, allEdges } = getAllNodesAndEdges();
  
  if (!allNodes.includes(from)) {
    res.status(400).json({ error: `start point '${from}' not found`, availableNodes: allNodes });
    return;
  }
  if (!allNodes.includes(to)) {
    res.status(400).json({ error: `destination '${to}' not found`, availableNodes: allNodes });
    return;
  }
  
  const relevantEdges = allEdges.filter(edge => 
    edge.from === from || edge.to === from || 
    edge.from === to || edge.to === to
  );
  
  res.json({
    from,
    to,
    totalNodes: allNodes.length,
    totalEdges: allEdges.length,
    relevantEdges,
    allNodes: allNodes.slice(0, 50)
  });
});

export default router;
