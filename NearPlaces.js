import { MarkerF } from '@react-google-maps/api';
import axios from 'api/axios';
import React, { useEffect, useState } from 'react';
import { Fetch } from 'toolbox/Fetch';

// 주변 장소 찾기
export default function NearPlaces({lat, lng, radius, type}) {

    const nearPlacesURL = `http://localhost:8080/shelter/places/${lat}/${lng}/${radius}/${type}`;


    
    return (
        <Fetch uri={nearPlacesURL} />
    );
}
