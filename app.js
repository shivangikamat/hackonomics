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
    title: "Inflation And Interest Rates",
    summary:
      "Central banks often raise interest rates when inflation is running too hot. Higher rates slow borrowing and spending, which can reduce price pressure across the economy.",
    example:
      "That is why rate-hike headlines often hit growth stocks, mortgages, and consumer demand while helping some banks earn wider lending margins.",
    points: [
      { title: "Inflation link", body: "Policymakers use rates to cool spending when prices rise too quickly." },
      { title: "Market effect", body: "Growth stocks are sensitive because future profits are worth less when rates are higher." },
    ],
    image: createConceptArt("inflation"),
  },
  oil_spike: {
    label: "Learning Spotlight",
    title: "Macroeconomics: Supply Shocks",
    summary:
      "Macroeconomics studies economy-wide forces like inflation, growth, unemployment, and energy shocks. Oil is a classic macro variable because it affects transport, production, and consumer prices at the same time.",
    example:
      "When oil spikes, energy companies may gain while airlines, logistics firms, and households face higher costs.",
    points: [
      { title: "Macro view", body: "One shock can ripple through inflation, growth expectations, and sector performance." },
      { title: "Market effect", body: "Energy can rise while cost-sensitive businesses weaken." },
    ],
    image: createConceptArt("macroeconomics"),
  },
  recession_warning: {
    label: "Learning Spotlight",
    title: "Recession Risk And Business Cycles",
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
    title: "Microeconomics: Demand, Supply, And Pricing Power",
    summary:
      "Microeconomics looks at how individual firms and markets behave. In a tech boom, demand surges for chips and software, and companies with scarce supply or strong pricing power can capture outsized profits.",
    example:
      "Chipmakers and platform companies can rally when buyers compete for limited supply and investors expect margins to expand.",
    points: [
      { title: "Micro view", body: "Firm-level pricing, competition, and scarcity shape who wins." },
      { title: "Market effect", body: "Narratives can lift valuations quickly, but crowded trades can reverse just as fast." },
    ],
    image: createConceptArt("microeconomics"),
  },
  supply_chain_ease: {
    label: "Learning Spotlight",
    title: "Disinflation Through Better Supply Chains",
    summary:
      "When shipping delays and shortages ease, companies can get materials faster and at lower cost. That improves margins and reduces pressure on consumer prices.",
    example:
      "Manufacturers and hardware companies may benefit because it becomes cheaper and easier to build and deliver products.",
    points: [
      { title: "Inflation link", body: "Lower input costs can help slow inflation without cutting demand." },
      { title: "Market effect", body: "Businesses tied to physical goods can recover when bottlenecks fade." },
    ],
    image: createConceptArt("inflation"),
  },
  starter: {
    label: "Learning Spotlight",
    title: "Macroeconomics Vs Microeconomics",
    summary:
      "Macroeconomics looks at the whole economy, like inflation, growth, rates, and unemployment. Microeconomics looks at individual businesses, industries, prices, and competition.",
    example:
      "This game combines both: a macro headline can move the whole market, while each stock reacts differently based on its own sector and business model.",
    points: [
      { title: "Macro", body: "Big-picture forces move many assets at once." },
      { title: "Micro", body: "Firm-level fundamentals explain why some stocks move more than others." },
    ],
    image: createConceptArt("macro-micro"),
  },
  recession: {
    label: "Learning Spotlight",
    title: "Recession And Unemployment",
    summary:
      "Recessions usually come with falling output, weaker hiring, and lower business investment. Economists track these trends to understand where the economy is in the business cycle.",
    example:
      "When unemployment rises and consumer spending slows, cyclical sectors tend to weaken before defensive sectors do.",
    points: [
      { title: "Core idea", body: "Recessions reflect broad weakness in production and demand." },
      { title: "Market effect", body: "Investors often shift toward safer assets and defensive industries." },
    ],
    image: createConceptArt("recession"),
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

  const shortSummary = shortenText(concept.summary, 150);
  const shortExample = shortenText(concept.example, 120);

  learningSpotlight.innerHTML = `
    <img class="learning-art" src="${concept.image}" alt="${concept.title}" />
    <span class="learning-label">${concept.label}</span>
    <h3 class="learning-title">${concept.title}</h3>
    <p class="learning-copy">${shortSummary}</p>
    <p class="learning-example">${shortExample}</p>
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
    inflation: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 460">
        <defs>
          <linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1a2344"/>
            <stop offset="100%" stop-color="#141b35"/>
          </linearGradient>
          <linearGradient id="accent1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#d45bff"/>
            <stop offset="100%" stop-color="#4fe0ff"/>
          </linearGradient>
        </defs>
        <rect width="520" height="460" rx="32" fill="url(#bg1)"/>
        <circle cx="122" cy="114" r="88" fill="rgba(212,91,255,0.14)"/>
        <circle cx="406" cy="328" r="96" fill="rgba(79,224,255,0.10)"/>
        <rect x="92" y="96" width="336" height="268" rx="34" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)"/>
        <circle cx="176" cy="230" r="56" fill="url(#accent1)"/>
        <path d="M176 194v72M140 230h72" stroke="#141b35" stroke-width="14" stroke-linecap="round"/>
        <path d="M266 260h96" stroke="#eef2ff" stroke-width="16" stroke-linecap="round"/>
        <path d="M336 214l46 46-46 46" fill="none" stroke="#eef2ff" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="112" y="146" fill="#eef2ff" font-size="22" font-family="IBM Plex Sans, Arial">Inflation</text>
      </svg>
    `,
    macroeconomics: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 460">
        <defs>
          <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1a2344"/>
            <stop offset="100%" stop-color="#141b35"/>
          </linearGradient>
          <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#4fe0ff"/>
            <stop offset="100%" stop-color="#7a7dff"/>
          </linearGradient>
        </defs>
        <rect width="520" height="460" rx="32" fill="url(#bg2)"/>
        <circle cx="116" cy="118" r="80" fill="rgba(79,224,255,0.12)"/>
        <rect x="92" y="94" width="336" height="272" rx="34" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)"/>
        <circle cx="176" cy="230" r="52" fill="url(#g2)"/>
        <path d="M176 194v72M140 230h72" stroke="#141b35" stroke-width="14" stroke-linecap="round"/>
        <rect x="260" y="168" width="116" height="116" rx="28" fill="rgba(255,255,255,0.06)"/>
        <path d="M292 250v-38h20v38M320 250v-60h20v60M348 250v-86h20v86" fill="#4fe0ff"/>
        <text x="112" y="144" fill="#eef2ff" font-size="22" font-family="IBM Plex Sans, Arial">Macroeconomics</text>
      </svg>
    `,
    recession: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 460">
        <defs>
          <linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1a2344"/>
            <stop offset="100%" stop-color="#141b35"/>
          </linearGradient>
          <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#4fe0ff"/>
            <stop offset="100%" stop-color="#ff5ea8"/>
          </linearGradient>
        </defs>
        <rect width="520" height="460" rx="32" fill="url(#bg3)"/>
        <circle cx="404" cy="108" r="84" fill="rgba(255,94,168,0.12)"/>
        <rect x="92" y="94" width="336" height="272" rx="34" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)"/>
        <circle cx="178" cy="228" r="52" fill="url(#g3)"/>
        <path d="M146 208h64M210 208l-30 30M210 208l-30-30" stroke="#141b35" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="258" y="174" width="118" height="108" rx="28" fill="rgba(255,255,255,0.06)"/>
        <path d="M290 254h52M290 226h72M290 198h92" stroke="#eef2ff" stroke-width="12" stroke-linecap="round"/>
        <text x="112" y="144" fill="#eef2ff" font-size="22" font-family="IBM Plex Sans, Arial">Recession</text>
      </svg>
    `,
    microeconomics: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 460">
        <defs>
          <linearGradient id="bg4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1a2344"/>
            <stop offset="100%" stop-color="#141b35"/>
          </linearGradient>
          <linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#4fe0ff"/>
            <stop offset="100%" stop-color="#d45bff"/>
          </linearGradient>
        </defs>
        <rect width="520" height="460" rx="32" fill="url(#bg4)"/>
        <circle cx="126" cy="120" r="82" fill="rgba(79,224,255,0.10)"/>
        <rect x="92" y="94" width="336" height="272" rx="34" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)"/>
        <rect x="128" y="168" width="86" height="86" rx="24" fill="url(#g4)"/>
        <path d="M152 198h38M152 220h38" stroke="#141b35" stroke-width="12" stroke-linecap="round"/>
        <rect x="258" y="160" width="124" height="122" rx="30" fill="rgba(255,255,255,0.06)"/>
        <circle cx="300" cy="202" r="16" fill="#4fe0ff"/>
        <circle cx="340" cy="202" r="16" fill="#7a7dff"/>
        <circle cx="320" cy="238" r="16" fill="#d45bff"/>
        <text x="112" y="144" fill="#eef2ff" font-size="22" font-family="IBM Plex Sans, Arial">Microeconomics</text>
      </svg>
    `,
    "macro-micro": `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 460">
        <defs>
          <linearGradient id="bg5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1a2344"/>
            <stop offset="100%" stop-color="#141b35"/>
          </linearGradient>
          <linearGradient id="g5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#4fe0ff"/>
            <stop offset="100%" stop-color="#d45bff"/>
          </linearGradient>
        </defs>
        <rect width="520" height="460" rx="32" fill="url(#bg5)"/>
        <circle cx="116" cy="120" r="78" fill="rgba(212,91,255,0.10)"/>
        <rect x="92" y="94" width="336" height="272" rx="34" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)"/>
        <circle cx="174" cy="230" r="50" fill="url(#g5)"/>
        <path d="M174 198v64M142 230h64" stroke="#141b35" stroke-width="14" stroke-linecap="round"/>
        <rect x="262" y="182" width="118" height="96" rx="28" fill="rgba(255,255,255,0.06)"/>
        <path d="M292 212h58M292 238h82" stroke="#eef2ff" stroke-width="12" stroke-linecap="round"/>
        <text x="112" y="144" fill="#eef2ff" font-size="22" font-family="IBM Plex Sans, Arial">Finance Basics</text>
      </svg>
    `,
  };

  return `data:image/svg+xml;utf8,${encodeURIComponent(artwork[type])}`;
}

function shortenText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength).trimEnd()}...`;
}

initialize();
