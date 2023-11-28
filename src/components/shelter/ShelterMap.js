import React, { useState, useEffect } from 'react';
import { Map, Polyline, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk"
import CustomOverlayStyle from 'style/CustomOverlayStyle';
import ShelterMarkers from './ShelterMarkers';
import CalculatePolylineDistanceStyle from 'style/CalculatePolylineDistanceStyle';
/**
 * 
 */
export default function ShelterMap() {
    const [curPos, setCurPos] = useState(null); // 현재 위치를 저장할 상태
    const [zoomLv, setZoomLv] = useState(3);  //1:코앞에 20M, 2:30M, 50M, 100M, 250M, 500M, 1KM, 2KM, 4KM, 8KM, 16KM, 32KM, 13:64KM, 14 128KM 동북아
    const [isMarkerOpen, setIsMarkerOpen] = useState(false);

    // 현재 위치를 ShelterMap을 생성할 때 준비해 줍니다.
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(geolocSuccessHandler, geolocErrorHandler); // 성공시 successHandler, 실패시 errorHandler 함수가 실행된다.
    }, []);

    const geolocSuccessHandler = (response) => {
        const { latitude, longitude } = response.coords;
        setCurPos({ latitude, longitude });
    };

    const geolocErrorHandler = (err) => {
        console.log("geoLocError = ", err)
    }

    // 거리재기 토글
    const [switchCalcDist, setSwitchCalcDist] = useState(0) // isLineDrawing
    const [path, setPath] = useState([])
    const [pathMovingPt, setPathMovingPt] = useState(0)
    // 선의 거리
    const [lineDistances, setLineDistances] = useState([])

    const [distanceStartPoint, setDistanceStartPoint] = useState()

    // 새로 찍은 점
    const [distPolyMovingPoint, setDistPolyMovingPoint] = useState()

    const calcDistToggle = (e) => {
        e.preventDefault();
        setSwitchCalcDist(0)
        //기존 거리 측정 경로 청소
        setPath([])
    }

    // 커서 이동에 따라 길 그리기
    const handleMove4Path = (
        _map,
        mouseEvent
    ) => {
        if (switchCalcDist !== 1|| path.length === 0) {
            //경로 그리기 및 시작된 상태가 아니라면 무시
            return
        }
        //경로에 추가
        setPathMovingPt({
            lat: mouseEvent.latLng.getLat(),
            lng: mouseEvent.latLng.getLng(),
        })
        setLineDistances((prev) => [
            ...prev,
            Math.round(distanceStartPoint.getLength() + distPolyMovingPoint.getLength()),
        ])
    }

    // switchCalcDist로 설정되어 있으면 클릭한 위치를 바탕으로 경로 추가
    const addPath = (_map, mouseEvent) => {
        if (switchCalcDist !== 1) {
            return
        }
        console.log("경로에 모인 지점은...", path)
        //경로에 추가
        setPath((prev) => [
            ...prev,
            {
                lat: mouseEvent.latLng.getLat(),
                lng: mouseEvent.latLng.getLng(),
            },
        ])
    }

    // 지정한 Point들로 거리측정하여 표기
    const calcDistanceOnPolyline = (
        _map,
        _mouseEvent
    ) => {
        setSwitchCalcDist(2)
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
            {curPos &&
                <Map // 지도를 표시할 Container
                    center={{
                        // 지도의 중심좌표
                        lat: curPos.latitude,
                        lng: curPos.longitude
                    }}
                    style={{
                        // 지도의 크기
                        width: "100%",
                        height: "450px",
                    }}
                    level={zoomLv}  //  지도의 확대 레벨
                    onClick={addPath || setIsMarkerOpen(false)}
                    onMouseMove={handleMove4Path}
                    onRightClick={calcDistanceOnPolyline}
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
                    <ShelterMarkers center={curPos} zoomLv={zoomLv} scale={50} />

                    {/* // 선의 거리 계산하기 */}
                    {switchCalcDist !== 1 && <CalculatePolylineDistanceStyle /> && path.length >= 1 ?
                        <Polyline
                            path={[...path, pathMovingPt]}
                            strokeWeight={3} // 선의 두께입니다
                            strokeColor={"#FF0080"} // 선의 색깔입니다
                            strokeOpacity={1} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                            onCreate={setDistPolyMovingPoint}
                        />
                        : <></>
                    }

                    {switchCalcDist && (
                        <CustomOverlayMap position={pathMovingPt} yAnchor={1} zIndex={2}>
                            <div className="dotOverlay distanceInfo">
                                총거리{" "}
                                <span className="number">
                                    {/* {Math.round(distPolyMovingPoint.getLength() + pathMovingPt.getLength())} */}
                                </span>
                                m
                            </div>
                        </CustomOverlayMap>
                    )}
                </Map>
            }
            <button onClick={calcDistToggle}>거리재기</button>
        </>
    )
}