import React, { useState, useEffect } from 'react'
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import ViewDirections from './Directions';
import ShelterMarkers_google from './ShelterMarkers_google';
import { useRef } from 'react';
import { render } from '@testing-library/react';
import { MarkerClusterer } from '@react-google-maps/api';
import AutoSearchPlaces from './AutoComplete ';
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

function ShelterMapGoogle() {
  const [curPos, setCurPos] = useState(null);
  const [zoomLv, setZoomLv] = useState(10);

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
          center={{
            lat: 37.4854799,
            lng: 126.8981862
            // lat: curPos.latitude,
            // lng: curPos.longitude
          }}
          zoom={zoomLv}
          options={{ disableDefaultUI: true, styles: myStyles }}
        >
          {/* // 내 위치 띄우는 마커 */}
          <MarkerF
            position={{
              lat: 37.4854799,
              lng: 126.8981862
            }}
            // icon={
            //   {url:"https://cdn-icons-gif.flaticon.com/12589/12589164.gif"}
            // }
            // scale={1.5}
            icon={"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"}
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
              icon={"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"}
            >
            </MarkerF>
          }


          <MarkerClusterer>
            {clusterer =>
              <ShelterMarkers_google center={curPos} zoomLv={zoomLv} scale={50} clusterer={clusterer} setDestPoint={setDestPoint} />
            }
          </MarkerClusterer>

          {/* lat: curPos.latitude, lng: curPos.longitude */}
          {swichDirections && destPoint ?
            <ViewDirections origin={{ lat: 37.4854799, lng: 126.8981862 }} destination={destPoint} />
            : <></>
          }

        </GoogleMap>
      }
      {/* <div>
      <Sidebar width={320} ></Sidebar>
      </div> */
      }
      <span />
      <button className="btn" onClick={toggleDirections}>경로 탐색</button>
      <AutoSearchPlaces setPlacelating={setPlacelating} />

      <NearPlaces lat={37.4854799} lng={126.8981862} radius={1000} type={"hospital"} />

    </>
  )
}

export default React.memo(ShelterMapGoogle)