import React, { useEffect, useRef } from 'react'


export default function Loading({ stopLoading }) {
    const loadingPage = useRef();

    useEffect(()=>{
        setTimeout(()=>{
            loadingPage.current.classList.add("loading-remove")
        }, 4000)
        setTimeout(()=>{
            loadingPage.current.style.display = "none";
        }, 6000)
          
    }, [])
    return (
        <div id="loading" ref={ loadingPage }>
            <div>
                <img src={ require("../../img/logo-dark.png") } alt="loading"/>
            </div>
        </div>
    )
}
