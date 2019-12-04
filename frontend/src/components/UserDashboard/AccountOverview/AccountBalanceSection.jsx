import React from 'react'
import AccountBalanceItem from './AccountBalanceItem'

export default function AccountBalanceSection() {
    const balance = [
        {
            type: "Account Balance",
            ammount: "$0",
            imageLink: require("../img/cheque.svg")
        },
        {
            type: "Investment Profits",
            ammount: "$0",
            imageLink: require("../img/cheque.svg")
        },
        {
            type: "Investment Plan",
            ammount: "None",
            imageLink: require("../img/analysis.svg")
        },
        {
            type: "Referral Earnings",
            ammount: "$0",
            imageLink: require("../img/cheque.svg")
        },
    ]
    return (
        <div id="account-balance-section">
            {
                balance.map(({type, ammount, imageLink})=> <AccountBalanceItem type={ type }
                                                                               ammount={ ammount }
                                                                               imageLink={ imageLink }/>)
            }
        </div>
    )
}
