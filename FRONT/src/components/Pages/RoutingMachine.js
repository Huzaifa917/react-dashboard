// RoutingMachine.js
import React from "react";
import { MapLayer, withLeaflet } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "lrm-google";

class Routing extends MapLayer {
  createLeafletElement() {
    const { map } = this.props;
    const routing = L.Routing.control({
      waypoints: [
        L.latLng(16.506, 80.648),
        L.latLng(17.384, 78.4866),
        L.latLng(12.971, 77.5945)
      ],
      lineOptions: {
        styles: [
          {
            color: "blue",
            opacity: 0.6,
            weight: 4
          }
        ]
      }
    });
    return routing;
  }

  componentDidMount() {
    this.leafletElement.addTo(this.props.map);
  }
}

export default withLeaflet(Routing);
