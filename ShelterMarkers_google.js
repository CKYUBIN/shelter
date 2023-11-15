import React, { useState, useEffect } from 'react';
import { GoogleMap, MarkerF, InfoWindow, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { Fetch } from 'toolbox/Fetch';
import { MarkerClusterer, SuperClusterAlgorithm } from '@googlemaps/markerclusterer';

// 파라미터: 함수에서 정의되어 사용되는 변수
export default function ShelterMarkers_google({ center, zoomLv, scale, clusterer, setDestPoint }) {
    const displayLv = zoomLv * parseInt(100 / 14)
    const halfBoundary = scale * 100000
    const shelterUri = `http://localhost:8080/shelter/지진-옥외/${center.latitude}/${center.longitude}/${displayLv}/${halfBoundary}`;

    const [activeShelter, setActiveShelter] = useState(null);
    const [activeMarker, setActiveMarker] = useState(null);

    // 내가 찍은 마커를 도착 지점으로 지정
    const handleActiveShelter = (chosenShelter) => {
        setDestPoint({ lat: chosenShelter.shelterId.lat, lng: chosenShelter.shelterId.lng });
    };

    // 인포윈도우 띄우기
    const handleInfo = (chosenMarker) => {
        if (chosenMarker === activeMarker) {
            return;
        }
        setActiveMarker(chosenMarker);
    };

    // 마커 클러스터링
    new MarkerClusterer({
        algorithm: new SuperClusterAlgorithm({ radius: 100 })
    })

    function RenderSuccess(shelterList) {
        return (
            <>
                {shelterList?.map((shelter) => (
                    <>
                        <MarkerF
                            position={shelter.shelterId}
                            onClick={() => handleActiveShelter(shelter)}
                            onRightClick={() => handleInfo(shelter)}
                            image={{
                                src: "https://cdn-icons-png.flaticon.com/128/4467/4467108.png", // 마커이미지의 주소
                                size: {
                                    width: 40,
                                    height: 40,
                                } // 마커이미지의 크기입니다
                            }}
                            clusterer={clusterer}
                        />
                    </>
                ))}

                {activeMarker !== null &&
                    <InfoWindow onCloseClick={() => setActiveMarker(null)}
                        position={activeMarker.shelterId}
                        xAnchor={0.3}
                        yAnchor={0.5}
                    >
                        <div align="Center">
                            {activeMarker.name} <br />
                            {activeMarker.address} < br />
                            <a
                                href={`https://www.google.com/maps/dir/?api=1&destination=${activeMarker.shelterId.lat},${activeMarker.shelterId.lng}`}
                                style={{ color: "blue" }}
                                target="_blank"
                                rel="noreferrer"
                            >
                                길찾기
                            </a>
                        </div>
                    </InfoWindow>
                }
            </>
        )
    }
    return (
        <Fetch uri={shelterUri} renderSuccess={RenderSuccess} />
    );
}