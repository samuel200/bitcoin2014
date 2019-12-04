import React from 'react'

export default function WithdrawalForm() {
    return (
        <div id="transaction-form-holder" className="transaction-item">
            <h4>Withdrawal Form</h4>
            <form>
                <div>
                    <label htmlFor="email">Your Email</label>
                    <input type="email" name="email" id="email" value="your-email@email.com" placeholder="Your Email Address"/>
                </div>
                <div>
                    <label for="account-balance">Account Balance</label>
                    <input type="text" name="account-balance" value="$0"/>
                </div>
                <div>
                    <label for="ammount">Ammount</label>
                    <input type="number" className="form-control is-valid" name="ammount" value="$0"/>
                    <div class="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleFormControlSelect1">Payment Method</label>
                    <select class="form-control" id="exampleFormControlSelect1">
                        <option>Bitcoin</option>
                        <option>Cash Transaction</option>
                    </select>
                </div>
                <button type="submit">Make Withdrawal</button>
            </form>
        </div>
    )
}
