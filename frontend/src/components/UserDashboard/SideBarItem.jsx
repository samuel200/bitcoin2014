import React from 'react';
import $ from 'jquery';

export default function SideBarItem({ id, iconLink, name, changePage, setAuthenticatedUserData, setAuthenticated }) {
    const onClick = e =>{
        changePage(`${id+1}`);
        $(".active-side-bar-item").removeClass('active-side-bar-item');
        $(e.target).parent().addClass('active-side-bar-item')
    }
    const logout = ()=>{
        $("#navigation-bar").css({display: "flex"});
        $("#to-top").css({display: "block"});
        $("canvas").css({display: "block"});
        localStorage.removeItem('authenticatedUser');
        setAuthenticated(false);
    }

    return (
        <div className={`side-bar-item ${ name.toLowerCase() === "dashboard" ? "active-side-bar-item": "" }`} 
                onClick={ name.toLowerCase() === "logout" ? logout : onClick }>
            <img src={ iconLink } alt={ name }/>
            <p>{ name }</p>
        </div>
    )
}
