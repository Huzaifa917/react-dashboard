import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import chroma from 'chroma-js';

const MapContainer = () => {
  const mapRef = useRef(null); // useRef to store the map instance
  const [waypoints, setWaypoints] = useState([
    {
      coords: [33.6961, 73.21516],
      lastDesludgingDate: new Date('2021-06-01'),
      upcomingDesludgingDate: new Date('2023-01-01'),
      name: '1',
    },
    {
      coords: [33.69, 73.215],
      lastDesludgingDate: new Date('2021-06-01'),
      upcomingDesludgingDate: new Date('2023-06-01'),
      name: '2',
    },
    {
      coords: [33.694787, 73.215170],
      lastDesludgingDate: new Date('2022-05-01'),
      upcomingDesludgingDate: new Date('2024-05-01'),
      name: '3',
    },
    // Add more waypoints as needed
  ]);

  const startStopwatch = () => {
    // Implementation of startStopwatch
  };

  const stopStopwatch = () => {
    // Implementation of stopStopwatch
  };

  const resetStopwatch = () => {
    // Implementation of resetStopwatch
  };

  useEffect(() => {
    const map = mapRef.current = L.map('map').setView([33.6844, 73.0479], 13);

    // Add Tile Layer for Map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add Waypoints
    waypoints.forEach((waypoint, index) => {
      const marker = L.marker(waypoint.coords).addTo(map);
      marker.bindPopup('Waypoint ' + (index + 1));
    });

    // Add Routing Control
    L.Routing.control({
      waypoints: waypoints.map(waypoint => L.latLng(waypoint.coords)),
      routeWhileDragging: true,
    }).addTo(map);

    return () => {
      // Clean up resources when component unmounts
      map.remove();
    };
  }, []);

  // Rest of your component code...
  return (
    <div>
      <div id="map" className="map"></div>
      <div id="statistics">
        <h2>Statistics</h2>
        <p>Total Houses: <span id="total-houses"></span></p>
        <p>Overdue: <span id="overdue-count"></span></p>
        <p>Upcoming: <span id="upcoming-count"></span></p>
      </div>
      <div id="chart-container" className="chart-container"></div>
      <div id="marker-info">
        <h2>Marker Info</h2>
        <p>Name: <span id="marker-name-value"></span></p>
      </div>
      <div id="stopwatch-container">
        <h2>Stopwatch</h2>
        <p id="stopwatch">00:00:00</p>
        <button onClick={startStopwatch}>Start</button>
        <button onClick={stopStopwatch}>Stop</button>
        <button onClick={resetStopwatch}>Reset</button>
      </div>
    </div>
  );
};

export default MapContainer;
