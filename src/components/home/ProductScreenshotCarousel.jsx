import { useCallback, useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const MotionBox = motion.create(Box);

export default function ProductScreenshotCarousel({
  slides,
  autoPlayMs = 6000,
  showCaption = true,
  aspectRatio = "16/10",
  onSlideClick,
  startIndex = 0,
}) {
  const theme = useTheme();
  const { t } = useTranslation();
  const [index, setIndex] = useState(startIndex);

  useEffect(() => {
    setIndex(startIndex);
  }, [startIndex]);

  const goTo = useCallback(
    (next) => {
      const len = slides.length;
      setIndex(((next % len) + len) % len);
    },
    [slides.length],
  );

  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    if (!autoPlayMs || slides.length <= 1) return undefined;
    const id = setInterval(() => goTo(index + 1), autoPlayMs);
    return () => clearInterval(id);
  }, [autoPlayMs, goTo, index, slides.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const slide = slides[index];

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Box
        sx={{
          position: "relative",
          borderRadius: 3,
          overflow: "hidden",
          border: `1px solid ${theme.palette.divider}`,
          bgcolor: "#0f172a",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
          aspectRatio,
        }}
        onClick={onSlideClick ? () => onSlideClick(index) : undefined}
        role={onSlideClick ? "button" : undefined}
        tabIndex={onSlideClick ? 0 : undefined}
      >
        <AnimatePresence mode="wait">
          <MotionBox
            key={slide.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35 }}
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              src={slide.src}
              alt={t(slide.altKey)}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </MotionBox>
        </AnimatePresence>

        {slides.length > 1 && (
          <>
            <IconButton
              aria-label={t("carousel.prev")}
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              sx={{
                position: "absolute",
                left: 8,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: alpha("#fff", 0.9),
                "&:hover": { bgcolor: "#fff" },
              }}
              size="small"
            >
              <ChevronLeft />
            </IconButton>
            <IconButton
              aria-label={t("carousel.next")}
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              sx={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: alpha("#fff", 0.9),
                "&:hover": { bgcolor: "#fff" },
              }}
              size="small"
            >
              <ChevronRight />
            </IconButton>
          </>
        )}
      </Box>

      {showCaption && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 2, textAlign: "center", minHeight: 40 }}
        >
          {t(slide.captionKey)}
        </Typography>
      )}

      {slides.length > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 2 }}>
          {slides.map((s, i) => (
            <Box
              key={s.id}
              component="button"
              type="button"
              aria-label={`${t("carousel.slide")} ${i + 1}`}
              onClick={() => goTo(i)}
              sx={{
                width: i === index ? 24 : 8,
                height: 8,
                borderRadius: 4,
                border: "none",
                p: 0,
                cursor: "pointer",
                bgcolor: i === index ? "primary.main" : alpha(theme.palette.primary.main, 0.2),
                transition: "all 0.25s ease",
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
