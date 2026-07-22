import { Box } from "@mui/material";
import { BRAND } from "../../constants/branding";

const VARIANT_SRC = {
  icon: BRAND.icon,
  text: BRAND.text,
  horizontal: BRAND.horizontal,
  vertical: BRAND.vertical,
};

/**
 * Fixed-size logo slot — scales mark inside a dark chip (PNG assets have black backgrounds).
 * @param {"icon"|"text"|"horizontal"|"vertical"} variant
 * @param {boolean} darkChip — wrap in dark rounded chip (default true for light UI)
 */
export default function LogoMark({
  size = 52,
  markSize = 44,
  showLabel = false,
  variant = "icon",
  darkChip = true,
}) {
  const src = VARIANT_SRC[variant] || BRAND.icon;
  const isWide = variant === "horizontal" || variant === "text" || variant === "vertical";
  const chipW = isWide ? Math.round(size * (variant === "text" ? 2.4 : 2.8)) : size;
  const chipH = size;
  const imgW = isWide ? Math.round(markSize * (variant === "text" ? 2.2 : 2.6)) : markSize;
  const imgH = markSize;

  const mark = (
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
  );

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, flexShrink: 0 }}>
      {darkChip ? (
        <Box
          sx={{
            width: chipW,
            height: chipH,
            borderRadius: 2,
            bgcolor: "#0b0f1a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            flexShrink: 0,
            boxShadow: "0 2px 8px rgba(15,23,42,0.12)",
          }}
        >
          {mark}
        </Box>
      ) : (
        mark
      )}
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
