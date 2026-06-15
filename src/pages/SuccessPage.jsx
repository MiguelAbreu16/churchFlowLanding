import { useEffect } from "react";
import { Box, Container, Typography, Button, Paper, alpha, useTheme } from "@mui/material";
import CheckCircleOutlined from "@mui/icons-material/CheckCircleOutlined";
import RocketLaunch from "@mui/icons-material/RocketLaunch";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/common/Navbar";

export default function SuccessPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const plan = params.get("plan") || "pro";
  const code = params.get("code");

  useEffect(() => {
    window.scrollTo(0, 0);
    sessionStorage.removeItem("cf_token");
  }, []);

  const handleGoToApp = () => {
    const appUrl = import.meta.env.VITE_APP_URL || "http://localhost:5173";
    const qs = code ? `?code=${encodeURIComponent(code)}` : "";
    window.location.href = `${appUrl.replace(/\/$/, "")}/verify-email-pending${qs}`;
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          pt: { xs: 15, md: 20 },
          pb: 8,
          background: `radial-gradient(circle at 50% 50%, ${alpha(theme.palette.success.main, 0.05)} 0%, transparent 70%)`,
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 6 },
              textAlign: "center",
              borderRadius: 4,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <CheckCircleOutlined
              sx={{ fontSize: 48, color: "success.main", mb: 2 }}
            />
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1.5 }}>
              ¡Cuenta creada!
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
              Plan <strong>{plan}</strong> con prueba de 14 días. Revisa tu
              correo para verificar tu cuenta antes de usar el panel.
            </Typography>
            <Button
              variant="contained"
              size="large"
              fullWidth
              endIcon={<RocketLaunch />}
              onClick={handleGoToApp}
              sx={{ py: 1.8, mb: 2 }}
            >
              Ir a la aplicación
            </Button>
            <Button fullWidth onClick={() => navigate("/")}>
              Volver al inicio
            </Button>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
