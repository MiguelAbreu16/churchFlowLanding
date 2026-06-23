import { Box } from "@mui/material";
import { BRAND } from "../../constants/branding";

/** Fixed-size logo slot — scales mark inside without shifting navbar layout */
export default function LogoMark({ size = 52, markSize = 44, showLabel = false }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, flexShrink: 0 }}>
      <Box
        sx={{
          width: size,
          height: size,
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
        <Box
          component="img"
          src={BRAND.icon}
          alt=""
          aria-hidden
          sx={{ width: markSize, height: markSize, objectFit: "contain", display: "block" }}
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
