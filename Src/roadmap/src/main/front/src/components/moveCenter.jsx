// import LocList from "./buildinginfo";

// const loc = LocList()

// const moveCenter = (map) =>{
//     if(map){
//         map.setCenter(new window.kakao.maps.LatLng(loc[0].Lat, loc[0].Lng));
//     }
// }
// export default moveCenter

import LocList from "./buildinginfo";
import LocList_W from "./buildinginfo_W";

const moveCenter = (map, mode) => {
    let loc;
    if (mode === 'wheelchair') {
        loc = LocList_W();
    } else {
        loc = LocList();
    }

    if (map && loc.length > 0) {
        map.setCenter(new window.kakao.maps.LatLng(loc[0].Lat, loc[0].Lng));
    }
}

export default moveCenter;
