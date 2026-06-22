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
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HERO_SLIDES } from "../../constants/screenshots";
import ProductScreenshotCarousel from "./ProductScreenshotCarousel";

const PROOF_KEYS = ["proof1", "proof2", "proof3"];

export default function HeroSection() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const scrollToTour = () => {
    document.getElementById("product-tour")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      sx={{
        pt: { xs: 12, md: 18 },
        pb: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
        backgroundColor: "background.default",
        backgroundImage: `radial-gradient(${alpha(theme.palette.primary.main, 0.05)} 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} lg={6}>
            <Box sx={{ textAlign: { xs: "center", lg: "left" } }}>
              <Chip
                label={t("hero.badge")}
                size="small"
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                  color: "primary.main",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  mb: 3,
                  px: 1,
                }}
              />
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  lineHeight: 1.1,
                  mb: 2.5,
                }}
              >
                {t("hero.title")}
                <br />
                <Box component="span" sx={{ color: "primary.main" }}>
                  {t("hero.titleHighlight")}
                </Box>
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: "text.secondary",
                  mb: 4.5,
                  maxWidth: 560,
                  mx: { xs: "auto", lg: 0 },
                  fontWeight: 400,
                  lineHeight: 1.7,
                  fontSize: { xs: "1.05rem", md: "1.15rem" },
                }}
              >
                {t("hero.subtitle")}
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent={{ xs: "center", lg: "flex-start" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => navigate("/register")}
                  endIcon={<ArrowForward />}
                  sx={{ px: 4, py: 1.8 }}
                >
                  {t("hero.ctaTrial")}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Visibility />}
                  onClick={scrollToTour}
                  sx={{ px: 4, py: 1.8 }}
                >
                  {t("hero.ctaProduct")}
                </Button>
              </Stack>

              <Box
                sx={{
                  mt: 6,
                  pt: 4,
                  borderTop: `1px solid ${theme.palette.divider}`,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  alignItems: { xs: "center", lg: "flex-start" },
                }}
              >
                {PROOF_KEYS.map((key) => (
                  <Typography
                    key={key}
                    variant="body2"
                    sx={{ color: "text.secondary", fontWeight: 600 }}
                  >
                    ✓ {t(`hero.${key}`)}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} lg={6}>
            <ProductScreenshotCarousel slides={HERO_SLIDES} autoPlayMs={7000} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
