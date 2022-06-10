import { useEffect, useState, useRef } from "react";
import { ImageUrl } from '../../utils/config';
import { Card } from "react-bootstrap";
import { editUserInfo } from '../../Api/Api'
import GoogleMapModal from "components/GoogleMap/GoogleMapModal";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";
import {
    Box,
} from '@chakra-ui/react'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import FileBase64 from 'react-file-base64';
import CreatableSelect from 'react-select/creatable';

let asd = 'asd'
const UserEdit = () => {

    const [userInfo, setUserInfo] = useState({})
    const [edit, setEdit] = useState(false)
    const [map, setMap] = useState(false);
    let [location, setLocation] = useState('');
    let [email, setEmail] = useState('');

    const selectInputRef = useRef();

    useEffect(() => {
        let userInfo = JSON.parse(localStorage.getItem('user'))
        setUserInfo(userInfo.data)
        setEmail(userInfo.data.email)
        setValues({
            fullName: userInfo.data.fullName,
            bDate: userInfo.data.bDate,
            address: userInfo.data.address,
            lat: userInfo.data.lat,
            long: userInfo.data.long,
            ocacupation: userInfo.data.ocacupation,
            mobile: userInfo.data.mobile,
            photoData: {
                base64: '',
                type: ''
            }
        })
        setLocation(userInfo.data.address)
    }, [])

    const [values, setValues] = useState({
        fullName: '',
        email: '',
        bDate: '',
        password: '',
        address: '',
        lat: '',
        long: '',
        ocacupation: '',
        mobile: '',
        photoData: {
            base64: '',
            type: ''
        },
    });

    const { fullName, bDate, password, address, ocacupation, mobile, photoData } = values;

    const editEnabled = () => {
        setEdit(true)
    }

    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleLocation = (address, lat, lng) => {
        setLocation(address)
        setValues({
            ...values,
            address: address,
            lat: `${lat}`,
            long: `${lng}`
        })
    }

    const handleClose = () => {
        setMap(false)
    }

    const drpDwnOptn = [
        { value: 1, label: 'App Developer' },
        { value: 2, label: 'Web Developer' },
        { value: 3, label: 'Truck Driver' },
        { value: 4, label: 'Mechanic' },
        { value: 5, label: 'Painter' }
    ]

    const handleSubmit = e => {
        e.preventDefault();
        console.log("values", values)
        editUserInfo(values, email)
            .then(res => {
                console.log("res", res)
            }).catch(err => {
                console.log("err", err)
            })
    }

    const handleDate = (e) => {
        let date = moment(e).format('YYYY-MM-DD')
        setValues({
            ...values,
            bDate: date
        });
    }

    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setLocation(value);
        setValues({
            ...values,
            address: value,
            lat: `${latLng.lat}`,
            long: `${latLng.lng}`
        })
    };

    const mapModal = () => {
        setMap(true)
    }

    const fileBase = (base64) => {
        console.log(base64)
        setValues({
            ...values,
            photoData: {
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


    return (
        <div>
            <GoogleMapModal map={map} handleClose={handleClose} handleLocation={handleLocation} />

            <div>
                <div className="mx-auto" data-v-791b20d9>
                    <div data-v-791b20d9>
                        <div data-v-791b20d9>
                            <div
                                className="min-w-screen bg-gray-200 flex items-center justify-center md:px-5 py-10 md:py-6" style={{ padding: '50px 100px' }}>
                                <div className="bg-white text-gray-500 w-full overflow-hidden" style={{ height: '150vh' }}>
                                    <div className="md:flex w-full">
                                        <div className="w-full md:w-2/3 py-10 px-5 md:px-10 relative">
                                            <div className="mt-3 mb-5 px-3">
                                                <h5>Profile Details</h5>
                                                <hr />
                                            </div>
                                            {!edit && (
                                                <div className="text-black px-3">
                                                    <button className="btn btn-primary" onClick={editEnabled}>Edit</button>
                                                    <img src={`${ImageUrl}/${userInfo.photo}`} width="150" height="50" className="mt-5" />
                                                    <p className="mt-3"><span className="text-bold">Name:</span> {userInfo.fullName}</p>
                                                    <p className="mt-3">Email: {userInfo.email}</p>
                                                    <p className="mt-3">Phone: {userInfo.mobile}</p>
                                                    <p className="mt-3">Birth Date: {userInfo.bDate}</p>
                                                    <p className="mt-3">Occupation: {userInfo.ocacupation}</p>
                                                    <p className="mt-3">Address: {userInfo.address}</p>

                                                </div>
                                            )}
                                            {edit && (
                                                <div className='mt-3'>
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
                                                                                <input ref={inputRef} {...inputProps} className="tw_form_input" id='date' required />
                                                                                {InputProps?.endAdornment}
                                                                            </Box>
                                                                        )}
                                                                    />
                                                                </LocalizationProvider>
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
                                                                            />
                                                                            <div>
                                                                                {loading ? <div>...loading</div> : null}

                                                                                {suggestions.map(suggestion => {
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
                                                            <div><label className="block text-gray-700">Mobile</label> <input
                                                                type="text"
                                                                placeholder="Mobile" autoFocus="autofocus" autoComplete
                                                                name="mobile"
                                                                value={mobile}
                                                                className="tw_form_input" required onChange={handleChange} />
                                                            </div>
                                                        </div>

                                                        <div className="w-full md:w-1/2 px-3 mb-5">
                                                            <div><label className="block text-gray-700">Photo</label>
                                                                <FileBase64 type="file" name="photo" accept="image/*" multiple={false} onDone={({ base64 }) => fileBase(base64)} />
                                                            </div>
                                                        </div>

                                                        <div className="w-full md:w-1/2 px-3 mb-5">
                                                            <div><label className="block text-gray-700">Occupation</label>
                                                                <CreatableSelect
                                                                    ref={selectInputRef} options={drpDwnOptn} onChange={handleOcupation} />
                                                            </div>

                                                        </div>

                                                        <div className="flex -mx-3">
                                                            <div className="w-full px-3 mb-5">
                                                                <button type="submit" className="block bg-primary-500 hover:bg-primary-400 focus:bg-primary-400 text-white font-semibold rounded-lg px-4 py-3 ml-3">
                                                                    Save Changes
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        </div>
    )
}
export default UserEdit;