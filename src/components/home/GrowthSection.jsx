import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
  Button,
  alpha,
  useTheme,
} from "@mui/material";
import Hub from "@mui/icons-material/Hub";
import TrendingUp from "@mui/icons-material/TrendingUp";
import AccountTree from "@mui/icons-material/AccountTree";
import Insights from "@mui/icons-material/Insights";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BENEFIT_ICONS = [AccountTree, Hub, Insights, TrendingUp];
const STATS = [
  { valueKey: "statChurchesValue", labelKey: "statChurches" },
  { valueKey: "statOccupancyValue", labelKey: "statOccupancy" },
  { valueKey: "statPeopleValue", labelKey: "statPeople" },
];

export default function GrowthSection() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box id="growth" className="section" sx={{ bgcolor: "#0B1220", color: "#fff" }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 800,
                letterSpacing: 1.5,
                color: theme.palette.secondary.light,
                textTransform: "uppercase",
                display: "block",
                mb: 2,
              }}
            >
              {t("growth.eyebrow")}
            </Typography>
            <Typography
              variant="h2"
              sx={{
                mb: 2,
                fontSize: { xs: "2rem", md: "2.6rem" },
                color: "#fff",
              }}
            >
              {t("growth.title")}
            </Typography>
            <Typography
              sx={{
                mb: 4,
                color: alpha("#fff", 0.72),
                fontSize: "1.05rem",
                lineHeight: 1.7,
                maxWidth: 520,
              }}
            >
              {t("growth.subtitle")}
            </Typography>

            <Stack spacing={2} sx={{ mb: 4 }}>
              {[0, 1, 2, 3].map((i) => {
                const Icon = BENEFIT_ICONS[i];
                return (
                  <Stack
                    key={i}
                    direction="row"
                    spacing={1.5}
                    component={motion.div}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    sx={{ alignItems: "flex-start" }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        display: "grid",
                        placeItems: "center",
                        bgcolor: alpha(theme.palette.primary.main, 0.2),
                        color: theme.palette.primary.light,
                        flexShrink: 0,
                      }}
                    >
                      <Icon fontSize="small" />
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 800, mb: 0.25 }}>
                        {t(`growth.benefits.${i}.title`)}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: alpha("#fff", 0.65) }}
                      >
                        {t(`growth.benefits.${i}.desc`)}
                      </Typography>
                    </Box>
                  </Stack>
                );
              })}
            </Stack>

            <Button
              variant="contained"
              endIcon={<ArrowForward />}
              onClick={() => navigate("/register?plan=enterprise")}
              sx={{ fontWeight: 800 }}
            >
              {t("growth.cta")}
            </Button>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              sx={{
                p: 3,
                borderRadius: 4,
                bgcolor: alpha("#fff", 0.04),
                border: `1px solid ${alpha("#fff", 0.1)}`,
              }}
            >
              <Typography
                sx={{ fontWeight: 800, mb: 2.5, fontSize: "1rem" }}
              >
                {t("growth.panelTitle")}
              </Typography>
              <Grid container spacing={2}>
                {STATS.map((stat) => (
                  <Grid key={stat.labelKey} size={{ xs: 4 }}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2.5,
                        bgcolor: alpha("#fff", 0.05),
                        textAlign: "center",
                        height: "100%",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 900,
                          fontSize: { xs: "1.4rem", sm: "1.75rem" },
                          color: theme.palette.secondary.light,
                          lineHeight: 1.1,
                        }}
                      >
                        {t(`growth.${stat.valueKey}`)}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: alpha("#fff", 0.6), fontWeight: 600 }}
                      >
                        {t(`growth.${stat.labelKey}`)}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mt: 2.5,
                  color: alpha("#fff", 0.5),
                }}
              >
                {t("growth.panelHint")}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
