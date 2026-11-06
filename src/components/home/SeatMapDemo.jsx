import { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  alpha,
  useTheme,
  Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const ROWS = 6;
const COLS = 10;
const AISLE_COL = 5;

const NEXT_STATUS = {
  free: "reserved",
  reserved: "occupied",
  occupied: "free",
};

function buildSeats() {
  const seats = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (c === AISLE_COL) continue;
      const roll = Math.random();
      const status = roll > 0.72 ? "occupied" : roll > 0.52 ? "reserved" : "free";
      seats.push({ id: `${r}-${c}`, row: r, col: c, status });
    }
  }
  return seats;
}

export default function SeatMapDemo() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [seats, setSeats] = useState(() => buildSeats());

  const occupied = useMemo(
    () => seats.filter((s) => s.status === "occupied").length,
    [seats],
  );
  const reserved = useMemo(
    () => seats.filter((s) => s.status === "reserved").length,
    [seats],
  );
  const total = seats.length;
  const pct = Math.round((occupied / total) * 100);

  const toggle = (id) => {
    setSeats((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: NEXT_STATUS[s.status] || "free" } : s,
      ),
    );
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: 4,
        bgcolor: "#0B1220",
        color: "#fff",
        border: `1px solid ${alpha("#fff", 0.08)}`,
        boxShadow: "0 24px 48px rgba(15, 23, 42, 0.35)",
      }}
    >
      <Stack
        direction="row"
        useFlexGap
        sx={{ mb: 2, justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1 }}
      >
        <Typography sx={{ fontWeight: 800, fontSize: "0.95rem" }}>
          {t("demo.title")}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            px: 1.5,
            py: 0.5,
            borderRadius: 999,
            bgcolor: alpha(theme.palette.secondary.main, 0.2),
            color: theme.palette.secondary.light,
            fontWeight: 700,
          }}
        >
          {pct}% {t("demo.occupied")} · {reserved} {t("demo.reserved")}
        </Typography>
      </Stack>

      <Box
        sx={{
          mb: 2,
          height: 10,
          borderRadius: 999,
          bgcolor: alpha("#fff", 0.08),
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: `${pct}%`,
            bgcolor: theme.palette.secondary.main,
            transition: "width 0.25s ease",
          }}
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
          gap: { xs: 0.5, sm: 0.75 },
          mb: 2,
        }}
      >
        {Array.from({ length: ROWS * COLS }).map((_, i) => {
          const r = Math.floor(i / COLS);
          const c = i % COLS;
          if (c === AISLE_COL) {
            return <Box key={`aisle-${i}`} />;
          }
          const seat = seats.find((s) => s.id === `${r}-${c}`);
          const status = seat?.status || "free";
          const tip =
            status === "occupied"
              ? t("demo.tapFree")
              : status === "reserved"
                ? t("demo.tapOccupy")
                : t("demo.tapReserve");
          const fill =
            status === "occupied"
              ? theme.palette.primary.main
              : status === "reserved"
                ? theme.palette.secondary.main
                : alpha("#fff", 0.12);
          return (
            <Tooltip key={seat.id} title={tip} arrow>
              <Box
                component="button"
                type="button"
                aria-label={seat.id}
                onClick={() => toggle(seat.id)}
                sx={{
                  aspectRatio: "1",
                  border: 0,
                  borderRadius: 1,
                  cursor: "pointer",
                  p: 0,
                  bgcolor: fill,
                  transition: "transform 0.15s ease, background 0.15s ease",
                  "&:hover": { transform: "scale(1.08)" },
                }}
              />
            </Tooltip>
          );
        })}
      </Box>

      <Stack direction="row" spacing={2} useFlexGap sx={{ mb: 1.5, flexWrap: "wrap" }}>
        <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: 0.5,
              bgcolor: alpha("#fff", 0.12),
            }}
          />
          <Typography variant="caption" sx={{ color: alpha("#fff", 0.65) }}>
            {t("demo.legendFree")}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: 0.5,
              bgcolor: theme.palette.primary.main,
            }}
          />
          <Typography variant="caption" sx={{ color: alpha("#fff", 0.65) }}>
            {t("demo.legendOccupied")}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: 0.5,
              bgcolor: theme.palette.secondary.main,
            }}
          />
          <Typography variant="caption" sx={{ color: alpha("#fff", 0.65) }}>
            {t("demo.legendReserved")}
          </Typography>
        </Stack>
      </Stack>

      <Typography
        variant="caption"
        sx={{ color: alpha("#fff", 0.55), display: "block" }}
      >
        {t("demo.hint")}
      </Typography>
    </Box>
  );
}
