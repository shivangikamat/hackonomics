const STOCKS = [
  {
    symbol: "AAPL",
    name: "Apple",
    sector: "Tech",
    price: 192,
    volatility: 1.8,
    beta: 1.1,
    eventSensitivity: {
      rates_hike: -0.08,
      oil_spike: -0.02,
      recession_warning: -0.06,
      ai_boom: 0.09,
      supply_chain_ease: 0.04,
    },
  },
  {
    symbol: "TSLA",
    name: "Tesla",
    sector: "Auto",
    price: 224,
    volatility: 2.8,
    beta: 1.45,
    eventSensitivity: {
      rates_hike: -0.11,
      oil_spike: -0.04,
      recession_warning: -0.09,
      ai_boom: 0.07,
      supply_chain_ease: 0.06,
    },
  },
  {
    symbol: "XOM",
    name: "ExxonMobil",
    sector: "Energy",
    price: 118,
    volatility: 1.3,
    beta: 0.85,
    eventSensitivity: {
      rates_hike: -0.01,
      oil_spike: 0.1,
      recession_warning: -0.03,
      ai_boom: 0.01,
      supply_chain_ease: -0.02,
    },
  },
  {
    symbol: "JPM",
    name: "JPMorgan",
    sector: "Finance",
    price: 168,
    volatility: 1.4,
    beta: 0.92,
    eventSensitivity: {
      rates_hike: 0.05,
      oil_spike: -0.01,
      recession_warning: -0.08,
      ai_boom: 0.01,
      supply_chain_ease: 0.02,
    },
  },
  {
    symbol: "PFE",
    name: "Pfizer",
    sector: "Healthcare",
    price: 34,
    volatility: 0.9,
    beta: 0.65,
    eventSensitivity: {
      rates_hike: 0.01,
      oil_spike: -0.01,
      recession_warning: 0.03,
      ai_boom: 0.01,
      supply_chain_ease: 0.01,
    },
  },
  {
    symbol: "NVDA",
    name: "NVIDIA",
    sector: "Tech",
    price: 873,
    volatility: 3.2,
    beta: 1.65,
    eventSensitivity: {
      rates_hike: -0.1,
      oil_spike: -0.01,
      recession_warning: -0.08,
      ai_boom: 0.14,
      supply_chain_ease: 0.05,
    },
  },
];

const EVENTS = [
  {
    id: "rates_hike",
    title: "Central bank raises interest rates",
    explanation:
      "Higher rates make future company earnings less attractive, which often hits growth and tech stocks first while helping some banks.",
  },
  {
    id: "oil_spike",
    title: "Oil prices spike after supply disruption",
    explanation:
      "Energy producers often benefit from higher crude prices, while transport-heavy and consumer-facing companies face cost pressure.",
  },
  {
    id: "recession_warning",
    title: "Recession warning hits markets",
    explanation:
      "Investors rotate away from cyclical growth names and toward more defensive companies when a slowdown looks more likely.",
  },
  {
    id: "ai_boom",
    title: "AI spending boom accelerates",
    explanation:
      "Chipmakers and platform companies can rally when businesses increase spending on AI infrastructure and software.",
  },
  {
    id: "supply_chain_ease",
    title: "Global supply chains ease",
    explanation:
      "Lower shipping delays and input costs can improve margins for manufacturers and large hardware companies.",
  },
];

