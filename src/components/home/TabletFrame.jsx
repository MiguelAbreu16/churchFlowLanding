import { Box } from "@mui/material";

/** Landscape tablet screen, matching captured app shots. */
export const TABLET_SCREEN_ASPECT = "1180 / 820";

export default function TabletFrame({ src, alt }) {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#111827",
        borderRadius: "28px",
        px: "14px",
        pt: "22px",
        pb: "16px",
        boxShadow:
          "0 28px 50px -24px rgba(15,23,42,0.55), inset 0 0 0 1px rgba(255,255,255,0.06)",
        position: "relative",
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          top: 8,
          left: "50%",
          transform: "translateX(-50%)",
          width: 8,
          height: 8,
          borderRadius: "50%",
          bgcolor: "#374151",
          boxShadow: "inset 0 0 0 1px #111827",
        }}
      />
      <Box
        sx={{
          borderRadius: "14px",
          overflow: "hidden",
          aspectRatio: TABLET_SCREEN_ASPECT,
          bgcolor: "#0b1220",
        }}
      >
        <Box
          component="img"
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </Box>
    </Box>
  );
}
