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

const LEARNING_IMAGES = {
  inflation:
    "https://saylordotorg.github.io/text_international-finance-theory-and-policy/section_10/53662d042195320aa3bf6f21a4dcb5d8.jpg",
  supplyDemand:
    "https://cdn.britannica.com/70/74270-050-317C4423/Illustration-price-relationship-demand.jpg",
  compoundInterest:
    "https://cdn.corporatefinanceinstitute.com/assets/exponential-growth.jpeg",
  riskReturn:
    "https://www.truedata.in/content/uploads/blogimages/What-is-the-risk-return-trade-off-1.jpg",
  diversification:
    "https://www.citizensbank.com/assets/CB_media/images/infographics/What-is-Diversification_Micrographic_v5.jpg",
  interestRates:
    "https://saylordotorg.github.io/text_economics-theory-through-applications/section_09/4e219e3451bc33afd7bac1eb18756df7.jpg",
  budgeting:
    "https://assets.visme.co/templates/banners/thumbnails/i_Personal-Expense-Report-Pie-Chart_full.jpg",
  volatility:
    "https://www.investopedia.com/thmb/f3r5UZlSnKlKZEXnMVIMLcGSZkY%3D/1500x0/filters%3Ano_upscale%28%29%3Amax_bytes%28150000%29%3Astrip_icc%28%29/ZigZag-5c643b96c9e77c0001566e88.png",
  circularFlow:
    "https://www.researchgate.net/publication/258683567/figure/fig1/AS:297605797576714@1447975201300/The-circular-flow-of-income-and-expenditure.png",
  emergencyFund:
    "https://file.aiquickdraw.com/imgcompressed/img/compressed_f656aadff2f47f18ee091679f4706d8d.webp",
  taxes:
    "https://images.squarespace-cdn.com/content/v1/63dd375bd33e922c809471d7/54a4d98f-a800-4503-8e4f-b52001de5e39/benjamin%2Btalks%2Bdecoding%2Ba%2Bpaycheck.png",
  opportunityCost:
    "https://miro.medium.com/0%2Ai-XSaagRZOyKCLHZ.jpg",
  netWorth:
    "https://d138zd1ktt9iqe.cloudfront.net/media/seo_landing_files/net-worth-formula-1623404765.png",
  recession:
    "https://www.researchgate.net/publication/319163284/figure/fig11/AS%3A668324027453452%401536352273731/The-four-phases-of-an-asset-bubble-of-any-kind.ppm",
};

