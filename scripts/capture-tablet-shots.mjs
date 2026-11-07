/**
 * Capture landscape tablet screenshots of the demo church.
 * Requires Chrome and the app on http://localhost:5175.
 *
 *   node scripts/capture-tablet-shots.mjs
 *   CAMP_ID=uuid node scripts/capture-tablet-shots.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer-core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "screenshots");
const base = process.env.APP_URL || "http://localhost:5175";
const campId = process.env.CAMP_ID || "";

const shots = [
  ["dashboard", "/dashboard"],
  ["layout-builder", "/layout-builder/1b810f2d-ddc2-4e3c-8638-f9c0b2184401"],
  ["events", "/events"],
  ["events-scanner", "/check-in"],
  ["event-plans", "/event-plans"],
  ["parking", "/parking"],
  ["incidents", "/incidents"],
  ["people", "/members"],
  ["cells", "/crecimiento"],
  ["studies", "/studies/programs"],
  ["finances", "/finances"],
  ["kids", "/kids"],
  ["analytics", "/analytics"],
  ["network", "/network"],
  ["network-metrics", "/network/analytics"],
  ["terminal", "/terminal"],
  ["camps-dashboard", campId ? `/camps/${campId}` : "/camps"],
];

if (campId) {
  shots.push(
    ["camps-map", `/camps/${campId}/transport/map`],
    ["camps-beds", `/camps/${campId}/map`],
    ["camps-attendance", `/camps/${campId}/attendance`],
    ["camps-itinerary", `/camps/${campId}/itinerary`],
    ["camps-campers", `/camps/${campId}/campers`],
  );
}

const only = (process.env.ONLY || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const selected = only.length
  ? shots.filter(([name]) => only.includes(name))
  : shots;

const chrome =
  process.env.CHROME_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: "new",
  defaultViewport: { width: 1180, height: 820, deviceScaleFactor: 1 },
  args: ["--hide-scrollbars", "--lang=es-DO"],
});

const page = await browser.newPage();
async function open(url) {
  const client = await page.createCDPSession();
  await client.send("Page.navigate", { url });
  await client.detach();
}
fs.mkdirSync(outDir, { recursive: true });
await open(`${base}/login`);
await page.waitForSelector("form input", { timeout: 90000 });
await page.evaluate(() => {
  const form = document.querySelector("form");
  const inputs = [...form.querySelectorAll("input")];
  const email = inputs.find((el) => el.type !== "password");
  const password = inputs.find((el) => el.type === "password");
  const set = (el, value) => {
    const proto = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value",
    );
    proto.set.call(el, value);
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  };
  set(email, "demo@example.com");
  set(password, "Demo123!");
  form.requestSubmit();
});
try {
  await page.waitForFunction(() => !location.pathname.includes("/login"), {
    timeout: 60000,
  });
} catch (err) {
  const text = await page.evaluate(() => document.body.innerText.slice(0, 800));
  await page.screenshot({ path: path.join(outDir, "_login-debug.png") });
  throw new Error(`Login stayed on ${page.url()}\n${text}\n${err.message}`);
}
await page.keyboard.press("Escape");
await page.evaluate(() => {
  for (const id of ["event-plans", "crecimiento"]) {
    localStorage.setItem(`churchflow.guidedTour.${id}.done`, "1");
  }
});

for (const [name, route] of selected) {
  const url = `${base}${route}`;
  try {
    await open(url);
    await new Promise((r) => setTimeout(r, 1500));
    await page
      .waitForFunction(
        () => (document.body?.innerText || "").includes("CARGANDO"),
        { timeout: 12000, polling: 300 },
      )
      .catch(() => {});
    await page
      .waitForFunction(
        () => {
          const text = document.body?.innerText || "";
          const spinning = document.querySelectorAll('[role="progressbar"]').length;
          return spinning === 0 && !text.includes("CARGANDO");
        },
        { timeout: 90000, polling: 400 },
      )
      .catch(() => {});
    await page
      .waitForFunction(
        () =>
          [...document.querySelectorAll("button")].some(
            (b) => (b.textContent || "").trim() === "Entendido",
          ),
        { timeout: 8000, polling: 300 },
      )
      .catch(() => {});
    await page.evaluate(() => {
      const clickLabel = (label) => {
        const btn = [...document.querySelectorAll("button")].find(
          (b) => (b.textContent || "").trim() === label,
        );
        btn?.click();
      };
      clickLabel("Saltar");
      clickLabel("Entendido");
    });
    await page
      .waitForFunction(
        () => !(document.body?.innerText || "").includes("Tips rápidos"),
        { timeout: 5000, polling: 200 },
      )
      .catch(() => {});
    await page.evaluate(() => {
      if (location.pathname.includes("layout-builder")) {
        document.querySelector("canvas")?.scrollIntoView({ block: "center" });
      }
    });
    await new Promise((r) => setTimeout(r, 800));
    const file = path.join(outDir, `${name}.png`);
    await page.screenshot({ path: file });
    const still = await page.evaluate(() =>
      (document.body?.innerText || "").includes("CARGANDO"),
    );
    console.log("saved", name, still ? "STILL_LOADING" : "ready");
  } catch (err) {
    console.warn("skip", name, err.message);
  }
}

await browser.close();
console.log("done");
