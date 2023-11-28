import React, { useState } from 'react';
import ShelterMapGoogle from './ShelterMapGoogle';

function GoogleMapContainer(props) {
    const [currentZoom, setCurrentZoom] = useState(5);

    function handleClick() {
        console.log(currentZoom);
    }

    function handleZoomChanged(newZoom) {
        setCurrentZoom(newZoom);
    }

    return (
        <div>
            <button onClick={handleClick}>Get Zoom</button>
            <ShelterMapGoogle
                googleMapURL="https://maps.googleapis.com/maps/api/js?key="
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                center={{ lat: -40.4338962, lng: 166.3297536 }}
                zoom={currentZoom}
                onZoomChanged={handleZoomChanged}
            />
        </div>
    );
}

export default GoogleMapContainer;