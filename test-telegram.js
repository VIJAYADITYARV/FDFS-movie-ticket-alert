const axios = require("axios");

const BOT_TOKEN = "8518446971:AAH_3zvOuuHLZJjkHqV2oRIzTa6CAjhQ8As";
const CHAT_ID = 6446296940; // number, after /start

(async () => {
  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    await axios.post(url, {
      chat_id: CHAT_ID,
      text: "🚀 Telegram alert test successful!",
    });

    console.log("Message sent successfully");
  } catch (err) {
    console.error(
      "Telegram error:",
      err.response?.data || err.message
    );
  }
})();
