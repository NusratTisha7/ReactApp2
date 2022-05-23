import React, { useState } from 'react';
import FileBase64 from 'react-file-base64';
import { registration } from '../Api/Api'
import { userInfo } from '../utils/auth';
import GoogleMapReact from 'google-map-react';

function UserCreate() {
    const { token } = userInfo();
    const [user, setUser] = useState('');
    const [values, setValues] = useState({
        fullName: '',
        email: '',
        bDate: '',
        password: '',
        address: {
            address: "qww",
            lat: "www",
            long: "wwe"
        },
        ocacupation: '',
        mobile: '',
        photo: {
            base64: '',
            type: ''
        }
    });

    const { fullName, email, bDate, password, address, ocacupation, mobile, photo } = values;

    const handleChange = e => {
        // const value = e.target.name === 'photo' ? e.target.files[0] : e.target.value;
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = e => {
        e.preventDefault();
        registration({ fullName, email, bDate, address, password, ocacupation, mobile, photo }, token)
            .then(response => {
                console.log("response", response)
                setValues({
                    fullName: '',
                    email: '',
                    bDate: '',
                    address: '',
                    ocacupation: '',
                    mobile: '',
                    photo: ''
                })

            })
            .catch(err => {
                console.log("err", err)
            })
    }

    let defaultProps = {
        center: {
          lat: 59.95,
          lng: 30.33
        },
        zoom: 11
      }

    const googleMap = () =>{
        return(
            <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyCN8snQFg1eriDbdHIgHPWxirZKkz2PKyY'
            }}
            defaultCenter={
                defaultProps.center
              }
            defaultZoom={11}
        ></GoogleMapReact>
        )
    }

    const fileBase = (base64) => {
        setValues({
            ...values,
            photo: {
                base64: base64.split(",")[1],
                type: 'PNG'
            }
        })
    }

    const signUpForm = () => (
        <>
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
                                            <div className="flex -mx-3 flex-wrap">
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
                                            </div>
                                            <div className="flex -mx-3">
                                                <div className="w-full px-3 mb-5">
                                                    <div><label className="block text-gray-700">Date Of Birth</label> <input
                                                        type="text"
                                                        placeholder="Enter Username" autoFocus="autofocus" autoComplete
                                                        name="bDate"
                                                        value={bDate}
                                                        className="tw_form_input" required onChange={handleChange} />
                                                    </div>

                                                </div>
                                                <div className="w-full px-3 mb-5">
                                                    <div><label className="block text-gray-700">Password</label> <input
                                                        type="text"
                                                        placeholder="Enter Username" autoFocus="autofocus" autoComplete
                                                        name="password"
                                                        value={password}
                                                        className="tw_form_input" required onChange={handleChange} />
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="flex -mx-3">
                                                <div className="w-full px-3 mb-5">
                                                    <FileBase64 type="file" name="photo" accept="image/*" multiple={false} onDone={({ base64 }) => fileBase(base64)} />
                                                </div>
                                            </div>
                                            <div className="flex -mx-3">
                                                <div className="w-full px-3 mb-5">
                                                    <div><label className="block text-gray-700">Address</label> <input
                                                        type="text"
                                                        placeholder="Address" autoFocus="autofocus" autoComplete
                                                        name="address"
                                                        value={address}
                                                        className="tw_form_input" required onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap -mx-3">
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
                                            </div>
                                            <div className="flex -mx-3">
                                                <div className="w-full px-3 mb-5">
                                                    <button type="submit" onClick={handleSubmit} className="w-full block bg-primary-500 hover:bg-primary-400 focus:bg-primary-400 text-white font-semibold rounded-lg px-4 py-3 mt-6">
                                                        Create User
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div style={{ marginTop: "100Px" }}>
                                        {/* <Lottie
                                            options={defaultOptions}
                                            height={500}
                                        /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );

    const showError = (error) => {
        if (error) return (
            notify(`${error}`)
        )
    }

    return (
        <div>
{googleMap()}
            {/* {signUpForm()} */}

        </div>
    );
}

export default UserCreate;
