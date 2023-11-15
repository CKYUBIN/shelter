import React, { useRef, useEffect } from 'react';

// 장소 자동완성
export default function AutoSearchPlaces({ setPlacelating }) {

    const autoCompleteRef = useRef()
    const inputRef = useRef()

    const options = {
        componentRestrictions: { country: "kr" }, // 예측 결과가 한국 시설로만 제한
        fields: ["address_components", "geometry", "icon", "name"],
        types: ["establishment"]
    }


    useEffect(() => {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            options
        );
        autoCompleteRef.current.addListener("place_changed", async function () {
            const place = await autoCompleteRef.current.getPlace();
            console.log("위도", place.geometry.location.lat());
            console.log("경도", place.geometry.location.lng());
            setPlacelating({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() })
        });
    }, []);

    return (
        <div>
            <label>enter address :</label>
            <input ref={inputRef} placeholder='장소를 입력하세요...' />
        </div>
    );


}
