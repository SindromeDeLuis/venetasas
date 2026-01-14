const PROXY_URL = "/.netlify/functions/binance-p2p";

async function getAverageP2PPrice(asset) {
  const response = await fetch(`${PROXY_URL}?asset=${asset}`);
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
  const [usdt, usdc] = await Promise.all([
    getAverageP2PPrice("USDT"),
    getAverageP2PPrice("USDC")
  ]);

  return { usdt, usdc };
}
