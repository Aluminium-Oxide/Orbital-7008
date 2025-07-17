import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMapEvents, MapContainer, ImageOverlay, Marker, Popup, useMap } from 'react-leaflet';

// Pixel CRS config
const PixelProjection = {
  project: (latlng: L.LatLng) => L.point(latlng.lng, latlng.lat),
  unproject: (point: L.Point) => L.latLng(point.y, point.x),
};

const PixelCRS = L.Util.extend({}, L.CRS.Simple, {
  code: 'PixelCRS',
  projection: PixelProjection,
  transformation: new L.Transformation(1, 0, 1, 0),
  scale: (zoom: number) => Math.pow(2, zoom),
  zoom: (scale: number) => Math.log(scale) / Math.LN2,
  distance: (p1: L.LatLng, p2: L.LatLng) => {
    const dx = p2.lng - p1.lng;
    const dy = p2.lat - p1.lat;
    return Math.sqrt(dx * dx + dy * dy);
  },
  infinite: true,
});

function Coordinates({ onMapClick }: { onMapClick?: () => void }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      console.log(lng, lat);
      onMapClick?.();
    }
  });
  return null;
}

type Building = {
  id: number;
  name: string;
  x: number;
  y: number;
};

type Node = {
  id: string;
  name: string;
  position: [number, number];
};

const Icon = (name: string): L.DivIcon => {
  return L.divIcon({
    className: 'building-label',
    html: `
      <div class="relative building-label flex items-center justify-center">
        <div class="bg-purple-300 text-black px-2 py-1 rounded shadow text-xs border border-gray-400 hover:bg-purple-200 cursor-pointer whitespace-nowrap active:scale-95">
          ${name}
        </div>
      </div>`,
    iconSize: [100, 30],
    iconAnchor: [50, 15],
  });
};

const NodeImageIcon = (imageUrl: string, zoom: number): L.DivIcon => {
  const scale = Math.pow(2, zoom);
  const baseSize = 1.6;
  const size = baseSize * scale;

  return L.divIcon({
    className: 'custom-node-image',
    html: `<img src="${imageUrl}" style="width:${size}px; height:${size}px;" />`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
  });
};

const buildings: Building[] = [
  { id: 0, name: "EA", x: 356, y: 116 },
  { id: 1, name: "E1", x: 520, y: 900 },
  { id: 2, name: "E2", x: 594, y: 610 },
  { id: 3, name: "E3", x: 819, y: 582 },
  { id: 4, name: "E4", x: 872, y: 947 },
  { id: 5, name: "E5", x: 1126, y: 1220 },
  { id: 6, name: "E6", x: 1389, y: 703 },
  { id: 7, name: "E7", x: 1537, y: 955 },
  { id: 8, name: "E8", x: 1149, y: 723 },
  { id: 9, name: "E1A", x: 364, y: 600 },
  { id: 10, name: "E2A", x: 663, y: 874 },
  { id: 11, name: "E3A", x: 644, y: 200 },
  { id: 12, name: "E4A", x: 1218, y: 963 },
  { id: 13, name: "SDE1", x: 316, y: 1523 },
  { id: 14, name: "SDE2", x: 536, y: 1559 },
  { id: 15, name: "SDE3", x: 276, y: 1243 },
  { id: 16, name: "SDE4", x: 160, y: 1727 },
  { id: 17, name: "Techno", x: 697, y: 1239 },
  { id: 18, name: "T-Lab", x: 957, y: 452 },
  { id: 19, name: "EW1", x: 381, y: 1013 },
];

