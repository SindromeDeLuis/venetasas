const PROXY_URL = "/.netlify/functions/binance-p2p";

async function getAverageP2PPrice(asset, tradeType = "SELL") {
  const response = await fetch(`${PROXY_URL}?asset=${asset}&tradeType=${tradeType}`);
  if (!response.ok) {
    throw new Error("Error proxy Binance");
  }

  const data = await response.json();

  const prices = data.data.map(item =>
    Number(item.adv.price)
  );

  return prices.reduce((a, b) => a + b, 0) / prices.length;
}

export async function getBinanceRates() {
  const [
    usdtBuy,
    usdtSell,
    usdcBuy,
    usdcSell
  ] = await Promise.all([
    getAverageP2PPrice("USDT", "BUY"),
    getAverageP2PPrice("USDT", "SELL"),
    getAverageP2PPrice("USDC", "BUY"),
    getAverageP2PPrice("USDC", "SELL")
  ]);

  return {
    usdt: {
      buy: usdtBuy,
      sell: usdtSell
    },
    usdc: {
      buy: usdcBuy,
      sell: usdcSell
    },
    updatedAt: new Date().toISOString()
  };
}
