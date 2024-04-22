import React from "react";
import { MapControl, withLeaflet } from "react-leaflet";
import L from "leaflet"; // Import the Leaflet library

class MapInfo extends MapControl {
  createLeafletElement() {
    const { map } = this.props.leaflet;
    const infoControl = L.control({ position: "bottomleft" });

    infoControl.onAdd = function () {
      this.panelDiv = L.DomUtil.create("div", "info-control");
      return this.panelDiv;
    };

    infoControl.update = function (content) {
      this.panelDiv.innerHTML = content;
    };

    infoControl.addTo(map);
    return infoControl;
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const { map } = this.props.leaflet;
      map.on("mousemove", (ev) => {
        this.leafletElement.update(
          `<h2><span>Lat: ${ev.latlng.lat.toFixed(4)}</span>&nbsp;<span>Lng: ${ev.latlng.lng.toFixed(4)}</span></h2>`
        );
      });
    }
  }
}

export default withLeaflet(MapInfo);