interface MapComponentProps {
  destination: string;
  currentFloor: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ destination, currentFloor }) => {
  const mapRef = useRef<L.Map | null>(null);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [floorImageUrl, setFloorImageUrl] = useState<string>("");
  const [navigationMode, setNavigationMode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(0);

  const mapWidth = 1707;
  const mapHeight = 1889;
  const floorMapWidth = 2360;
  const floorMapHeight = 1640;

  const initialZoom = useMemo(() => (
    Math.min(
      Math.log2(window.innerWidth / mapWidth),
      Math.log2(window.innerHeight / mapHeight)
    )
  ), []);

  const mapSize = navigationMode
    ? { width: floorMapWidth, height: floorMapHeight }
    : { width: mapWidth, height: mapHeight };

  const dynamicCenter: [number, number] = [mapSize.height / 2, mapSize.width / 2];
  const dynamicBounds: [[number, number], [number, number]] = [[0, 0], [mapSize.height, mapSize.width]];

  useEffect(() => {
    setSelectedBuilding(null);
    if (mapRef.current) {
      mapRef.current.closePopup();
    }

    if (destination && destination.trim() !== '') {
      setNavigationMode(true);
    } else {
      setNavigationMode(false);
      setNodes([]);
    }
  }, [destination]);

  useEffect(() => {
    if (!navigationMode || !destination) return;

    const floorImageName = `${destination}.png`;
    const floorImagePath = `/map/${floorImageName}`;
    const fallbackImagePath = `/map/no.png`;

    const checkImage = (src: string): Promise<string> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = () => resolve(fallbackImagePath);
        img.src = src;
      });
    };

    checkImage(floorImagePath).then(validPath => {
      console.log("加载楼层图:", validPath);
      setFloorImageUrl(validPath.replace('/map/', ''));
    });

    fetch(`http://localhost:3001/api/buildings/${destination}`)
      .then((res) => res.json())
      .then((data) => {
        const levelData = data.levels[currentFloor];
        if (!levelData) {
          console.error(`Level ${currentFloor} not found in ${destination}`);
          return;
        }

        const processedNodes: Node[] = levelData.nodes
          .filter((n: any) => n.x != null && n.y != null)
          .map((n: any) => ({
            ...n,
            position: [n.y, n.x] as [number, number],
          }));

        setNodes(processedNodes);
      })
      .catch((err) => console.error("Failed to load node data:", err));
  }, [navigationMode, destination, currentFloor]);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    const updateZoom = () => setZoomLevel(map.getZoom());
    map.on('zoom', updateZoom);
    updateZoom();

    return () => {
      map.off('zoom', updateZoom);
    };
  }, []);

  return (
    <div className="relative h-[90vh] w-full base-map-container">
      {selectedBuilding && !navigationMode && (
        <div className="absolute top-0 right-0 w-[300px] h-full bg-white shadow-lg z-[1000] p-4 overflow-y-auto">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-black"
            onClick={() => setSelectedBuilding(null)}
          >
            ✕
          </button>
          <h2 className="text-lg font-semibold mb-2">Block {selectedBuilding.name}</h2>
          <img
            src={`/building-images/${selectedBuilding.name}.png`}
            alt={selectedBuilding.name}
            className="w-full object-contain rounded"
          />
        </div>
      )}

      {navigationMode && (
        <button
          onClick={() => {
            setNavigationMode(false);
            setNodes([]);
            setSelectedBuilding(null);
            if (mapRef.current) {
              mapRef.current.closePopup();
            }
          }}
          className="absolute top-4 right-4 z-[1000] bg-blue-500 text-white px-3 py-2 rounded"
        >
          Back
        </button>
      )}

      <MapContainer
        ref={mapRef}
        crs={PixelCRS}
        center={dynamicCenter}
        zoom={initialZoom}
        maxZoom={2}
        minZoom={initialZoom - 2}
        maxBounds={dynamicBounds}
        maxBoundsViscosity={1.0}
        style={{ height: '100%', width: '100%', zIndex: '1' }}
      >
        {navigationMode ? (
          <ImageOverlay
            url={`/map/${floorImageUrl}`}
            bounds={[[0, 0], [floorMapHeight, floorMapWidth]]}
            interactive={true}
          />
        ) : (
          <ImageOverlay
            url="/CDEmap.png"
            bounds={[[0, 0], [mapHeight, mapWidth]]}
            interactive={true}
          />
        )}

        <Coordinates onMapClick={() => setSelectedBuilding(null)} />

        {!navigationMode && buildings.map(building => (
          <Marker
            key={building.id}
            position={[building.y, building.x]}
            icon={Icon(building.name)}
            eventHandlers={{
              click: () => setSelectedBuilding({ ...building })
            }}
          />
        ))}

        {navigationMode && nodes.map((node) => (
          <Marker
            key={node.id}
            position={node.position}
            icon={NodeImageIcon("/map/1.png", zoomLevel)}
          >
            <Popup>{node.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
