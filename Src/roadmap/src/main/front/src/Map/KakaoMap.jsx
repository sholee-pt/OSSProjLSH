// /*global kakao*/
// import React, { useEffect, useState} from "react";
// import axios from "axios"
// import LocList from "../components/buildinginfo";
// import drawLine from "../components/Line";
// import {showMarker } from "../components/Marker";



// const { kakao } = window;
// const loc = LocList();

// function KakaoMap() {

//     const storedData = localStorage.getItem('myData');

//     const [map, settingMap] = useState(null);
//     const [markers, setMarkers] = useState([])
//     const [iW, addIW] = useState([])
//     const [path, setPath] = useState(null)
//     const [stateMarker, setStateMarker] = useState(true)
//     const [start, SetStart] = useState()
//     const [finish, SetFinish] = useState(storedData || '')
//     const [shortestPath, setShortestPath] = useState([])
//     const [dLatLng, setDLatLng] = useState([])
//     const [searchClicked, setSearchClicked] = useState(false)
//     const [image,setImage] = useState([])
//     const [evMarkers, setEvMarkers] = useState([]);



//     const cngMarker = (newMarker) => {
//         setMarkers(newMarker)
//     }

//     useEffect(() => {
//         if (!map) {
//             const script = document.createElement("script");
//             script.async = true;
//             script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=d4309b74d8b2fd437e9f76d9b2e75dad&autoload=false";

//             script.onload = () => {
//                 window.kakao.maps.load(() => {
//                     const container = document.getElementById("map");
//                     const options = {
//                         center: new window.kakao.maps.LatLng(37.55803420483414, 127.00088278271602),
//                         level: 3
//                     };

//                     const newMap = new window.kakao.maps.Map(container, options);
//                     settingMap(newMap);

//                     const mapTypeControl = new window.kakao.maps.MapTypeControl();
//                     newMap.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

//                     const zoomControl = new window.kakao.maps.ZoomControl();
//                     newMap.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
//                 });
//             };

//             window.onunload = () => {
//                 localStorage.removeItem('myData');
//             }

//             document.head.appendChild(script);
//             return () => {
//                 document.head.removeChild(script);
//             };
//         } else if (markers && stateMarker) {
//             try {
//                 cngMarker(showMarker(map, markers, iW));
//             } catch (error) {
//                 console.log("Error:", error);
//             }
//         } else if (map && path) {
//             path.forEach((line) => line.setMap(null));
//             setPath([]);
//         }
//     }, [map, markers, stateMarker, dLatLng, shortestPath,path,iW]);

//     useEffect(() => {
//         if(map) {
//             if (searchClicked) {
//                 if (map && markers && dLatLng && shortestPath) {
//                     drawPath(dLatLng);
//                     createMarker(dLatLng, shortestPath);
//                 }

//                 setSearchClicked(false); // Reset the searchClicked state variable
//             }
//         }
//     },[markers,stateMarker,dLatLng,shortestPath,path,iW])

//     const deleteLine = () => {
//         if (map && path) {
//             path.forEach((line) => line.setMap(null)); // Remove each line from the map
//         }
//     };

//     const deleteMarker = () => {
//         if (markers && markers.length > 0) {
//             markers.forEach((marker) => {marker.setMap(null)});// Remove each marker from the map
//             iW.forEach((iW) => {iW.setMap(null)});// Remove each infoWindow from the map
//             addIW([]);// Clear the iW array
//             setMarkers([]); // Clear the markers array
//         }
//     };

//     const getImgAdd = (imgName) => {
//         try {
//             const imgAdd = require(`../images/${imgName}`);
//             return imgAdd;
//         } catch (error) {
//             return null;
//         }
//     };
//     function imgChk(node){
//         const code = node + ".jpg";
//         try {
//             const imgAdd = getImgAdd(code);
//             if(imgAdd !== null){
//                 const img = new Image();
//                 img.src = imgAdd;
//                 return true;
//             }
//             else {
//                 return false;
//             }
//         } catch (error) {
//             console.error();
//         }
//     }


//     function createMarker(dLatLng, shortestPath) {
//         if (map) {
//             try {
//                 deleteMarker(); // Delete previously existing markers
//                 const newMarkers = [];
//                 const newiW = [];
//                 const tempEvMarkers = [];
//                 for (let i = 0; i < dLatLng.length; i++) {

