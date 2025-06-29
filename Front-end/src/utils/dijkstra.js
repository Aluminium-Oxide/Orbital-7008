import {edges} from '../data/EA.ts';
const graph = Graph(edges);
function Graph(edges) {
    const graph={};
    for (const edge of edges) {
        const{from,to,distance}=edge;
        if (!graph[from]) graph[from] = [];
        graph[from].push({node: to, distance});}
        return graph;
}

function dijkstra(graph,startNode,endNode) {
    const distances = {};
    const lastNode = {};
    const haveBeen = new Set();
    const notBeen = new Set();
    for (const node in graph){distances[node]=Infinity; lastNode[node]=null; notBeen.add(node);}
    distances[startNode]=0;
    while (notBeen.size>0){
        let currentNode=null;
        for (const node of notBeen) {
            if (currentNode === null || distances[node] < distances[currentNode]) {
                currentNode = node;}}
        if (currentNode === endNode) break;
        notBeen.delete(currentNode);
        haveBeen.add(currentNode);
        for (const neighbor of graph[currentNode]||[]){
            if (haveBeen.has(neighbor.node)) continue;
            const sum=distances[currentNode] + neighbor.distance;
            if (sum < distances[neighbor.node]) {
                distances[neighbor.node] = sum;
                lastNode[neighbor.node] = currentNode;}}
            }
    const path=[]; 
    let currentNode=endNode;
    while (currentNode){
        path.unshift(currentNode);
        currentNode = lastNode[currentNode];}
    return {path, distance: distances[endNode]};
    }

