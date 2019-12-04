import React from 'react'

export default function WithdrawalTransactionTable() {
    return (
        <div id="transaction-form-holder" className="transaction-item">
            <h3>Withdrawal History</h3>
            <div className="table-responsive">
                <table class="table table-striped transaction-table">
                    <thead>
                        <tr>
                            <th scope="col">Payment ID</th>
                            <th scope="col">Payment Method</th>
                            <th scope="col">Ammount</th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">50c.MVZV2w.Zs</th>
                            <td>Bitcoin</td>
                            <td>1000</td>
                            <td>11/11/2019 22:11</td>
                            <td>PENDING</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
