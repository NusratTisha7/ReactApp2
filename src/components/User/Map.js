import React from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import axios from 'axios';

export default function App() {
    
    const mapContainerStyle = {
        height: "100vh",
        width: "100vw",
    };

    const center = {
        lat: 43.6532,
        lng: -79.3832,
    };

    const options = {
        disableDefaultUI: true,
        zoomControl: true,
    };

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyAX9IFfgZfH0jTzY888Nz-m0ftttvexERw",
        
    });

    const [markers, setMarkers] = React.useState([]);

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    let lat = 43.70286039657962
    let lng = -80.93227226562499

    function handleChangeLocation (lat, lng){

    const url=`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAX9IFfgZfH0jTzY888Nz-m0ftttvexERw`;
    axios.get(url).then(
        function (response) {
          const  addr=response.data.results[0].formatted_address;
          console.log(addr);
        }
    ).catch(
        function (error) {
          console.log(error);
        }
    ).then(function () {

    })
  }
  
  handleChangeLocation(lat,lng)
    console.log("markers", markers)
    return (
        <div>
            
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={8}
                center={center} options={options}
                onClick={(event)=>{
                    new Date().toISOString
                    setMarkers(current=> [...current, {
                    lat: event.latLng.lat(),
                    lng:event.latLng.lng(),
                    path: event.domEvent.path,
                    time: new Date(),
                }])}}>
                    {markers.map(marker=><Marker key = {marker.time.toISOString()} position={{lat:marker.lat, lng:marker.lng}} />)}
                </GoogleMap>
        </div>
    );
}

