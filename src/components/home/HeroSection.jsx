import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Chip,
  Grid,
  alpha,
  useTheme,
} from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import Visibility from "@mui/icons-material/Visibility";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LogoMark from "../common/LogoMark";
import SeatMapDemo from "./SeatMapDemo";
import { BRAND } from "../../constants/branding";

const TRUST_KEYS = ["trust1", "trust2", "trust3"];

export default function HeroSection() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const scrollToTour = () => {
    document
      .getElementById("product-tour")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      sx={{
        pt: { xs: 11, md: 14 },
        pb: { xs: 6, md: 10 },
        position: "relative",
        overflow: "hidden",
        backgroundColor: "background.default",
        backgroundImage: `
          linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.06)} 0%, transparent 42%),
          radial-gradient(${alpha(theme.palette.primary.main, 0.05)} 1px, transparent 1px)
        `,
        backgroundSize: "auto, 40px 40px",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, lg: 8 }} alignItems="center">
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              sx={{ textAlign: { xs: "center", lg: "left" } }}
            >
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                justifyContent={{ xs: "center", lg: "flex-start" }}
                sx={{ mb: 2.5 }}
              >
                <LogoMark size={56} markSize={46} />
                <Typography
                  sx={{
                    fontFamily: '"Outfit", "Inter", sans-serif',
                    fontWeight: 900,
                    fontSize: { xs: "1.65rem", md: "2rem" },
                    letterSpacing: "-0.04em",
                    color: "text.primary",
                  }}
                >
                  {BRAND.name}
                </Typography>
              </Stack>

              <Chip
                label={t("hero.badge")}
                size="small"
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                  color: "primary.main",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  mb: 2.5,
                }}
              />

              <Typography
                variant="h1"
                sx={{
                  fontFamily: '"Outfit", "Inter", sans-serif',
                  fontSize: { xs: "2.15rem", sm: "2.6rem", md: "3.25rem" },
                  lineHeight: 1.08,
                  mb: 2,
                  letterSpacing: "-0.03em",
                }}
              >
                {t("hero.title")}{" "}
                <Box component="span" sx={{ color: "primary.main" }}>
                  {t("hero.titleHighlight")}
                </Box>
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  mb: 3.5,
                  maxWidth: 520,
                  mx: { xs: "auto", lg: 0 },
                  fontWeight: 400,
                  lineHeight: 1.65,
                  fontSize: { xs: "1rem", md: "1.1rem" },
                }}
              >
                {t("hero.subtitle")}
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                justifyContent={{ xs: "center", lg: "flex-start" }}
                sx={{ mb: 3 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => navigate("/register")}
                  endIcon={<ArrowForward />}
                  sx={{ px: 3.5, py: 1.6, fontWeight: 800 }}
                >
                  {t("hero.ctaTrial")}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Visibility />}
                  onClick={scrollToTour}
                  sx={{ px: 3.5, py: 1.6 }}
                >
                  {t("hero.ctaProduct")}
                </Button>
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2.5 }}
                justifyContent={{ xs: "center", lg: "flex-start" }}
                flexWrap="wrap"
                useFlexGap
              >
                {TRUST_KEYS.map((key) => (
                  <Typography
                    key={key}
                    variant="body2"
                    sx={{ color: "text.secondary", fontWeight: 600 }}
                  >
                    ✓ {t(`hero.${key}`)}
                  </Typography>
                ))}
              </Stack>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <SeatMapDemo />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
