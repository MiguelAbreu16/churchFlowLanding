import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Grid,
  alpha,
  useTheme,
} from "@mui/material";
import AutoAwesomeOutlined from "@mui/icons-material/AutoAwesomeOutlined";
import EventAvailableOutlined from "@mui/icons-material/EventAvailableOutlined";
import MovieFilterOutlined from "@mui/icons-material/MovieFilterOutlined";
import GroupsOutlined from "@mui/icons-material/GroupsOutlined";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const BEATS = [
  {
    icon: <EventAvailableOutlined />,
    title: "Domingo listo",
    desc: "Briefing del servicio, huecos de turnos y checklist en lenguaje claro — no en códigos.",
  },
  {
    icon: <GroupsOutlined />,
    title: "Pastoral con contexto",
    desc: "Bautismos, visitas y seguimiento con confirmación humana antes de escribir.",
  },
  {
    icon: <MovieFilterOutlined />,
    title: "Media que corta solo",
    desc: "Sugiere clips del sermón y edita la línea de tiempo sin que pegues una API key.",
  },
];

export default function ChurchAiStarSection() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      id="church-ai"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(165deg, ${alpha(theme.palette.primary.main, 0.09)} 0%, ${theme.palette.background.default} 48%, ${alpha("#0ea5e9", 0.06)} 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                <AutoAwesomeOutlined color="primary" />
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: 1.4,
                    textTransform: "uppercase",
                    color: "primary.main",
                  }}
                >
                  Producto estrella
                </Typography>
              </Stack>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2rem", md: "2.75rem" },
                  fontWeight: 800,
                  mb: 2,
                  lineHeight: 1.15,
                }}
              >
                Church AI:
                <br />
                el copiloto de tu operación
              </Typography>
              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: "1.1rem",
                  maxWidth: 480,
                  mb: 3,
                }}
              >
                Kahal Zerem opera la IA por ti. Tú eliges un plan o créditos; nosotros
                ponemos las keys, medimos el gasto en dólares y te mostramos el uso.
                Sin administrar OpenAI. Sin sorpresas.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/register")}
                  sx={{ fontWeight: 700 }}
                >
                  Empezar con IA
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() =>
                    document
                      .getElementById("ai-plans")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Ver créditos de IA
                </Button>
              </Stack>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2}>
              {BEATS.map((b, i) => (
                <Box
                  key={b.title}
                  component={motion.div}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.4 }}
                  sx={{
                    p: 2.5,
                    borderRadius: 3,
                    bgcolor: alpha(theme.palette.background.paper, 0.85),
                    border: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Box
                      sx={{
                        color: "primary.main",
                        mt: 0.3,
                        display: "flex",
                      }}
                    >
                      {b.icon}
                    </Box>
                    <Box>
                      <Typography fontWeight={700} mb={0.5}>
                        {b.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {b.desc}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
