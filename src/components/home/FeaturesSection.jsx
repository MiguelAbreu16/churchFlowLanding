import { Box, Container, Grid, Typography, alpha, useTheme } from "@mui/material";
import MapOutlined from "@mui/icons-material/MapOutlined";
import PeopleOutlined from "@mui/icons-material/PeopleOutlined";
import BarChartOutlined from "@mui/icons-material/BarChartOutlined";
import NotificationsOutlined from "@mui/icons-material/NotificationsOutlined";
import GroupsOutlined from "@mui/icons-material/GroupsOutlined";
import ConfirmationNumberOutlined from "@mui/icons-material/ConfirmationNumberOutlined";

const FEATURES = [
  {
    icon: <MapOutlined />,
    title: "Mapa de Asientos en Vivo",
    desc: "Visualiza y controla el estado de cada asiento en tiempo real con actualizaciones instantáneas vía WebSocket.",
    color: "#2563EB",
  },
  {
    icon: <PeopleOutlined />,
    title: "Control de Asistencia",
    desc: "Registra la entrada y salida de asistentes automáticamente. Genera reportes de asistencia por servicio.",
    color: "#10B981",
  },
  {
    icon: <BarChartOutlined />,
    title: "Métricas de Servicio",
    desc: "Snapshots automáticos de cada servicio: pico de asistencia, ocupación promedio y tendencias históricas.",
    color: "#F59E0B",
  },
  {
    icon: <NotificationsOutlined />,
    title: "Alertas de Operación",
    desc: "Sistema de incidencias con prioridad y escalamiento automático para respuestas inmediatas de tu equipo.",
    color: "#EF4444",
  },
  {
    icon: <GroupsOutlined />,
    title: "Gestión de Equipo",
    desc: "Administra ujeres, asigna zonas y controla permisos granulares por rol. Toda la operación coordinada.",
    color: "#6366F1",
  },
  {
    icon: <ConfirmationNumberOutlined />,
    title: "Boletería Integrada",
    desc: "Vende y gestiona boletos para eventos especiales con códigos QR y check-in automático.",
    color: "#0EA5E9",
  },
];

export default function FeaturesSection() {
  const theme = useTheme();

  return (
    <Box id="features" className="section" sx={{ bgcolor: "#fff" }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 800,
              letterSpacing: 1.5,
              color: "primary.main",
              textTransform: "uppercase",
              display: "block",
              mb: 2,
            }}
          >
            Nuestras Capacidades
          </Typography>
          <Typography variant="h2" sx={{ mb: 2, fontSize: { xs: "2rem", md: "2.75rem" } }}>
            Una infraestructura robusta
            <br />
            para tu ministerio
          </Typography>
          <Typography
            sx={{ maxWidth: 640, mx: "auto", color: "text.secondary", fontSize: "1.1rem" }}
          >
            Diseñado para resolver los retos operativos más comunes en la logística de servicios,
            permitiendo que tu equipo se enfoque en lo más importante: la gente.
          </Typography>
        </Box>

        {/* Feature Cards */}
        <Grid container spacing={4}>
          {FEATURES.map((f, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
              <Box
                sx={{
                  p: 4,
                  height: "100%",
                  borderRadius: 4,
                  bgcolor: "#fff",
                  border: `1px solid ${theme.palette.divider}`,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    borderColor: alpha(f.color, 0.3),
                    boxShadow: `0 12px 24px -10px ${alpha(f.color, 0.1)}`,
                    transform: "translateY(-4px)",
                    "& .feature-icon": {
                      bgcolor: f.color,
                      color: "#fff",
                    },
                  },
                }}
              >
                <Box
                  className="feature-icon"
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2.5,
                    bgcolor: alpha(f.color, 0.08),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: f.color,
                    mb: 3,
                    transition: "all 0.3s ease",
                    "& svg": { fontSize: 24 },
                  }}
                >
                  {f.icon}
                </Box>
                <Typography variant="h6" sx={{ mb: 1.5, fontSize: "1.15rem" }}>
                  {f.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.95rem" }}>
                  {f.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
