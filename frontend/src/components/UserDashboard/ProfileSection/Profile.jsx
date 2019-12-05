import React, { useState } from 'react';
import $ from 'jquery';
import axios from 'axios';
import domainName from '../../../domainName';

export default function Profile({ authenticatedUser }) {
    const { email, first_name, last_name, phone_number, country, bitcoin_address } = authenticatedUser;
    const [ message, setMessage ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const [ loading2, setLoading2 ] = useState(false);

    const showMessage = (type, message, val=1) =>{
        let errorHolder;
        
        if(val === 1){
            errorHolder = $("#message");
        }else{
            errorHolder = $(".message");
        }

        if(type === "success"){
            errorHolder.attr('class', type)
        }else if( type === "error"){
            errorHolder.attr('class', type)
        }

        setMessage(message)
        errorHolder.css({
            transition: ".5s ease-in opacity",
            opacity: 1
        })

        setTimeout(()=>{
            errorHolder.css({
                opacity: 0
            })
        }, 2000)
    } 

    const editAccountDetails = e =>{
        e.preventDefault();
        const form = $(e.target);
        let [ bitcoin_address, bank_name, account_name, account_number ] = form.find('input');
        [ bitcoin_address, bank_name, account_name, account_number ] = [ bitcoin_address.value, bank_name.value, account_name.value, account_number.value ]
        
        setLoading2(true);
        axios.post(`${domainName}/change_account_details/`, {
            bitcoin_address,
            bank_name,
            account_name,
            account_number
        },{
            headers:{
                Authorization: `Token ${ authenticatedUser.token }`
            }
        }).then(({ data })=>{
            showMessage("success", "Accout Details Updated Successfully", 0)
            setLoading2(false);
        }).catch( error=>{
            setLoading2(false);
            showMessage("error", "Error Occured When Updating Account Details", 0);
        })
        
    }

    const changePassword = e =>{
        e.preventDefault();
        const form = $(e.target);
        const [ oldPassword, newPassword, newPasswordConfirm ] = form.find('input');
        console.log(form.find('input'))

        if(newPassword.value === "" || newPasswordConfirm.value === "" || oldPassword.value === ""){
            showMessage("error", "required fields are still empty");
        }else if(newPassword.value !== newPasswordConfirm.value){
            showMessage("error", "passwords do not match");
        }else if(!(newPassword.value.length >= 8 && /[a-zA-z]/g.test(newPassword.value) && /\d/g.test(newPassword.value))){
            showMessage("error", "password must have 8 characters of both letters and number")
        }else if(oldPassword.value === newPassword.value){
            showMessage("error", "old and new passwords should not be the same")
        }else{
            setLoading(true);

            axios.post(`${ domainName }/change_password/`, {
                password: oldPassword.value,
                new_password: newPassword.value
            }, {
                headers:{
                    Authorization: `Token ${ authenticatedUser.token }`
                }
            }).then(({ data })=>{
                const { error_message } = data;
                
                if(error_message){
                    showMessage("error", error_message);
                }else{
                    showMessage("success", "Password Changed Successfully", 1)
                    oldPassword.value = "";
                    newPassword.value = "";
                    newPasswordConfirm.value = "";
                }
                setLoading(false);
            }).catch(error=>{
                showMessage("error", "an error occured, try again later", 1);
                setLoading(false);
            })
        }
    }

    return (
        <div id="profile-section">
            <h2>Profile Overview</h2>
            <div className="table-responsive" id="transaction-form-holder">
            <h3>PROFILE INFO</h3>
            <table class="table table-hover transaction-table profile-table">
                <tbody style={{textTransform: "capitalize"}}>
                    <tr>
                        <th scope="row">Full Name</th>
                        <td>{ first_name + " " + last_name }</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th scope="row">Email</th>
                        <td>{ email }</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th scope="row">Country</th>
                        <td>{ country }</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th scope="row">Phone Number</th>
                        <td>{ phone_number }</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th scope="row">Referals</th>
                        <td>0</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th scope="row">Referal Earning</th>
                        <td>$100</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th scope="row">Referal Link</th>
                        <td>https://coincore.co/register.html?r=samuelemeh200@gmail.com</td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
            <div className="table-responsive" id="transaction-form-holder">
            <div id="message" className="message">{ message }</div>
            <h3>ACCOUNT DETAILS</h3>
            <form method="post" action={`${domainName}/change_account_details/`} onSubmit={ editAccountDetails }>
            <table class="table table-hover transaction-table profile-table">
                    <tbody>
                        <tr>
                            <th scope="row">Bitcoin Address</th>
                            <td>
                                <div>
                                    <input type="text"  id="email" placeholder="Your Bitcoin Address" defaultValue={ bitcoin_address }/>
                                </div>
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row">Bank Name</th>
                            <td>
                                <div>
                                    <input type="text"  id="bank-name" placeholder="Your Bank Name"/>
                                </div>
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row">Account Holder Name</th>
                            <td>
                                <div>
                                    <input type="text"  id="email" placeholder="Your Account Holder Name"/>
                                </div>
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row">Account Number</th>
                            <td>
                                <div>
                                    <input type="text"  id="email" placeholder="Your Account Number"/>
                                </div>
                            </td>
                            <td></td>
                            <td></td>
                        </tr>

                    </tbody>
            </table>
            <button type="submit">Set Transaction Details</button>
            <div style={{
                        textAlign: "center",
                        display: loading2 ? "block" : "none"
                    }}>
                        <img src={ require('../../../img/loading.svg')} alt="loading-animation" style={{transform: "scale(.7)"}}/>
            </div>
            </form>
        </div>
        <div id="transaction-form-holder">
            <div id="message" >{ message }</div>
            <h4>Change Password</h4>
            <form method="post" action={`${domainName}/change_password`} onSubmit={ changePassword }>
                <div>
                    <label htmlFor="email">current-password</label>
                    <input type="password" placeholder="Your Current Password"/>
                </div>
                <div>
                    <label for="ammount">New Password</label>
                    <input type="password" className="form-control is-valid"/>
                    <div class="valid-feedback">
                        password must be 8 characters and above [numbers and letters]
                    </div>
                </div>
                <div>
                    <label for="ammount">Confirm Password</label>
                    <input type="password" className="form-control is-valid"/>
                    <div class="valid-feedback">
                        confirm your new password
                    </div>
                </div>
                <button type="submit">Change Password</button>
                <div style={{
                        textAlign: "center",
                        display: loading ? "block" : "none"
                    }}>
                        <img src={ require('../../../img/loading.svg')} alt="loading-animation" style={{transform: "scale(.4)"}}/>
                </div>
            </form>
        </div>
        </div>
    )
}
