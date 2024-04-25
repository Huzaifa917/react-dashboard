import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import L from 'leaflet'; // Import leaflet library
import 'leaflet/dist/leaflet.css';
import ReactDOMServer from 'react-dom/server'; // Import ReactDOMServer from react-dom/server
import markerIconImage from './maps-and-flags.png'; // Import the marker image

const markerIcon = new L.Icon({
  iconUrl: markerIconImage,
  iconSize: [40, 40],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});

class SimpleMap extends Component {
  // Create a custom icon component
  CustomIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  );

  // Convert the custom icon component to an icon URL using leaflet's createIcon function
  customMarkerIcon = L.divIcon({
    html: ReactDOMServer.renderToString(<this.CustomIcon />), // Convert the component to HTML
    iconSize: [30, 30], // Adjust the size as needed
  });

  render() {
    const position = [33.694397, 73.215898]; // Default position for the map

    const { markers } = this.props;

    const geoJsonCoordinates = {
      "type": "Polygon",
      "coordinates": [
        [
          [73.225014899426498, 33.701668210917198],
          [73.204594661182597, 33.694053780134396],
          [73.199381243619797, 33.689616520972798],
          [73.199334986776194, 33.683628867323499],
          [73.208473837103597, 33.675394131552899],
          [73.222169208504994, 33.682501700287197],
          [73.232718364685994, 33.693598252420401],
          [73.228436768066601, 33.701599204849401],
          [73.225014899426498, 33.701668210917198]
        ]
      ]
    };

    return (
      <MapContainer center={position} zoom={15} style={{ height: '400px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <GeoJSON data={geoJsonCoordinates} />
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position} icon={markerIcon} eventHandlers={{ click: () => console.log('clicked') }}>
            <Popup>{marker.text}</Popup>
          </Marker>
        ))}
        {/* Add standard Leaflet markers */}
      </MapContainer>
    );
  }
}

export default SimpleMap;