const SCENARIOS = [
  {
    id: "starter",
    name: "Balanced Market",
    description:
      "A calm starter mode with mixed sector leadership and smaller macro shocks. Great for learning the basics.",
    tags: ["Beginner friendly", "Lower volatility", "Mixed sectors"],
    eventBias: ["supply_chain_ease", "rates_hike", "ai_boom"],
    cash: 10000,
  },
  {
    id: "recession",
    name: "Recession Drill",
    description:
      "Trade through a slowdown where defensive positioning matters and rate-sensitive names get stressed.",
    tags: ["High pressure", "Defensive rotation", "Macro-heavy"],
    eventBias: ["recession_warning", "rates_hike", "oil_spike"],
    cash: 12000,
  },
  {
    id: "ai",
    name: "AI Boom Cycle",
    description:
      "Momentum is concentrated in semiconductors and growth names, but sharp drawdowns still happen on bad news.",
    tags: ["Fast growth", "Tech-heavy", "Momentum"],
    eventBias: ["ai_boom", "supply_chain_ease", "rates_hike"],
    cash: 9000,
  },
  {
    id: "crash",
    name: "Shock Crash",
    description:
      "A chaos mode inspired by crisis periods where headlines can quickly wipe out weak positioning.",
    tags: ["Crisis simulation", "Volatile", "For demos"],
    eventBias: ["recession_warning", "oil_spike", "rates_hike"],
    cash: 15000,
  },
];

function cloneStocks() {
  return STOCKS.map((stock) => ({
    ...stock,
    eventSensitivity: { ...stock.eventSensitivity },
  }));
}

const state = {
  cash: 10000,
  holdings: {},
  stocks: cloneStocks(),
  eventFeed: [],
  history: [],
  activeScenario: SCENARIOS[0].id,
  tick: 0,
  day: 1,
  lastEvent: null,
  baselineValue: 10000,
};

const CONCEPTS = {
  rates_hike: {
    label: "Learning Spotlight",
    title: "Why Interest Rates Matter",
    summary:
      "When central banks raise interest rates, borrowing becomes more expensive. Businesses and consumers usually spend more carefully, and investors often become less willing to pay high prices for future growth.",
    example:
      "That is why tech and other fast-growth stocks often fall harder during rate hikes, while some banks can benefit from higher lending margins.",
    points: [
      { title: "Core idea", body: "Higher rates reduce demand and can slow the economy." },
      { title: "Market effect", body: "Growth stocks are usually more sensitive because their value depends heavily on future earnings." },
    ],
    image: createConceptArt("rates"),
  },
  oil_spike: {
    label: "Learning Spotlight",
    title: "Supply Shocks And Oil Prices",
    summary:
      "Oil is a key input for transport, shipping, and manufacturing. If supply is disrupted, prices can jump quickly and push up costs across the economy.",
    example:
      "Energy companies may gain from higher oil prices, but airlines, logistics firms, and consumers can feel the squeeze.",
    points: [
      { title: "Core idea", body: "Scarcity raises prices when demand stays strong." },
      { title: "Market effect", body: "Energy stocks can rise while cost-sensitive sectors weaken." },
    ],
    image: createConceptArt("oil"),
  },
  recession_warning: {
    label: "Learning Spotlight",
    title: "What A Recession Warning Means",
    summary:
      "A recession warning suggests economic growth may slow or turn negative. Investors usually become more defensive and shift away from companies tied to consumer spending and business expansion.",
    example:
      "Healthcare and other defensive sectors can hold up better because people still need those goods and services even in weaker economies.",
    points: [
      { title: "Core idea", body: "Lower confidence often means weaker spending and lower company earnings." },
      { title: "Market effect", body: "Cyclical sectors tend to drop faster than defensive sectors." },
    ],
    image: createConceptArt("recession"),
  },
  ai_boom: {
    label: "Learning Spotlight",
    title: "Innovation Cycles And Valuation",
    summary:
      "When investors believe a new technology will change industries, money can flood into the companies building the tools behind it. This often creates strong momentum in a few sectors.",
    example:
      "Chipmakers, cloud platforms, and software leaders can rally as markets price in future demand for AI infrastructure.",
    points: [
      { title: "Core idea", body: "Markets move on expectations, not only current profits." },
      { title: "Market effect", body: "Narratives can accelerate gains, but crowded trades can reverse quickly." },
    ],
    image: createConceptArt("ai"),
  },
  supply_chain_ease: {
    label: "Learning Spotlight",
    title: "How Supply Chains Affect Prices",
    summary:
      "When shipping delays and shortages ease, companies can get materials faster and at lower cost. That improves margins and reduces pressure on consumer prices.",
    example:
      "Manufacturers and hardware companies may benefit because it becomes cheaper and easier to build and deliver products.",
    points: [
      { title: "Core idea", body: "Lower friction in production often improves company profitability." },
      { title: "Market effect", body: "Businesses tied to physical goods can recover when bottlenecks fade." },
    ],
    image: createConceptArt("supply"),
  },
  starter: {
    label: "Learning Spotlight",
    title: "Diversification Basics",
    summary:
      "Diversification means spreading investments across sectors so one headline does not control your whole outcome. It is one of the simplest risk-management ideas in finance.",
    example:
      "If tech falls after a rate hike, energy or healthcare holdings may soften the impact on your portfolio.",
    points: [
      { title: "Core idea", body: "Different sectors react differently to the same event." },
      { title: "Market effect", body: "A balanced portfolio is usually less volatile than a concentrated one." },
    ],
    image: createConceptArt("diversification"),
  },
};

