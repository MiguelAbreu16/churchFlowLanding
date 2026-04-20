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
import PlayArrow from "@mui/icons-material/PlayArrow";
import People from "@mui/icons-material/People";
import Map from "@mui/icons-material/Map";
import { useNavigate } from "react-router-dom";

const STATS = [
  { value: "500+", label: "Iglesias Activas" },
  { value: "50k+", label: "Asistentes Gestionados" },
  { value: "99.9%", label: "Uptime Garantizado" },
];

export default function HeroSection() {
  const theme = useTheme();
  const navigate = useNavigate();

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
          <Grid item xs={12} lg={7}>
            <Box sx={{ textAlign: { xs: "center", lg: "left" } }}>
              <Chip
                label="Plataforma de Confianza para Ministerios"
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
                  fontSize: { xs: "2.5rem", md: "4rem" },
                  lineHeight: 1.1,
                  mb: 2.5,
                }}
              >
                Eleva la experiencia
                <br />
                <Box component="span" sx={{ color: "primary.main" }}>
                  de tu congregación
                </Box>
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: "text.secondary",
                  mb: 4.5,
                  maxWidth: 600,
                  mx: { xs: "auto", lg: 0 },
                  fontWeight: 400,
                  lineHeight: 1.7,
                }}
              >
                ChurchFlow es la plataforma líder para la gestión operativa de servicios. 
                Optimiza la asistencia, coordina tus equipos y toma decisiones basadas en datos reales.
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
                  Probar Gratis por 14 Días
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<PlayArrow />}
                  sx={{ px: 4, py: 1.8 }}
                >
                  Ver Video Demo
                </Button>
              </Stack>

              <Box 
                sx={{ 
                  mt: 8, 
                  pt: 4, 
                  borderTop: `1px solid ${theme.palette.divider}`,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: { xs: 4, md: 8 },
                  justifyContent: { xs: "center", lg: "flex-start" }
                }}
              >
                {STATS.map((stat) => (
                  <Box key={stat.label}>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary" }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} lg={5} sx={{ display: { xs: "none", lg: "block" } }}>
            <Box
              sx={{
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: -20,
                  right: -20,
                  bottom: -20,
                  left: -20,
                  background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 70%)`,
                  zIndex: 0,
                }
              }}
            >
              <Box
                className="glass-card"
                sx={{
                  position: "relative",
                  zIndex: 1,
                  p: 0,
                  overflow: "hidden",
                  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)",
                }}
              >
                {/* Clean Mockup UI */}
                <Box sx={{ bgcolor: "#F1F5F9", p: 1.5, borderBottom: "1px solid #E2E8F0" }}>
                  <Stack direction="row" spacing={1}>
                    <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#CBD5E1" }} />
                    <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#CBD5E1" }} />
                    <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#CBD5E1" }} />
                  </Stack>
                </Box>
                
                <Box sx={{ p: 4, bgcolor: "#fff" }}>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: "primary.main", mb: 2, display: "block" }}>
                    PANEL DE OPERACIONES
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 3 }}>Vista en Tiempo Real - Zona Norte</Typography>
                  
                  <Box sx={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 1.5, mb: 4 }}>
                    {[...Array(24)].map((_, i) => (
                      <Box
                        key={i}
                        sx={{
                          aspectRatio: "1/1",
                          borderRadius: 1,
                          bgcolor: i === 5 || i === 12 ? "error.light" : i % 3 === 0 ? "success.light" : "#F1F5F9",
                        }}
                      />
                    ))}
                  </Box>

                  <Stack direction="row" spacing={2}>
                    <Box sx={{ flex: 1, p: 2, borderRadius: 2, bgcolor: "#F8FAFC", border: "1px solid #F1F5F9" }}>
                      <People sx={{ color: "primary.main", fontSize: 20, mb: 1 }} />
                      <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>84%</Typography>
                      <Typography variant="caption" color="text.secondary">Ocupación</Typography>
                    </Box>
                    <Box sx={{ flex: 1, p: 2, borderRadius: 2, bgcolor: "#F8FAFC", border: "1px solid #F1F5F9" }}>
                      <Map sx={{ color: "secondary.main", fontSize: 20, mb: 1 }} />
                      <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Activo</Typography>
                      <Typography variant="caption" color="text.secondary">Modo Servicio</Typography>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
