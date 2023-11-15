import React, { memo, useState, useEffect, useRef } from 'react';
import { DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { forwardRef, useImperativeHandle } from 'react';

// // 자식 컴포넌트
// const findPath = forwardRef((props, ref) => {

// 찍은 마커이기때문에 클릭 이벤트가 필요하다 -
// 그 찍은 마커의 위치는 쉘터마커스의 shelter.shelterId안에 정보가 들어가있음 -> marker
// 내가 찍은 마커 안에 담긴 위도, 경도 정보가 destination의 위,경도 정보가 되어야 함.

// 내 위치에서 찍은 마커까지의 경로를 보여줄 것임
const ViewDirections = (({ origin, destination }) => {

    // 경로 담기
    const [directions, setDirections] = useState();
    // 경로에 찍히는 점 갯수
    const pointCounter = useRef(0);

    const LineStyles = {
        polylineOptions: {
            strokeColor: "red",
            strokeWeight: 6,
            strokeOpacity: 0.8
        }
    };

    useEffect(() => {
        pointCounter.current = 0;
        console.log(origin, destination);
    }, [origin.lat, origin.lng, destination.lat, destination.lng]);

    // 경로 출력
    const directionsCallback = (result, status) => {
        console.log(result, status);
        if (status === 'OK' && pointCounter.current === 0) {
            pointCounter.current += 1;
            setDirections(result);
        }
    }

    return (
        <>
            <DirectionsService
                options={{ origin, destination, travelMode: 'TRANSIT' }}
                callback={directionsCallback}
            />

            <DirectionsRenderer directions={directions} options={LineStyles} />

        </>
    );
});

// useImperativeHandle(ref, () => ({
//     // 부모에서 사용하고 싶었던 함수
//     Directions
// }));
// })

// 성능상의 이점을 위한 memo
export default memo(ViewDirections);