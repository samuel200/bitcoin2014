import React from 'react'

export default function DepositForm() {
    return (
        <div id="transaction-form-holder" className="transaction-item">
            <h4>Deposit Form</h4>
            <form>
                <div>
                    <label htmlFor="email">Your Email</label>
                    <input type="email" name="email" id="email" value="your-email@email.com" placeholder="Your Email Address"/>
                </div>
                <div>
                    <label for="ammount">Ammount</label>
                    <input type="number" className="form-control is-valid" name="ammount" value="$0"/>
                    <div class="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div className="form-group">
                    <label for="exampleFormControlSelect1">Payment Method</label>
                    <select className="form-control" id="exampleFormControlSelect1">
                        <option>Bitcoin</option>
                        <option>Cash Transaction</option>
                    </select>
                </div>
                <button type="submit">Make Deposit</button>
            </form>
        </div>
    )
}
