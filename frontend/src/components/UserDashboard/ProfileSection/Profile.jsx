import React from 'react'

export default function Profile({ authenticatedUser }) {
    const { email, first_name, last_name, phone_number, country, bitcoin_address } = authenticatedUser;
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
            <h3>PROFILE INFO</h3>
            <form>
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
                                    <input type="text"  id="email" placeholder="Your Bank Name"/>
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
            </form>
        </div>
        <div id="transaction-form-holder">
            <h4>Change Password</h4>
            <form>
                <div>
                    <label htmlFor="email">current-password</label>
                    <input type="password" placeholder="Your Current Password"/>
                </div>
                <div>
                    <label for="ammount">New Password</label>
                    <input type="password" className="form-control is-valid"/>
                    <div class="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div>
                    <label for="ammount">Confirm Password</label>
                    <input type="password" className="form-control is-valid"/>
                    <div class="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <button type="submit">Change Password</button>
            </form>
        </div>
        </div>
    )
}
