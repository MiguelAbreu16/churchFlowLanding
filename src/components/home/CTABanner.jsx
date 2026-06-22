import { Box, Container, Typography, Button, alpha, useTheme } from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import Email from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function CTABanner() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box className="section" sx={{ bgcolor: "#fff" }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            p: { xs: 6, md: 10 },
            textAlign: "center",
            background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
            color: "#fff",
            boxShadow: "0 25px 50px -12px rgba(37, 99, 235, 0.25)",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "1.8rem", md: "3rem" },
              mb: 2,
              color: "#fff",
              fontWeight: 800,
            }}
          >
            {t("cta.title")}
            <br />
            {t("cta.titleLine2")}
          </Typography>

          <Typography
            sx={{
              maxWidth: 540,
              mx: "auto",
              mb: 5,
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.8)",
              fontSize: "1.1rem",
            }}
          >
            {t("cta.subtitle")}
          </Typography>

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#fff",
                color: "primary.main",
                px: 5,
                py: 2,
                fontSize: "1rem",
                "&:hover": {
                  bgcolor: alpha("#fff", 0.9),
                  transform: "translateY(-2px)",
                },
              }}
              endIcon={<ArrowForward />}
              onClick={() => navigate("/register")}
            >
              {t("cta.start")}
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/pricing")}
              sx={{
                px: 5,
                py: 2,
                fontSize: "1rem",
                borderColor: "rgba(255,255,255,0.3)",
                color: "#fff",
                "&:hover": {
                  borderColor: "#fff",
                  bgcolor: "rgba(255,255,255,0.05)",
                },
              }}
            >
              {t("cta.viewPlans")}
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<Email />}
              onClick={() => navigate("/contacto")}
              sx={{
                px: 5,
                py: 2,
                fontSize: "1rem",
                borderColor: "rgba(255,255,255,0.3)",
                color: "#fff",
                "&:hover": {
                  borderColor: "#fff",
                  bgcolor: "rgba(255,255,255,0.05)",
                },
              }}
            >
              {t("cta.contact")}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
