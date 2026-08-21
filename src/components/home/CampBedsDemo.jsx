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
  Chip,
} from "@mui/material";
import Hotel from "@mui/icons-material/Hotel";
import BedOutlined from "@mui/icons-material/BedOutlined";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const CAMPER_POOL = [
  { name: "Ana Sofía Méndez", age: 15, allergy: "Mariscos" },
  { name: "Carlos Núñez", age: 17, allergy: null },
  { name: "Camila Fernández", age: 16, allergy: "Polen" },
  { name: "José Vargas", age: 19, allergy: null },
  { name: "Valeria Santos", age: 14, allergy: "Maní" },
  { name: "Diego Mora", age: 18, allergy: null },
  { name: "Elena Cruz", age: 15, allergy: "Lácteos" },
  { name: "Pedro Peña", age: 16, allergy: null },
  { name: "Lucía Rojas", age: 17, allergy: "Gluten" },
  { name: "Mateo Silva", age: 15, allergy: null },
  { name: "Isabella Díaz", age: 14, allergy: null },
  { name: "Andrés Gómez", age: 18, allergy: "Huevo" },
];

function pickCamper(used) {
  const pool = CAMPER_POOL.filter((c) => !used.has(c.name));
  const pick =
    pool[Math.floor(Math.random() * pool.length)] ||
    CAMPER_POOL[Math.floor(Math.random() * CAMPER_POOL.length)];
  used.add(pick.name);
  return { ...pick };
}

function buildBeds() {
  const used = new Set();
  return Array.from({ length: 20 }, (_, i) => {
    const assigned = Math.random() > 0.4;
    const camper = assigned ? pickCamper(used) : null;
    return {
      id: i + 1,
      status: assigned ? "assigned" : "free",
      camper,
    };
  });
}

export default function CampBedsDemo() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [beds, setBeds] = useState(() => buildBeds());
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const assigned = useMemo(
    () => beds.filter((b) => b.status === "assigned").length,
    [beds],
  );
  const total = beds.length;
  const pct = Math.round((assigned / total) * 100);
  const selected = beds.find((b) => b.id === selectedId) || null;

  const openBed = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const closePopover = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  const toggleSelected = () => {
    if (!selectedId) return;
    setBeds((prev) =>
      prev.map((b) => {
        if (b.id !== selectedId) return b;
        if (b.status === "assigned") {
          return { ...b, status: "free", camper: null };
        }
        return {
          ...b,
          status: "assigned",
          camper: pickCamper(new Set(prev.map((x) => x.camper?.name).filter(Boolean))),
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
          {t("liveDemos.camps.title")}
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
          {assigned}/{total} · {pct}%
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
          borderRadius: 2,
          border: `1px solid ${alpha("#fff", 0.1)}`,
          bgcolor: alpha("#fff", 0.03),
          p: 1.5,
          mb: 2,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            display: "block",
            mb: 1.25,
            color: alpha("#fff", 0.55),
            fontWeight: 700,
            letterSpacing: 0.4,
          }}
        >
          {t("liveDemos.camps.roomLabel")}
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
            gap: 1,
          }}
        >
          {beds.map((bed) => {
            const assignedBed = bed.status === "assigned";
            return (
              <Box
                key={bed.id}
                component="button"
                type="button"
                aria-label={`bed-${bed.id}`}
                onClick={(e) => openBed(e, bed.id)}
                sx={{
                  aspectRatio: "1 / 1.2",
                  border: `1px solid ${
                    assignedBed
                      ? alpha(theme.palette.primary.light, 0.45)
                      : alpha("#fff", 0.12)
                  }`,
                  borderRadius: 1.5,
                  cursor: "pointer",
                  p: 0.5,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.2,
                  bgcolor: assignedBed
                    ? alpha(theme.palette.primary.main, 0.35)
                    : alpha("#fff", 0.06),
                  color: "#fff",
                  transition:
                    "transform 0.15s ease, background 0.15s ease, box-shadow 0.15s ease",
                  boxShadow: assignedBed
                    ? `0 0 0 1px ${alpha(theme.palette.secondary.main, 0.35)}`
                    : "none",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                {assignedBed ? (
                  <Hotel sx={{ fontSize: { xs: 18, sm: 22 } }} />
                ) : (
                  <BedOutlined
                    sx={{ fontSize: { xs: 18, sm: 22 }, opacity: 0.55 }}
                  />
                )}
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: "0.72rem",
                    lineHeight: 1,
                  }}
                >
                  {bed.id}
                </Typography>
                {assignedBed ? (
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      bgcolor: theme.palette.error.light,
                    }}
                  />
                ) : null}
              </Box>
            );
          })}
        </Box>
      </Box>

      <Typography
        variant="caption"
        sx={{ color: alpha("#fff", 0.55), display: "block" }}
      >
        {t("liveDemos.camps.hint")}
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
              minWidth: 250,
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
              {selected.status === "assigned" ? (
                <Hotel sx={{ color: theme.palette.primary.light }} />
              ) : (
                <BedOutlined sx={{ color: alpha("#fff", 0.7) }} />
              )}
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontWeight: 800, color: "#F8FAFC" }}>
                  {t("liveDemos.camps.bed", { n: selected.id })}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: alpha("#F8FAFC", 0.65), display: "block" }}
                >
                  {t("liveDemos.camps.roomLabel")}
                </Typography>
              </Box>
            </Stack>
            <Divider sx={{ borderColor: alpha("#fff", 0.12) }} />
            {selected.status === "assigned" && selected.camper ? (
              <Stack spacing={0.75}>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: alpha("#F8FAFC", 0.55), display: "block" }}
                  >
                    {t("liveDemos.camps.camper")}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, color: "#F8FAFC" }}
                  >
                    {selected.camper.name}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ color: alpha("#F8FAFC", 0.8) }}
                >
                  {t("liveDemos.camps.age", { n: selected.camper.age })}
                </Typography>
                <Chip
                  size="small"
                  label={
                    selected.camper.allergy
                      ? t("liveDemos.camps.allergy", {
                          value: selected.camper.allergy,
                        })
                      : t("liveDemos.camps.noAllergy")
                  }
                  sx={{
                    alignSelf: "flex-start",
                    bgcolor: selected.camper.allergy
                      ? alpha(theme.palette.warning.main, 0.22)
                      : alpha(theme.palette.secondary.main, 0.18),
                    color: selected.camper.allergy
                      ? theme.palette.warning.light
                      : theme.palette.secondary.light,
                    fontWeight: 700,
                  }}
                />
              </Stack>
            ) : (
              <Typography variant="body2" sx={{ color: alpha("#F8FAFC", 0.75) }}>
                {t("liveDemos.camps.emptyDetail")}
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
              {selected.status === "assigned"
                ? t("liveDemos.camps.tapFree")
                : t("liveDemos.camps.tapAssign")}
            </Button>
          </Stack>
        ) : null}
      </Popover>
    </Box>
  );
}
