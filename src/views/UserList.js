import React, { useState, useEffect } from 'react';
import { userList } from '../Api/Api'
import { userInfo } from '../utils/auth';
import {
    Card,
    Table,
    Container,
    Row,
    Col,
} from "react-bootstrap";

function UserList() {
    const { token } = userInfo();

    let [page, setPage] = useState({
        pageIndex: 1,
        pageSize: 2
    })

    let [user, setUser] = useState([])

    let { pageIndex, pageSize } = page

    useEffect(() => {
        document.title = 'User List';
        getUserList()
    }, [])

    const getUserList = () =>{
        userList(token, pageIndex, pageSize)
        .then(res => {
            setUser(res.data.data)
        })
    }

    const prev = () =>{
        if(pageIndex - 1>0){
            setPage({
                ...page,
                pageIndex: pageIndex - 1
            })
            getUserList()
        } else {
            setPage({
                ...page,
                pageIndex: 0
            }) 
        }
    }

    const next = () =>{
        setPage({
            ...page,
            pageIndex: pageIndex + 1
        })
        getUserList()
    }

    console.log("page",page)

    return (
        <div>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Occupation</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {user && user.map((value, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{value.data.fullName}</td>
                            <td>{value.data.email}</td>
                            <td>{value.data.ocacupation}</td>
                            <td><button className='btn btn-primary'>Action</button></td>
                        </tr>
                    ))
                    }
                </tbody>
            </Table>
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item"onClick={prev}>
                        <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span class="sr-only">Previous</span>
                        </a>
                    </li>
                    
                    <li class="page-item" onClick={next}>
                        <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span class="sr-only">Next</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default UserList;
