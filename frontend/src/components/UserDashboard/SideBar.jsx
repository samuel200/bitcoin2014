import React from 'react';
import SideBarItem from './SideBarItem';

export default function SideBar({ changePage, setAuthenticatedUserData, setAuthenticated }){
    const navigations = [
        {
            iconLink: require("./img/dashboard.svg"),
            name: "dashboard"
        },
        {
            iconLink: require("./img/user.svg"),
            name: "Profile"
        },
        {
            iconLink: require("./img/account.svg"),
            name: "Account Overview"
        },
        
        {
            iconLink: require("./img/analysis.svg"),
            name: "Plans"
        },
        {
            iconLink: require("./img/cheque.svg"),
            name: "Withdrawal"
        },
        {
            iconLink: require("./img/cheque.svg"),
            name: "Deposit"
        },
        {
            iconLink: require("./img/help.svg"),
            name: "Customer Support"
        },
        {
            iconLink: require("./img/icon.svg"),
            name: "Logout"
        },
    ]
    return(
        <div id="side-bar">
            <h4>Menu</h4>
            {navigations.map( ({ iconLink, name }, id) => <SideBarItem id={ id } 
                                                                    changePage={ changePage } 
                                                                    iconLink={ iconLink } 
                                                                    setAuthenticatedUserData={ setAuthenticatedUserData }
                                                                    setAuthenticated={ setAuthenticated }
                                                                    name={ name }/>)}
        </div>
    )
}