import React from 'react';
import AccountBalanceSection from './AccountBalanceSection';
import WithdrawalForm from './WithdrawalForm';

import "./Account.css"
import DepositForm from './DepositForm';
import WithdrawalTransactionTable from './WithdrawalTransactionTable';
import DepositTransactionTable from './DepostiTransactionTable';

export default function AccountOverview() {
    return (
        <section id="account-overview-section">
            <h2 style={{padding: "40px 50px"}}>Account Overview</h2>
            <AccountBalanceSection />
            <hr style={{borderColor: "#bbb"}}/>
            <div id="transaction-section">
                <WithdrawalForm />
                <DepositForm />
            </div>
            <hr style={{borderColor: "#bbb"}}/>
            <div id="transaction-section">
                <WithdrawalTransactionTable />
                <DepositTransactionTable />
            </div>
        </section>
    )
}