const summaryGrid = document.getElementById("summary-grid");
const scenarioSelect = document.getElementById("scenario-select");
const scenarioDescription = document.getElementById("scenario-description");
const scenarioTags = document.getElementById("scenario-tags");
const stockGrid = document.getElementById("stock-grid");
const holdingsTable = document.getElementById("holdings-table");
const eventFeed = document.getElementById("event-feed");
const exposureSummary = document.getElementById("exposure-summary");
const explanationCard = document.getElementById("explanation-card");
const sectorBars = document.getElementById("sector-bars");
const learningSpotlight = document.getElementById("learning-spotlight");
const performanceChart = document.getElementById("performance-chart");
const performanceCtx = performanceChart.getContext("2d");

document.getElementById("trigger-event").addEventListener("click", triggerScenarioEvent);
document.getElementById("next-day").addEventListener("click", advanceToNextDay);
document
  .getElementById("explain-portfolio")
  .addEventListener("click", renderExplanation);
scenarioSelect.addEventListener("change", (event) => {
  loadScenario(event.target.value);
});

function initialize() {
  populateScenarioSelect();
  loadScenario(state.activeScenario);
  setInterval(simulateMarketTick, 3500);
}

function populateScenarioSelect() {
  scenarioSelect.innerHTML = SCENARIOS.map(
    (scenario) =>
      `<option value="${scenario.id}">${scenario.name}</option>`
  ).join("");
}

function loadScenario(scenarioId) {
  const scenario = SCENARIOS.find((item) => item.id === scenarioId) || SCENARIOS[0];
  state.activeScenario = scenario.id;
  state.cash = scenario.cash;
  state.baselineValue = scenario.cash;
  state.holdings = {};
  state.tick = 0;
  state.day = 1;
  state.lastEvent = null;
  state.eventFeed = [
    {
      title: `Scenario loaded: ${scenario.name}`,
      explanation: `${scenario.description} You are starting on Day 1.`,
      at: new Date(),
    },
  ];
  state.stocks = cloneStocks().map((stock, index) => {
    const adjustedPrice = Number((stock.price * (0.94 + index * 0.015)).toFixed(2));
    return {
      ...stock,
      price: adjustedPrice,
      previousClose: adjustedPrice,
    };
  });
  state.history = [scenario.cash];
  scenarioSelect.value = scenario.id;
  scenarioDescription.textContent = scenario.description;
  scenarioTags.innerHTML = scenario.tags
    .map((tag) => `<span class="scenario-tag">${tag}</span>`)
    .join("");
  render();
}

function simulateMarketTick() {
  state.tick += 1;
  state.day += 1;
  state.stocks.forEach((stock) => {
    const drift = (Math.random() - 0.5) * stock.volatility * 0.9;
    stock.previousClose = stock.price;
    stock.price = Math.max(5, Number((stock.price * (1 + drift / 100)).toFixed(2)));
  });

  if (state.tick % 3 === 0) {
    triggerScenarioEvent();
    return;
  }

  recordHistory();
  render();
}

function advanceToNextDay() {
  simulateMarketTick();
}

