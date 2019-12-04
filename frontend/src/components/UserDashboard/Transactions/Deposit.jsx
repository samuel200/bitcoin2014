import React from 'react'
import DepositForm from '../AccountOverview/DepositForm'
import DepositTransactionTable from '../AccountOverview/DepostiTransactionTable'

export default function Deposit() {
    return (
        <div  className="withdraw-section">
            <h2>Deposit Funds</h2>
            <div className="transaction-holder">
                <DepositForm />
                <DepositTransactionTable />
            </div>
        </div>
    )
}
