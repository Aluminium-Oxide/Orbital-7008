import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';  // import CSS
import MapComponent from './Component/MapComponent';
import './index.css'
import './App.css'; // import custom styles
import { LINK_NODE_IDS } from './data/linknodes';

function splitPathBySegments(path: string[], nodeIdToLevel: (id: string) => {building: string, level: string}) {
  if (!path || path.length === 0) return [];
  const segments = [];
  let lastIdx = 0;
  for (let i = 1; i < path.length; i++) {
    const prev = path[i-1];
    const curr = path[i];
    const prevInfo = nodeIdToLevel(prev);
    const currInfo = nodeIdToLevel(curr);
    if (
      prevInfo.building !== currInfo.building ||
      prevInfo.level !== currInfo.level ||
      LINK_NODE_IDS.includes(curr) ||
      curr.toLowerCase().includes('lift')
    ) {
      const segmentStartInfo = nodeIdToLevel(path[lastIdx]);
      segments.push({
        from: path[lastIdx],
        to: path[i],
        nodes: path.slice(lastIdx, i+1),
        building: segmentStartInfo.building,
        level: segmentStartInfo.level
      });
      lastIdx = i;
    }
  }
  if (lastIdx < path.length - 1) {
    const info = nodeIdToLevel(path[lastIdx]);
    segments.push({
      from: path[lastIdx],
      to: path[path.length-1],
      nodes: path.slice(lastIdx),
      building: info.building,
      level: info.level
    });
  }
  return segments;
}

