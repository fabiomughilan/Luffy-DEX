const express = require("express");
const Moralis = require("moralis").default;
const axios = require("axios");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = 3001;

app.use(cors());
app.use(express.json());

// Token price endpoint (existing)
app.get("/tokenPrice", async (req, res) => {
  const { query } = req;
  try {
    const responseOne = await Moralis.EvmApi.token.getTokenPrice({
      address: query.addressOne,
    });
    const responseTwo = await Moralis.EvmApi.token.getTokenPrice({
      address: query.addressTwo,
    });

    const usdPrices = {
      tokenOne: responseOne.raw.usdPrice,
      tokenTwo: responseTwo.raw.usdPrice,
      ratio: responseOne.raw.usdPrice / responseTwo.raw.usdPrice,
    };
    return res.status(200).json(usdPrices);
  } catch (err) {
    console.error("Token price error:", err.message);
    return res.status(500).json({ error: "Failed to fetch token prices" });
  }
});

// Proxy for 1inch allowance
app.get("/allowance", async (req, res) => {
  try {
    const { tokenAddress, walletAddress } = req.query;

    const response = await axios.get("https://api.1inch.dev/swap/v6.1/1/approve/allowance", {
      headers: {
        Authorization: `Bearer ${process.env.INCH_API_KEY}`,
      },
      params: {
        tokenAddress,
        walletAddress,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Allowance error:", error.response?.data || error.message);
    res.status(500).json({ error: "1inch allowance error", details: error.message });
  }
});

app.get("/approve-tx", async (req, res) => {
  try {
    const { tokenAddress } = req.query;

    const response = await axios.get("https://api.1inch.dev/swap/v6.1/1/approve/transaction", {
      headers: {
        Authorization: `Bearer ${process.env.INCH_API_KEY}`,
      },
      params: {
        tokenAddress,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Approve TX error:", error.response?.data || error.message);
    res.status(500).json({ error: "1inch approve-tx error", details: error.message });
  }
});

Moralis.start({
  apiKey: process.env.MORALIS_KEY,
}).then(() => {
  app.listen(port, () => {
    console.log(`Listening for API Calls on port ${port}`);
  });
});