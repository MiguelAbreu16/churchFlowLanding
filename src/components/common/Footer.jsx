import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  alpha,
  useTheme,
  IconButton,
} from "@mui/material";
import Bolt from "@mui/icons-material/Bolt";
import GitHub from "@mui/icons-material/GitHub";
import Twitter from "@mui/icons-material/Twitter";
import LinkedIn from "@mui/icons-material/LinkedIn";
import { Link as RouterLink } from "react-router-dom";

const FOOTER_LINKS = {
  Producto: [
    { label: "Funcionalidades", to: "/#features" },
    { label: "Planes", to: "/pricing" },
    { label: "Video Demo", to: "#" },
  ],
  Compañía: [
    { label: "Sobre nosotros", to: "#" },
    { label: "Privacidad", to: "#" },
    { label: "Términos", to: "#" },
  ],
};

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#f8fafc",
        pt: 12,
        pb: 6,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={8} sx={{ mb: 8 }}>
          <Grid item xs={12} md={5}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: 1,
                  bgcolor: "primary.main",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Bolt sx={{ color: "white", fontSize: 20 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 900, letterSpacing: -0.5 }}>
                ChurchFlow
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ maxWidth: 300, mb: 4, lineHeight: 1.8 }}
            >
              La plataforma de infraestructura operativa diseñada para potenciar el ministerio 
              y la experiencia de tu congregación.
            </Typography>
            <Stack direction="row" spacing={1.5}>
              {[GitHub, Twitter, LinkedIn].map((Icon, i) => (
                <IconButton
                  key={i}
                  size="small"
                  sx={{
                    color: "text.secondary",
                    "&:hover": { color: "primary.main", bgcolor: alpha(theme.palette.primary.main, 0.05) },
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <Grid item xs={6} md={3} key={title}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 3, textTransform: "uppercase", letterSpacing: 1 }}>
                {title}
              </Typography>
              <Stack spacing={2}>
                {links.map((link) => (
                  <Typography
                    key={link.label}
                    component={RouterLink}
                    to={link.to}
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      textDecoration: "none",
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    {link.label}
                  </Typography>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            pt: 6,
            borderTop: `1px solid ${theme.palette.divider}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="caption" color="text.disabled">
            © {new Date().getFullYear()} ChurchFlow. Todos los derechos reservados.
          </Typography>
          <Typography variant="caption" color="text.disabled">
            Hecho con ❤️ para la Iglesia global.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
