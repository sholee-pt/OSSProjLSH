/*global kakao*/

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import LocListWalk from "../components/buildinginfo";
import LocListWheel from "../components/buildinginfo_W";
import { showMarker } from "../components/Marker";
import walkData from "../components/node.json";
import wheelData from "../components/node_W.json";
import walk1 from "../components/walk1.png";
import walk2 from "../components/walk2.png";
import wheel1 from "../components/wheel1.png";
import wheel2 from "../components/wheel2.png";
import changeBoth from "../components/change.png";
import moveCenter from "../components/moveCenter";

function KakaoMap({ start, finish }) {
    const storedData = localStorage.getItem('myData');
    const [map, settingMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [iW, addIW] = useState([]);
    const [path, setPath] = useState([]);
    const [shortestPath, setShortestPath] = useState([]);
    const [dLatLng, setDLatLng] = useState([]);
    const [searchClicked, setSearchClicked] = useState(false);
    const [startLocation, setStartLocation] = useState(start || "");
    const [finishLocation, setFinishLocation] = useState(finish || storedData || "");
    const [image, setImage] = useState([]);
    const [evMarkers, setEvMarkers] = useState([]);
    const [selectedRadio, setSelectedRadio] = useState(null); // 기본값 없음
    const [startMarker, setStartMarker] = useState(null);
    const [finishMarker, setFinishMarker] = useState(null);
    const [nodeData, setNodeData] = useState(null); // 기본값 없음
    const [loc, setLoc] = useState([]); // 기본값 없음

    const SetStart = (value) => {
        setStartLocation(value);
        console.log("SetStart called with value:", value);
    };

    const SetFinish = (value) => {
        setFinishLocation(value);
        console.log("SetFinish called with value:", value);
    };

    const deleteLine = useCallback(() => {
        if (map && path.length > 0) {
            path.forEach((line) => line.setMap(null)); // Remove each line from the map
        }
    }, [map, path]);

    const deleteMarker = useCallback(() => {
        if (markers && markers.length > 0) {
            markers.forEach((marker) => marker.setMap(null)); // Remove each marker from the map
            iW.forEach((iW) => iW.setMap(null)); // Remove each infoWindow from the map
            addIW([]); // Clear the iW array
            setMarkers([]); // Clear the markers array
        }
    }, [markers, iW]);

    const imgChk = useCallback((node) => {
        const code = node + ".jpg";
        try {
            const imgAdd = getImgAdd(code);
            if (imgAdd !== null) {
                const img = new Image();
                img.src = imgAdd;
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    const cngMarker = useCallback((newMarker) => {
        setMarkers(newMarker);
    }, []);

    const createMarker = useCallback((dLatLng, shortestPath) => {
        if (map) {
            try {
                deleteMarker();
                const newMarkers = [];
                const newiW = [];
                const tempEvMarkers = [];
                for (let i = 0; i < shortestPath.length; i++) {
                    const node = shortestPath[i];
                    const loc = nodeData.find(l => l.code === node); // 노드 데이터를 현재 모드 데이터로 변경
                    if (loc) {
                        const markerPosition = new window.kakao.maps.LatLng(loc.Lat, loc.Lng);
                        const newMarker = new window.kakao.maps.Marker({
                            position: markerPosition,
                        });
                        newMarker.setMap(map);
                        newMarkers.push(newMarker);

                        const imgCode = node + ".jpg";
                        const infoImg = getImgAdd(imgCode);
                        const infoContent = `
                            <div style="padding:5px; z-index:1;">
                                ${node}<br>
                                <img src="${infoImg}" width="100" height="100">
                            </div>`;

                        const infoWindow = new window.kakao.maps.InfoWindow({
                            content: infoContent,
                            removable: true
                        });

                        newiW.push(infoWindow);

                        window.kakao.maps.event.addListener(newMarker, 'click', function () {
                            infoWindow.open(map, newMarker);
                        });
                    }

                    if (node[0] === 'V') {
                        const ev = "ev.png";
                        const imageSrc = getImgAdd(ev), 
                            imageSize = new kakao.maps.Size(30, 30), 
                            imageOption = { offset: new kakao.maps.Point(14, 20) };

                        const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
                            markerPosition = new window.kakao.maps.LatLng(
                                parseFloat(dLatLng[i][0]),
                                parseFloat(dLatLng[i][1])
                            );
                        const newMarker = new window.kakao.maps.Marker({
                            position: markerPosition,
                            image: markerImage,
                        });
                        newMarker.setMap(map);
                        tempEvMarkers.push(newMarker);
                    } else if (imgChk(node) === true) {
                        const camera = "camera.png";
                        const imgCode = node + ".jpg";
                        const infoImg = getImgAdd(imgCode);

                        const imageSrc = getImgAdd(camera), 
                            imageSize = new kakao.maps.Size(32, 35), 
                            imageOption = { offset: new kakao.maps.Point(14, 20) };

                        const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
                            markerPosition = new window.kakao.maps.LatLng(
                                parseFloat(dLatLng[i][0]),
                                parseFloat(dLatLng[i][1])
                            );
                        const newMarker = new window.kakao.maps.Marker({
                            position: markerPosition,
                            image: markerImage,
                            clickable: true
                        });

                        const newInfo = new window.kakao.maps.CustomOverlay({
                            clickable: false,
                            map: map,
                            position: newMarker.getPosition(),
                            removable: true,
                            zIndex: 5
                        });

                        const wrapperDiv = document.createElement('div');
                        wrapperDiv.classList.add('overlay-wrapper-onlyimg');

                        const barDiv = document.createElement('div');
                        barDiv.classList.add('overlay-bar');

                        const xmarkDiv = document.createElement('div');
                        xmarkDiv.classList.add('xmark');
                        const iElement = document.createElement('i');
                        iElement.classList.add('fa-solid', 'fa-xmark');
                        iElement.addEventListener('click', closeOverlay);
                        xmarkDiv.appendChild(iElement);

                        const imgWrapperDiv = document.createElement('div');
                        imgWrapperDiv.classList.add('overlay-img-wrapper');
                        const imgElement = document.createElement('img');
                        imgElement.src = infoImg;
                        imgElement.alt = 'Building Image';
                        imgWrapperDiv.appendChild(imgElement);

                        barDiv.appendChild(xmarkDiv);
                        wrapperDiv.appendChild(barDiv);
                        wrapperDiv.appendChild(imgWrapperDiv);

                        newInfo.setContent(wrapperDiv);

                        function closeOverlay() {
                            if (map) {
                                if (newInfo.getMap() === null) {
                                    newInfo.setMap(map, newMarker);
                                } else {
                                    newInfo.setMap(null);
                                }
                            }
                        }

                        newInfo.setMap(null);
                        newiW.push(newInfo);

                        window.kakao.maps.event.addListener(newMarker, 'click', function () {
                            closeOverlay();
                        });

                        newMarker.setMap(map);
                        newMarkers.push(newMarker);
                    } else {
                        console.log("none");
                    }
                }
                addIW(newiW);
                setMarkers(newMarkers); 
                setEvMarkers(tempEvMarkers);

                evMarkers.forEach((marker) => {
                    marker.setMap(null);
                });
            } catch {
                console.log("createMarker Error");
            }
        }
    }, [map, deleteMarker, imgChk, nodeData]);

    const drawPath = useCallback((nestedList) => {
        if (map) {
            deleteLine();
            try {
                const newPath = [];
                for (let i = 0; i < nestedList.length - 1; i++) {
                    const startLatLng = new window.kakao.maps.LatLng(
                        parseFloat(nestedList[i][0]),
                        parseFloat(nestedList[i][1])
                    );
                    const finishLatLng = new window.kakao.maps.LatLng(
                        parseFloat(nestedList[i + 1][0]),
                        parseFloat(nestedList[i + 1][1])
                    );
                    const newLine = new window.kakao.maps.Polyline({
                        path: [startLatLng, finishLatLng],
                        strokeWeight: 5,
                        strokeColor: '#FF0000',
                        strokeOpacity: 0.7,
                        strokeStyle: 'solid'
                    });
                    newLine.setMap(map);
                    newPath.push(newLine);
                }
                setPath(newPath);
            } catch (error) {
                console.log("drawPath error:", error);
            }
        }
    }, [map, deleteLine]);

    useEffect(() => {
        if (!map) {
            const script = document.createElement("script");
            script.async = true;
            script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=d4309b74d8b2fd437e9f76d9b2e75dad&autoload=false";

            script.onload = () => {
                window.kakao.maps.load(() => {
                    const container = document.getElementById("map");
                    const options = {
                        center: new window.kakao.maps.LatLng(37.55803420483414, 127.00088278271602),
                        level: 3
                    };

                    const newMap = new window.kakao.maps.Map(container, options);
                    settingMap(newMap);
                    // 모드에 따라 중앙을 이동
                    moveCenter(newMap, selectedRadio);

                    const mapTypeControl = new window.kakao.maps.MapTypeControl();
                    newMap.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

                    const zoomControl = new window.kakao.maps.ZoomControl();
                    newMap.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
                });
            };

            window.onunload = () => {
                localStorage.removeItem('myData');
            };

            document.head.appendChild(script);
            return () => {
                document.head.removeChild(script);
            };
        } else if (markers && markers.length > 0) {
            try {
                cngMarker(showMarker(map, markers, iW));
            } catch (error) {
                console.log("Error:", error);
            }
        } else if (map && path.length > 0) {
            path.forEach((line) => line.setMap(null));
            setPath([]);
        }
    }, [map, markers, iW, path, cngMarker, selectedRadio]);

    useEffect(() => {
        if (map && searchClicked) {
            console.log("map:", map);
            console.log("dLatLng:", dLatLng);
            console.log("shortestPath:", shortestPath);
            if (dLatLng && dLatLng.length > 0 && shortestPath && shortestPath.length > 0) {
                drawPath(dLatLng);
                createMarker(dLatLng, shortestPath);
                setSearchClicked(false);
            }
        }
    }, [map, searchClicked, dLatLng, shortestPath, createMarker, drawPath]);

    const getImgAdd = (imgName) => {
        try {
            return require(`../images/${imgName}`).default;
        } catch (error) {
            return null;
        }
    };

    const handleSearchClick = () => {
        if (!selectedRadio) {
            window.alert("모드를 먼저 선택하세요.");
        } else if (!startLocation || !finishLocation) {
            window.alert('출발지와 목적지를 설정해주세요.');
        } else {
            console.log("Searching path with:", startLocation, finishLocation, "mode:", selectedRadio);
            axios.get('/map', {
                params: {
                    start: startLocation,
                    finish: finishLocation,
                    mode: selectedRadio
                }
            })
            .then(response => {
                console.log("Received response:", response.data);
                const nestedList = response.data;
                if (nestedList && nestedList.dLatLng) {
                    console.log("Setting shortestPath and dLatLng with data:", nestedList);
                    setShortestPath(nestedList.shortestPath);
                    setDLatLng(nestedList.dLatLng);
                    setSearchClicked(true);
                } else {
                    console.error("Invalid response data:", nestedList);
                }
            })
            .catch(error => {
                console.log("Error:", error);
                if (error.response && error.response.data) {
                    console.log("Error response data:", error.response.data);
                }
            });
        }
    };

    const walkingMode = (e) => {
        setSelectedRadio(e.target.value);
        setNodeData(walkData); // 걷기 모드 데이터로 설정
        setLoc(LocListWalk()); // 걷기 모드 건물 리스트로 설정
        console.log("Walking mode selected, nodeData:", walkData, "loc:", LocListWalk());
    };

    const wheelchairMode = (e) => {
        setSelectedRadio(e.target.value);
        setNodeData(wheelData); // 휠체어 모드 데이터로 설정
        setLoc(LocListWheel()); // 휠체어 모드 건물 리스트로 설정
        console.log("Wheelchair mode selected, nodeData:", wheelData, "loc:", LocListWheel());
    };

    const switchStartFinish = () => {
        const tempStart = startLocation;
        SetStart(finishLocation);
        SetFinish(tempStart);
    };

    const handleStartChange = (e) => {
        const selectedValue = e.target.value;
        SetStart(selectedValue);
        if (map && startMarker) {
            startMarker.setMap(null);
        }
        const selectedLocation = loc.find(location => location.code === selectedValue);
        if (selectedLocation) {
            const markerPosition = new kakao.maps.LatLng(selectedLocation.Lat, selectedLocation.Lng);
            const newMarker = new kakao.maps.Marker({
                position: markerPosition,
                map: map
            });
            setStartMarker(newMarker);
            console.log("Start marker added at:", markerPosition);
        } else {
            console.error("Selected start location not found:", selectedValue);
        }
    };

    const handleFinishChange = (e) => {
        const selectedValue = e.target.value;
        SetFinish(selectedValue);
        if (map && finishMarker) {
            finishMarker.setMap(null);
        }
        const selectedLocation = loc.find(location => location.code === selectedValue);
        if (selectedLocation) {
            const markerPosition = new kakao.maps.LatLng(selectedLocation.Lat, selectedLocation.Lng);
            const newMarker = new kakao.maps.Marker({
                position: markerPosition,
                map: map
            });
            setFinishMarker(newMarker);
            console.log("Finish marker added at:", markerPosition);
        } else {
            console.error("Selected finish location not found:", selectedValue);
        }
    };

    return (
        <div className="map-wrapper">
            <div className="radio-wrapper">
                <label className="radio-label">
                    <input
                        type="radio"
                        name="radioGroup"
                        value="normal"
                        className="radio-image"
                        checked={selectedRadio === 'normal'}
                        onChange={walkingMode}
                    />
                    <img src={selectedRadio === 'normal' ? walk2 : walk1} alt="Walk" />
                </label>
                <label className="radio-label">
                    <input
                        type="radio"
                        name="radioGroup"
                        value="wheelchair"
                        className="radio-image"
                        checked={selectedRadio === 'wheelchair'}
                        onChange={wheelchairMode}
                    />
                    <img src={selectedRadio === 'wheelchair' ? wheel2 : wheel1} alt="Wheelchair" />
                </label>
            </div>
            <div className="controller-wrapper">
                <select className="box-style" value={startLocation} onChange={handleStartChange}>
                    <option value="" disabled>출발지 선택</option>
                    {loc.map((building) => <option key={building.code} value={building.code}>{building.id}</option>)}
                </select>
                <button className="switch-button" onClick={switchStartFinish}>
                    <img src={changeBoth} alt="Switch" className="switch-button-img" />
                </button>
                <select className="box-style" value={finishLocation} onChange={handleFinishChange}>
                    <option value="" disabled>도착지 선택</option>
                    {loc.map((building) => (
                        <option
                            key={building.code}
                            value={building.code}
                            selected={building.code === storedData}
                        >
                            {building.id}
                        </option>))}
                </select>
                <button className="button-style" onClick={handleSearchClick}>경로 탐색</button>
            </div>
            <span>
                <div id="map" className="map-style"></div>
            </span>
        </div>
    );
}

export default KakaoMap;
