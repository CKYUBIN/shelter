import React, { useState } from 'react';
import { MarkerF, InfoWindow } from '@react-google-maps/api';
import { Fetch } from 'toolbox/Fetch';
import { Dropdown, DropdownButton } from 'react-bootstrap';

// 파라미터: 함수에서 정의되어 사용되는 변수
export default function ShelterMarkersGoogle({ center, zoomLv, scale, clusterer, setDestPoint }) {
    const displayLv = zoomLv * parseInt(100 / 14)
    const halfBoundary = scale * 100000
    const [usageType, setUsageType] = useState(null);
    const shelterUri = `http://localhost:8080/shelter/${usageType}/${center.latitude}/${center.longitude}/${displayLv}/${halfBoundary}`;

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

    function setShelterUsetype(item) {
        setUsageType(item)
    }

    // 대피소 목록 마커 출력
    function RenderSuccess(shelterList) {
        return (
            <>
                {shelterList?.map((shelter) => (
                    <>
                        <MarkerF
                            position={shelter.shelterId}
                            onClick={() => handleActiveShelter(shelter)}
                            onRightClick={() => handleInfo(shelter)}
                            icon={{
                                url: "https://cdn-icons-png.flaticon.com/128/5587/5587696.png", // 마커이미지의 주소
                                scaledSize: {
                                    width: 30,
                                    height: 30,
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
        <>
         <div style={{ position: 'absolute', top: '5px', left: '5px', zIndex: 1000 }}>
            <DropdownButton id="dropdown-basic-button" title="대피소 유형" onSelect={setShelterUsetype}>
                <Dropdown.Item eventKey="지진-옥외">지진-옥외</Dropdown.Item>
                <Dropdown.Item eventKey="지진-실내">지진-실내</Dropdown.Item>
                <Dropdown.Item eventKey="이재민임시">이재민 임시</Dropdown.Item>
            </DropdownButton>
         </div>

            {usageType &&
                <Fetch uri={shelterUri} renderSuccess={RenderSuccess} />
            }
        </>
    );

}