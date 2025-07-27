export interface Node {
  id: string;
  x: number;
  y: number;
}

export interface Edge {
  from: string;
  to: string;
  distance: number;
}

export interface Level {
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

const API_BASE_URL = 'http://localhost:3001/api';

export class BuildingService {
  static async getBuildings(): Promise<string[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/buildings`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return Object.keys(data);
    } catch (error) {
      console.error('get building list fail:', error);
      return [];
    }
  }

  static async getBuilding(buildingName: string): Promise<Building | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/buildings/${buildingName}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`get building ${buildingName} info fail:`, error);
      return null;
    }
  }

  static async getBuildingLevel(buildingName: string, level: string): Promise<Level | null> {
    try {
      const building = await this.getBuilding(buildingName);
      if (!building) {
        return null;
      }
      return building.levels[level] || null;
    } catch (error) {
      console.error(`get building ${buildingName} floor ${level} info fail:`, error);
      return null;
    }
  }

  static async searchLocations(query: string): Promise<Array<{building: string, level: string, node: Node}>> {
    try {
      const buildings = await this.getBuildings();
      const results: Array<{building: string, level: string, node: Node}> = [];
      
      for (const buildingName of buildings) {
        const building = await this.getBuilding(buildingName);
        if (!building) continue;
        
        for (const [levelName, level] of Object.entries(building.levels)) {
          const matchingNodes = level.nodes.filter(node => 
            node.id.toLowerCase().includes(query.toLowerCase())
          );
          
          matchingNodes.forEach(node => {
            results.push({
              building: buildingName,
              level: levelName,
              node: node
            });
          });
        }
      }
      
      return results;
    } catch (error) {
      console.error('search loction fail:', error);
      return [];
    }
  }

  static async getPath(from: string, to: string): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/path`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ from, to }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('get route fail:', error);
      return null;
    }
  }
} 