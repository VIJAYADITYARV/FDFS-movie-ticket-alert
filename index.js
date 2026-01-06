if (!process.env.BOT_TOKEN || !process.env.CHAT_ID) {
  console.error("❌ Missing environment variables");
  process.exit(1);
}

const { chromium } = require("playwright");
const axios = require("axios");

// ========= CONFIG =========
const MOVIE_URL =
  "https://in.bookmyshow.com/movies/trichy/jana-nayagan/ET00430817";

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = Number(process.env.CHAT_ID);


const CHECK_INTERVAL = 5000; // 5 seconds
// ==========================

async function sendTelegramAlert() {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  await axios.post(url, {
    chat_id: CHAT_ID,
    text: "🎬 TICKETS JUST OPENED!\n🔥 Book immediately:\n" + MOVIE_URL,
  });
}

(async () => {
  const browser = await chromium.launch({
    headless: false, // IMPORTANT: true for deployment
  });

  let previousTicketsOpen = false;

  console.log("🚀 Ticket monitor started...");

  while (true) {
    let page;

    try {
      page = await browser.newPage();
      await page.goto(MOVIE_URL, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(3000);

      const buttons = page.locator("button");
      const count = await buttons.count();

      let detected = false;

      for (let i = 0; i < count; i++) {
        const btn = buttons.nth(i);

        if (await btn.isVisible()) {
          const text = (await btn.innerText()).trim().toLowerCase();
          if (text.includes("book")) {
            detected = true;
            break;
          }
        }
      }

      console.log(
        new Date().toLocaleTimeString(),
        "Tickets open:",
        detected
      );

      // 🚨 ALERT ONLY ON STATE CHANGE
      if (!previousTicketsOpen && detected) {
        console.log("🚨 TICKETS JUST OPENED — SENDING ALERT");
        await sendTelegramAlert();
      }

      previousTicketsOpen = detected;
    } catch (err) {
      console.error("Error:", err.message);
    } finally {
      if (page) await page.close();
    }

    await new Promise((res) => setTimeout(res, CHECK_INTERVAL));
  }
})();
