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
  const plan = params.get("plan") || "professional";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGoToApp = () => {
    const token = sessionStorage.getItem("cf_token");
    const appUrl = import.meta.env.VITE_APP_URL || "http://localhost:5173";
    
    if (token) {
      window.location.href = `${appUrl}?token=${token}`;
    } else {
      window.location.href = appUrl;
    }
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
              bgcolor: "#fff",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                bgcolor: alpha(theme.palette.success.main, 0.1),
                color: "success.main",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 3,
              }}
            >
              <CheckCircleOutlined sx={{ fontSize: 40 }} />
            </Box>
            
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1.5 }}>
              ¡Iglesia Registrada!
            </Typography>
            
            <Typography color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
              Tu entorno de ChurchFlow para el plan{" "}
              <Box component="span" sx={{ fontWeight: 700, color: "primary.main" }}>
                {plan}
              </Box>{" "}
              está listo. Ya puedes configurar tus zonas y equipos.
            </Typography>

            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              endIcon={<RocketLaunch />}
              onClick={handleGoToApp}
              sx={{ py: 1.8, fontSize: "1rem", mb: 2 }}
            >
              Acceder a mi Dashboard
            </Button>
            
            <Button
              variant="text"
              fullWidth
              onClick={() => navigate("/")}
              sx={{ color: "text.secondary", fontWeight: 600 }}
            >
              Volver al inicio
            </Button>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
