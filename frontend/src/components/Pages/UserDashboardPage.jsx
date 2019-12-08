import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import SideBar from '../UserDashboard/SideBar';
import DashboardBody from '../UserDashboard/DashboardBody';
import domainName from '../../domainName';

export default function UserDashboardPage({ authenticated, authenticationToken, setAuthenticated, setAuthenticatedUserData }){
    const [ currentPage, setCurrentPage ] = useState("1");
    const [ down, setPos ] = useState(false);
    const [ authenticatedUser, setAuthenticatedUser ] = useState({})

    const changePos = value =>{
        setPos(value);
    }

    const changePage = val =>{
        $("#dashboard-body").animate({ opacity: .7}, 300, ()=>{
            setCurrentPage(val)
            $("#dashboard-body").animate({opacity: 1}, 100)
        })
    }

    useEffect(()=>{
        console.log(localStorage.getItem("authenticatedUser"));
        if(authenticated || localStorage.getItem("authenticatedUser") !== null){
            $("#navigation-bar").css({display: "none"})
            $("#to-top").css({display: "none"})
            $("canvas").css({display: "none"})
        }else{
            $("#navigation-bar").css({display: "flex"})
            $("#to-top").css({display: "block"})
            $("canvas").css({display: "block"})
        }

        if(localStorage.getItem("authenticatedUser") !== null){
            setAuthenticatedUserData(JSON.parse(localStorage.getItem("authenticatedUser")));
            setAuthenticatedUser(JSON.parse(localStorage.getItem("authenticatedUser")));
        }else{
            // Make axios request for user data
            axios.get(`${ domainName }/user/`, {
                headers: {
                    Authorization: `Token ${authenticationToken}`
                }
            })
            .then( ({ data })=>{
                setAuthenticatedUser(data);
                setAuthenticatedUserData(data);
            })
            .catch( error =>{
                
            })
            // set authenticatedUser to said data and save also to localStorage
        }
    }, [])
    return( authenticated ? 
        <section id="user-profile-dashboard">
            <div id="logo-holder">
                <Link to='/'>
                    <header onClick={()=>{
                        $("#navigation-bar").css({display: "flex"})

                    }}>
                        <img src={ require("../../img/logo-dark.png")} alt="logo" id="navigation-logo"/>
                        <h2>BITCOIN2014</h2>
                    </header>
                </Link>
                {/* <span onClick={ ()=>{
                    setPos(!down);
                }}><img src={ require("../../img/menu.png")} alt="menu"/></span> */}
            </div>
            <main style={{display: "flex"}}>
                <SideBar changePage={ changePage } 
                        setAuthenticatedUserData={ setAuthenticatedUserData }
                        setAuthenticated={ setAuthenticated }/>
                <DashboardBody currentPage={ currentPage } 
                                changePage={ changePage }
                                authenticatedUser={ authenticatedUser }/>
            </main>
        </section>:
        <Redirect to="signin/"/>
    )
}