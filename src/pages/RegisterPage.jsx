import { Box, Container, Paper, Typography, alpha, useTheme } from "@mui/material";
import Bolt from "@mui/icons-material/Bolt";
import Navbar from "../components/common/Navbar";
import RegisterWizard from "../components/register/RegisterWizard";

export default function RegisterPage() {
  const theme = useTheme();

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
            <img
              src="/logo.png"
              alt="Logo"
              style={{ width: 48, height: 48, objectFit: "contain", marginBottom: 16 }}
            />
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 1.5 }}>
              Comienza tu transformación
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mx: "auto" }}>
              Únete a las más de 500 iglesias que ya están optimizando su operación con ChurchFlow.
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
              ¿Ya tienes cuenta? <Box component="span" sx={{ color: "primary.main", fontWeight: 700, cursor: "pointer" }}>Inicia Sesión aquí</Box>
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
