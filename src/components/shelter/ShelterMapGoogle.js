import React, { useState, useEffect } from 'react'
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import ViewDirections from './Directions';
import ShelterMarkersGoogle from './ShelterMarkersGoogle';
import { MarkerClusterer } from '@react-google-maps/api';
import AutoSearchPlaces from './AutoSearchPlaces';
import NearPlaces from './NearPlaces';

const containerStyle = {
  width: '100%',
  height: '600px'
};

const myStyles = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];

function ShelterMapGoogle({ onZoomChanged }) {
  const [curPos, setCurPos] = useState(null);
  const [map, setMap] = useState(null);

  const [zoomLv, setZoomLv] = useState(10); // 초기 줌 레벨 설정

  // 검색 장소
  const [placelating, setPlacelating] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(geolocSuccessHandler, geoLocError); // 성공시 successHandler, 실패시 errorHandler 함수가 실행된다.
  }, []);

  const geolocSuccessHandler = (response) => {
    const { latitude, longitude } = response.coords;
    setCurPos({ latitude, longitude });
    // console.log("위도: ", latitude);
    // console.log("경도: ", longitude);
  };

  const geoLocError = (err) => {
    console.log("geoLocError = ", err)
  }

  // 도착 지점
  const [destPoint, setDestPoint] = useState(null);
  // 토글 기능
  const [swichDirections, setSwichDirections] = useState(false);

  const toggleDirections = (e) => {
    e.preventDefault();
    // console.log("눌리긴 하니");
    // 만약에 토글이 null이 아니면 활성화, null이면 청소하고 비활성화
    setSwichDirections(!swichDirections)
    setDestPoint(null)
  }


  return (
    <>
      {curPos &&
        <GoogleMap
          mapContainerStyle={containerStyle}
          ref={googleMap => {
            setMap(googleMap)
          }}
          center={{
            lat: 37.4854799,
            lng: 126.8981862
            // lat: curPos.latitude,
            // lng: curPos.longitude
          }}
          zoom={zoomLv}
          options={{ disableDefaultUI: true, styles: myStyles }}

        >
          {console.log("zoomLv 바뀌니", zoomLv)}

          {/* // 내 위치 띄우는 마커 */}
          <MarkerF
            position={{
              lat: 37.4854799,
              lng: 126.8981862
            }}
            icon={{
              url: "https://cdn-icons-png.flaticon.com/128/1673/1673221.png", // 마커이미지의 주소
              scaledSize: {
                width: 40,
                height: 40,
              } // 마커이미지의 크기입니다
            }}
          >
          </MarkerF>

          {/* 검색한 장소 띄우는 마커 */}
          {placelating &&
            //console.log(placelating)
            <MarkerF
              position={{
                lat: placelating.lat,
                lng: placelating.lng
              }}

              icon={{
                url: "https://cdn-icons-png.flaticon.com/128/6781/6781647.png",
                scaledSize: {
                  width: 30,
                  height: 30
                }
              }}
            >
            </MarkerF>
          }

          {/* 클러스터링 */}
          <MarkerClusterer>
            {clusterer =>
              <ShelterMarkersGoogle center={curPos} zoomLv={zoomLv} scale={50} clusterer={clusterer} setDestPoint={setDestPoint} />
            }
          </MarkerClusterer>

          {/* lat: curPos.latitude, lng: curPos.longitude */}
          {swichDirections && destPoint ?
            <ViewDirections origin={{ lat: 37.4854799, lng: 126.8981862 }} destination={destPoint} />
            : <></>
          }

          <NearPlaces lat={37.4854799} lng={126.8981862} radius={2000} setDestPoint={setDestPoint} />

        </GoogleMap>
      }

      <div className="direct" style={{ position: 'absolute', right: '20px' }}>
        <AutoSearchPlaces setPlacelating={setPlacelating} />
        <span />
        <button className='findbtn' onClick={toggleDirections} color='aquamarine'>경로 탐색</button>
        <span />
      </div>


    </>
  )
}

export default React.memo(ShelterMapGoogle)