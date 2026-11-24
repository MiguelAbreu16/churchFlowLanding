import { useMemo, useState } from "react";
import {
  Box,
  FormControlLabel,
  Stack,
  Switch,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const NEXT_STATUS = {
  free: "reserved",
  reserved: "occupied",
  occupied: "free",
};

/** Four banks around a center aisle — mini sanctuary / stadium feel. */
const ZONES = [
  {
    id: "A",
    side: "left",
    bank: "front",
    color: "#3B82F6",
    rows: 3,
    cols: 5,
  },
  {
    id: "B",
    side: "right",
    bank: "front",
    color: "#22C55E",
    rows: 3,
    cols: 5,
  },
  {
    id: "C",
    side: "left",
    bank: "back",
    color: "#A855F7",
    rows: 3,
    cols: 5,
  },
  {
    id: "D",
    side: "right",
    bank: "back",
    color: "#F97316",
    rows: 3,
    cols: 5,
  },
];

function statusFromSeed(seed) {
  const n = seed % 10;
  if (n >= 8) return "occupied";
  if (n >= 6) return "reserved";
  return "free";
}

function buildSeats() {
  const seats = [];
  for (const zone of ZONES) {
    for (let r = 0; r < zone.rows; r++) {
      for (let c = 0; c < zone.cols; c++) {
        const id = `${zone.id}-${r}-${c}`;
        const seed =
          zone.id.charCodeAt(0) * 17 + r * 7 + c * 3 + (zone.bank === "back" ? 5 : 0);
        seats.push({
          id,
          zoneId: zone.id,
          zoneColor: zone.color,
          row: r,
          col: c,
          status: statusFromSeed(seed),
        });
      }
    }
  }
  return seats;
}

function ChairIcon({ fill, stroke }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 24 28"
      aria-hidden
      sx={{
        width: "100%",
        height: "100%",
        display: "block",
        overflow: "visible",
      }}
    >
      {/* Backrest */}
      <rect
        x="3.5"
        y="1.5"
        width="17"
        height="5.5"
        rx="1.6"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.2"
      />
      {/* Seat pan */}
      <rect
        x="4.5"
        y="8"
        width="15"
        height="12"
        rx="2.2"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.2"
      />
      {/* Front lip */}
      <rect
        x="5"
        y="19.5"
        width="14"
        height="2.2"
        rx="1"
        fill={alpha(fill === "transparent" ? "#fff" : fill, 0.35)}
      />
      {/* Legs */}
      <rect x="6" y="22" width="2" height="4.5" rx="0.8" fill={stroke} opacity={0.85} />
      <rect x="16" y="22" width="2" height="4.5" rx="0.8" fill={stroke} opacity={0.85} />
    </Box>
  );
}

function SeatButton({ seat, showZones, tip, onToggle, statusFill }) {
  const zoneStroke = showZones ? seat.zoneColor : alpha("#fff", 0.2);
  const fill = showZones
    ? alpha(seat.zoneColor, seat.status === "free" ? 0.28 : 0.72)
    : statusFill;
  const stroke = showZones
    ? seat.zoneColor
    : seat.status === "free"
      ? alpha("#fff", 0.35)
      : alpha("#000", 0.25);

  return (
    <Tooltip title={tip} arrow>
      <Box
        component="button"
        type="button"
        aria-label={`${seat.id} ${seat.status}`}
        onClick={() => onToggle(seat.id)}
        sx={{
          width: { xs: 22, sm: 26 },
          height: { xs: 28, sm: 32 },
          border: 0,
          p: 0,
          m: 0,
          bgcolor: "transparent",
          cursor: "pointer",
          transition: "transform 0.15s ease",
          "&:hover": { transform: "scale(1.12)" },
          filter: showZones
            ? `drop-shadow(0 0 4px ${alpha(seat.zoneColor, 0.55)})`
            : undefined,
        }}
      >
        <ChairIcon fill={fill} stroke={stroke} />
        {showZones && seat.status !== "free" ? (
          <Box
            sx={{
              position: "relative",
              mt: "-6px",
              mx: "auto",
              width: 6,
              height: 6,
              borderRadius: "50%",
              bgcolor:
                seat.status === "occupied"
                  ? "#1A3668"
                  : "#B8952C",
              border: `1px solid ${alpha("#fff", 0.5)}`,
            }}
          />
        ) : null}
      </Box>
    </Tooltip>
  );
}