function triggerScenarioEvent() {
  const scenario = SCENARIOS.find((item) => item.id === state.activeScenario) || SCENARIOS[0];
  const biasedPool = scenario.eventBias
    .map((id) => EVENTS.find((event) => event.id === id))
    .filter(Boolean);
  const event = biasedPool[Math.floor(Math.random() * biasedPool.length)];
  if (!event) {
    return;
  }

  state.lastEvent = event;
  state.stocks.forEach((stock) => {
    const sensitivity = stock.eventSensitivity[event.id] || 0;
    const randomAmplifier = 0.85 + Math.random() * 0.35;
    stock.previousClose = stock.price;
    stock.price = Math.max(
      5,
      Number((stock.price * (1 + sensitivity * randomAmplifier)).toFixed(2))
    );
  });

  state.eventFeed.unshift({
    title: `Day ${state.day}: ${event.title}`,
    explanation: event.explanation,
    at: new Date(),
  });
  state.eventFeed = state.eventFeed.slice(0, 6);
  recordHistory();
  render();
}

function tradeStock(symbol, quantity, direction) {
  const parsedQuantity = Number(quantity);
  if (!Number.isFinite(parsedQuantity) || parsedQuantity <= 0) {
    return;
  }

  const stock = state.stocks.find((item) => item.symbol === symbol);
  if (!stock) {
    return;
  }

  const cost = stock.price * parsedQuantity;
  const currentShares = state.holdings[symbol]?.shares || 0;

  if (direction === "buy") {
    if (cost > state.cash) {
      flashExplanation("Not enough virtual cash for that trade. Try a smaller order size.");
      return;
    }
    const existing = state.holdings[symbol] || {
      shares: 0,
      avgCost: 0,
      sector: stock.sector,
      name: stock.name,
    };
    const newShares = existing.shares + parsedQuantity;
    const newAvgCost =
      (existing.avgCost * existing.shares + cost) / Math.max(newShares, 1);
    state.holdings[symbol] = {
      ...existing,
      shares: newShares,
      avgCost: Number(newAvgCost.toFixed(2)),
    };
    state.cash = Number((state.cash - cost).toFixed(2));
  }

  if (direction === "sell") {
    if (parsedQuantity > currentShares) {
      flashExplanation("You can't sell more shares than you own in this simulation.");
      return;
    }
    const remainingShares = currentShares - parsedQuantity;
    state.cash = Number((state.cash + cost).toFixed(2));
    if (remainingShares === 0) {
      delete state.holdings[symbol];
    } else {
      state.holdings[symbol].shares = remainingShares;
    }
  }

  recordHistory();
  render();
}

function recordHistory() {
  state.history.push(getPortfolioValue());
  if (state.history.length > 18) {
    state.history.shift();
  }
}

function getPortfolioValue() {
  const holdingsValue = Object.entries(state.holdings).reduce(
    (total, [symbol, position]) => {
      const stock = state.stocks.find((item) => item.symbol === symbol);
      return total + (stock ? stock.price * position.shares : 0);
    },
    0
  );
  return Number((state.cash + holdingsValue).toFixed(2));
}

function getPnL() {
  return Number((getPortfolioValue() - state.baselineValue).toFixed(2));
}

function render() {
  renderSummary();
  renderStocks();
  renderHoldings();
  renderEventFeed();
  renderExplanation();
  renderSectorExposure();
  renderChart();
  renderLearningSpotlight();
}

function renderSummary() {
  const portfolioValue = getPortfolioValue();
  const pnl = getPnL();
  const dailyMove = state.history.length > 1
    ? portfolioValue - state.history[state.history.length - 2]
    : 0;
  const cards = [
    { label: "Portfolio Value", value: formatCurrency(portfolioValue), tone: classifyTone(pnl), delta: formatSignedCurrency(pnl) },
    { label: "Available Cash", value: formatCurrency(state.cash), tone: "neutral", delta: `${countPositions()} open positions` },
    { label: "Trading Day", value: `Day ${state.day}`, tone: "neutral", delta: "Advance manually or wait" },
    { label: "Last Day Move", value: formatSignedCurrency(dailyMove), tone: classifyTone(dailyMove), delta: state.lastEvent ? "Latest macro shock logged" : `${state.history.length} chart points` },
  ];

  summaryGrid.innerHTML = cards
    .map(
      (card) => `
        <article class="summary-card">
          <span class="summary-label">${card.label}</span>
          <span class="summary-value">${card.value}</span>
          <span class="summary-delta ${card.tone}">${card.delta}</span>
        </article>
      `
    )
    .join("");
}

