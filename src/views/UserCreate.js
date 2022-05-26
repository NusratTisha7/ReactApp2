import React, { useState,useEffect } from 'react';
import FileBase64 from 'react-file-base64';
import { registration } from '../Api/Api'
import { userInfo } from '../utils/auth';
import Modal from '@mui/material/Modal';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
} from "@react-google-maps/api";
import axios from 'axios';
import "../components/User/User.css"
import Message from '../utils/alert'
import Button from '../components/User/Button'


function UserCreate() {

    useEffect(()=>{ 
        document.title='User Create'; 
    },[])

    const { token } = userInfo();
    const [map, setMap] = useState(false);
    let [location, setLocation] = useState('Select your location');
    const [values, setValues] = useState({
        fullName: '',
        email: '',
        bDate: '',
        password: '',
        address: {
            address: '',
            lat: '',
            long: ''
        },
        ocacupation: '',
        mobile: '',
        photo: {
            base64: '',
            type: ''
        },
        success: false,
        msg: ''
    });

    const { fullName, email, bDate, password, address, ocacupation, mobile, photo,success,msg } = values;

    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        registration({ fullName, email, bDate, address, password, ocacupation, mobile, photo }, token)
            .then(response => {
                setValues({
                    fullName: '',
                    email: '',
                    bDate: '',
                    password: '',
                    address: {
                        address: '',
                        lat: '',
                        long: ''
                    },
                    ocacupation: '',
                    mobile: '',
                    photo: {
                        base64: '',
                        type: ''
                    },
                    success: true,
                    msg:'User create successfully'
                })

            })
            .catch(err => {
                setValues({
                    fullName: '',
                    email: '',
                    bDate: '',
                    password: '',
                    address: {
                        address: '',
                        lat: '',
                        long: ''
                    },
                    ocacupation: '',
                    mobile: '',
                    photo: {
                        base64: '',
                        type: ''
                    },
                    success: false,
                    msg:'Something went wrong'
                })
            })
    }

    const fileBase = (base64) => {
        setValues({
            ...values,
            photo: {
                base64: base64.split(",")[1],
                type: base64.split(";")[0].split("/")[1]
            }
        })
    }

    const mapModal = () => {
        setMap(true)
    }

    const handleClose = () => {
        setMap(false)
    }

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

    useLoadScript({
        googleMapsApiKey: "AIzaSyAX9IFfgZfH0jTzY888Nz-m0ftttvexERw",

    });

    const [markers, setMarkers] = React.useState([]);

    function handleChangeLocation(lat, lng) {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAX9IFfgZfH0jTzY888Nz-m0ftttvexERw`;
        axios.get(url).then(
            function (response) {
                setLocation(response.data.results[0].formatted_address)
                setValues({
                    ...values,
                    address: {
                        address: response.data.results[0].formatted_address,
                        lat: `${lat}`,
                        long: `${lng}`
                    }
                })
                const addr = response.data.results[0].formatted_address;
                console.log(addr);
            }
        ).catch(
            function (error) {
                console.log(error);
            }
        ).then(function () {

        })
    }

    const mapAction = (lat, lng) => {
        handleChangeLocation(lat, lng)
        //setTimeout(handleClose, 2000);

    }

    const signUpForm = () => (
        <>
            <Modal
                open={map}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div>
                
                    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={8} 
                        center={center} options={options}
                        onClick={(event) => {
                            new Date().toISOString
                            setMarkers([{
                                lat: event.latLng.lat(),
                                lng: event.latLng.lng(),
                                time: new Date(),
                            }])
                            mapAction(event.latLng.lat(), event.latLng.lng())
                        }}>
                        {markers.map(marker => <Marker key={marker.time.toISOString()} position={{ lat: marker.lat, lng: marker.lng }} />)}
                    </GoogleMap>,
                </div>
            </Modal>

            <div className="mx-auto" data-v-791b20d9>
                <div data-v-791b20d9>
                    <div data-v-791b20d9>
                        <div
                            className="min-w-screen bg-gray-200 flex items-center justify-center md:px-5 py-10 md:py-6">
                            <div className="bg-white text-gray-500 w-full overflow-hidden">
                                <div className="md:flex w-full">

                                    <div className="w-full md:w-2/3 py-10 px-5 md:px-10 relative">
                                        <div className="text-center mb-10">
                                            <h3 className="text-xl md:text-2xl font-bold leading-tight text-gray-900 text-left">
                                                Create new User
                                            </h3>
                                        </div>

                                        <form onSubmit={handleSubmit}>

                                            <div className="w-full md:w-1/2 px-3 mb-5">
                                                <div><label className="block text-gray-700">Full Name</label> <input
                                                    type="text"
                                                    placeholder="Full Name" autoFocus="autofocus" autoComplete
                                                    name="fullName"
                                                    value={fullName}
                                                    className="tw_form_input" required onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="w-full md:w-1/2 px-3 mb-5">
                                                <div><label className="block text-gray-700">Email</label> <input
                                                    type="text"
                                                    placeholder="Email" autoFocus="autofocus" autoComplete
                                                    name="email"
                                                    value={email}
                                                    className="tw_form_input" required onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="w-full md:w-1/2 px-3 mb-5">
                                                <div><label className="block text-gray-700">Date of Birth</label> <input
                                                    type="date"
                                                    value={bDate}
                                                    name="bDate"
                                                    className="tw_form_input" required
                                                    onChange={handleChange}
                                                />
                                                </div>
                                            </div>
                                            <div className="w-full md:w-1/2 px-3 mb-5">
                                                <div><label className="block text-gray-700">Password</label> <input
                                                    type="password"
                                                    placeholder="Enter Username" autoFocus="autofocus" autoComplete
                                                    name="password"
                                                    value={password}
                                                    className="tw_form_input" required onChange={handleChange} />
                                                </div>
                                            </div>

                                            <div className="w-full md:w-1/2 px-3 mb-5">
                                                <div><label className="block text-gray-700">Photo</label> 
                                                <FileBase64 type="file" name="photo" accept="image/*" multiple={false} onDone={({ base64 }) => fileBase(base64)} />
                                                </div>
                                            </div>

                                            <div className="w-full md:w-1/2 px-3 mb-5">
                                                <div><label className="block text-gray-700">Address</label> 
                                                <p onClick={mapModal}>{location}</p>
                                                </div>
                                            </div>

                                            <div className="w-full md:w-1/2 px-3 mb-5">
                                                <div><label className="block text-gray-700">ocacupation</label> <input
                                                    type="text"
                                                    placeholder="ocacupation" autoFocus="autofocus" autoComplete
                                                    name="ocacupation"
                                                    value={ocacupation}
                                                    className="tw_form_input" required onChange={handleChange} />
                                                </div>

                                            </div>
                                            <div className="w-full md:w-1/2 px-3 mb-5">
                                                <div><label className="block text-gray-700">Mobile</label> <input
                                                    type="text"
                                                    placeholder="Enter Username" autoFocus="autofocus" autoComplete
                                                    name="mobile"
                                                    value={mobile}
                                                    className="tw_form_input" required onChange={handleChange} />
                                                </div>
                                            </div>

                                            <div className="flex -mx-3">
                                                <div className="w-full px-3 mb-5">
                                                    <button type="submit" onClick={handleSubmit} className="block bg-primary-500 hover:bg-primary-400 focus:bg-primary-400 text-white font-semibold rounded-lg px-4 py-3 mt-6 ml-3">
                                                        Create User
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>

    );

    const Alert = (success,msg) => {
        if(msg!==''){
            return(
                <Message success={success} msg={msg}/>
            )
        }
    }

    return (
            <div>{Alert(success,msg)}
            {signUpForm()}</div>
    );
}

export default UserCreate;
