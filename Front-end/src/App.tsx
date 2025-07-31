import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import MapComponent from './Component/MapComponent';
import TransitionModal from './Component/TransitionModal';
import './index.css';
import './App.css';
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
  const [currentPage] = useState<'map' | 'path'>('map');
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
  
  const [showTransitionModal, setShowTransitionModal] = useState(false);
  const [transitionInfo, setTransitionInfo] = useState<{
    fromBuilding: string;
    fromLevel: string;
    toBuilding: string;
    toLevel: string;
  } | null>(null);

  const [pendingTransitionIdx, setPendingTransitionIdx] = useState<number | null>(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/path/buildings')
      .then(res => res.json())
      .then(data => setBuildings(data.buildings.map((b: any) => b.name)))
      .catch(() => setError('no back-end found'));
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
    if (pathResult?.path) setHighlightNode(null);
  }, [pathResult]);

  const handleTransitionContinue = () => {
    setShowTransitionModal(false);
    setCurrentSegmentIdx(prev => prev + 1);
    
    if (currentSegmentIdx + 1 < segments.length - 1) {
      const currentSegment = segments[currentSegmentIdx + 1];
      const nextSegment = segments[currentSegmentIdx + 2];
      
      if (currentSegment.building !== nextSegment.building || currentSegment.level !== nextSegment.level) {
        setTransitionInfo({
          fromBuilding: currentSegment.building,
          fromLevel: currentSegment.level,
          toBuilding: nextSegment.building,
          toLevel: nextSegment.level
        });
        setShowTransitionModal(true);
      }
    }
  };

  const handleTransitionBack = () => {
    setShowTransitionModal(false);
    setCurrentSegmentIdx(prev => Math.max(prev - 1, 0));
  };

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
          return { building: parts[0], level: parts[1] || "01" };
        };
        const segs = splitPathBySegments(data.path, nodeIdToLevel);
        setSegments(segs);
        setCurrentSegmentIdx(0);
        
        if (segs.length > 1) {
          const firstSegment = segs[0];
          const secondSegment = segs[1];
          

          const fromBuilding = firstSegment.building;
          const fromLevel = firstSegment.level;
          const toBuilding = secondSegment.building;
          const toLevel = secondSegment.level;
          
          if (fromBuilding !== toBuilding || fromLevel !== toLevel) {
            setTransitionInfo({
              fromBuilding,
              fromLevel,
              toBuilding,
              toLevel
            });
            setShowTransitionModal(true);
          }
        }
      } else {
        setError(data.error || 'route finding fail');
      }
    } catch {
      setError('wifi error,please check if back-end working');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!showTransitionModal && pendingTransitionIdx !== null) {
      setCurrentSegmentIdx(pendingTransitionIdx);
      setPendingTransitionIdx(null);
    }
  }, [showTransitionModal, pendingTransitionIdx]);

  const handleNext = () => {
    if (showTransitionModal && pendingTransitionIdx !== null) {
      setShowTransitionModal(false);
      setCurrentSegmentIdx(pendingTransitionIdx);
      setPendingTransitionIdx(null);
      return;
    }
    const nextIdx = currentSegmentIdx + 1;
    if (nextIdx < segments.length) {
      const currentSegment = segments[currentSegmentIdx];
      const nextSegment = segments[nextIdx];
      if (currentSegment.building !== nextSegment.building || currentSegment.level !== nextSegment.level) {
        setTransitionInfo({
          fromBuilding: currentSegment.building,
          fromLevel: currentSegment.level,
          toBuilding: nextSegment.building,
          toLevel: nextSegment.level
        });
        setPendingTransitionIdx(nextIdx);
        setShowTransitionModal(true);
      } else {
        setCurrentSegmentIdx(nextIdx);
      }
    }
  };

  const handleBack = () => {
    if (showTransitionModal && pendingTransitionIdx !== null) {
      setShowTransitionModal(false);
      setPendingTransitionIdx(null);
      setCurrentSegmentIdx(currentSegmentIdx);
      return;
    }
    setCurrentSegmentIdx(i => Math.max(i - 1, 0));
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="bg-blue-800 shadow-md z-50">
        <div className="container mx-auto px-5">
          <div className="flex justify-between items-center py-2 px-4">
            <h1 className="text-xl font-bold text-white">CDE Map</h1>
            <button
              onClick={findPath}
              disabled={loading || !selectedBuilding || !fromNode || !toBuilding || !toNode}
              className="bg-blue-400 text-white px-6 py-2 rounded-lg hover:bg-blue-500 disabled:bg-gray-400 text-lx font-medium"
            >
              {loading ? 'loading...' : 'Find Path'}
            </button>
          </div>
        </div>
      </header>

      {currentPage === 'map' && (
        <div className="bg-blue-400 w-full shadow-md py-3 z-40 space-y-2">
          <div className="flex flex-row gap-2 px-5">
            <div className="w-1/4 flex items-center text-white text-lg justify-center items-center font-medium">Start:</div>
            <div className="w-1/4 flex items-center gap-1">
              <select value={selectedBuilding} onChange={e => setSelectedBuilding(e.target.value)}
                      className="w-full px-2 py-2 rounded-lg border border-gray-300">
                <option value="">Building</option>
                {buildings.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              <span className="text-white font-bold">-</span>
            </div>
            <div className="w-1/4 flex items-center gap-1">
              <select value={selectedLevel} onChange={e => setSelectedLevel(e.target.value)}
                      className="w-full px-2 py-2 rounded-lg border border-gray-300"
                      disabled={!selectedBuilding}>
                <option value="">Floor</option>
                {levels.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
              <span className="text-white font-bold">:</span>
            </div>
            <div className="w-1/4">
              <select value={fromNode} onChange={e => setFromNode(e.target.value)}
                      className="w-full px-2 py-2 rounded-lg border border-gray-300"
                      disabled={nodes.length === 0}>
                <option value="">Room</option>
                {nodes.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          </div>

          <div className="flex flex-row gap-2 px-5">
            <div className="w-1/4 flex items-center justify-center items-center text-white text-lg font-medium">Destination:</div>
            <div className="w-1/4 flex items-center gap-1">
              <select value={toBuilding} onChange={e => setToBuilding(e.target.value)}
                      className="w-full px-2 py-2 rounded-lg border border-gray-300">
                <option value="">Building</option>
                {buildings.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              <span className="text-white font-bold">-</span>
            </div>
            <div className="w-1/4 flex items-center gap-1">
              <select value={toLevel} onChange={e => setToLevel(e.target.value)}
                      className="w-full px-2 py-2 rounded-lg border border-gray-300"
                      disabled={!toBuilding}>
                <option value="">Floor</option>
                {toLevels.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
              <span className="text-white font-bold">:</span>
            </div>
            <div className="w-1/4">
              <select value={toNode} onChange={e => setToNode(e.target.value)}
                      className="w-full px-2 py-2 rounded-lg border border-gray-300"
                      disabled={toNodes.length === 0}>
                <option value="">Room</option>
                {toNodes.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          </div>
          {error && <div className="text-red-100 px-5">{error}</div>}
        </div>
      )}

      <div className="flex-grow relative z-10 overflow-hidden">
        <MapComponent
          destination={segments.length > 0 ? segments[currentSegmentIdx].building : mapTarget}
          currentFloor={segments.length > 0 ? segments[currentSegmentIdx].level : currentFloor}
          path={segments.length > 0 ? segments[currentSegmentIdx].nodes : []}
          highlightNode={highlightNode}
          startNode={fromNode || null}
        />

        {segments.length > 0 && (
          <div className="absolute top-4 left-4 right-4 z-30 flex justify-end items-center space-x-3">
            <button className="bg-blue-400 text-white px-3 py-1 rounded"
                    onClick={handleBack}
                    disabled={currentSegmentIdx <= 0}>Back</button>
            <button className="bg-blue-400 text-white px-3 py-1 rounded"
                    onClick={handleNext}
                    disabled={currentSegmentIdx >= segments.length - 1}>Next</button>
          </div>
        )}

        <div className="absolute bottom-6 right-6 z-20">
          <button
            onClick={() => setShowHelp(true)}
            className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 active:scale-95"
          >
            <i className="fa-solid fa-question text-xl"></i>
          </button>
        </div>

        {showHelp && (
          <div className="absolute inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
              <h2 className="text-xl font-bold mb-4">User guide</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                <li>Click on building names to view the floor plan of each building</li>
                <li>Select start and destination location to check the shortest route between the two locations</li>
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
            Welcome to CDE Map!
          </div>
        )}
      </div>

      {showTransitionModal && transitionInfo && (
        <TransitionModal
          isVisible={showTransitionModal && !!transitionInfo}
          fromBuilding={transitionInfo?.fromBuilding || ''}
          fromLevel={transitionInfo?.fromLevel || ''}
          toBuilding={transitionInfo?.toBuilding || ''}
          toLevel={transitionInfo?.toLevel || ''}
        />
      )}
    </div>
  );
}

export default App;