const CONCEPTS = {
  rates_hike: {
    label: "Learning Spotlight",
    title: "Interest Rates",
    summary:
      "Central banks often raise interest rates when inflation is running too hot. Higher rates slow borrowing and spending, which can reduce price pressure across the economy.",
    example:
      "That is why rate-hike headlines often hit growth stocks, mortgages, and consumer demand while helping some banks earn wider lending margins.",
    points: [
      { title: "Inflation link", body: "Policymakers use rates to cool spending when prices rise too quickly." },
      { title: "Market effect", body: "Growth stocks are sensitive because future profits are worth less when rates are higher." },
    ],
    image: LEARNING_IMAGES.interestRates,
  },
  oil_spike: {
    label: "Learning Spotlight",
    title: "Inflation Basics",
    summary:
      "Inflation means average prices are rising, so each dollar buys less than before. Energy shocks are one common reason inflation can speed up across the economy.",
    example:
      "When oil spikes, transport and production costs rise, which can feed into higher prices for households and businesses.",
    points: [
      { title: "Core idea", body: "Prices rising faster than income reduces purchasing power." },
      { title: "Market effect", body: "Energy can rise while cost-sensitive businesses weaken." },
    ],
    image: LEARNING_IMAGES.inflation,
  },
  recession_warning: {
    label: "Learning Spotlight",
    title: "Market Volatility",
    summary:
      "Volatility means prices swing up and down quickly and unpredictably. Recession fears usually increase volatility because investors rapidly reprice risk and future earnings.",
    example:
      "That is why recession warnings often trigger sharp drops in cyclical stocks while safer sectors hold up a bit better.",
    points: [
      { title: "Core idea", body: "Markets move more violently when uncertainty jumps." },
      { title: "Market effect", body: "Cyclical sectors tend to drop faster than defensive sectors." },
    ],
    image: LEARNING_IMAGES.volatility,
  },
  ai_boom: {
    label: "Learning Spotlight",
    title: "Risk vs Return",
    summary:
      "Higher potential return usually comes with higher risk. During fast-moving booms, investors may chase growth because the upside looks huge, but that also raises the chance of sharp reversals.",
    example:
      "AI stocks can rally hard on optimism, but the same names can fall quickly if expectations cool.",
    points: [
      { title: "Core idea", body: "More return usually means accepting more uncertainty." },
      { title: "Market effect", body: "Crowded high-growth trades can reverse quickly." },
    ],
    image: LEARNING_IMAGES.riskReturn,
  },
  supply_chain_ease: {
    label: "Learning Spotlight",
    title: "Supply & Demand",
    summary:
      "Prices often move based on how much of something is available compared with how much people want to buy. When supply chains improve, supply increases and price pressure can ease.",
    example:
      "That is why easier shipping and fewer shortages can help manufacturers and reduce inflation pressure.",
    points: [
      { title: "Core idea", body: "More supply can lower prices when demand stays stable." },
      { title: "Market effect", body: "Businesses tied to physical goods can recover when bottlenecks fade." },
    ],
    image: LEARNING_IMAGES.supplyDemand,
  },
  starter: {
    label: "Learning Spotlight",
    title: "Diversification",
    summary:
      "Diversification means spreading money across different assets or sectors so one bad event does not hurt your whole portfolio as much.",
    example:
      "If tech falls after a rate hike, healthcare or energy holdings may reduce the damage.",
    points: [
      { title: "Core idea", body: "Do not rely on one sector or one stock." },
      { title: "Market effect", body: "A mixed portfolio is often less volatile than a concentrated one." },
    ],
    image: LEARNING_IMAGES.diversification,
  },
  recession: {
    label: "Learning Spotlight",
    title: "Recession Basics",
    summary:
      "Recessions usually come with falling output, weaker hiring, and lower business investment. Economists track these trends to understand where the economy is in the business cycle.",
    example:
      "When unemployment rises and consumer spending slows, cyclical sectors tend to weaken before defensive sectors do.",
    points: [
      { title: "Core idea", body: "Recessions reflect broad weakness in production and demand." },
      { title: "Market effect", body: "Investors often shift toward safer assets and defensive industries." },
    ],
    image: LEARNING_IMAGES.recession,
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
          <marker id="arrow1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#1f2937"/>
          </marker>
        </defs>
        <rect width="520" height="460" rx="26" fill="#fbfdff"/>
        <text x="260" y="62" text-anchor="middle" fill="#178b94" font-size="34" font-weight="700" font-family="IBM Plex Sans, Arial">Inflation</text>
        <text x="260" y="92" text-anchor="middle" fill="#64748b" font-size="18" font-family="IBM Plex Sans, Arial">General price levels rising over time</text>
        <line x1="96" y1="344" x2="426" y2="344" stroke="#111827" stroke-width="5" marker-end="url(#arrow1)"/>
        <line x1="112" y1="360" x2="112" y2="132" stroke="#111827" stroke-width="5" marker-end="url(#arrow1)"/>
        <text x="430" y="368" fill="#111827" font-size="16" font-weight="700" font-family="IBM Plex Sans, Arial">TIME</text>
        <text x="54" y="142" fill="#111827" font-size="16" font-weight="700" font-family="IBM Plex Sans, Arial">PRICES</text>
        <path d="M134 316 C 186 300, 214 278, 248 252 S 326 188, 404 146" fill="none" stroke="#ef4444" stroke-width="8" stroke-linecap="round"/>
        <circle cx="164" cy="292" r="18" fill="#fde68a" stroke="#f59e0b" stroke-width="3"/>
        <text x="164" y="298" text-anchor="middle" fill="#92400e" font-size="16" font-weight="700" font-family="IBM Plex Sans, Arial">$</text>
        <circle cx="250" cy="246" r="18" fill="#bfdbfe" stroke="#3b82f6" stroke-width="3"/>
        <text x="250" y="252" text-anchor="middle" fill="#1d4ed8" font-size="16" font-weight="700" font-family="IBM Plex Sans, Arial">$</text>
        <circle cx="344" cy="184" r="18" fill="#fbcfe8" stroke="#ec4899" stroke-width="3"/>
        <text x="344" y="190" text-anchor="middle" fill="#be185d" font-size="16" font-weight="700" font-family="IBM Plex Sans, Arial">$</text>
        <rect x="286" y="250" width="140" height="58" rx="14" fill="#eef6ff" stroke="#bfdbfe"/>
        <text x="356" y="274" text-anchor="middle" fill="#1f2937" font-size="17" font-weight="700" font-family="IBM Plex Sans, Arial">Purchasing Power</text>
        <text x="356" y="296" text-anchor="middle" fill="#64748b" font-size="15" font-family="IBM Plex Sans, Arial">falls when prices rise</text>
      </svg>
    `,
    macroeconomics: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 460">
        <defs>
          <marker id="arrow2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#ffffff"/>
          </marker>
        </defs>
        <rect width="520" height="460" rx="26" fill="#10324a"/>
        <rect x="0" y="0" width="520" height="64" fill="#2f78a0"/>
        <text x="260" y="43" text-anchor="middle" fill="#ffffff" font-size="30" font-weight="700" font-family="IBM Plex Sans, Arial">Circular Flow of Income</text>
        <circle cx="260" cy="112" r="50" fill="#63d1cf"/>
        <text x="260" y="106" text-anchor="middle" fill="#ffffff" font-size="17" font-family="IBM Plex Sans, Arial">Factor</text>
        <text x="260" y="128" text-anchor="middle" fill="#ffffff" font-size="17" font-family="IBM Plex Sans, Arial">Markets</text>
        <circle cx="260" cy="342" r="54" fill="#63d1cf"/>
        <text x="260" y="336" text-anchor="middle" fill="#ffffff" font-size="17" font-family="IBM Plex Sans, Arial">Product</text>
        <text x="260" y="358" text-anchor="middle" fill="#ffffff" font-size="17" font-family="IBM Plex Sans, Arial">Markets</text>
        <rect x="60" y="186" width="110" height="62" fill="#63d1cf"/>
        <rect x="350" y="186" width="110" height="62" fill="#63d1cf"/>
        <text x="115" y="224" text-anchor="middle" fill="#ffffff" font-size="18" font-family="IBM Plex Sans, Arial">Firms</text>
        <text x="405" y="224" text-anchor="middle" fill="#ffffff" font-size="18" font-family="IBM Plex Sans, Arial">Households</text>
        <rect x="190" y="170" width="140" height="22" fill="#e5e7eb"/>
        <rect x="176" y="250" width="168" height="26" fill="#e5e7eb"/>
        <text x="260" y="186" text-anchor="middle" fill="#334155" font-size="14" font-family="IBM Plex Sans, Arial">Government</text>
        <text x="260" y="268" text-anchor="middle" fill="#334155" font-size="14" font-family="IBM Plex Sans, Arial">Financial Institutions</text>
        <path d="M116 176 C 122 132, 176 118, 210 118" fill="none" stroke="#ffffff" stroke-width="5" marker-end="url(#arrow2)"/>
        <path d="M310 118 C 364 118, 408 140, 412 180" fill="none" stroke="#ffffff" stroke-width="5" marker-end="url(#arrow2)"/>
        <path d="M404 252 C 396 292, 344 330, 308 334" fill="none" stroke="#ffffff" stroke-width="5" marker-end="url(#arrow2)"/>
        <path d="M212 334 C 164 332, 120 302, 112 252" fill="none" stroke="#ffffff" stroke-width="5" marker-end="url(#arrow2)"/>
        <text x="136" y="146" fill="#dbeafe" font-size="14" font-family="IBM Plex Sans, Arial">Factor Payments</text>
        <text x="388" y="156" fill="#dbeafe" font-size="14" font-family="IBM Plex Sans, Arial">Income</text>
        <text x="360" y="316" fill="#dbeafe" font-size="14" font-family="IBM Plex Sans, Arial">Consumption</text>
        <text x="110" y="306" fill="#dbeafe" font-size="14" font-family="IBM Plex Sans, Arial">Sale Receipts</text>
      </svg>
    `,
    recession: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 460">
        <defs>
          <marker id="arrow3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#1f2937"/>
          </marker>
        </defs>
        <rect width="520" height="460" rx="26" fill="#fbfdff"/>
        <text x="260" y="60" text-anchor="middle" fill="#178b94" font-size="34" font-weight="700" font-family="IBM Plex Sans, Arial">Recession</text>
        <text x="260" y="90" text-anchor="middle" fill="#64748b" font-size="18" font-family="IBM Plex Sans, Arial">Falling output, weaker spending, higher caution</text>
        <line x1="94" y1="344" x2="424" y2="344" stroke="#111827" stroke-width="5" marker-end="url(#arrow3)"/>
        <line x1="110" y1="360" x2="110" y2="134" stroke="#111827" stroke-width="5" marker-end="url(#arrow3)"/>
        <text x="430" y="368" fill="#111827" font-size="16" font-weight="700" font-family="IBM Plex Sans, Arial">TIME</text>
        <text x="56" y="148" fill="#111827" font-size="16" font-weight="700" font-family="IBM Plex Sans, Arial">OUTPUT</text>
        <path d="M132 156 C 198 180, 244 214, 310 254 S 374 288, 404 306" fill="none" stroke="#ef4444" stroke-width="8" stroke-linecap="round"/>
        <circle cx="224" cy="202" r="9" fill="#ef4444"/>
        <circle cx="302" cy="250" r="9" fill="#ef4444"/>
        <rect x="274" y="130" width="134" height="60" rx="14" fill="#fff1f2" stroke="#fecdd3"/>
        <text x="341" y="155" text-anchor="middle" fill="#991b1b" font-size="16" font-weight="700" font-family="IBM Plex Sans, Arial">Growth slows</text>
        <text x="341" y="176" text-anchor="middle" fill="#7f1d1d" font-size="14" font-family="IBM Plex Sans, Arial">spending and jobs weaken</text>
      </svg>
    `,
    microeconomics: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 460">
        <defs>
          <marker id="arrow4" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#111827"/>
          </marker>
        </defs>
        <rect width="520" height="460" rx="26" fill="#fbfdff"/>
        <text x="260" y="62" text-anchor="middle" fill="#178b94" font-size="34" font-weight="700" font-family="IBM Plex Sans, Arial">Demand and Supply</text>
        <line x1="110" y1="344" x2="418" y2="344" stroke="#111827" stroke-width="5" marker-end="url(#arrow4)"/>
        <line x1="126" y1="360" x2="126" y2="126" stroke="#111827" stroke-width="5" marker-end="url(#arrow4)"/>
        <text x="430" y="362" fill="#111827" font-size="16" font-weight="700" font-family="IBM Plex Sans, Arial">QUANTITY</text>
        <text x="74" y="118" fill="#111827" font-size="16" font-weight="700" font-family="IBM Plex Sans, Arial">PRICE</text>
        <path d="M172 300 L 386 146" stroke="#60a5fa" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path d="M172 156 L 390 302" stroke="#60a5fa" stroke-width="6" fill="none" stroke-linecap="round"/>
        <line x1="276" y1="226" x2="276" y2="344" stroke="#ef4444" stroke-width="4" stroke-dasharray="8 7"/>
        <line x1="126" y1="226" x2="276" y2="226" stroke="#ef4444" stroke-width="4" stroke-dasharray="8 7"/>
        <circle cx="276" cy="226" r="8" fill="#ef4444"/>
        <text x="352" y="154" fill="#2563eb" font-size="18" font-weight="700" font-family="IBM Plex Sans, Arial">Supply Curve</text>
        <text x="350" y="314" fill="#2563eb" font-size="18" font-weight="700" font-family="IBM Plex Sans, Arial">Demand Curve</text>
        <text x="284" y="378" fill="#ef4444" font-size="16" font-weight="700" font-family="IBM Plex Sans, Arial">Equilibrium Quantity</text>
      </svg>
    `,
    "macro-micro": `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 460">
        <defs>
          <linearGradient id="box5a" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#dbeafe"/>
            <stop offset="100%" stop-color="#bfdbfe"/>
          </linearGradient>
          <linearGradient id="box5b" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ede9fe"/>
            <stop offset="100%" stop-color="#ddd6fe"/>
          </linearGradient>
        </defs>
        <rect width="520" height="460" rx="26" fill="#fbfdff"/>
        <text x="260" y="62" text-anchor="middle" fill="#178b94" font-size="32" font-weight="700" font-family="IBM Plex Sans, Arial">Macro vs Micro Economics</text>
        <rect x="72" y="110" width="160" height="198" rx="24" fill="url(#box5a)" stroke="#93c5fd"/>
        <rect x="288" y="110" width="160" height="198" rx="24" fill="url(#box5b)" stroke="#c4b5fd"/>
        <text x="152" y="156" text-anchor="middle" fill="#1e3a8a" font-size="28" font-weight="700" font-family="IBM Plex Sans, Arial">Macro</text>
        <text x="152" y="194" text-anchor="middle" fill="#334155" font-size="18" font-family="IBM Plex Sans, Arial">GDP</text>
        <text x="152" y="220" text-anchor="middle" fill="#334155" font-size="18" font-family="IBM Plex Sans, Arial">Inflation</text>
        <text x="152" y="246" text-anchor="middle" fill="#334155" font-size="18" font-family="IBM Plex Sans, Arial">Interest Rates</text>
        <text x="152" y="272" text-anchor="middle" fill="#334155" font-size="18" font-family="IBM Plex Sans, Arial">Unemployment</text>
        <text x="368" y="156" text-anchor="middle" fill="#5b21b6" font-size="28" font-weight="700" font-family="IBM Plex Sans, Arial">Micro</text>
        <text x="368" y="194" text-anchor="middle" fill="#334155" font-size="18" font-family="IBM Plex Sans, Arial">Pricing</text>
        <text x="368" y="220" text-anchor="middle" fill="#334155" font-size="18" font-family="IBM Plex Sans, Arial">Firms</text>
        <text x="368" y="246" text-anchor="middle" fill="#334155" font-size="18" font-family="IBM Plex Sans, Arial">Consumers</text>
        <text x="368" y="272" text-anchor="middle" fill="#334155" font-size="18" font-family="IBM Plex Sans, Arial">Supply &amp; Demand</text>
        <text x="260" y="374" text-anchor="middle" fill="#64748b" font-size="20" font-family="IBM Plex Sans, Arial">Markets combine both perspectives</text>
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
