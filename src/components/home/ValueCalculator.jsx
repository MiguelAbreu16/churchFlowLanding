import { useMemo, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Slider,
  Stack,
  Grid,
  Paper,
  Button,
  alpha,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ArrowForward from "@mui/icons-material/ArrowForward";

export default function ValueCalculator() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [ushers, setUshers] = useState(8);
  const [services, setServices] = useState(4);

  const result = useMemo(() => {
    // Heuristic: ~25 min coordination saved per usher per service
    const minutesSaved = ushers * services * 25;
    const hoursSaved = Math.round((minutesSaved / 60) * 10) / 10;
    const weeklyHours = Math.round((hoursSaved / 4) * 10) / 10;
    return { minutesSaved, hoursSaved, weeklyHours };
  }, [ushers, services]);

  return (
    <Box
      id="roi"
      className="section"
      sx={{
        bgcolor: alpha(theme.palette.primary.main, 0.03),
        backgroundImage: `radial-gradient(${alpha(theme.palette.primary.main, 0.06)} 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
      }}
    >
      <Container maxWidth="md">
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          sx={{ textAlign: "center", mb: 5 }}
        >
          <Typography
            variant="caption"
            sx={{
              fontWeight: 800,
              letterSpacing: 2,
              color: "primary.main",
              textTransform: "uppercase",
              display: "block",
              mb: 2,
            }}
          >
            {t("roi.eyebrow")}
          </Typography>
          <Typography
            variant="h2"
            sx={{ mb: 2, fontSize: { xs: "1.75rem", md: "2.5rem" } }}
          >
            {t("roi.title")}
          </Typography>
          <Typography
            sx={{
              maxWidth: 520,
              mx: "auto",
              color: "text.secondary",
              fontSize: { xs: "1rem", md: "1.1rem" },
            }}
          >
            {t("roi.subtitle")}
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 4,
            border: `1px solid ${theme.palette.divider}`,
            bgcolor: "#fff",
          }}
        >
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography sx={{ fontWeight: 700, mb: 1 }}>
                {t("roi.ushers")}: {ushers}
              </Typography>
              <Slider
                value={ushers}
                min={2}
                max={40}
                onChange={(_, v) => setUshers(v)}
                color="primary"
              />
              <Typography sx={{ fontWeight: 700, mb: 1, mt: 3 }}>
                {t("roi.services")}: {services}
              </Typography>
              <Slider
                value={services}
                min={1}
                max={12}
                onChange={(_, v) => setServices(v)}
                color="primary"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={2} height="100%" justifyContent="center">
                <Box
                  sx={{
                    p: 2.5,
                    borderRadius: 3,
                    bgcolor: alpha(theme.palette.secondary.main, 0.08),
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    {t("roi.hoursMonth")}
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: 800, color: "secondary.dark" }}
                  >
                    {result.hoursSaved}h
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {t("roi.estimate", {
                    weekly: result.weeklyHours,
                    minutes: result.minutesSaved,
                  })}
                </Typography>
                <Button
                  variant="contained"
                  endIcon={<ArrowForward />}
                  onClick={() => navigate("/register")}
                  sx={{ alignSelf: { xs: "stretch", sm: "flex-start" } }}
                >
                  {t("roi.cta")}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
