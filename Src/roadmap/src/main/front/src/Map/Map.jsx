import React from "react";
import { useLocation } from "react-router-dom";
import KakaoMap from "./KakaoMap.jsx";
import NavBar from "../components/Navbar.jsx";

// function Map(){

//     return(
//         <div>
//             <NavBar/>
//             <KakaoMap></KakaoMap>
//         </div>
//     )
// }

// export default Map;

function Map() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const start = queryParams.get("start");
    const finish = queryParams.get("finish");

    return (
        <div>
            <NavBar />
            <KakaoMap start={start} finish={finish} />
        </div>
    );
}

export default Map;