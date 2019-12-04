import React from 'react';
// import $ from 'jquery';
import CustomerSupport from './CustomerSupport/CustomerSupport';
import DashboardFooter from './DashboardFooter';
import DashboardSection from './DashboardSection/DashboardSection';
import InvestmentSection from '../InvestmentPlan.jsx/InvestmentSection';
import AccountOverview from './AccountOverview/AccountOverview';
import Withdraw from './Transactions/Withdraw';
import Deposit from './Transactions/Deposit';
import Profile from './ProfileSection/Profile';

export default function DashboardBody({ currentPage, changePage, authenticatedUser }){
    let page;

    switch(currentPage){
        case "1":
            page = <DashboardSection />
            break;

        case "2":
            page = <Profile authenticatedUser={ authenticatedUser }/>
            break;

        case "3":
            page = <AccountOverview authenticatedUser={ authenticatedUser }/>
            break;

        case "4":
            page = (
                <div>
                    <InvestmentSection style={{background: "none", margin: "0px"}} 
                                       investmentItemStyle={{width: "calc((100%/3) - 80px)"}} 
                                       itemOnClick={ ()=> changePage("6") }/>
                    <div style={{ width: "90%", margin: "auto auto 40px auto"}}>
                        <buttonid id="contact-us-btn" onClick={ ()=> changePage("6") }>GetStarted </buttonid>
                    </div>
                </div>
                )
            break;

        case "5":
            page = <Withdraw  authenticatedUser={ authenticatedUser }/>
            break;

        case "6":
            page = <Deposit  authenticatedUser={ authenticatedUser }/>
            break;
        
        case "7":
            page = <CustomerSupport />
            break;
    }

    return(
        <div id="dashboard-body">
            {/* <DashboardBody /> */}
            { page }
            <DashboardFooter />
        </div>
    )
}