//                     const node = shortestPath[i];

//                     if(i===0 || i === dLatLng.length - 1){
//                         const markerPosition = new window.kakao.maps.LatLng(
//                             parseFloat(dLatLng[i][0]),
//                             parseFloat(dLatLng[i][1])
//                         );
//                         const newMarker = new window.kakao.maps.Marker({
//                             position: markerPosition,
//                         });
//                         newMarker.setMap(map);
//                         newMarkers.push(newMarker);
//                     }

//                     console.log(node);

//                     if(node[0] === 'V') {
//                         const ev = "ev.png";
//                         const imageSrc = getImgAdd(ev), // 마커이미지의 주소입니다
//                             imageSize = new kakao.maps.Size(30, 30), // 마커이미지의 크기입니다
//                             imageOption = {offset: new kakao.maps.Point(14, 20)};

//                         const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
//                             markerPosition = new window.kakao.maps.LatLng(
//                                 parseFloat(dLatLng[i][0]),
//                                 parseFloat(dLatLng[i][1])
//                             );
//                         const newMarker = new window.kakao.maps.Marker({
//                             position: markerPosition,
//                             image: markerImage,
//                         });
//                         newMarker.setMap(map);
//                         tempEvMarkers.push(newMarker);
//                     } else if(imgChk(node)===true){
//                         const camera = "camera.png";
//                         const imgCode = node + ".jpg"
//                         const infoImg = getImgAdd(imgCode)

//                         const imageSrc = getImgAdd(camera), // 마커이미지의 주소입니다
//                             imageSize = new kakao.maps.Size(32, 35), // 마커이미지의 크기입니다
//                             imageOption = {offset: new kakao.maps.Point(14, 20)};

//                         const markerImage  = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
//                             markerPosition = new window.kakao.maps.LatLng(
//                                 parseFloat(dLatLng[i][0]),
//                                 parseFloat(dLatLng[i][1])
//                             );
//                         const newMarker = new window.kakao.maps.Marker({
//                             position: markerPosition,
//                             image: markerImage,
//                             clickable: true
//                         });

//                         const newInfo = new window.kakao.maps.CustomOverlay({
//                             clickable: false,
//                             map: map,
//                             position: newMarker.getPosition(),
//                             removable: true,
//                             zIndex: 5
//                         })

//                         const wrapperDiv = document.createElement('div');
//                         wrapperDiv.classList.add('overlay-wrapper-onlyimg');

//                         const barDiv = document.createElement('div');
//                         barDiv.classList.add('overlay-bar');

//                         const xmarkDiv = document.createElement('div');
//                         xmarkDiv.classList.add('xmark');
//                         const iElement = document.createElement('i');
//                         iElement.classList.add('fa-solid', 'fa-xmark');
//                         iElement.addEventListener('click', closeOverlay);
//                         xmarkDiv.appendChild(iElement);

//                         const imgWrapperDiv = document.createElement('div');
//                         imgWrapperDiv.classList.add('overlay-img-wrapper');
//                         const imgElement = document.createElement('img');
//                         imgElement.src = infoImg;
//                         imgElement.alt = 'Building Image';
//                         imgWrapperDiv.appendChild(imgElement);

//                         barDiv.appendChild(xmarkDiv);
//                         wrapperDiv.appendChild(barDiv);
//                         wrapperDiv.appendChild(imgWrapperDiv);

//                         newInfo.setContent(wrapperDiv)

//                         function closeOverlay() {
//                             if (map) {
//                                 if (newInfo.getMap() === null) {
//                                     newInfo.setMap(map, newMarker)
//                                 }
//                                 else {
//                                     newInfo.setMap(null)
//                                 }
//                             }
//                         }

//                         newInfo.setMap(null)
//                         newiW.push(newInfo)

//                         window.kakao.maps.event.addListener(newMarker, 'click', function(){
//                             closeOverlay();
//                         });

//                         newMarker.setMap(map);
//                         newMarkers.push(newMarker);

//                     } else {
//                         console.log("none");
//                     }
//                 }
//                 addIW((newiW))
//                 setMarkers(newMarkers); // Set the new markers in the state variable
//                 setEvMarkers(tempEvMarkers);

//                 evMarkers.forEach((marker) => {
//                     marker.setMap(null);
//                 });
//             } catch {
//                 console.log("createMarker Error");
//             }
//         }
//     }

