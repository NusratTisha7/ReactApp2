import React, { useState, useEffect, useRef } from 'react';
import FileBase64 from 'react-file-base64';
import { registration } from '../Api/Api'
import { userInfo } from '../utils/auth';
import "../components/User/User.css"
import { Message } from '../utils/alert'
import CreatableSelect from 'react-select/creatable';
import Loader from '../components/Loading/loadingModal';
import {
    Box,
} from '@chakra-ui/react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import GoogleMapModal from '../components/GoogleMap/GoogleMapModal'


function UserCreate() {

    useEffect(() => {
        document.title = 'User Create';
    }, [])

    let [open, setOpen] = useState(false)
    const { token } = userInfo();
    const [map, setMap] = useState(false);
    let [location, setLocation] = useState('');
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

    let { fullName, email, bDate, password, address, ocacupation, mobile, photo, success, msg } = values;

    const selectInputRef = useRef();
    
    const drpDwnOptn = [
        { value: 1, label: 'App Developer' },
        { value: 2, label: 'Web Developer' },
        { value: 3, label: 'Truck Driver' },
        { value: 4, label: 'Mechanic' },
        { value: 5, label: 'Painter' }
    ]

    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        setOpen(true)
        e.preventDefault();
        registration({ fullName, email: mobile, bDate, address, password, ocacupation, mobile, photo }, token)
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
                setLocation('')
                e.target.reset()
                document.getElementById('map').value = ''
                document.getElementById('date').value = ''
                selectInputRef.current.clearValue();
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
                setLocation('')
                e.target.reset()
                document.getElementById('map').value = ''
                document.getElementById('date').value = ''
                selectInputRef.current.clearValue();
            })
    }


    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setLocation(value);
        setValues({
            ...values,
            address: {
                address: value,
                lat: `${latLng.lat}`,
                long: `${latLng.lng}`
            }
        })
    };


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


    const handleDate = (e) => {
        let date = moment(e).format('YYYY-MM-DD')
        setValues({
            ...values,
            bDate: date
        });
    }

    const handleLocation = (address, lat, lng) => {
        setLocation(address)
        setValues({
            ...values,
            address: {
                address: address,
                lat: `${lat}`,
                long: `${lng}`
            }
        })
    }


    const signUpForm = () => (
        <div>
            <GoogleMapModal map={map} handleClose={handleClose} handleLocation={handleLocation} />
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
                                                <div><label className="block text-gray-700">Date of Birth</label>
                                                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                                                        <DatePicker
                                                            label="Custom input"
                                                            value={bDate}
                                                            onChange={handleDate}
                                                            renderInput={({ inputRef, inputProps, InputProps }) => (
                                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                    <input  {...inputProps} className="tw_form_input" id='date' required />
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
                                                    <FileBase64 type="file" name="photo" accept="image/*" required multiple={false} onDone={({ base64 }) => fileBase(base64)} />
                                                </div>
                                            </div>

                                            <div className="w-full md:w-1/2 px-3 mb-5">
                                                <div><label className="block text-gray-700">Address</label>

                                                    <PlacesAutocomplete
                                                        value={location}
                                                        onChange={setLocation}
                                                        onSelect={handleSelect}
                                                    >
                                                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                            <div>
                                                                <input
                                                                    {...getInputProps({
                                                                        placeholder: 'Type address'
                                                                    })} className="tw_form_input" id="map"
                                                                    required
                                                                />
                                                                <div>
                                                                    {loading ? <div>...loading</div> : null}

                                                                    {suggestions.map(suggestion => {
                                                                        console.log("suggestion",suggestion)
                                                                        const style = {
                                                                            backgroundColor: suggestion.active ? "#cccccc" : "#fff",
                                                                            color: "black",
                                                                            fontSize: '.8rem'
                                                                        };

                                                                        return (
                                                                            <div {...getSuggestionItemProps(suggestion, { style })}>
                                                                                {suggestion.description}
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </PlacesAutocomplete>
                                                    <p onClick={mapModal} className='mt-3' style={{ color: '#001D5F', fontSize: 'bold', cursor: 'pointer' }}>Select from map</p>
                                                </div>
                                            </div>

                                            <div className="w-full md:w-1/2 px-3 mb-5">
                                                <div><label className="block text-gray-700">Occupation</label>
                                                    <CreatableSelect ref={selectInputRef}
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
                                                    <button type="submit" className="block bg-primary-500 hover:bg-primary-400 focus:bg-primary-400 text-white font-semibold rounded-lg px-4 py-3 mt-6 ml-3">
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

