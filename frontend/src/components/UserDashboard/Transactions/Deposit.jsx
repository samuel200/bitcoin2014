import React from 'react'
import DepositForm from '../AccountOverview/DepositForm'
import DepositTransactionTable from '../AccountOverview/DepostitransactionTable'

export default function Deposit({ authenticatedUser, authenticationToken, setAuthenticatedUser }) {
    return (
        <div  className="withdraw-section">
            <h2>Deposit Funds</h2>
            <div className="transaction-holder">
                <DepositForm authenticatedUser={ authenticatedUser } authenticationToken={ authenticationToken } setAuthenticatedUser={ setAuthenticatedUser }/>
                <DepositTransactionTable authenticatedUser={ authenticatedUser }/>
            </div>
        </div>
    )
}
