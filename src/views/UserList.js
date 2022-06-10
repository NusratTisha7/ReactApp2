import React, { useState, useEffect } from 'react';
import { userList, userAccess, getChats, deleteUser } from '../Api/Api'
import { userInfo } from '../utils/auth';
import {
    Card,
    Table
} from "react-bootstrap";
import { Message } from '../utils/alert';
import Loader from '../components/Loading/loadingModal'
import {
    Modal
} from "@material-ui/core";
import moment from "moment";
import { useHistory } from "react-router-dom";
import Card2 from '@mui/material/Card';
import { ImageUrl } from '../utils/config';
let index = 1

function UserList() {
    const { token } = userInfo();
    let [open, setOpen] = useState(false)
    let [modal, setModal] = useState(false)
    let [user, setUser] = useState([])
    let [prevDisbale, setPrevDisable] = useState(false)
    let [nextDisbale, setNextDisable] = useState(false)
    let [chatList, setChatList] = useState([])
    let history = useHistory();

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


    const viewChat = (email) => () => {
        setModal(true)
        getChats(email, token)
            .then(res => setChatList(res.data))
    }

    const viewHistory = (user) => () => {
        setModal(false)
        history.push({
            pathname: `/Chat_history/${user.chatRoom.id}/${user.email}`,
        });
    }

    const userDelete = (email) => () => {
        deleteUser(email)
            .then(res => {
                getUserList()
                Message(true, 'User delete successfully')
            })
            .catch(e => {
                Message(false, 'Something went wrong!')
            })
    }

    const modalClose = () => {
        setModal(false)
    }

    const userEdit = (user) => () => {
        localStorage.setItem('user',JSON.stringify(user))
        history.push({
            pathname: '/edit',
        });
    }

    return (
        <div>
            <Modal
                aria-labelledby="zoom-modal-title"
                aria-describedby="zoom-modal-description"
                open={modal}
                onClose={() => {
                    modalClose()
                }}
                style={{ outline: 0 }}
            >
                <div className='modal-dialog-scrollable modal-dialog modal-dialog-centered swal2-modal swal2-popup swal2-show modal-lg'>
                    <div className="modal-content kt-iconbox  p-2">
                        {chatList.length === 0 && (
                            <div style={{ padding: '50px', textAlign: 'center' }}>No chats yet</div>
                        )}
                        {chatList.map(list =>
                        (
                            <Card2 className='mt-2'>
                                <div className='d-flex p-2 chat_item mt-3' onClick={viewHistory(list)}>
                                    {list.imgURL && (
                                        <div className="avatar">
                                            <img src={`${ImageUrl}/${list.imgURL}`} className='avatar_img' alt="#" />
                                        </div>
                                    )}

                                    <div className="m-2">
                                        <p>{list.name}</p>
                                        <span>{list.chat.message}</span>
                                    </div>
                                    <div className='mt-2 mr-5'>
                                        <span>{moment(list.chat.dateTime).format('YYYY-MM-DD')}</span>
                                    </div>
                                </div>
                            </Card2>
                        )
                        )}
                    </div>
                </div>
            </Modal>
            <Loader open={open} />
            <Card className='p-5'>
                <Table responsive="sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Occupation</th>
                            <th></th>
                            <th></th>
                            <th></th>
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
                                <td><button className='btn btn-primary' onClick={userDelete(value.data.email)}>Delete</button></td>
                                <td><button className='btn btn-primary' onClick={userEdit(value)}>Edit</button></td>
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