//     function drawPath(nestedList) {
//         if (map) {
//             deleteLine(); // Delete the previously drawn path
//             try {
//                 const newPath = [];
//                 for (let i = 0; i < nestedList.length - 1; i++) {
//                     const startLatLng = new window.kakao.maps.LatLng(
//                         parseFloat(nestedList[i][0]),
//                         parseFloat(nestedList[i][1])
//                     );
//                     const finishLatLng = new window.kakao.maps.LatLng(
//                         parseFloat(nestedList[i + 1][0]),
//                         parseFloat(nestedList[i + 1][1])
//                     );
//                     const newLine = drawLine(map, startLatLng, finishLatLng); // Draw each line of the new path
//                     newPath.push(newLine);
//                 }
//                 setPath(newPath); // Set the new path in the state variable
//             } catch {
//                 console.log("drawPath error");
//             }
//         }
//     }




//     return (
//         <div className="map-wrapper">
//             <div className="controller-wrapper">
//                 <select className="box-style" onChange={(e)=>{
//                         SetStart(e.target.value);
//                 }}>
//                     <option selected disabled>출발지 선택</option>
//                     {loc.map((building) => <option key={building.code} value={building.code}>{building.id}</option>)}
//                 </select>
//                 <select className="box-style" onChange={(e) =>{
//                     const selectedValue = e.target.value;
//                     SetFinish(selectedValue);
//                 }}>
//                     <option selected disabled>도착지 선택</option>
//                     {loc.map((building) => (
//                         <option
//                             key={building.code}
//                             value={building.code}
//                             selected={building.code === storedData}
//                         >
//                             {building.id}
//                         </option>))}
//                 </select>
//                 <button className="button-style" onClick={
//                     ()=>{
//                         axios.get('/map', {
//                             params: {
//                                 start: start,
//                                 finish: finish
//                             }
//                         })
//                             .then(response => {
//                                 const nestedList = response.data; // Assuming the response contains the List<List<Double>> structure
//                                 // Handle the nestedList data here
//                                 setImage(nestedList.image)
//                                 setShortestPath(nestedList.shortestPath);
//                                 setDLatLng(nestedList.dLatLng)
//                                 setSearchClicked(true);
//                             })
//                             .catch(error => {
//                                 console.log("Error:", error);
//                             });
//                     }

//                 }
//                 >경로 탐색</button>
//             </div>

//             <span>
//                 <div id="map" className="map-style"></div>
//             </span>
//         </div>
//     )

// }

// export default KakaoMap;


import React, { useEffect, useState } from "react";
import axios from "axios";
import LocList from "../components/buildinginfo";
import drawLine from "../components/Line";
import { showMarker } from "../components/Marker";
import walk1 from "../components/walk1.png";
import walk2 from "../components/walk2.png";
import wheel1 from "../components/wheel1.png";
import wheel2 from "../components/wheel2.png";
import changeBoth from "../components/change.png";

const { kakao } = window;
const loc = LocList();

