# 🎬 Movie Ticket Instant Alert

## Why This Exists

I built this because I personally faced this problem.

While trying to book tickets for a Tamil movie, the tickets opened suddenly and got sold out very fast.  
BookMyShow notifications were delayed, and manually refreshing the page was frustrating.

So, just for fun and out of necessity, I built this small tool in about an hour to solve **my own problem**.

Later, I realized it can be useful for **anyone** facing the same issue — especially for FDFS bookings.

---

## What This Does

This is a **background monitoring script** that:

- Watches a BookMyShow movie page continuously
- Detects when the **“Book Tickets”** button appears
- Sends an **instant Telegram notification**
- Sends the alert **only once** (no repeated spam)
- Keeps running in the background

The idea is simple:
> *You don’t monitor the page — the script does.*

---

## Who Can Use This?

Anyone can use this.

- You can run it **locally**
- You can deploy it to the cloud (Railway, VPS, etc.)
- You can connect it to:
  - Your personal Telegram chat
  - A Telegram **group**
  - A fan/community alert group

This makes it useful for:
- Individual users
- Friend groups
- Movie fan communities
- FDFS tracking

---

## How It Works (Simple Explanation)

1. Opens the movie page using a **real browser (headless Chromium)**
2. Reads the page DOM
3. Looks for booking-related buttons (like “Book Tickets”)
4. If tickets are not open → keeps checking
5. The moment tickets open → sends Telegram alert
6. Continues running silently after that

---

## Tech Stack

- **Node.js**
- **Playwright** (headless browser automation)
- **Chromium**
- **Telegram Bot API**

---

## Future Scope

This project was built quickly for personal use, but it can be extended easily in the future:

- Deploy as a **24/7 background service** on Railway or a VPS  
- Track **multiple movies or theatres** simultaneously  
- Add **user subscriptions** for personalized alerts  
- Create a **Telegram command-based bot** (e.g. `/track`, `/stop`)  
- Build a **Chrome extension frontend** for easier usage  
- Add **WhatsApp or email notifications**  

---

## Important Notes

- This project **does not auto-book tickets**
- It only **detects ticket availability**
- Actual booking must be done **manually**
- This approach avoids **violating platform policies**
- **Not affiliated with BookMyShow** in any way

