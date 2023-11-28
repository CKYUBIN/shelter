import React, { useState, useEffect } from 'react';
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk"
import CustomOverlayStyle from 'style/CustomOverlayStyle';
import ShelterMarkers from './ShelterMarkers';
import { Polyline } from 'react-kakao-maps-sdk';
import CalculatePolylineDistanceStyle from 'style/CalculatePolylineDistanceStyle';

export default function ShelterMapOld() {
    const [curPos, setCurPos] = useState(null); // 현재 위치를 저장할 상태
    const [zoomLv, setZoomLv] = useState(3);   // 지도의 확대 레벨. 1: 코앞에(20m), 30m,50m,100m,250m,500m,1km,2km,4km,8km,16km,32km,64km 10: 멀리(도) 14: 최대(128km)
    const [isMarkerOpen, setIsMarkerOpen] = useState(false);

    // 현재 위치 가져오기, [] 생성 시에 자동실행
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(geolocSuccessHandler, geolocErrorHandler); // 성공시 successHandler, 실패시 errorHandler 함수가 실행된다.
    }, []);

    const geolocSuccessHandler = (response) => {
        console.log(response); // coords: GeolocationCoordinates {latitude: 위도, longitude: 경도, …} timestamp: 1673446873903
        const { latitude, longitude } = response.coords;
        setCurPos({ latitude, longitude });
    };

    const geolocErrorHandler = (error) => {
        console.log(error);
    };


    // 선의 거리 계산하기
    // 마우스 클릭: 시작, 오른쪽 마우스 클릭: 종료
    const [distanceStartPoint, setDistanceStartPoint] = useState()
    const [paths, setPaths] = useState([])
    const [isLineDrawing, setIsLineDrawing] = useState(false)
    // 선의 거리
    const [lineDistances, setLineDistances] = useState([])
    // 시작점 찍고 다음 점 찍기까지의 커서 이동에 따라 실시간으로 값이 바뀜
    const [mousePosition, setMousePosition] = useState({
        lat: 0,
        lng: 0,
    })

    // 새로 찍은 점
    const [distPolyMovingPoint, setDistPolyMovingPoint] = useState()

    // 거리재기 토글
    const [switchCalcDist, setSwitchCalcDist] = useState(false)
    // const [toggleReset, setToggleReset] = useState(false);

    const calcDistToggle = (e) => {
        e.preventDefault();
        setSwitchCalcDist(!switchCalcDist)
    }

    // 내가 클릭한 Point를 기점으로 PolyLine을 그리기
    const StartingDrawLinefromhandleClick = (
        _map,
        mouseEvent
    ) => {
        if (!isLineDrawing) {
            setLineDistances([])
            setPaths([])
        }
        setPaths((prev) => [
            ...prev,
            {
                lat: mouseEvent.latLng.getLat(),
                lng: mouseEvent.latLng.getLng(),
            },
        ])
        setLineDistances((prev) => [
            ...prev,
            Math.round(distanceStartPoint.getLength() + distPolyMovingPoint.getLength()),
        ])
        console.log("clickLine의 변화는..", distanceStartPoint);
        setIsLineDrawing(true)
    }

    // 내가 찍을 PolyLine을 미리 보여줌
    const handleMouseMoveToPreviewPolyLine = (
        _map,
        mouseEvent
    ) => {
        setMousePosition({
            lat: mouseEvent.latLng.getLat(),
            lng: mouseEvent.latLng.getLng(),
        })
    }
    console.log("setMousePosition",setMousePosition);

    // 지정한 Point들로 거리측정하여 표기토록 설정
    const calcDistanceOnPolyline = (
        _map,
        _mouseEvent
    ) => {
        setIsLineDrawing(false)
    }

    // 완료된 거리재기에 대한 정보
    const PolyLineDistanceInfo = ({ distance }) => {
        const walkkTime = (distance / 67) | 0
        const bicycleTime = (distance / 227) | 0

        return (
            <ul className="dotOverlay distanceInfo">
                <li>
                    <span className="label">총거리</span>{" "}
                    <span className="number">{distance}</span>m
                </li>
                <li>
                    <span className="label">도보</span>{" "}
                    {walkkTime > 60 && (
                        <>
                            <span className="number">{Math.floor(walkkTime / 60)}</span> 시간{" "}
                        </>
                    )}
                    <span className="number">{walkkTime % 60}</span> 분
                </li>
                <li>
                    <span className="label">자전거</span>{" "}
                    {bicycleTime > 60 && (
                        <>
                            <span className="number">{Math.floor(bicycleTime / 60)}</span>{" "}
                            시간{" "}
                        </>
                    )}
                    <span className="number">{bicycleTime % 60}</span> 분
                </li>
            </ul>
        )
    }


    return (
        <>
            <CustomOverlayStyle />
            {curPos && <>
                <Map // 지도를 표시할 Container
                    center={{
                        // 지도의 중심좌표
                        lat: curPos.latitude,
                        lng: curPos.longitude
                    }}
                    style={{
                        // 지도의 크기
                        width: "100%",
                        height: "800px",
                    }}
                    level={zoomLv} // 지도의 확대 레벨

                    onClick={StartingDrawLinefromhandleClick}
                    onRightClick={calcDistanceOnPolyline}
                    onMouseMove={handleMouseMoveToPreviewPolyLine}
                >
                    {/* 내위치 표시 */}
                    <MapMarker
                        position={{
                            lat: curPos.latitude,
                            lng: curPos.longitude
                        }}
                        image={{
                            src: "https://cdn-icons-gif.flaticon.com/12589/12589164.gif", // 마커이미지의 주소
                            size: {
                                width: 50,
                                height: 50,
                            } // 마커이미지의 크기입니다
                        }}
                        clickable={true}
                        removable={true}
                        onClick={() => setIsMarkerOpen(!isMarkerOpen)}
                        onMouseOver={() => setIsMarkerOpen(true)}
                        onMouseOut={() => setIsMarkerOpen(false)}
                    >
                        {isMarkerOpen && (<div style={{ minWidth: "150px" }}>
                            <div style={{ padding: "5px", color: "#000", textAlign: "center" }}>내 위치</div>
                        </div>)}
                    </MapMarker>

                    {/* 대피소 마커 찍기 */}
                    <ShelterMarkers center={curPos} zoomLv={zoomLv} scale={50} >
                        <div></div>
                    </ShelterMarkers>

                    {/* // 선의 거리 계산하기 */}
                    {switchCalcDist && <>
                        <CalculatePolylineDistanceStyle />
                        <Polyline
                            path={paths}
                            strokeWeight={3} // 선의 두께입니다
                            strokeColor={"#FF0080"} // 선의 색깔입니다
                            strokeOpacity={1} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            onCreate={setDistanceStartPoint}
                        />
                        {paths.map((path) => (
                            <CustomOverlayMap
                                key={`dot-${path.lat},${path.lng}`}
                                position={path}
                                zIndex={1}
                            >
                                <span className="dot"></span>
                            </CustomOverlayMap>
                        ))}
                        {paths.length > 1 &&
                            lineDistances.slice(1, lineDistances.length).map((distance, index) => (
                                <CustomOverlayMap
                                    key={`distance-${paths[index + 1].lat},${paths[index + 1].lng}`}
                                    position={paths[index + 1]}
                                    yAnchor={1}
                                    zIndex={2}
                                >
                                    {!isLineDrawing && lineDistances.length === index + 2 ? (
                                        <PolyLineDistanceInfo distance={distance} />
                                    ) : (
                                        <div className="dotOverlay">
                                            거리 <span className="number">{distance}</span>m
                                        </div>
                                    )}
                                </CustomOverlayMap>
                            ))}
                        <Polyline
                            path={isLineDrawing ? [paths[paths.length - 1], mousePosition] : []}
                            strokeWeight={3} // 선의 두께입니다
                            strokeColor={"#FF0080"} // 선의 색깔입니다
                            strokeOpacity={0.4} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            onCreate={setDistPolyMovingPoint}
                        />
                        {isLineDrawing && (
                            <CustomOverlayMap position={mousePosition} yAnchor={1} zIndex={2}>
                                <div className="dotOverlay distanceInfo">
                                    총거리{" "}
                                    <span className="number">
                                        {Math.round(distanceStartPoint.getLength() + distPolyMovingPoint.getLength())}
                                    </span>
                                    m
                                </div>
                            </CustomOverlayMap>
                        )}
                    </>}
                    <button onClick={calcDistToggle}>거리재기</button>
                </Map>
            </>
            }
        </>
    )
}