import React from 'react';
import InvestmentItem from './InvestmentItem';

export default function InvestmentSection({ style, investmentItemStyle, itemOnClick, itemOnMouseOver }) {
    const investmentPlans = [
        {
            planName: "Bronze", 
            offer: "110% after 2days", 
            min: "$100", 
            max: "$3,999", 
            referalBonus: "7%", 
            color: "#B79043"
        },
        {
            planName: "Silver", 
            offer: "125% after 3days", 
            min: "$4,000", 
            max: "$50,999", 
            referalBonus: "10%", 
            color: "#7F826D"
        },
        {
            planName: "Gold", 
            offer: "150% after 7days", 
            min: "$51,000", 
            max: "$300,000", 
            referalBonus: "12%", 
            color: "#98A830"
        }
    ]
    return (
        <section id="investment-plan" style={ style }>
            <h2 className="heading">Our Awesome Investment Plans</h2>
            <div id="investment-card-holder">
                {
                    investmentPlans.map( ({ planName, offer, min, max, referalBonus, color }, id) => <InvestmentItem planName={ planName }
                                                                                                                     offer={ offer }
                                                                                                                     min={ min }
                                                                                                                     max={ max }
                                                                                                                     referalBonus={ referalBonus }
                                                                                                                     color={ color } 
                                                                                                                     style={ investmentItemStyle }
                                                                                                                     itemOnClick={ itemOnClick }/>)
                }
            </div>
        </section>
    )
}
