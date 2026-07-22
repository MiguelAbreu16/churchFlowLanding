import { Box } from "@mui/material";
import { BRAND } from "../../constants/branding";

const VARIANT_SRC = {
  icon: BRAND.icon,
  text: BRAND.text,
  horizontal: BRAND.horizontal,
  vertical: BRAND.vertical,
};

/**
 * Fixed-size logo slot — transparent PNG marks scale inside without a chip.
 * @param {"icon"|"text"|"horizontal"|"vertical"} variant
 */
export default function LogoMark({
  size = 52,
  markSize = 44,
  showLabel = false,
  variant = "icon",
}) {
  const src = VARIANT_SRC[variant] || BRAND.icon;
  const isWide =
    variant === "horizontal" || variant === "text" || variant === "vertical";
  const imgW = isWide
    ? Math.round(markSize * (variant === "text" ? 2.2 : 2.6))
    : markSize;
  const imgH = markSize;
  const slotW = isWide
    ? Math.round(size * (variant === "text" ? 2.4 : 2.8))
    : size;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, flexShrink: 0 }}>
      <Box
        sx={{
          width: slotW,
          height: size,
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