function KakaoMap() {
    const storedData = localStorage.getItem('myData');

    const [map, settingMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [iW, addIW] = useState([]);
    const [path, setPath] = useState([]);
    const [stateMarker, setStateMarker] = useState(true);
    const [start, setStart] = useState('');
    const [finish, setFinish] = useState(storedData || '');
    const [shortestPath, setShortestPath] = useState([]);
    const [dLatLng, setDLatLng] = useState([]);
    const [searchClicked, setSearchClicked] = useState(false);
    const [image, setImage] = useState([]);
    const [evMarkers, setEvMarkers] = useState([]);
    const [selectedRadio, setSelectedRadio] = useState('');

    const cngMarker = (newMarker) => {
        setMarkers(newMarker);
    };

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
        } else if (markers && stateMarker) {
            try {
                cngMarker(showMarker(map, markers, iW));
            } catch (error) {
                console.log("Error:", error);
            }
        } else if (map && path.length > 0) {
            path.forEach((line) => line.setMap(null));
            setPath([]);
        }
    }, [map, markers, stateMarker, dLatLng, shortestPath, path, iW]);

    useEffect(() => {
        if (map && searchClicked) {
            if (markers && Array.isArray(dLatLng) && dLatLng.length > 0 && shortestPath.length > 0) {
                drawPath(dLatLng);
                createMarker(dLatLng, shortestPath);
                setSearchClicked(false);
            }
        }
    }, [map, markers, stateMarker, dLatLng, shortestPath, path, iW, searchClicked]);

    const deleteLine = () => {
        if (map && path) {
            path.forEach((line) => line.setMap(null));
        }
    };

    const deleteMarker = () => {
        if (markers && markers.length > 0) {
            markers.forEach((marker) => { marker.setMap(null); });
            iW.forEach((iW) => { iW.setMap(null); });
            addIW([]);
            setMarkers([]);
        }
    };

    const getImgAdd = (imgName) => {
        try {
            const imgAdd = require(`../images/${imgName}`);
            return imgAdd;
        } catch (error) {
            return null;
        }
    };

    function imgChk(node) {
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
            console.error();
        }
    }

    function createMarker(dLatLng, shortestPath) {
        console.log("create marker");
        if (map) {
            try {
                deleteMarker();
                const newMarkers = [];
                const newiW = [];
                const tempEvMarkers = [];
                for (let i = 0; i < dLatLng.length; i++) {
                    const node = shortestPath[i];

                    if (i === 0 || i === dLatLng.length - 1) {
                        const markerPosition = new window.kakao.maps.LatLng(
                            parseFloat(dLatLng[i][0]),
                            parseFloat(dLatLng[i][1])
                        );
                        const newMarker = new window.kakao.maps.Marker({
                            position: markerPosition,
                        });
                        newMarker.setMap(map);
                        newMarkers.push(newMarker);
                    }

                    console.log(node);

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
            } catch (error) {
                console.log("createMarker Error", error);
            }
        }
    }

    function drawPath(nestedList) {
        console.log(123);
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
                    const newLine = drawLine(map, startLatLng, finishLatLng);
                    newPath.push(newLine);
                }
                setPath(newPath); // Set the new path in the state variable
            } catch (error) {
                console.log("drawPath error");
            }
        }
    }

    const handleSearchClick = () => {
        if (!selectedRadio) {
            window.alert("모드를 먼저 선택하세요.");
        } else if (!start || !finish) {
            window.alert('출발지와 목적지를 설정해주세요.'); 
        } else {
            console.log("Start:", start);
            console.log("Finish:", finish);
            axios.get('/navigation', {
                params: {
                    start: start,
                    finish: finish
                }
            })
                .then(response => {
                    const nestedList = response.data;

                    setImage(nestedList.image);
                    setShortestPath(nestedList.shortestPath);
                    setDLatLng(nestedList.dLatLng);
                    setSearchClicked(true);
                })
                .catch(error => {
                    console.error('Error:', error.message);
                    if (error.response) {
                        console.error('Error Response Data:', error.response.data);
                        console.error('Error Response Status:', error.response.status);
                        console.error('Error Response Headers:', error.response.headers);
                    }
                });
        }
    };

    const walkingMode = (e) => {
        setSelectedRadio(e.target.value);
    };

    const wheelchairMode = (e) => {
        setSelectedRadio(e.target.value);
    };

    const switchStartFinish = () => {
        const tempStart = start;
        setStart(finish);
        setFinish(tempStart);
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
            <div className="controls-wrapper">
                <div className="controller-wrapper">
                    <select
                        className="box-style"
                        value={start}
                        onChange={(e) => {
                            setStart(e.target.value);
                            console.log("Start selected:", e.target.value);
                        }}
                    >
                        <option value="" disabled>출발지 선택</option>
                        {loc.map((building) => (
                            <option key={building.code} value={building.code}>{building.id}</option>
                        ))}
                    </select>
                    <button className="switch-button" onClick={switchStartFinish}>
                        <img src={changeBoth} alt="Switch" className="switch-button-img" />
                    </button>
                    <select
                        className="box-style"
                        value={finish}
                        onChange={(e) => {
                            setFinish(e.target.value);
                            console.log("Finish selected:", e.target.value);
                        }}
                    >
                        <option value="" disabled>목적지 선택</option>
                        {loc.map((building) => (
                            <option key={building.code} value={building.code}>{building.id}</option>
                        ))}
                    </select>
                    <button className="button-style" onClick={handleSearchClick}>경로 탐색</button>
                </div>
            </div>
            <div id="map" className="map-style"></div>
        </div>
    );
}

export default KakaoMap;