function App() {
  const [currentFloor, setCurrentFloor] = useState("01"); 
  const [mapTarget, setMapTarget] = useState("");
  const [currentPage, setCurrentPage] = useState<'map' | 'path'>('map');
  const [showHelp, setShowHelp] = useState(false);
  const [buildings, setBuildings] = useState<string[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<string>('');
  const [levels, setLevels] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [nodes, setNodes] = useState<string[]>([]);
  const [fromNode, setFromNode] = useState<string>('');
  const [pathResult, setPathResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [segments, setSegments] = useState<any[]>([]);
  const [currentSegmentIdx, setCurrentSegmentIdx] = useState(0);
  const [toBuilding, setToBuilding] = useState('');
  const [toLevels, setToLevels] = useState<string[]>([]);
  const [toLevel, setToLevel] = useState('');
  const [toNodes, setToNodes] = useState<string[]>([]);
  const [toNode, setToNode] = useState('');
  const [highlightNode, setHighlightNode] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/path/buildings')
      .then(res => res.json())
      .then(data => {
        setBuildings(data.buildings.map((b: any) => b.name));
      })
      .catch(err => {
        setError('no back-end found');
      });
  }, []);

  useEffect(() => {
    if (selectedBuilding) {
      fetch(`http://localhost:3001/api/buildings/${selectedBuilding}`)
        .then(res => res.json())
        .then(data => {
          setLevels(Object.keys(data.levels));
          setSelectedLevel('');
          setNodes([]);
          setFromNode('');
          setToNode('');
        })
        .catch(() => setError('Building info unfound'));
    }
  }, [selectedBuilding]);

  useEffect(() => {
    if (selectedBuilding && selectedLevel) {
      fetch(`http://localhost:3001/api/path/nodes/${selectedBuilding}?level=${selectedLevel}`)
        .then(res => res.json())
        .then(data => {
          setNodes(data.nodes);
          setFromNode('');
          setToNode('');
        })
        .catch(() => setError('node info load fail'));
    }
  }, [selectedBuilding, selectedLevel]);

  useEffect(() => {
    if (toBuilding) {
      fetch(`http://localhost:3001/api/buildings/${toBuilding}`)
        .then(res => res.json())
        .then(data => {
          setToLevels(Object.keys(data.levels));
          setToLevel('');
          setToNodes([]);
          setToNode('');
        })
        .catch(() => setError('destination load fail'));
    }
  }, [toBuilding]);
  useEffect(() => {
    if (toBuilding && toLevel) {
      fetch(`http://localhost:3001/api/path/nodes/${toBuilding}?level=${toLevel}`)
        .then(res => res.json())
        .then(data => {
          setToNodes(data.nodes);
          setToNode('');
        })
        .catch(() => setError('destination node load fail'));
    }
  }, [toBuilding, toLevel]);

  useEffect(() => {
    if (selectedBuilding && selectedLevel && fromNode) {
      setMapTarget(selectedBuilding);
      setCurrentFloor(selectedLevel);
      setHighlightNode(fromNode);
    }
  }, [selectedBuilding, selectedLevel, fromNode]);

  useEffect(() => {
    if (pathResult && pathResult.path) {
      setHighlightNode(null);
    }
  }, [pathResult]);

  const findPath = async () => {
    if (!selectedBuilding || !fromNode || !toBuilding || !toNode) {
      setError('Please select start and end point');
      return;
    }
    setLoading(true);
    setError('');
    setPathResult(null);
    try {
      const response = await fetch('http://localhost:3001/api/path', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          building: selectedBuilding,
          level: selectedLevel || undefined,
          from: fromNode,
          toBuilding: toBuilding,
          toLevel: toLevel || undefined,
          to: toNode,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setPathResult(data);
        setCurrentFloor(selectedLevel || "01");
        setMapTarget(selectedBuilding);
        const nodeIdToLevel = (id: string) => {
          const parts = id.split('-');
          if (parts.length >= 2) {
            const building = parts[0];
            const level = parts[1];
            return { building, level };
          }
          return { building: selectedBuilding, level: selectedLevel || "01" };
        };
        const segs = splitPathBySegments(data.path, nodeIdToLevel);
        setSegments(segs);
        setCurrentSegmentIdx(0);
      } else {
        setError(data.error || 'route finding fail');
      }
    } catch (err) {
      setError('wifi error,please check if back-end working');
    } finally {
      setLoading(false);
    }
  };

return (
  <>
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="shrink-0">
        <header className="bg-blue-800 shadow-md z-50">
          <div className="container mx-auto px-5 py-0">
            <div className="flex justify-between items-center py-2 px-4">
              <h1 className="text-xl font-bold text-white">CDE Map</h1>
              <div className="flex justify-end">
                <button
                  onClick={findPath}
                  disabled={loading || !selectedBuilding || !fromNode || !toBuilding || !toNode}
                  className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 disabled:bg-gray-400 text-lx font-medium flex-shrink-0"
                >
                  {loading ? 'loading...' : 'Find Path'}
                </button>
              </div>
            </div>
          </div>
        </header>

        {currentPage === 'map' && (
          <div className="bg-blue-400 w-full shadow-md py-3 z-40">
            <div className="flex flex-col pt-1 px-5 gap-2">
              <div className="flex flex-nowrap items-center gap-2 overflow-x-auto">
                <label className="text-white text-lg font-medium whitespace-nowrap">Starting:</label>
                <select value={selectedBuilding} onChange={e => setSelectedBuilding(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300">
                  <option value="">Select Building</option>
                  {buildings.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
                <span className="mx-1 text-white text-lg font-medium">-</span>
                <select value={selectedLevel} onChange={e => setSelectedLevel(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300"
                        disabled={!selectedBuilding}>
                  <option value="">Select Floor</option>
                  {levels.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
                <span className="mx-1 text-white text-lg font-medium">:</span>
                <select value={fromNode} onChange={e => setFromNode(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300"
                        disabled={nodes.length === 0}>
                  <option value="">Select Room</option>
                  {nodes.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div className="flex flex-nowrap items-center gap-2 overflow-x-auto mt-2">
                <label className="text-white text-lg font-medium whitespace-nowrap">Destination:</label>
                <select value={toBuilding} onChange={e => setToBuilding(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300">
                  <option value="">Select Building</option>
                  {buildings.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
                <span className="mx-1 text-white text-lg font-medium">-</span>
                <select value={toLevel} onChange={e => setToLevel(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300"
                        disabled={!toBuilding}>
                  <option value="">Select Floor</option>
                  {toLevels.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
                <span className="mx-1 text-white text-lg font-medium">:</span>
                <select value={toNode} onChange={e => setToNode(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300"
                        disabled={toNodes.length === 0}>
                  <option value="">Select Room</option>
                  {toNodes.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              {error && <div className="text-red-100 mt-2">{error}</div>}
            </div>
          </div>
        )}
      </div>

      {currentPage === 'map' && (
        <div className="flex-grow min-h-0 relative z-10 overflow-hidden">
          <MapComponent
            destination={segments.length > 0 ? segments[currentSegmentIdx].building : mapTarget}
            currentFloor={segments.length > 0 ? segments[currentSegmentIdx].level : currentFloor}
            path={segments.length > 0 ? segments[currentSegmentIdx].nodes : []}
            highlightNode={highlightNode}
          />

          {segments.length > 0 && (
            <div className="absolute top-4 left-4 right-4 z-30 flex justify-between items-center">
              <button
                className="bg-blue-400 text-white px-3 py-1 rounded"
                onClick={() => setCurrentSegmentIdx(prev => Math.max(prev - 1, 0))}
                disabled={currentSegmentIdx <= 0}
              >
                Back
              </button>
              <button
                className="bg-blue-400 text-white px-3 py-1 rounded"
                onClick={() => setCurrentSegmentIdx(prev => Math.min(prev + 1, segments.length - 1))}
                disabled={currentSegmentIdx >= segments.length - 1}
              >
                Next
              </button>
            </div>
          )}

          <div className="absolute bottom-6 right-6 flex flex-col space-y-3 z-20">
            <button
              onClick={() => setShowHelp(true)}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors touch-manipulation active:scale-95"
            >
              <i className="fa-solid fa-question text-xl"></i>
            </button>
          </div>

          {showHelp && (
            <div className="absolute inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
                <h2 className="text-xl font-bold mb-4">User guide</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                  <li>Click on building names to view floors</li>
                  <li>Select start and destination to find a route</li>
                  <li>More features coming soon...</li>
                </ul>
                <div className="mt-4 text-right">
                  <button onClick={() => setShowHelp(false)} className="text-blue-600 hover:underline">
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="shrink-0 z-50">
        {segments.length > 0 ? (
          <div className="bg-blue-500 text-white text-center py-2 flex justify-center items-center gap-6">
            <span>Current segment: {segments[currentSegmentIdx].nodes.join(' → ')}</span>
            <span>building: {segments[currentSegmentIdx].building}</span>
            <span>floor: {segments[currentSegmentIdx].level}</span>
            <span>no. {currentSegmentIdx + 1} / {segments.length}</span>
          </div>
        ) : (
          <div className="bg-blue-500 text-white text-center py-3 text-lg">
            Welcome to CDE Map !
          </div>
        )}
      </div>
    </div>
  </>
);
};
export default App;
