import { MarkerF, InfoWindow } from '@react-google-maps/api';
import React, { useState } from 'react';
import { Fetch } from 'toolbox/Fetch';
import { Dropdown, DropdownButton } from 'react-bootstrap';


// 주변 장소 찾기
export default function NearPlaces({ lat, lng, radius, setDestPoint }) {
    const [activeMarker, setActiveMarker] = useState(null);

    const [placeType, setPlaceType] = useState(null);
    const nearPlacesURL = `http://localhost:8080/shelter/places/${lat}/${lng}/${radius}/${placeType}`;

    // 장소 용도
    function setPlaceUsetype(item) {
        setPlaceType(item)
    }
    
    // 인포윈도우 띄우기
    const handleInfo = (chosenMarker) => {
        if (chosenMarker === activeMarker) {
            return;
        }
        setActiveMarker(chosenMarker);
        console.log(chosenMarker);
    };

    // 내가 찍은 마커를 도착 지점으로 지정
    const handleActiveNP = (chosenNearPlace) => {
        setDestPoint({ lat: chosenNearPlace.placeLat, lng: chosenNearPlace.placeLng });
    };

    const RenderSuccessPlace = (nearPlaces) => {
        return (
            <>
                {placeType === "hospital" ? nearPlaces?.map((nearPlace) => (
                    <>
                        <MarkerF
                            position={{
                                lat: nearPlace.placeLat,
                                lng: nearPlace.placeLng
                            }}
                            icon={{
                                url: "https://cdn-icons-png.flaticon.com/128/4959/4959669.png", // 마커이미지의 주소
                                scaledSize: {
                                    width: 30,
                                    height: 30,
                                } // 마커이미지의 크기입니다
                            }}
                            onClick={() => handleActiveNP(nearPlace)}
                            onRightClick={() => handleInfo(nearPlace)}
                        />
                    </>
                )) : <></>
                }

                {/* 약국 마커 띄우기 */}
                {placeType === "pharmacy" || placeType === "drugstore" ? nearPlaces?.map((nearPlace) => (
                    <>
                        <MarkerF
                            position={{
                                lat: nearPlace.placeLat,
                                lng: nearPlace.placeLng
                            }}
                            icon={{
                                url: "https://cdn-icons-png.flaticon.com/128/8059/8059164.png", // 마커이미지의 주소
                                scaledSize: {
                                    width: 30,
                                    height: 30,
                                } // 마커이미지의 크기입니다
                            }}
                            onClick={() => handleActiveNP(nearPlace)}
                            onRightClick={() => handleInfo(nearPlace)}
                        />

                    </>
                ))
                    : <></>
                }

                {placeType === "supermarket" ? nearPlaces?.map((nearPlace) => (
                    <>
                        <MarkerF
                            position={{
                                lat: nearPlace.placeLat,
                                lng: nearPlace.placeLng
                            }}
                            icon={{
                                url: "https://cdn-icons-png.flaticon.com/128/3695/3695283.png", // 마커이미지의 주소
                                scaledSize: {
                                    width: 30,
                                    height: 30,
                                } // 마커이미지의 크기입니다
                            }}
                            onClick={() => handleActiveNP(nearPlace)}
                            onRightClick={() => handleInfo(nearPlace)}
                        />

                    </>
                ))
                    : <></>
                }

                {
                    activeMarker !== null &&
                    <InfoWindow
                        position={{
                            lat: activeMarker.placeLat,
                            lng: activeMarker.placeLng
                        }}
                        xAnchor={0.3}
                        yAnchor={0.5}
                        onCloseClick={() => setActiveMarker(null)}
                    >
                        <div align="Center">
                            {activeMarker.name} <br />
                            <a
                                href={`https://www.google.com/maps/dir/?api=1&destination=${activeMarker.placeLat},${activeMarker.placeLng}`}
                                style={{
                                    color: "blue",
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                }}
                                target="_blank"
                                rel="noreferrer"
                            >
                                길찾기
                            </a>
                        </div>
                    </InfoWindow >
                }
            </>
        )
    }

    return (
        <>
            <div style={{ position: 'absolute', top: '5px', left: '130px', zIndex: 1000 }}>
                <DropdownButton id="dropdown-basic-button" title="근처 장소 찾기" onSelect={setPlaceUsetype} >
                    <Dropdown.Item eventKey="hospital">병원</Dropdown.Item>
                    <Dropdown.Item eventKey="pharmacy">약국</Dropdown.Item>
                    <Dropdown.Item eventKey="supermarket">슈퍼마켓</Dropdown.Item>
                </DropdownButton>
            </div>

            {placeType &&
                < Fetch uri={nearPlacesURL} renderSuccess={RenderSuccessPlace} />
            }
        </>
    );
}