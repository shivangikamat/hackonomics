# MarketMind

MarketMind is a browser-based stock market learning game built for Hackonomics. Instead of only letting users trade with virtual cash, it teaches why portfolios move by simulating macro events like rate hikes, recession warnings, and oil shocks.

## What It Does

- Starts the player with virtual cash and a watchlist of tradable stocks.
- Lets the player buy and sell shares to build a portfolio.
- Simulates market movement with both normal price drift and headline-driven events.
- Explains portfolio gains and losses in plain language based on sector exposure and the latest event.
- Includes scenario modes such as a recession drill, AI boom, and crash simulation.

## Demo Highlights

- `Trigger Market Event`: fires a macro event and reprices stocks based on sector sensitivity.
- `Explain My Portfolio`: generates a quick explanation for the current portfolio result.
- Scenario selector: resets the game into different market environments.
- Performance chart: visualizes net worth over time.
- Sector exposure: shows where the portfolio is concentrated.

## Screenshots

![MarketMind dashboard overview](/Users/shika/Desktop/Screenshot%202026-03-30%20at%2019.19.27.png)

![MarketMind portfolio and insight panels](/Users/shika/Desktop/Screenshot%202026-03-30%20at%2019.19.57.png)

![MarketMind event feed and learning spotlight](/Users/shika/Desktop/Screenshot%202026-03-30%20at%2019.20.42.png)

## Run It

This MVP is fully static and does not require a build step.

1. Open [`index.html`](/Users/shika/Documents/Project/hackonomics/index.html) in a browser.
2. Buy a few stocks from different sectors.
3. Trigger events or wait for automatic market ticks.
4. Use the explanation panel to understand the outcome.

## Files

- [`index.html`](/Users/shika/Documents/Project/hackonomics/index.html): app structure and dashboard layout
- [`styles.css`](/Users/shika/Documents/Project/hackonomics/styles.css): visual design and responsive styling
- [`app.js`](/Users/shika/Documents/Project/hackonomics/app.js): trading logic, scenarios, events, charts, and explanations

## Pitch

“Most stock simulators teach clicking buttons. MarketMind teaches cause and effect. Players experience how macro events reshape sectors, then immediately see how those forces impacted their portfolio.”
