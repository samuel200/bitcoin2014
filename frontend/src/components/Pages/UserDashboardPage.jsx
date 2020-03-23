import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import SideBar from '../UserDashboard/SideBar';
import DashboardBody from '../UserDashboard/DashboardBody';
import domainName from '../../domainName';

export default function UserDashboardPage({ authenticated, authenticationToken, setAuthenticated, setAuthenticatedUserData }) {
    const [currentPage, setCurrentPage] = useState("1");
    const [down, setPos] = useState(false);
    const [authenticatedUser, setAuthenticatedUser] = useState({});

    const changePos = value => {
        setPos(value);
    }

    const changePage = val => {
        $("#dashboard-body").animate({ opacity: .7 }, 300, () => {
            setCurrentPage(val)
            $("#dashboard-body").animate({ opacity: 1 }, 100)
        })
    }

    useEffect(() => {
        if (authenticated || localStorage.getItem("authenticatedUser") !== null) {
            $("#navigation-bar").css({ display: "none" })
            $("#to-top").css({ display: "none" })
            $("canvas").css({ display: "none" })
        } else {
            $("#navigation-bar").css({ display: "flex" })
            $("#to-top").css({ display: "block" })
            $("canvas").css({ display: "block" })
        }

        if (localStorage.getItem("authenticatedUser") !== null) {
            const authenticatedUser = JSON.parse(localStorage.getItem("authenticatedUser"));
            setAuthenticatedUserData(authenticatedUser);
            setAuthenticatedUser(authenticatedUser);
        } else {
            // Make axios request for user data
            axios.get(`${domainName}/user/`, {
                headers: {
                    Authorization: `Token ${authenticationToken}`
                }
            })
                .then(({ data }) => {
                    setAuthenticatedUser(data);
                    setAuthenticatedUserData(data);
                })
                .catch(error => {

                })
            // set authenticatedUser to said data and save also to localStorage
        }
    }, [])
    return (authenticated ?
        <section id="user-profile-dashboard">
            <nav className="nav-extended white hide-on-large-only" style={{ height: "80px", maxWidth: "100vh", overflowX: "hidden"}}>
                <div className="nav-wrapper">
                    <Link className="brand-logo" to='/'>
                        <header className="hide-on-med-and-down" style={{background: "transparent !important", transform: "scale(.6)"}} onClick={() => {
                            $("#navigation-bar").css({ display: "flex" })

                        }}>
                            <img src={require("../../img/logo-dark.png")} alt="logo" id="navigation-logo" />
                            <h2>GLOBALTRADES</h2>
                        </header>
                        <header className="hide-on-large-only left" style={{
                            transform: "scale(.6)",
                            position: "relative",
                            bottom: "15px"
                        }} onClick={() => {
                            $("#navigation-bar").css({ display: "flex" })

                        }}>
                            <img src={require("../../img/logo-dark.png")} alt="logo" id="navigation-logo" />
                            <h2 style={{position: "relative", top: "18px"}}>GLOBALTRADES</h2>
                        </header>
                    </Link>
                    <a href="#" data-target="mobile-demo" className="sidenav-trigger black-text" onClick={e => {
                        e.preventDefault();
                        setPos(!down);
                        if (!down) {
                            $(".mobile-sidebar").css({
                                maxHeight: "380px"
                            })
                        } else {
                            $(".mobile-sidebar").css({
                                maxHeight: "0px"
                            })
                        }
                    }}><i className="material-icons right" style={{transform: "scale(1.2)", marginTop: "10px"}}>menu</i></a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                    </ul>
                </div>
            </nav>
            <div style={{ background: "white", maxWidth: "100vw", minWidth: "100vw !important", overflowX: "hidden", position: "sticky", top: "0px", zIndex: "5" }}>
                <div id="logo-holder" className="hide-on-med-and-down">
                    <Link to='/'>
                        <header className="hide-on-med-and-down" onClick={() => {
                            $("#navigation-bar").css({ display: "flex" })

                        }}>
                            <img src={require("../../img/logo-dark.png")} alt="logo" id="navigation-logo" />
                            <h2>GLOBALTRADES</h2>
                        </header>
                        <header className="hide-on-large-only left-align" style={{
                            transform: "scale(.8)"
                        }} onClick={() => {
                            $("#navigation-bar").css({ display: "flex" })

                        }}>
                            <img src={require("../../img/logo-dark.png")} alt="logo" id="navigation-logo" />
                            <h2>GLOBALTRADES</h2>
                        </header>
                    </Link>
                </div>
            </div>
            <main style={{ display: "flex" }}>
                <SideBar changePage={changePage}
                    setAuthenticatedUserData={setAuthenticatedUserData}
                    setAuthenticated={setAuthenticated}
                    style={{ transition: ".5s max-height", overflow: "hidden" }} />
                <DashboardBody currentPage={currentPage}
                    changePage={changePage}
                    authenticatedUser={authenticatedUser}
                    authenticationToken={authenticationToken}
                    setAuthenticatedUser={setAuthenticatedUser} />
            </main>
        </section> :
        <Redirect to="signin/" />
    )
}