import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LeafletMap = () => {
  useEffect(() => {
    // Initialize Leaflet map
    const map = L.map('map').setView([33.6832, 73.0479], 13);

    // Add tile layer from OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Define markers for different locations
    const markers = [
      [33.6832, 73.0479], // Bahria Enclave, Islamabad
      // Add more markers for other locations as needed
    ];

    // Add markers to the map
    markers.forEach(marker => {
      L.marker(marker).addTo(map);
    });
  }, []); // Run this effect only once after initial render

  // Return the map container with specified dimensions
  return <div id="map" style={{ width: '100%', height: '400px' }} />;
};

export default LeafletMap;
