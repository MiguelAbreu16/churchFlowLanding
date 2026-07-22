import { Box } from "@mui/material";
import { BRAND } from "../../constants/branding";

const VARIANT_SRC = {
  icon: BRAND.icon,
  text: BRAND.text,
  horizontal: BRAND.horizontal,
  vertical: BRAND.vertical,
};

/**
 * Transparent PNG brand mark. `horizontal`/`vertical` are the stacked lockup (square).
 * `text` is the wide wordmark.
 */
export default function LogoMark({
  size = 52,
  markSize = 44,
  showLabel = false,
  variant = "icon",
}) {
  const src = VARIANT_SRC[variant] || BRAND.icon;
  const isWordmark = variant === "text";
  const isLockup = variant === "horizontal" || variant === "vertical";
  const imgW = isWordmark ? Math.round(markSize * 4.5) : markSize;
  const imgH = isWordmark ? Math.round(markSize * 0.65) : markSize;
  const slotW = isWordmark ? Math.round(size * 4.2) : size;
  const slotH = isLockup ? size : isWordmark ? Math.round(size * 0.7) : size;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, flexShrink: 0 }}>
      <Box
        sx={{
          width: slotW,
          height: slotH,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Box
          component="img"
          src={src}
          alt=""
          aria-hidden
          sx={{
            width: imgW,
            height: imgH,
            objectFit: "contain",
            display: "block",
          }}
        />
      </Box>
      {showLabel && (
        <Box
          component="span"
          sx={{
            fontWeight: 900,
            letterSpacing: -0.5,
            fontSize: size > 48 ? "1.2rem" : "1.05rem",
            color: "#0F172A",
            lineHeight: 1.1,
            display: { xs: "none", md: "block" },
          }}
        >
          Kahal Zerem
        </Box>
      )}
    </Box>
  );
}
