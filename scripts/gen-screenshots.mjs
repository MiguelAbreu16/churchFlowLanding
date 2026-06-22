import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "screenshots");

const items = {
  dashboard: "Dashboard en vivo",
  "layout-builder": "Layout Builder",
  terminal: "Terminal / Ujieres",
  parking: "Estacionamiento",
  events: "Eventos",
  analytics: "Analítica",
};

function svg(label) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="900" viewBox="0 0 1440 900">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e3a5f"/>
    </linearGradient>
  </defs>
  <rect width="1440" height="900" fill="url(#g)"/>
  <rect x="0" y="0" width="220" height="900" fill="#020617" opacity="0.85"/>
  <rect x="240" y="40" width="1160" height="56" rx="12" fill="#1e293b"/>
  <rect x="240" y="120" width="760" height="520" rx="16" fill="#1e293b" opacity="0.9"/>
  <rect x="1020" y="120" width="380" height="250" rx="16" fill="#1e293b" opacity="0.7"/>
  <rect x="1020" y="390" width="380" height="250" rx="16" fill="#1e293b" opacity="0.7"/>
  <text x="720" y="470" text-anchor="middle" fill="#94a3b8" font-family="Inter,Arial,sans-serif" font-size="36" font-weight="700">${label}</text>
  <text x="720" y="520" text-anchor="middle" fill="#64748b" font-family="Inter,Arial,sans-serif" font-size="18">Placeholder — reemplazar con captura real</text>
</svg>`;
}

fs.mkdirSync(outDir, { recursive: true });
for (const [file, label] of Object.entries(items)) {
  fs.writeFileSync(path.join(outDir, `${file}.svg`), svg(label));
}
console.log("Screenshot placeholders created.");
