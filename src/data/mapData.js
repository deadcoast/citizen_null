// mapData.js - Stanton System Map Data Structure
// This file contains the coordinate and visual data for the interactive map

export const stantonSystemData = {
  name: "Stanton",
  description: "A four-planet system controlled by corporate interests",
  center: { x: 600, y: 350 }, // Center point for SVG viewBox

  planets: [
    {
      id: "hurston",
      name: "Hurston",
      x: 400,
      y: 250,
      radius: 35,
      orbitRadius: 180,
      color: "#8B4513", // Brown/rust - industrial
      description: "Industrial world controlled by Hurston Dynamics",
      faction: "Hurston Dynamics",
      stations: [
        {
          id: "lorville",
          name: "Lorville",
          type: "landing_zone",
          description: "Primary landing zone on Hurston",
          // Items will be dynamically loaded from your items database
          // based on location.station matching this station name
          itemIds: [] // Populated from items.json where location.station === "Lorville"
        },
        {
          id: "everus-harbor",
          name: "Everus Harbor",
          type: "orbital_station",
          description: "Orbital station above Hurston",
          itemIds: []
        },
        {
          id: "hur-l1",
          name: "HUR-L1",
          type: "lagrange_station",
          description: "L1 Lagrange station",
          itemIds: []
        }
      ]
    },

    {
      id: "crusader",
      name: "Crusader",
      x: 700,
      y: 200,
      radius: 45,
      orbitRadius: 280,
      color: "#CC5500", // Orange - gas giant
      description: "Gas giant and home of Crusader Industries",
      faction: "Crusader Industries",
      stations: [
        {
          id: "orison",
          name: "Orison",
          type: "landing_zone",
          description: "Floating city in Crusader's atmosphere",
          itemIds: []
        },
        {
          id: "port-olisar",
          name: "Port Olisar",
          type: "orbital_station",
          description: "Historic orbital station",
          itemIds: []
        },
        {
          id: "seraphim",
          name: "Seraphim Station",
          type: "orbital_station",
          description: "Rest stop near Crusader",
          itemIds: []
        },
        {
          id: "cru-l1",
          name: "CRU-L1",
          type: "lagrange_station",
          description: "L1 Lagrange station",
          itemIds: []
        }
      ]
    },

    {
      id: "arccorp",
      name: "ArcCorp",
      x: 500,
      y: 450,
      radius: 30,
      orbitRadius: 220,
      color: "#666666", // Gray - industrial/city
      description: "Completely urbanized planet",
      faction: "ArcCorp",
      stations: [
        {
          id: "area18",
          name: "Area18",
          type: "landing_zone",
          description: "Primary landing zone on ArcCorp",
          itemIds: []
        },
        {
          id: "baijini-point",
          name: "Baijini Point",
          type: "orbital_station",
          description: "Orbital station above ArcCorp",
          itemIds: []
        },
        {
          id: "arc-l1",
          name: "ARC-L1",
          type: "lagrange_station",
          description: "L1 Lagrange station",
          itemIds: []
        }
      ]
    },

    {
      id: "microtech",
      name: "microTech",
      x: 750,
      y: 450,
      radius: 32,
      orbitRadius: 300,
      color: "#87CEEB", // Ice blue - frozen world
      description: "Frozen planet, home of microTech corporation",
      faction: "microTech",
      stations: [
        {
          id: "new-babbage",
          name: "New Babbage",
          type: "landing_zone",
          description: "Primary landing zone on microTech",
          itemIds: []
        },
        {
          id: "port-tressler",
          name: "Port Tressler",
          type: "orbital_station",
          description: "Orbital station above microTech",
          itemIds: []
        },
        {
          id: "mic-l1",
          name: "MIC-L1",
          type: "lagrange_station",
          description: "L1 Lagrange station",
          itemIds: []
        }
      ]
    }
  ],

  // Additional points of interest (optional)
  poi: [
    {
      id: "grim-hex",
      name: "GrimHEX",
      type: "asteroid_station",
      description: "Outlaw station in Yela asteroid belt",
      x: 650,
      y: 300,
      linkedPlanet: "crusader",
      itemIds: []
    }
  ]
};

// Helper function to populate station items from your items database
export function populateStationItems(mapData, itemsArray) {
  const updatedMapData = JSON.parse(JSON.stringify(mapData)); // Deep clone

  // For each planet
  updatedMapData.planets.forEach(planet => {
    // For each station
    planet.stations.forEach(station => {
      // Find items that match this station
      const stationItems = itemsArray.filter(item => {
        // Match station name (case-insensitive, handle variations)
        const itemStation = item.location?.station?.toLowerCase() || '';
        const stationName = station.name.toLowerCase();
        return itemStation.includes(stationName) || stationName.includes(itemStation);
      });

      // Store item IDs
      station.itemIds = stationItems.map(item => item.id);

      // Optionally store the full item objects
      station.items = stationItems;
    });
  });

  return updatedMapData;
}

// Helper function to get planet by ID
export function getPlanetById(planetId) {
  return stantonSystemData.planets.find(p => p.id === planetId);
}

// Helper function to get station by name
export function getStationByName(stationName) {
  for (const planet of stantonSystemData.planets) {
    const station = planet.stations.find(s =>
      s.name.toLowerCase() === stationName.toLowerCase()
    );
    if (station) {
      return { ...station, planet: planet.name };
    }
  }
  return null;
}

// Helper function to get all stations with items
export function getStationsWithItems(itemsArray) {
  const stationsWithItems = [];

  stantonSystemData.planets.forEach(planet => {
    planet.stations.forEach(station => {
      const items = itemsArray.filter(item =>
        item.location?.station?.toLowerCase().includes(station.name.toLowerCase())
      );

      if (items.length > 0) {
        stationsWithItems.push({
          ...station,
          planet: planet.name,
          planetId: planet.id,
          items: items
        });
      }
    });
  });

  return stationsWithItems;
}

// Helper to calculate station positions around planet
export function calculateStationPosition(planet, stationIndex, totalStations) {
  const angle = (stationIndex * (360 / totalStations)) * (Math.PI / 180);
  const distance = planet.radius + 30; // 30px offset from planet

  return {
    x: planet.x + Math.cos(angle) * distance,
    y: planet.y + Math.sin(angle) * distance,
    angle: angle
  };
}

// Coordinates reference for common locations
// Use this when admin is adding new items
export const locationCoordinates = {
  "Lorville": { planet: "hurston", station: "lorville" },
  "Everus Harbor": { planet: "hurston", station: "everus-harbor" },
  "Area18": { planet: "arccorp", station: "area18" },
  "New Babbage": { planet: "microtech", station: "new-babbage" },
  "Orison": { planet: "crusader", station: "orison" },
  "Port Olisar": { planet: "crusader", station: "port-olisar" },
  "GrimHEX": { planet: "crusader", poi: "grim-hex" }
};

export default stantonSystemData;
