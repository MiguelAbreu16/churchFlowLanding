import { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  alpha,
  useTheme,
  Popover,
  Button,
  Divider,
} from "@mui/material";
import DirectionsCar from "@mui/icons-material/DirectionsCar";
import LocalParking from "@mui/icons-material/LocalParking";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const ROWS = 4;
const COLS = 8;
const DRIVER_POOL = [
  "Ana Pérez",
  "Luis Gómez",
  "María Sol",
  "Carlos Díaz",
  "Sofía Ruiz",
  "Pedro Núñez",
  "Elena Cruz",
  "Diego Mora",
  "Valeria Santos",
  "Jorge Peña",
];
const PLATE_LETTERS = "ABCDEFGHJKLMNPRSTUVWXYZ";

function randomPlate() {
  const letters = Array.from(
    { length: 3 },
    () => PLATE_LETTERS[Math.floor(Math.random() * PLATE_LETTERS.length)],
  ).join("");
  const nums = String(Math.floor(100 + Math.random() * 900));
  return `${letters}-${nums}`;
}

function randomDriver(used) {
  const pool = DRIVER_POOL.filter((n) => !used.has(n));
  const name =
    pool[Math.floor(Math.random() * pool.length)] ||
    DRIVER_POOL[Math.floor(Math.random() * DRIVER_POOL.length)];
  used.add(name);
  return name;
}

function buildSpots() {
  const used = new Set();
  const spots = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (c === 3 || c === 4) continue;
      const occupied = Math.random() > 0.48;
      spots.push({
        id: `${r}-${c}`,
        label: `${String.fromCharCode(65 + r)}${c < 3 ? c + 1 : c - 1}`,
        status: occupied ? "occupied" : "free",
        driver: occupied ? randomDriver(used) : null,
        plate: occupied ? randomPlate() : null,
      });
    }
  }
  return spots;
}

