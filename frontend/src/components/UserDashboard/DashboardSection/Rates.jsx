import React from 'react'
import RateItem from './RateItem'

export default function Rates() {
    const rates = [
      {
        "symbol": "FX:EURUSD",
        "width": "350",
        "colorTheme": "dark",
        "isTransparent": false,
        "locale": "en"
      },
      {
        "symbol": "BITSTAMP:BTCUSD",
        "width": "350",
        "colorTheme": "dark",
        "isTransparent": false,
        "locale": "en"
      },
      {
        "symbol": "BINANCE:ETHBTC",
        "width": "350",
        "colorTheme": "dark",
        "isTransparent": false,
        "locale": "en"
      }
    ]
    return (
      <section id="rate-section">
        {
          rates.map( rate => <RateItem scriptContent={ rate } />)
        }
      </section>
    )
}
