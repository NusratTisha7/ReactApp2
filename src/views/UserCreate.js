import React, { useState, useEffect } from 'react';
import FileBase64 from 'react-file-base64';
import { registration } from '../Api/Api'
import { userInfo } from '../utils/auth';
import { Modal } from "@mui/material";
import {
    GoogleMap,
    useLoadScript,
    Marker
} from "@react-google-maps/api";
import axios from 'axios';
import "../components/User/User.css"
import { Message } from '../utils/alert'
import CreatableSelect from 'react-select/creatable';
import Loader from '../components/Loading/loadingModal';
import {
    Box,
    Flex, Button
} from '@chakra-ui/react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";
let lat = 43.6532, lng = -79.3832

function UserCreate() {

    const [value, setValue] = React.useState(new Date());

    useEffect(() => {
        document.title = 'User Create';
    }, [])


    const btnStyle = { backgroundColor: "#00004d", color: 'white', marginTop: "550px", padding: '5px 10px' }

    let [open, setOpen] = useState(false)
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

    const { fullName, email, bDate, password, address, ocacupation, mobile, photo, success, msg } = values;

    const drpDwnOptn = [
        { value: 1, label: 'App Developer' },
        { value: 2, label: 'Web Developer' },
        { value: 3, label: 'Truck Driver' },
        { value: 4, label: 'Mechanic' },
        { value: 5, label: 'Painter' }
    ]

    const handleChange = e => {
        console.log("e",e)
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        setOpen(true)
        e.preventDefault();
        registration({ fullName, email, bDate, address, password, ocacupation, mobile, photo }, token)
            .then(response => {
                setOpen(false)
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
                })
                Message(true, 'User create successfully')

            })
            .catch(err => {
                setOpen(false)
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
                    }
                })
                Message(false, 'Something went wrong')
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

    const handleOcupation = (e) => {
        if (e) {
            setValues({
                ...values,
                ocacupation: e.label
            })
        }

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
        lat: lat,
        lng: lng,
    };

    const options = {
        disableDefaultUI: true,
        zoomControl: true,
    };

    useLoadScript({
        googleMapsApiKey: "AIzaSyCN8snQFg1eriDbdHIgHPWxirZKkz2PKyY",

    });

    const [markers, setMarkers] = React.useState([]);

    function handleChangeLocation(lat, lng) {
        console.log("cha", lat, lng)
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
    }

    
    const handleDate = (e) =>{
        let date = moment(e).format('l').split("/")
        setValues({
            ...values,
            bDate : `${date[2]}-${date[0]}-${date[1]}`
        })
    }
    
    const signUpForm = () => (
        <div>
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
                                                <div><label className="block text-gray-700">Date of Birth</label>
                                                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                                                        <DatePicker
                                                            label="Custom input"
                                                            value={value}
                                                            onChange={handleDate}
                                                            renderInput={({ inputRef, inputProps, InputProps }) => (
                                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                    <input ref={inputRef} {...inputProps} className="tw_form_input" required/>
                                                                    {InputProps?.endAdornment}
                                                                </Box>
                                                            )}
                                                        />
                                                    </LocalizationProvider>
                                                </div>
                                            </div>
                                            <div className="w-full md:w-1/2 px-3 mb-5">
                                                <div><label className="block text-gray-700">Password</label> <input
                                                    type="password"
                                                    placeholder="Password" autoFocus="autofocus" autoComplete
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
                                                    <input
                                                    value={location}
                                                    className="tw_form_input" required onChange={mapModal} />
                                                </div>
                                            </div>

                                            <div className="w-full md:w-1/2 px-3 mb-5">
                                                <div><label className="block text-gray-700">Occupation</label>
                                                    <CreatableSelect
                                                        isClearable={true} options={drpDwnOptn} onChange={handleOcupation} />
                                                </div>

                                            </div>
                                            <div className="w-full md:w-1/2 px-3 mb-5">
                                                <div><label className="block text-gray-700">Mobile</label> <input
                                                    type="text"
                                                    placeholder="Mobile" autoFocus="autofocus" autoComplete
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
        </div>
    );

    return (
        <div>
            <Loader open={open} />
            {signUpForm()}</div>
    );
}

export default UserCreate;

