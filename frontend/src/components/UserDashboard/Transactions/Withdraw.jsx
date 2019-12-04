import React from 'react'
import WithdrawalTransactionTable from '../AccountOverview/WithdrawalTransactionTable'
import WithdrawalForm from '../AccountOverview/WithdrawalForm'

export default function Withdraw() {
    return (
        <div  className="withdraw-section">
            <h2>Withdraw Funds</h2>
            <div className="transaction-holder">
                <WithdrawalForm />
                <WithdrawalTransactionTable />
            </div>
        </div>
    )
}
