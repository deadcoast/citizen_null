import React, { useState, useRef, useMemo } from 'react';
import { stantonSystemData, populateStationItems } from '../data/mapData';

export default function StantonMap({ items = [], onItemClick }) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [selectedStation, setSelectedStation] = useState(null);
  const [stationPopupPos, setStationPopupPos] = useState({ x: 0, y: 0 });
  const svgRef = useRef(null);

  // Populate the map data with items
  const mapData = useMemo(() => {
    return populateStationItems(stantonSystemData, items);
  }, [items]);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.3, 2.5));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.3, 0.5));
  };

  const handleReset = () => {
    setZoomLevel(1);
    setSelectedPlanet(null);
    setSelectedStation(null);
  };

  const handlePlanetClick = (planet) => {
    setSelectedPlanet(planet.id === selectedPlanet ? null : planet.id);
    setSelectedStation(null);
  };

  const handlePlanetHover = (planet, event) => {
    setHoveredPlanet(planet);
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      setTooltipPos({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      });
    }
  };

  const handleStationClick = (station, planet, event) => {
    event.stopPropagation();
    setSelectedStation({ ...station, planet: planet.name });
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      setStationPopupPos({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      });
    }
  };

  const handleItemClick = (itemName) => {
    // Callback to parent component to open item modal
    if (onItemClick) {
      onItemClick(itemName);
    }
  };

  return (
    <div className="relative w-full h-[700px] bg-black border-4 border-gray-900 overflow-hidden">
      {/* Star field background */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 20% 30%, white, transparent),
            radial-gradient(1px 1px at 60% 70%, white, transparent),
            radial-gradient(1px 1px at 50% 50%, white, transparent),
            radial-gradient(1px 1px at 80% 10%, white, transparent),
            radial-gradient(1px 1px at 90% 60%, white, transparent),
            radial-gradient(1px 1px at 33% 50%, white, transparent),
            radial-gradient(1px 1px at 52% 20%, white, transparent),
            radial-gradient(1px 1px at 15% 80%, white, transparent)
          `,
          backgroundSize: '200% 200%'
        }}
      />

      {/* Scan line effect */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(transparent 50%, rgba(0, 255, 255, 0.02) 50%)',
          backgroundSize: '100% 4px'
        }}
      />

      {/* System Info */}
      <div className="absolute top-5 left-5 bg-gray-900/80 border-2 border-gray-700 p-4 text-xs z-20">
        <div className="text-red-800 font-bold text-sm mb-2 tracking-wider">SYSTEM: STANTON</div>
        <div className="text-gray-400 tracking-wide">JURISDICTION: UEE</div>
        <div className="text-gray-400 tracking-wide">PLANETS: 4 MAJOR</div>
        <div className="text-gray-400 tracking-wide">STATUS: ACTIVE</div>
        <div className="text-gray-400 tracking-wide mt-2">ZOOM: {(zoomLevel * 100).toFixed(0)}%</div>
      </div>

      {/* Controls */}
      <div className="absolute top-5 right-5 flex flex-col gap-2 z-20">
        <button
          onClick={handleZoomIn}
          className="bg-gray-900 border-2 border-gray-700 text-cream px-5 py-2 text-xs tracking-wider hover:border-red-800 hover:text-red-800 hover:bg-gray-800 transition-all"
        >
          + ZOOM IN
        </button>
        <button
          onClick={handleZoomOut}
          className="bg-gray-900 border-2 border-gray-700 text-cream px-5 py-2 text-xs tracking-wider hover:border-red-800 hover:text-red-800 hover:bg-gray-800 transition-all"
        >
          - ZOOM OUT
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-900 border-2 border-gray-700 text-cream px-5 py-2 text-xs tracking-wider hover:border-red-800 hover:text-red-800 hover:bg-gray-800 transition-all"
        >
          ↻ RESET
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-5 left-5 bg-gray-900/90 border-2 border-gray-700 p-4 text-xs z-20">
        <div className="text-red-800 font-bold mb-2 tracking-wider">LEGEND</div>
        <div className="flex items-center gap-2 my-1">
          <svg className="w-3 h-3" viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="8" fill="#8B4513" stroke="#00ffff" strokeWidth="1" />
          </svg>
          <span className="text-cream">Planet</span>
        </div>
        <div className="flex items-center gap-2 my-1">
          <svg className="w-3 h-3" viewBox="0 0 20 20">
            <rect x="6" y="6" width="8" height="8" fill="#999" stroke="#00ffff" strokeWidth="1" transform="rotate(45 10 10)" />
          </svg>
          <span className="text-cream">Station</span>
        </div>
        <div className="flex items-center gap-2 my-1">
          <svg className="w-3 h-3" viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="4" fill="#8b0000" />
          </svg>
          <span className="text-cream">Item Location</span>
        </div>
      </div>

      {/* SVG Map */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 700"
        style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}
      >
        {/* Grid overlay */}
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#00ffff" strokeWidth="0.3" opacity="0.2"/>
          </pattern>

          {/* Glow effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Central star (sun) */}
        <circle
          cx={mapData.center.x}
          cy={mapData.center.y}
          r="15"
          fill="#ffff00"
          opacity="0.8"
          filter="url(#glow)"
        />
        <text
          x={mapData.center.x}
          y={mapData.center.y - 25}
          fill="#ffff00"
          fontSize="12"
          textAnchor="middle"
          opacity="0.7"
          fontFamily="Courier New, monospace"
        >
          STANTON (STAR)
        </text>

        {/* Planets and orbits */}
        {mapData.planets.map((planet) => {
          const isSelected = selectedPlanet === planet.id;

          return (
            <g key={planet.id}>
              {/* Orbit line */}
              <circle
                cx={mapData.center.x}
                cy={mapData.center.y}
                r={planet.orbitRadius}
                fill="none"
                stroke="#00ffff"
                strokeWidth="1"
                strokeDasharray="5,5"
                opacity="0.2"
              />

              {/* Planet */}
              <circle
                cx={planet.x}
                cy={planet.y}
                r={planet.radius}
                fill={planet.color}
                stroke={isSelected ? "#8b0000" : "#00ffff"}
                strokeWidth={isSelected ? "3" : "2"}
                style={{ cursor: 'pointer' }}
                onClick={() => handlePlanetClick(planet)}
                onMouseEnter={(e) => handlePlanetHover(planet, e)}
                onMouseLeave={() => setHoveredPlanet(null)}
                opacity={isSelected ? 1 : 0.8}
              />

              {/* Planet name */}
              <text
                x={planet.x}
                y={planet.y + planet.radius + 20}
                fill="#00ffff"
                fontSize="14"
                fontWeight="bold"
                textAnchor="middle"
                fontFamily="Courier New, monospace"
                style={{ pointerEvents: 'none' }}
              >
                {planet.name.toUpperCase()}
              </text>

              {/* Stations (shown when planet selected) */}
              {isSelected && planet.stations.map((station, idx) => {
                const angle = (idx * (360 / planet.stations.length)) * (Math.PI / 180);
                const stationX = planet.x + Math.cos(angle) * (planet.radius + 30);
                const stationY = planet.y + Math.sin(angle) * (planet.radius + 30);

                return (
                  <g key={station.name}>
                    {/* Line to station */}
                    <line
                      x1={planet.x}
                      y1={planet.y}
                      x2={stationX}
                      y2={stationY}
                      stroke="#999"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                      opacity="0.5"
                    />

                    {/* Station marker (diamond) */}
                    <rect
                      x={stationX - 5}
                      y={stationY - 5}
                      width="10"
                      height="10"
                      fill="#999"
                      stroke="#00ffff"
                      strokeWidth="1"
                      transform={`rotate(45 ${stationX} ${stationY})`}
                      style={{ cursor: 'pointer' }}
                      onClick={(e) => handleStationClick(station, planet, e)}
                    />

                    {/* Station name */}
                    <text
                      x={stationX}
                      y={stationY + 15}
                      fill="#999"
                      fontSize="10"
                      textAnchor="middle"
                      fontFamily="Courier New, monospace"
                      style={{ pointerEvents: 'none' }}
                    >
                      {station.name}
                    </text>

                    {/* Item pins */}
                    {station.items && station.items.slice(0, 2).map((item, itemIdx) => {
                      const pinAngle = angle + (itemIdx * 20 - 10) * (Math.PI / 180);
                      const pinX = stationX + Math.cos(pinAngle) * 15;
                      const pinY = stationY + Math.sin(pinAngle) * 15;

                      return (
                        <circle
                          key={item.id || item}
                          cx={pinX}
                          cy={pinY}
                          r="3"
                          fill="#8b0000"
                          style={{
                            cursor: 'pointer',
                            animation: 'pulse 2s infinite'
                          }}
                        />
                      );
                    })}
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>

      {/* Planet Tooltip */}
      {hoveredPlanet && !selectedStation && (
        <div
          className="absolute bg-gray-900 border-2 border-red-800 p-4 text-xs pointer-events-none z-30 min-w-[200px] -translate-x-1/2 -translate-y-full -mt-2"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`
          }}
        >
          <div className="font-bold text-sm text-red-800 mb-1 uppercase tracking-wide">
            {hoveredPlanet.name}
          </div>
          <div className="text-gray-400">{hoveredPlanet.description}</div>
          <div className="text-gray-400">Stations: {hoveredPlanet.stations.length}</div>
          <div className="mt-2 text-[10px] text-gray-600">
            CLICK TO VIEW STATIONS
          </div>
        </div>
      )}

      {/* Station Popup */}
      {selectedStation && (
        <div
          className="absolute bg-cream border-3 border-black p-4 text-black text-xs z-30 min-w-[250px] shadow-[4px_4px_0_rgba(0,0,0,0.3)]"
          style={{
            left: `${stationPopupPos.x}px`,
            top: `${stationPopupPos.y}px`
          }}
        >
          <button
            className="absolute top-1 right-1 bg-red-800 text-cream w-6 h-6 font-bold text-base hover:bg-red-600"
            onClick={() => setSelectedStation(null)}
          >
            ×
          </button>

          <h3 className="text-base mb-2 uppercase tracking-wide font-bold">
            {selectedStation.name}
          </h3>

          <div className="text-[11px] text-gray-600 mb-3">
            {selectedStation.planet} System
          </div>

          <div>
            <div className="font-bold mb-2">
              ITEMS AVAILABLE ({selectedStation.items ? selectedStation.items.length : 0}):
            </div>
            {selectedStation.items && selectedStation.items.map((item, idx) => (
              <div
                key={item.id || idx}
                className="py-1 border-b border-gray-300 cursor-pointer hover:text-red-800 hover:bg-red-100"
                onClick={() => handleItemClick(item.name || item)}
              >
                 {item.name || item}
              </div>
            ))}
          </div>

          <div className="mt-4 text-[10px] text-gray-500">
            Click item to view details
          </div>
        </div>
      )}

      {/* CSS for pulse animation */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}