function ZoneBank({ zone, seatsById, showZones, t, theme, onToggle }) {
  const seats = [];
  for (let r = 0; r < zone.rows; r++) {
    for (let c = 0; c < zone.cols; c++) {
      seats.push(seatsById.get(`${zone.id}-${r}-${c}`));
    }
  }

  return (
    <Box
      sx={{
        position: "relative",
        flex: 1,
        minWidth: 0,
        p: { xs: 0.75, sm: 1 },
        borderRadius: 2,
        border: showZones
          ? `1.5px solid ${alpha(zone.color, 0.65)}`
          : `1px solid ${alpha("#fff", 0.06)}`,
        bgcolor: showZones
          ? alpha(zone.color, 0.08)
          : alpha("#fff", 0.03),
        transition: "border-color 0.2s ease, background 0.2s ease",
      }}
    >
      {showZones ? (
        <Typography
          variant="caption"
          sx={{
            display: "block",
            mb: 0.5,
            fontWeight: 800,
            letterSpacing: 0.4,
            color: zone.color,
            fontSize: "0.65rem",
          }}
        >
          {t(`demo.zone${zone.id}`, `Zona ${zone.id}`)}
        </Typography>
      ) : null}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${zone.cols}, minmax(0, 1fr))`,
          gap: { xs: 0.35, sm: 0.5 },
          justifyItems: "center",
        }}
      >
        {seats.filter(Boolean).map((seat) => {
          const tip =
            seat.status === "occupied"
              ? t("demo.tapFree")
              : seat.status === "reserved"
                ? t("demo.tapOccupy")
                : t("demo.tapReserve");
          const statusFill =
            seat.status === "occupied"
              ? theme.palette.primary.main
              : seat.status === "reserved"
                ? theme.palette.secondary.main
                : alpha("#fff", 0.14);
          return (
            <Box key={seat.id} sx={{ position: "relative" }}>
              <SeatButton
                seat={seat}
                showZones={showZones}
                tip={
                  showZones
                    ? `${t(`demo.zone${zone.id}`, `Zona ${zone.id}`)} · ${tip}`
                    : tip
                }
                onToggle={onToggle}
                statusFill={statusFill}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default function SeatMapDemo() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [seats, setSeats] = useState(() => buildSeats());
  const [showZones, setShowZones] = useState(false);

  const seatsById = useMemo(() => {
    const map = new Map();
    for (const s of seats) map.set(s.id, s);
    return map;
  }, [seats]);

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

  const leftFront = ZONES.find((z) => z.id === "A");
  const rightFront = ZONES.find((z) => z.id === "B");
  const leftBack = ZONES.find((z) => z.id === "C");
  const rightBack = ZONES.find((z) => z.id === "D");

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
        sx={{
          mb: 1.5,
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1,
        }}
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

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 1.5 }}
        useFlexGap
        flexWrap="wrap"
        gap={1}
      >
        <FormControlLabel
          control={
            <Switch
              size="small"
              checked={showZones}
              onChange={(_, v) => setShowZones(v)}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: theme.palette.secondary.main,
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  bgcolor: theme.palette.secondary.main,
                },
              }}
            />
          }
          label={
            <Typography
              variant="caption"
              sx={{ fontWeight: 700, color: alpha("#fff", 0.85) }}
            >
              {t("demo.showZones", "Ver por zonas")}
            </Typography>
          }
          sx={{ m: 0 }}
        />
        <Typography
          variant="caption"
          sx={{ color: alpha("#fff", 0.45), fontWeight: 600 }}
        >
          {t("demo.chairsLabel", "Sillas del templo")}
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

      {/* Mini stadium: altar + two rows of banks with center aisle */}
      <Box sx={{ mb: 2 }}>
        <Box
          sx={{
            mx: "auto",
            mb: 1.5,
            maxWidth: 200,
            py: 1,
            px: 2,
            borderRadius: 2,
            textAlign: "center",
            bgcolor: alpha(theme.palette.secondary.main, 0.15),
            border: `1px solid ${alpha(theme.palette.secondary.main, 0.45)}`,
            boxShadow: `0 0 24px ${alpha(theme.palette.secondary.main, 0.2)}`,
          }}
        >
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: "0.7rem",
              letterSpacing: 1.2,
              color: theme.palette.secondary.light,
              textTransform: "uppercase",
            }}
          >
            {t("demo.altar", "Altar")}
          </Typography>
          <Box
            sx={{
              mt: 0.75,
              height: 6,
              borderRadius: 999,
              bgcolor: alpha(theme.palette.secondary.main, 0.55),
            }}
          />
        </Box>

        <Stack spacing={1}>
          <Stack direction="row" spacing={1} alignItems="stretch">
            <ZoneBank
              zone={leftFront}
              seatsById={seatsById}
              showZones={showZones}
              t={t}
              theme={theme}
              onToggle={toggle}
            />
            <Box
              sx={{
                width: { xs: 10, sm: 16 },
                flexShrink: 0,
                borderRadius: 1,
                bgcolor: alpha("#fff", 0.04),
                backgroundImage: `repeating-linear-gradient(
                  180deg,
                  ${alpha("#fff", 0.06)} 0 4px,
                  transparent 4px 10px
                )`,
              }}
              aria-hidden
            />
            <ZoneBank
              zone={rightFront}
              seatsById={seatsById}
              showZones={showZones}
              t={t}
              theme={theme}
              onToggle={toggle}
            />
          </Stack>
          <Stack direction="row" spacing={1} alignItems="stretch">
            <ZoneBank
              zone={leftBack}
              seatsById={seatsById}
              showZones={showZones}
              t={t}
              theme={theme}
              onToggle={toggle}
            />
            <Box
              sx={{
                width: { xs: 10, sm: 16 },
                flexShrink: 0,
                borderRadius: 1,
                bgcolor: alpha("#fff", 0.04),
                backgroundImage: `repeating-linear-gradient(
                  180deg,
                  ${alpha("#fff", 0.06)} 0 4px,
                  transparent 4px 10px
                )`,
              }}
              aria-hidden
            />
            <ZoneBank
              zone={rightBack}
              seatsById={seatsById}
              showZones={showZones}
              t={t}
              theme={theme}
              onToggle={toggle}
            />
          </Stack>
        </Stack>
      </Box>

      <Stack
        direction="row"
        spacing={2}
        useFlexGap
        sx={{ mb: 1.5, flexWrap: "wrap" }}
      >
        {showZones
          ? ZONES.map((z) => (
              <Stack
                key={z.id}
                direction="row"
                spacing={0.75}
                sx={{ alignItems: "center" }}
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: 0.5,
                    bgcolor: z.color,
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{ color: alpha("#fff", 0.65) }}
                >
                  {t(`demo.zone${z.id}`, `Zona ${z.id}`)}
                </Typography>
              </Stack>
            ))
          : (
            <>
              <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
                <Box
                  sx={{
                    width: 14,
                    height: 16,
                    "& svg": { width: "100%", height: "100%" },
                  }}
                >
                  <ChairIcon
                    fill={alpha("#fff", 0.14)}
                    stroke={alpha("#fff", 0.35)}
                  />
                </Box>
                <Typography
                  variant="caption"
                  sx={{ color: alpha("#fff", 0.65) }}
                >
                  {t("demo.legendFree")}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
                <Box
                  sx={{
                    width: 14,
                    height: 16,
                    "& svg": { width: "100%", height: "100%" },
                  }}
                >
                  <ChairIcon
                    fill={theme.palette.primary.main}
                    stroke={alpha("#000", 0.25)}
                  />
                </Box>
                <Typography
                  variant="caption"
                  sx={{ color: alpha("#fff", 0.65) }}
                >
                  {t("demo.legendOccupied")}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
                <Box
                  sx={{
                    width: 14,
                    height: 16,
                    "& svg": { width: "100%", height: "100%" },
                  }}
                >
                  <ChairIcon
                    fill={theme.palette.secondary.main}
                    stroke={alpha("#000", 0.25)}
                  />
                </Box>
                <Typography
                  variant="caption"
                  sx={{ color: alpha("#fff", 0.65) }}
                >
                  {t("demo.legendReserved")}
                </Typography>
              </Stack>
            </>
          )}
      </Stack>

      <Typography
        variant="caption"
        sx={{ color: alpha("#fff", 0.55), display: "block" }}
      >
        {showZones
          ? t(
              "demo.hintZones",
              "Zonas del templo. Toca una silla para cambiar su estado.",
            )
          : t("demo.hint")}
      </Typography>
    </Box>
  );
}
