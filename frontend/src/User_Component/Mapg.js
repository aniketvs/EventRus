import React, { useState } from 'react'
import { GoogleMap, useJsApiLoader,Marker} from '@react-google-maps/api';
const containerStyle = {
  width: '100%',
  height: '400px'
};
const center = {
  lat: 19.19934345221765, 
  lng:72.95630406312543
};
function Mapg() {
  const { isLoaded } = useJsApiLoader({
    
    googleMapsApiKey: "AIzaSyCb18W7Leqb6ceMBORMPsCyepRIw5sL3xY"
  })
  const [map,setMap]=useState(null);
  console.log(map);
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  },[]);
  const onUnmount=React.useCallback(function callback(map){
setMap(null);
  },[]);
  return isLoaded?(
    <GoogleMap
    mapContainerStyle={containerStyle}
    center={center}
    zoom={1}
    onLoad={onLoad}
    onUnmount={onUnmount}
  ><>
    <Marker position={{ lat: 19.19934345221765, lng:72.95630406312543}}  name={'Rk'}/>
  </>
  </GoogleMap>
    
  ):<></>
}

export default React.memo(Mapg)
//AIzaSyCb18W7Leqb6ceMBORMPsCyepRIw5sL3xY