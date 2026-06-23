import { Box, Container, Paper, Typography, alpha, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import Navbar from "../components/common/Navbar";
import RegisterWizard from "../components/register/RegisterWizard";
import LogoMark from "../components/common/LogoMark";

const APP_URL = import.meta.env.VITE_APP_URL || "http://localhost:5173";

export default function RegisterPage() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Navbar />

      <Box
        sx={{
          pt: { xs: 12, md: 16 },
          pb: 8,
          background: `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 400px)`,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <LogoMark size={72} markSize={64} />
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 1.5 }}>
              {t("register.title")}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mx: "auto" }}>
              {t("register.subtitle")}
            </Typography>
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 6 },
              borderRadius: 4,
              border: `1px solid ${theme.palette.divider}`,
              bgcolor: "#fff",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)",
            }}
          >
            <RegisterWizard />
          </Paper>

          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              {t("register.hasAccount")}{" "}
              <Box
                component="a"
                href={`${APP_URL}/login`}
                sx={{ color: "primary.main", fontWeight: 700, textDecoration: "none" }}
              >
                {t("register.login")}
              </Box>
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