export default function ParkingMapDemo() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [spots, setSpots] = useState(() => buildSpots());
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const occupied = useMemo(
    () => spots.filter((s) => s.status === "occupied").length,
    [spots],
  );
  const total = spots.length;
  const pct = Math.round((occupied / total) * 100);
  const selected = spots.find((s) => s.id === selectedId) || null;

  const openSpot = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const closePopover = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  const toggleSelected = () => {
    if (!selectedId) return;
    setSpots((prev) =>
      prev.map((s) => {
        if (s.id !== selectedId) return s;
        if (s.status === "occupied") {
          return { ...s, status: "free", driver: null, plate: null };
        }
        return {
          ...s,
          status: "occupied",
          driver: randomDriver(new Set()),
          plate: randomPlate(),
        };
      }),
    );
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
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
        sx={{ mb: 2, justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography sx={{ fontWeight: 800, fontSize: "0.95rem" }}>
          {t("liveDemos.parking.title")}
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
          {pct}% {t("liveDemos.parking.occupied")}
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
          gap: { xs: 0.6, sm: 0.85 },
          mb: 2,
        }}
      >
        {Array.from({ length: ROWS * COLS }).map((_, i) => {
          const r = Math.floor(i / COLS);
          const c = i % COLS;
          if (c === 3 || c === 4) {
            return (
              <Box
                key={`lane-${i}`}
                sx={{
                  borderRadius: 0.5,
                  bgcolor: alpha("#fff", 0.03),
                  minHeight: 44,
                  backgroundImage: `repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 8px,
                    ${alpha("#fff", 0.08)} 8px,
                    ${alpha("#fff", 0.08)} 10px
                  )`,
                }}
              />
            );
          }
          const spot = spots.find((s) => s.id === `${r}-${c}`);
          const occupiedSpot = spot?.status === "occupied";
          return (
            <Box
              key={spot.id}
              component="button"
              type="button"
              aria-label={spot.label}
              onClick={(e) => openSpot(e, spot.id)}
              sx={{
                aspectRatio: "1.15 / 1",
                border: `1px dashed ${alpha("#fff", occupiedSpot ? 0.15 : 0.3)}`,
                borderRadius: 1.25,
                cursor: "pointer",
                p: 0.5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.15,
                bgcolor: occupiedSpot
                  ? alpha(theme.palette.warning.main, 0.18)
                  : alpha("#fff", 0.05),
                color: occupiedSpot
                  ? theme.palette.warning.light
                  : alpha("#fff", 0.55),
                transition: "transform 0.15s ease, background 0.15s ease",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              {occupiedSpot ? (
                <DirectionsCar sx={{ fontSize: { xs: 18, sm: 22 } }} />
              ) : (
                <LocalParking sx={{ fontSize: { xs: 16, sm: 18 }, opacity: 0.7 }} />
              )}
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: "0.65rem",
                  lineHeight: 1,
                  letterSpacing: 0.3,
                }}
              >
                {spot.label}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Stack direction="row" spacing={2} sx={{ mb: 1.5 }}>
        <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
          <LocalParking sx={{ fontSize: 14, color: alpha("#fff", 0.55) }} />
          <Typography variant="caption" sx={{ color: alpha("#fff", 0.65) }}>
            {t("liveDemos.parking.legendFree")}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
          <DirectionsCar
            sx={{ fontSize: 14, color: theme.palette.warning.light }}
          />
          <Typography variant="caption" sx={{ color: alpha("#fff", 0.65) }}>
            {t("liveDemos.parking.legendOccupied")}
          </Typography>
        </Stack>
      </Stack>

      <Typography
        variant="caption"
        sx={{ color: alpha("#fff", 0.55), display: "block" }}
      >
        {t("liveDemos.parking.hint")}
      </Typography>

      <Popover
        open={Boolean(anchorEl) && Boolean(selected)}
        anchorEl={anchorEl}
        onClose={closePopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              p: 2,
              minWidth: 240,
              bgcolor: "#0B1220 !important",
              backgroundImage: "none !important",
              color: "#F8FAFC",
              border: `1px solid ${alpha("#fff", 0.14)}`,
              borderRadius: 2,
              boxShadow: "0 16px 40px rgba(0,0,0,0.55)",
            },
          },
        }}
      >
        {selected ? (
          <Stack spacing={1.25} sx={{ color: "#F8FAFC" }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              {selected.status === "occupied" ? (
                <DirectionsCar sx={{ color: theme.palette.warning.light }} />
              ) : (
                <LocalParking sx={{ color: alpha("#fff", 0.7) }} />
              )}
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontWeight: 800, color: "#F8FAFC" }}>
                  {t("liveDemos.parking.spot", { label: selected.label })}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: alpha("#F8FAFC", 0.65), display: "block" }}
                >
                  {selected.status === "occupied"
                    ? t("liveDemos.parking.statusOccupied")
                    : t("liveDemos.parking.statusFree")}
                </Typography>
              </Box>
            </Stack>
            <Divider sx={{ borderColor: alpha("#fff", 0.12) }} />
            {selected.status === "occupied" ? (
              <Stack spacing={0.75}>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: alpha("#F8FAFC", 0.55), display: "block" }}
                  >
                    {t("liveDemos.parking.driver")}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, color: "#F8FAFC" }}
                  >
                    {selected.driver}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: alpha("#F8FAFC", 0.55), display: "block" }}
                  >
                    {t("liveDemos.parking.plate")}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 700,
                      color: "#F8FAFC",
                      letterSpacing: 0.6,
                      fontFamily: "ui-monospace, monospace",
                    }}
                  >
                    {selected.plate}
                  </Typography>
                </Box>
              </Stack>
            ) : (
              <Typography variant="body2" sx={{ color: alpha("#F8FAFC", 0.75) }}>
                {t("liveDemos.parking.emptyDetail")}
              </Typography>
            )}
            <Button
              size="small"
              variant="contained"
              onClick={toggleSelected}
              sx={{
                mt: 0.5,
                fontWeight: 700,
                bgcolor: theme.palette.primary.main,
                color: "#fff",
                "&:hover": { bgcolor: theme.palette.primary.dark },
              }}
            >
              {selected.status === "occupied"
                ? t("liveDemos.parking.tapFree")
                : t("liveDemos.parking.tapOccupy")}
            </Button>
          </Stack>
        ) : null}
      </Popover>
    </Box>
  );
}