function renderStocks() {
  stockGrid.innerHTML = state.stocks
    .map((stock) => {
      const change = stock.price - stock.previousClose;
      const tone = classifyTone(change);
      return `
        <article class="stock-card">
          <div class="stock-head">
            <div>
              <strong>${stock.symbol}</strong>
              <div class="holding-meta">${stock.name}</div>
            </div>
            <span class="sector-pill">${stock.sector}</span>
          </div>
          <div class="stock-price">${formatCurrency(stock.price)}</div>
          <div class="stock-meta">
            <span class="${tone}">${formatSignedCurrency(change)}</span>
            <span>Beta ${stock.beta}</span>
          </div>
          <div class="trade-controls">
            <input type="number" min="1" value="1" id="qty-${stock.symbol}" />
            <div class="trade-actions">
              <button class="mini-button mini-buy" data-symbol="${stock.symbol}" data-action="buy">Buy</button>
              <button class="mini-button mini-sell" data-symbol="${stock.symbol}" data-action="sell">Sell</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  stockGrid.querySelectorAll("button[data-symbol]").forEach((button) => {
    button.addEventListener("click", () => {
      const symbol = button.dataset.symbol;
      const action = button.dataset.action;
      const input = document.getElementById(`qty-${symbol}`);
      tradeStock(symbol, input?.value, action);
    });
  });
}

function renderHoldings() {
  const entries = Object.entries(state.holdings);
  if (entries.length === 0) {
    exposureSummary.textContent =
      "No positions yet. Buy a few stocks, then trigger an event to see your exposure come alive.";
    holdingsTable.innerHTML =
      '<div class="holding-row"><div><div class="holding-name">No holdings yet</div><div class="holding-meta">Try building a portfolio before the next macro event lands.</div></div></div>';
    return;
  }

  const biggest = entries
    .map(([symbol, position]) => {
      const stock = state.stocks.find((item) => item.symbol === symbol);
      return { symbol, value: (stock?.price || 0) * position.shares };
    })
    .sort((a, b) => b.value - a.value)[0];

  exposureSummary.textContent = `Largest exposure: ${biggest.symbol}. Diversification matters when headlines hit fast.`;

  holdingsTable.innerHTML = entries
    .map(([symbol, position]) => {
      const stock = state.stocks.find((item) => item.symbol === symbol);
      const currentValue = (stock?.price || 0) * position.shares;
      const unrealized = currentValue - position.avgCost * position.shares;
      return `
        <div class="holding-row">
          <div>
            <div class="holding-name">${symbol} · ${position.name}</div>
            <div class="holding-meta">${position.shares} shares at avg cost ${formatCurrency(position.avgCost)}</div>
          </div>
          <div>
            <div class="holding-name">${formatCurrency(currentValue)}</div>
            <div class="holding-meta ${classifyTone(unrealized)}">${formatSignedCurrency(unrealized)} unrealized</div>
          </div>
        </div>
      `;
    })
    .join("");
}

function renderEventFeed() {
  eventFeed.innerHTML = state.eventFeed
    .map(
      (event) => `
        <article class="event-card">
          <time>${formatTimestamp(event.at)}</time>
          <strong>${event.title}</strong>
          <p>${event.explanation}</p>
        </article>
      `
    )
    .join("");
}

function renderExplanation() {
  const entries = Object.entries(state.holdings);
  if (entries.length === 0) {
    explanationCard.innerHTML = `
      <p>
        Your portfolio is still in cash, so market swings are barely affecting you.
        Buy across a few sectors, then use this panel to explain your gains or losses.
      </p>
      <span class="highlight-line">Start by buying 1-3 names from different sectors.</span>
    `;
    return;
  }

  const sectorExposure = summarizeSectorExposure();
  const topSector = sectorExposure[0];
  const pnl = getPnL();
  const direction = pnl >= 0 ? "gained" : "lost";
  const topEvent = state.lastEvent
    ? `The latest driver was "${state.lastEvent.title.toLowerCase()}".`
    : "There has not been a major macro event yet, so your moves are mostly coming from normal market drift.";

  explanationCard.innerHTML = `
    <p>
      You have ${direction} <strong>${formatCurrency(Math.abs(pnl))}</strong> because your portfolio is most exposed to
      <strong>${topSector?.sector || "mixed sectors"}</strong>. ${topEvent}
    </p>
    <p>
      ${buildSectorNarrative(topSector, pnl)}
    </p>
    <span class="highlight-line">${generateTakeaway(topSector, pnl)}</span>
  `;
}

function flashExplanation(message) {
  explanationCard.innerHTML = `
    <p>${message}</p>
    <span class="highlight-line">Simulation tip: adjust quantity or free up cash first.</span>
  `;
}

function renderSectorExposure() {
  const exposure = summarizeSectorExposure();
  if (exposure.length === 0) {
    sectorBars.innerHTML =
      '<div class="holding-meta">Sector exposure will appear here after your first trade.</div>';
    return;
  }

  sectorBars.innerHTML = exposure
    .map(
      (item) => `
        <div class="sector-row">
          <strong>${item.sector}</strong>
          <div class="bar-track"><div class="bar-fill" style="width: ${item.share}%"></div></div>
          <span>${item.share}%</span>
        </div>
      `
    )
    .join("");
}

function renderChart() {
  const width = performanceChart.width;
  const height = performanceChart.height;
  performanceCtx.clearRect(0, 0, width, height);

  const values = state.history;
  const min = Math.min(...values) * 0.98;
  const max = Math.max(...values) * 1.02;
  const xStep = width / Math.max(values.length - 1, 1);

  performanceCtx.strokeStyle = "rgba(31, 41, 51, 0.12)";
  performanceCtx.lineWidth = 1;
  for (let i = 0; i < 4; i += 1) {
    const y = 30 + (height - 60) * (i / 3);
    performanceCtx.beginPath();
    performanceCtx.moveTo(24, y);
    performanceCtx.lineTo(width - 24, y);
    performanceCtx.stroke();
  }

  const gradient = performanceCtx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "rgba(79, 224, 255, 0.3)");
  gradient.addColorStop(1, "rgba(79, 224, 255, 0.02)");

  performanceCtx.beginPath();
  values.forEach((value, index) => {
    const x = 24 + index * xStep;
    const y = mapValue(value, min, max, height - 28, 28);
    if (index === 0) {
      performanceCtx.moveTo(x, y);
    } else {
      performanceCtx.lineTo(x, y);
    }
  });
  performanceCtx.lineTo(24 + (values.length - 1) * xStep, height - 28);
  performanceCtx.lineTo(24, height - 28);
  performanceCtx.closePath();
  performanceCtx.fillStyle = gradient;
  performanceCtx.fill();

  performanceCtx.beginPath();
  values.forEach((value, index) => {
    const x = 24 + index * xStep;
    const y = mapValue(value, min, max, height - 28, 28);
    if (index === 0) {
      performanceCtx.moveTo(x, y);
    } else {
      performanceCtx.lineTo(x, y);
    }
  });
  performanceCtx.strokeStyle = "#4fe0ff";
  performanceCtx.lineWidth = 3;
  performanceCtx.stroke();

  const lastValue = values[values.length - 1];
  const lastX = 24 + (values.length - 1) * xStep;
  const lastY = mapValue(lastValue, min, max, height - 28, 28);
  performanceCtx.beginPath();
  performanceCtx.arc(lastX, lastY, 6, 0, Math.PI * 2);
  performanceCtx.fillStyle = "#d45bff";
  performanceCtx.fill();

  performanceCtx.fillStyle = "#9aa7d1";
  performanceCtx.font = "13px IBM Plex Sans";
  performanceCtx.fillText(`Start ${formatCurrency(values[0])}`, 24, height - 8);
  performanceCtx.fillText(`Now ${formatCurrency(lastValue)}`, width - 120, 18);
}

function renderLearningSpotlight() {
  const concept =
    (state.lastEvent && CONCEPTS[state.lastEvent.id]) ||
    CONCEPTS[state.activeScenario] ||
    CONCEPTS.starter;

  learningSpotlight.innerHTML = `
    <img class="learning-art" src="${concept.image}" alt="${concept.title}" />
    <span class="learning-label">${concept.label}</span>
    <h3 class="learning-title">${concept.title}</h3>
    <p class="learning-copy">${concept.summary}</p>
    <p class="learning-example">${concept.example}</p>
    <div class="learning-points">
      ${concept.points
        .map(
          (point) => `
            <div class="learning-point">
              <strong>${point.title}</strong>
              <span>${point.body}</span>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function summarizeSectorExposure() {
  const totals = {};
  let grandTotal = 0;

  Object.entries(state.holdings).forEach(([symbol, position]) => {
    const stock = state.stocks.find((item) => item.symbol === symbol);
    const value = (stock?.price || 0) * position.shares;
    grandTotal += value;
    totals[position.sector] = (totals[position.sector] || 0) + value;
  });

  return Object.entries(totals)
    .map(([sector, value]) => ({
      sector,
      value,
      share: grandTotal ? Math.round((value / grandTotal) * 100) : 0,
    }))
    .sort((a, b) => b.value - a.value);
}

function countPositions() {
  return Object.keys(state.holdings).length;
}

function classifyTone(value) {
  if (value > 0) {
    return "positive";
  }
  if (value < 0) {
    return "negative";
  }
  return "neutral";
}

function buildSectorNarrative(topSector, pnl) {
  if (!topSector) {
    return "Your holdings are spread lightly, so no single sector is dominating your result yet.";
  }

  const isPositive = pnl >= 0;
  if (topSector.sector === "Tech") {
    return isPositive
      ? "Your gains are being amplified by growth-heavy names, which respond strongly when innovation themes dominate."
      : "Your losses are concentrated in growth-heavy names, which often sell off hardest when rates rise or fear increases.";
  }
  if (topSector.sector === "Energy") {
    return isPositive
      ? "Energy is cushioning your portfolio because commodity-linked businesses can benefit when oil surges."
      : "Energy exposure is not enough to offset weakness elsewhere, so the defensive cushion is limited.";
  }
  if (topSector.sector === "Finance") {
    return isPositive
      ? "Financial stocks can benefit when higher rates support lending margins, especially relative to tech."
      : "Financials are sensitive to recession fears, so slowdown headlines can pressure them fast.";
  }
  return isPositive
    ? "Your biggest sector is doing its job and giving you a steadier return profile through this scenario."
    : "Your biggest sector is under pressure, which is pulling the rest of the portfolio lower.";
}

function generateTakeaway(topSector, pnl) {
  if (!topSector) {
    return "Takeaway: concentration risk is low, but learning signal is also low until you open positions.";
  }
  return pnl >= 0
    ? `Takeaway: ${topSector.sector} is currently your winning tilt.`
    : `Takeaway: ${topSector.sector} concentration is the main drag right now.`;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatSignedCurrency(value) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    signDisplay: "always",
  });
  return formatter.format(value);
}

function formatTimestamp(date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function mapValue(value, min, max, outMin, outMax) {
  if (max === min) {
    return (outMin + outMax) / 2;
  }
  return outMin + ((value - min) / (max - min)) * (outMax - outMin);
}

function createConceptArt(type) {
  const artwork = {
    rates: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 460">
        <defs>
          <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#d45bff"/>
            <stop offset="100%" stop-color="#4fe0ff"/>
          </linearGradient>
        </defs>
        <rect width="520" height="460" rx="32" fill="#141b35"/>
        <circle cx="118" cy="104" r="74" fill="rgba(212,91,255,0.18)"/>
        <path d="M90 328h70V140H90zM220 328h70V182h-70zM350 328h70V96h-70z" fill="url(#g1)"/>
        <path d="M86 110h278" stroke="#eef2ff" stroke-width="12" stroke-linecap="round"/>
        <path d="M314 60l54 50-54 50" fill="none" stroke="#eef2ff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,
    oil: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 460">
        <defs>
          <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ff5ea8"/>
            <stop offset="100%" stop-color="#7a7dff"/>
          </linearGradient>
        </defs>
        <rect width="520" height="460" rx="32" fill="#141b35"/>
        <path d="M116 322c0-68 54-123 122-123s122 55 122 123H116z" fill="url(#g2)"/>
        <path d="M202 180c0-42 28-77 58-111 30 34 58 69 58 111 0 36-26 67-58 67s-58-31-58-67z" fill="#4fe0ff"/>
        <path d="M92 344h336" stroke="#eef2ff" stroke-width="10" stroke-linecap="round"/>
      </svg>
    `,
    recession: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 460">
        <defs>
          <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#4fe0ff"/>
            <stop offset="100%" stop-color="#ff5ea8"/>
          </linearGradient>
        </defs>
        <rect width="520" height="460" rx="32" fill="#141b35"/>
        <path d="M94 118v220h326" stroke="#eef2ff" stroke-width="10" stroke-linecap="round"/>
        <path d="M128 158c42 26 78 39 118 36 44-4 74-27 146-92" fill="none" stroke="url(#g3)" stroke-width="14" stroke-linecap="round"/>
        <path d="M346 84l46-18-18 46" fill="none" stroke="#ff5ea8" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,
    ai: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 460">
        <defs>
          <linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#7a7dff"/>
            <stop offset="100%" stop-color="#4fe0ff"/>
          </linearGradient>
        </defs>
        <rect width="520" height="460" rx="32" fill="#141b35"/>
        <rect x="146" y="94" width="228" height="228" rx="26" fill="url(#g4)"/>
        <path d="M200 160h120M200 230h120M200 300h78" stroke="#141b35" stroke-width="14" stroke-linecap="round"/>
        <circle cx="126" cy="208" r="18" fill="#d45bff"/>
        <circle cx="394" cy="208" r="18" fill="#d45bff"/>
        <circle cx="260" cy="74" r="18" fill="#d45bff"/>
        <circle cx="260" cy="342" r="18" fill="#d45bff"/>
        <path d="M144 208h-40M414 208h-40M260 92v-40M260 362v-40" stroke="#eef2ff" stroke-width="10" stroke-linecap="round"/>
      </svg>
    `,
    supply: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 460">
        <defs>
          <linearGradient id="g5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#4fe0ff"/>
            <stop offset="100%" stop-color="#64f0c8"/>
          </linearGradient>
        </defs>
        <rect width="520" height="460" rx="32" fill="#141b35"/>
        <rect x="112" y="140" width="110" height="140" rx="18" fill="url(#g5)"/>
        <rect x="250" y="96" width="154" height="184" rx="18" fill="#7a7dff"/>
        <path d="M114 320h290" stroke="#eef2ff" stroke-width="12" stroke-linecap="round"/>
        <path d="M170 132V88h144v44" fill="none" stroke="#d45bff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,
    diversification: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 460">
        <defs>
          <linearGradient id="g6" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#4fe0ff"/>
            <stop offset="50%" stop-color="#7a7dff"/>
            <stop offset="100%" stop-color="#d45bff"/>
          </linearGradient>
        </defs>
        <rect width="520" height="460" rx="32" fill="#141b35"/>
        <circle cx="260" cy="220" r="126" fill="none" stroke="url(#g6)" stroke-width="52"/>
        <path d="M260 94v252M134 220h252" stroke="#141b35" stroke-width="18" stroke-linecap="round"/>
        <circle cx="260" cy="220" r="44" fill="#141b35" stroke="#eef2ff" stroke-width="10"/>
      </svg>
    `,
  };

  return `data:image/svg+xml;utf8,${encodeURIComponent(artwork[type])}`;
}

initialize();
