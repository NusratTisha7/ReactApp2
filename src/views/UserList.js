import React, { useState, useEffect } from 'react';
import { userList, userAccess, getChats } from '../Api/Api'
import { userInfo} from '../utils/auth';
import {
    Card,
    Table
} from "react-bootstrap";
import { Message } from '../utils/alert';
import Loader from '../components/Loading/loadingModal'

let index = 1


function UserList() {
    const { token } = userInfo();
    let [open,setOpen]=useState(false)
    let [user, setUser] = useState([])
    let [prevDisbale, setPrevDisable] = useState(false)
    let [nextDisbale, setNextDisable] = useState(false)

    useEffect(() => {
        document.title = 'User List';
        getUserList()
    }, [])

    const getUserList = () => {
        setOpen(true)
        userList(token, index, 10)
            .then(res => {
                setOpen(false)
                if (res.data.data.length > 0) {
                    setUser(res.data.data)
                } else {
                    index = index - 1
                    setNextDisable(true)
                }

            })
    }

    const prev = () => {
        setNextDisable(false)
        if (index - 1 > 0) {
            index -= 1
            getUserList()
        } else {
            index = 1
            setPrevDisable(true)
        }
    }

    const next = () => {
        setPrevDisable(false)
        index += 1
        getUserList()
    }

    const changeAccess = (access, email) => () => {
        let data = {
            "email": email,
            "isLock": !access
        }
        userAccess(data, token)
            .then(res => {
                getUserList()
                Message(true, res.data.message)
            })
            .catch(e => {
                Message(false, 'Something went wrong!')
            })
    }


    const viewChat = (email) => () =>{
        getChats(email,token)
        .then(res=>console.log(res))
    }

    return (
        <div>
            <Loader open={open}/>
            <Card className='p-5'>
                <Table responsive="sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Occupation</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {user && user.map(value => (
                            <tr>
                                <td>{value.data.fullName}</td>
                                <td>{value.data.email}</td>
                                <td>{value.data.ocacupation}</td>
                                {value.lockout && (
                                    <td><button className='btn btn-primary' onClick={changeAccess(value.lockout, value.email)}>Lock</button></td>
                                )}
                                {!value.lockout && (
                                    <td><button className='btn btn-primary' onClick={changeAccess(value.lockout, value.email)}>UnLock</button></td>
                                )}
                                <td><button className='btn btn-primary' onClick={viewChat(value.data.email)}>View Chat</button></td>
                            </tr>
                        ))
                        }
                    </tbody>
                </Table>
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item" >
                            <button disabled={prevDisbale} onClick={prev} class="page-link" aria-label="Previous"> <span aria-hidden="true" >&laquo;</span> </button>
                        </li>

                        <li class="page-item">
                            <button class="page-link" aria-label="Previous" disabled={nextDisbale} onClick={next}> <span aria-hidden="true" >&raquo;</span> </button>
                        </li>
                    </ul>
                </nav>
            </Card>
        </div>
    );
}

export default UserList;
