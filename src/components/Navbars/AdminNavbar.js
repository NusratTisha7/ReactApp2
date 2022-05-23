
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap";

import routes from "routes.js";

function Header() {
    
    const location = useLocation();
    const mobileSidebarToggle = (e) => {
        e.preventDefault();
        document.documentElement.classList.toggle("nav-open");
        const node = document.createElement("div");
        node.id = "bodyClick";
        node.onclick = function () {
            this.parentElement.removeChild(this);
            document.documentElement.classList.toggle("nav-open");
        };
        document.body.appendChild(node);
    };


    const getBrandText = () => {
        for (let i = 0; i < routes.length; i++) {
            if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
                return routes[i].name;
            }
        }
        return "Brand";
    };

    const logout = (e) => {
        e.preventDefault()
        localStorage.clear()
    }

   

    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
                    
                    <Navbar.Brand
                        href="#home"
                        onClick={(e) => e.preventDefault()}
                        className="mr-2"
                    >
                        {getBrandText()}
                    </Navbar.Brand>
                </div>
                
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto" navbar>

                        <Nav.Item>
                            <Nav.Link
                                className="m-0"
                                onClick={(e) => logout(e)}

                            >
                                <Link to="/" className="no-icon">Log out</Link>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
