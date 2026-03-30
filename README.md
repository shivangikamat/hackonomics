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


<img width="1709" height="973" alt="Screenshot 2026-03-30 at 19 19 27" src="https://github.com/user-attachments/assets/0289a412-12ee-4508-9dc5-11754dc708cc" />
<img width="1307" height="561" alt="Screenshot 2026-03-30 at 19 20 17" src="https://github.com/user-attachments/assets/5477cb80-5091-4adc-bf05-d87f56cccafa" />
<img width="1275" height="777" alt="Screenshot 2026-03-30 at 19 20 42" src="https://github.com/user-attachments/assets/ff74867c-7a98-4817-8af2-f790c8aa614b" />

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

## Suggested Pitch

“Most stock simulators teach clicking buttons. MarketMind teaches cause and effect. Players experience how macro events reshape sectors, then immediately see how those forces impacted their portfolio.”
