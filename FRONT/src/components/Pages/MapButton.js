import React from 'react';

function MapButton() {
  const redirectToMap = () => {
    window.location.href = 'https://iesedashboard.000webhostapp.com/';
  };

  return (
    <button onClick={redirectToMap}>Go to Map</button>
  );
}

export default MapButton;
