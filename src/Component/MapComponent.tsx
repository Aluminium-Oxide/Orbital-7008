import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, ImageOverlay, Marker, Popup } from 'react-leaflet';
import { useMapEvents } from 'react-leaflet';  // useMapEvents hook for handling map events

// MapClickLogger, monitor map click events and record coordinates
function MapClickLogger() {
  console.log("MapClickLogger mounted");
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      console.log(`Location: x = ${lng.toFixed(0)}, y = ${lat.toFixed(0)}`);
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

// 建筑数据
const buildings = [
  { id: 0, name: "EA", x: 200, y: 300 },
  { id: 11, name: "E1A", x: 200, y: 300 },
  { id: 1, name: "E1", x: 200, y: 300 },
  { id: 22, name: "E2A", x: 200, y: 300 },
  { id: 2, name: "E2", x: 200, y: 300 },
  { id: 33, name: "E3A", x: 200, y: 300 },
  { id: 3, name: "E3", x: 200, y: 300 },
  { id: 44, name: "E4A", x: 200, y: 300 },
  { id: 4, name: "E4", x: 200, y: 300 },
  { id: 5, name: "E5", x: 200, y: 300 },
  { id: 6, name: "E6", x: 200, y: 300 },
  { id: 7, name: "E7", x: 200, y: 300 },
  { id: 8, name: "E8", x: 200, y: 300 },
  { id: 10, name: "SDE1", x: 200, y: 300 },
  { id: 20, name: "SDE2", x: 200, y: 300 },
  { id: 30, name: "SDE3", x: 200, y: 300 },
  { id: 40, name: "SDE4", x: 200, y: 300 },
];

// 自定义像素坐标投影
const PixelProjection = {
  project: (latlng: L.LatLng) => L.point(latlng.lng, latlng.lat),
  unproject: (point: L.Point) => L.latLng(point.y, point.x),
};

// 自定义CRS
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



const MapComponent = () => {
  const mapRef = useRef(null);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const mapWidth = 1000; // 底图宽度（像素）
  const mapHeight = 1000; // 底图高度（像素）

  useEffect(() => {
    if (mapRef.current) {
      // 地图初始化后在这里添加自定义逻辑
    }
  }, []);
  
  // 计算初始视图，确保地图完整显示
  const initialZoom = Math.min(
    Math.log2(window.innerWidth / mapWidth),
    Math.log2(window.innerHeight / mapHeight)
  );

  // 关闭弹窗
  const closePopup = () => {
    setSelectedBuilding(null);
  };

  return (
    <div className="relative h-[90vh] w-full">
      <MapContainer
        ref={mapRef}
        crs={PixelCRS}
        center={[mapHeight / 2, mapWidth / 2]}
        zoom={initialZoom}
        maxZoom={4}
        minZoom={initialZoom - 2}
        style={{ height: '100%', width: '100%' }}
      >
        {/* 你的图层组件 */}

        {/* 添加底图 */}
        <ImageOverlay
          url="/CDEmap.png"
          bounds={[[0, 0], [mapHeight, mapWidth]]}
          interactive={true}
        />

        {/* Add MapClickLogger */}
        <MapClickLogger />
        
        {/* 添加建筑标记 */}
        {buildings.map(building => (
          <Marker
            key={building.id}
            position={[building.y, building.x]}
            eventHandlers={{
              click: () => setSelectedBuilding(building)
            }}
          >
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;    





