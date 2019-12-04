import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';

export default function SignupForm(){
    const [ message, setMessage ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const [ registered, setRegistered ] = useState(false)
    const checkIfReady = ()=>{
        let ready = true;
        $(".required").each(function(index){
            if($(this).val() === ""){
                ready = false;
                return;
            }
        })
        return ready;
    }

    const showMessage = (type, message) =>{
        const errorHolder = $("#message");

        if(type === "success"){
            errorHolder.attr('class', type)
        }else if( type === "error"){
            errorHolder.attr('class', type)
        }

        setMessage(message)
        errorHolder.css({
            animation: "4s ease-in message-display forwards"
        })
        setTimeout(()=>{
            errorHolder.css({
                animation: ""
            })
        }, 4000)
    } 

    const passwordCheck = () =>{
        const [ password, confirmPassword ] = $("input[type='password'");
        const value = password.value;

        if(value.length >= 8 && /[a-zA-z]/g.test(value) && /\d/g.test(value)){
            if(value === confirmPassword.value){
                return true;
            }else{
                return false;
            }
        }
    }

    const registerUser = e =>{
        e.preventDefault();

        if(checkIfReady() && passwordCheck()){
            const formData = {
                first_name: $(".form-side input[name='first-name']").val(),
                last_name: $(".form-side input[name='last-name']").val(),
                username: $(".form-side input[name='username']").val(),
                email: $(".form-side input[name='email']").val(),
                password: $(".form-side input[name='password']").val(),
                country: $(".form-side input[name='country']").val(),
                phone_number: $(".form-side input[name='mobile-number']").val(),
                bitcoin_address: $(".form-side input[name='wallet-address']").val()
            }
            
            setLoading(true)
            axios.post("http://127.0.0.1:8000/register/", formData)
            .then(({ data })=>{
                setLoading(false)
                showMessage('success', 'Registration Successful');
                setTimeout(()=>{
                    setRegistered(true);
                }, 3000)
            }).catch(error =>{
                setLoading(false);
                showMessage('error', 'Error was experienced while registering user.')
            })
        }
        else{
            showMessage('error', 'check form some values are incorrect [or not filled]')
            setLoading(false);
        }
    }


    return( registered ?
        <Redirect to="/signin"/>:
        <div className="form-side">
            <form onSubmit={ registerUser }>
                <div id="message" >{ message }</div>
                <h2 className="heading">Register your account</h2>
                <div>
                    <label htmlFor="first-name">Your First Name</label>
                    <input type="text" name="first-name" id="first-name" className="required" placeholder="Your First Name"/>
                </div>
                <div>
                    <label htmlFor="last-name">Your Last Name</label>
                    <input type="text" name="last-name" id="last-name" className="required" placeholder="Your Last Name"/>
                </div>
                <div>
                    <label htmlFor="user-name">Your Username</label>
                    <input type="text" name="username" id="user-name" className="required" placeholder="Your Username"/>
                </div>
                <div>
                    <label htmlFor="country">Your Country</label>
                    <input type="text" name="country" id="country" className="required" placeholder="Your Country"/>
                </div>
                <div>
                    <label htmlFor="mobile-number">Your Mobile Number</label>
                    <input type="text" name="mobile-number" id="mobile-number" className="required" placeholder="Your Mobile Number"/>
                </div>
                <div>
                    <label htmlFor="wallet-address">Your Bitcoin Wallet Address</label>
                    <input type="text" name="wallet-address" id="wallet-address" placeholder="Your Bitcoin Wallet Address [Optional]"/>
                </div>
                <div>
                    <label htmlFor="email">Your Email</label>
                    <input type="email" name="email" id="email" className="required" placeholder="Your Email Address"/>
                </div>
                <div>
                    <label htmlFor="password">Your Password</label>
                    <input type="password" name="password" id="password" className="required form-control is-valid" placeholder="Your Password"/>
                    <div className="valid-feedback">
                        Password Should Contain Atleast 8 Characters Both Digit And Letter.
                    </div>
                </div>
                <div>
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" name="confirm-password" id="confirm-password" className="required" placeholder="Confirm Password"/>
                </div>
                <div>
                    <button className="btn" type="submit" disabled={ loading }>Sign up</button>
                </div>
                <div style={{
                    textAlign: "center",
                    display: loading ? "block" : "none"
                }}>
                    <img src={ require('../../img/loading.svg')} alt="loading-animation" style={{transform: "scale(.4)"}}/>
                </div>
        </form>
            </div>
    )
}
