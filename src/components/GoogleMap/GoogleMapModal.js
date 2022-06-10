import React, { useState, useEffect, useRef } from 'react';
import { Modal } from "@mui/material";
import {
    GoogleMap,
    useLoadScript,
    Marker
} from "@react-google-maps/api";
import {
    Box,
    Flex, Button
} from '@chakra-ui/react'
import axios from 'axios';

let lat = 43.6532, lng = -79.3832


function GoogleMapModal({map,handleClose,handleLocation}) {

    useLoadScript({
        googleMapsApiKey: "AIzaSyCN8snQFg1eriDbdHIgHPWxirZKkz2PKyY",

    });


    const btnStyle = { backgroundColor: "#00004d", color: 'white', marginTop: "550px", padding: '5px 10px' }

    const [markers, setMarkers] = React.useState([]);

    const mapContainerStyle = {
        height: "100vh",
        width: "100vw",
    };

    const center = {
        lat: lat,
        lng: lng,
    };

    const options = {
        disableDefaultUI: true,
        zoomControl: true,
    };

    const mapAction = (lat, lng) => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAX9IFfgZfH0jTzY888Nz-m0ftttvexERw`;
        axios.get(url).then(
            function (response) {
                handleLocation(response.data.results[0].formatted_address,lat,lng)
            }
        ).catch(
            function (error) {
                console.log(error);
            }
        )
    }

    return (
        <Modal
            open={map}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div>
                <Flex
                    position='relative'
                    flexDirection='column'
                    alignItems='center'
                    h='100vh'
                    w='100vw'
                >
                    <Box position='absolute' left={0} top={0} h='100%' w='100%'>
                        <GoogleMap mapContainerStyle={mapContainerStyle} zoom={8}
                            center={center} options={options}
                            onClick={(event) => {
                                lat = event.latLng.lat(),
                                    lng = event.latLng.lng(),
                                    new Date().toISOString
                                setMarkers([{
                                    lat: event.latLng.lat(),
                                    lng: event.latLng.lng(),
                                    time: new Date(),
                                }])
                                mapAction(event.latLng.lat(), event.latLng.lng())
                            }}>
                            {markers.map(marker => <Marker key={marker.time.toISOString()} position={{ lat: marker.lat, lng: marker.lng }} />)}
                        </GoogleMap>
                    </Box>
                    <Box >
                        <Button style={btnStyle} colorScheme='pink' type='submit' onClick={handleClose}>
                            Pick Address
                        </Button>
                    </Box>
                </Flex>
            </div>
        </Modal>
    )
}

export default GoogleMapModal;