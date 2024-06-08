/*global kakao*/
import React, { useEffect, useState } from "react";
import LocList from "../components/buildinginfo";

const { kakao } = window;
const loc = LocList();

function ConvenientPage() {

    const [map, settingMap] = useState(null);
    const [render1, setRender1] = useState(true);
    const [markers, setMarkers] = useState([]);
    const [iW, addIW] = useState([]);
    const [convNum, setSelectedValue] = useState('');

    const getImgAdd = (imgName) => {
        try {
            const imgAdd = require(`../images/convenient/${imgName}`);
            return imgAdd;
        } catch (error) {
            return null;
        }
    };

    useEffect(() => {
        const script = document.createElement("script");
        script.async = true;
        script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=d4309b74d8b2fd437e9f76d9b2e75dad&autoload=false';

        script.onload = () => {
            window.kakao.maps.load(() => {
                if (render1) {
                    const container = document.getElementById('map');
                    const options = {
                        center: new window.kakao.maps.LatLng(37.55803420483414, 127.00088278271602),
                        level: 3
                    };
                    const newMap = new window.kakao.maps.Map(container, options)
                    settingMap(newMap);

                    loc.map((building) => {
                        const markerPosition = new window.kakao.maps.LatLng(building.Lat, building.Lng);
                        const newMarker = new window.kakao.maps.Marker({
                            position: markerPosition
                        });

                        newMarker.setMap(newMap);
                        newMarker.setMap(null);

                        setMarkers(prevMarkers => [...prevMarkers, newMarker]);
                    });

                    setRender1(false);
                }
            });
        };
        document.head.appendChild(script);
        return () => {
            document.head.removeChild(script);
        };
    }, []);

    const panTo = (building) => {
        var moveLatLon = new kakao.maps.LatLng(building.Lat, building.Lng);
        map.panTo(moveLatLon);            
    }

    useEffect(() => {
        if (map && markers) {
            markers.forEach(marker => marker.setMap(null));
            iW.forEach(iw => iw.setMap(null));

            if (convNum !== '') {
                const markerArray = [];
                const IwArray = [];

                loc.forEach(building => {
                    if (building.facilities[convNum] === 1) {
                        const markerPosition = new window.kakao.maps.LatLng(building.Lat, building.Lng);
                        const newMarker = new window.kakao.maps.Marker({
                            position: markerPosition,
                            clickable: true
                        });

                        const newInfo = new window.kakao.maps.CustomOverlay({
                            clickable: false,
                            map: map,
                            position: newMarker.getPosition(),
                            removable: true,
                            zIndex: 5
                        });

                        const convenientImage = building.code + "_" + convNum + ".png";
                        const imageSrc = getImgAdd(convenientImage);

                        const wrapperDiv = document.createElement('div');
                        wrapperDiv.classList.add('overlay-wrapper');

                        const barDiv = document.createElement('div');
                        barDiv.classList.add('overlay-bar');
                        const xmarkDiv = document.createElement('div');
                        xmarkDiv.classList.add('xmark');
                        const iElement = document.createElement('i');
                        iElement.classList.add('fa-solid', 'fa-xmark');
                        iElement.addEventListener('click', closeOverlay);
                        xmarkDiv.appendChild(iElement);
                        barDiv.appendChild(xmarkDiv);
                        wrapperDiv.appendChild(barDiv);

                        const contentWrapperDiv = document.createElement('div');
                        contentWrapperDiv.classList.add('overlay-content-wrapper');

                        const imgWrapperDiv = document.createElement('div');
                        imgWrapperDiv.classList.add('overlay-img-wrapper');
                        const imgElement = document.createElement('img');
                        imgElement.src = imageSrc;
                        imgElement.alt = 'Convenient Image';
                        imgWrapperDiv.appendChild(imgElement);
                        contentWrapperDiv.appendChild(imgWrapperDiv);

                        const textWrapperDiv = document.createElement('div');
                        textWrapperDiv.classList.add('overlay-text-wrapper');

                        const button = document.createElement('button');
                        button.textContent = '경로 탐색';
                        button.addEventListener('click', () => buttonClicked(building.code));

                        textWrapperDiv.appendChild(button);
                        contentWrapperDiv.appendChild(textWrapperDiv);

                        wrapperDiv.appendChild(contentWrapperDiv);

                        newInfo.setContent(wrapperDiv);
                        newInfo.setMap(null);
                        IwArray.push(newInfo);

                        function closeOverlay() {
                            if (map) {
                                if (newInfo.getMap() === null) {
                                    newInfo.setMap(map, newMarker);
                                } else {
                                    newInfo.setMap(null);
                                }
                            }
                        }

                        window.kakao.maps.event.addListener(newMarker, 'click', () => {
                            closeOverlay();
                            panTo(building);
                        });

                        newMarker.setMap(map);
                        markerArray.push(newMarker);
                    }
                });

                addIW(IwArray);
                setMarkers(markerArray);
            }
        }
    }, [convNum, map]);

    const buttonClicked = (id) => {
        localStorage.setItem('myData', id);
        window.location.href = '/navigation';
    };

    const findConv = (e) => {
        setSelectedValue(e.target.value);
    };

    return (
        <div className="map-wrapper">
            <div className="controller-wrapper">
                <select className="box-style" onChange={findConv}>
                    <option selected disabled>편의시설 선택</option>
                    <option value="0">카페</option>
                    <option value="1">식당</option>
                    <option value="2">편의점</option>
                    <option value="3">ATM</option>
                    <option value="4">열람실</option>
                    <option value="5">제세동기</option>
                    <option value="6">복사기</option>
                    <option value="7">유인복사실</option>
                    <option value="8">증명서자동발급기</option>
                </select>
            </div>

            <span>
                <div id="map" className="map-style"></div>
            </span>
        </div>
    );
}

export default ConvenientPage;
