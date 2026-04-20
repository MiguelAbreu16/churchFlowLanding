import { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  alpha,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Bolt from "@mui/icons-material/Bolt";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NAV_LINKS = [
  { label: "Funcionalidades", to: "/#features" },
  { label: "Planes", to: "/pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBar 
      position="fixed" 
      elevation={0} 
      sx={{
        background: scrolled ? "rgba(255, 255, 255, 0.9)" : "#fff",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: `1px solid ${scrolled ? alpha(theme.palette.divider, 0.5) : "transparent"}`,
        py: 0.5,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.2,
              textDecoration: "none",
              color: "#0F172A",
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1.5,
                background: theme.palette.primary.main,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Bolt sx={{ color: "white", fontSize: 20 }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 900,
                letterSpacing: -0.5,
                fontSize: "1.25rem",
              }}
            >
              ChurchFlow
            </Typography>
          </Box>

          {/* Desktop Nav */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 3 }}>
            {NAV_LINKS.map((link) => (
              <Box
                key={link.label}
                component={Link}
                to={link.to}
                sx={{
                  color: "#475569",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  "&:hover": { color: "primary.main" },
                }}
              >
                {link.label}
              </Box>
            ))}
            <Box sx={{ ml: 1, mr: 1, height: 16, width: 1, bgcolor: "divider" }} />
            <Button
              variant="text"
              onClick={() => window.location.href = import.meta.env.VITE_APP_URL || "http://localhost:5173/login"}
              sx={{ fontWeight: 600, color: "#475569" }}
            >
              Iniciar Sesión
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => navigate("/register")}
              sx={{ px: 2.5, py: 1 }}
            >
              Comenzar Prueba
            </Button>
          </Box>

          {/* Mobile Toggle */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" }, color: "#0F172A" }}
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      {/* Mobile Menu */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: { width: "100%", maxWidth: 300, bgcolor: "#fff", p: 3 },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
          <IconButton onClick={() => setMobileOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {NAV_LINKS.map((link) => (
            <ListItem
              button
              key={link.label}
              component={Link}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              sx={{ mb: 1, borderRadius: 2 }}
            >
              <ListItemText
                primary={link.label}
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </ListItem>
          ))}
          <Box sx={{ mt: 4 }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={() => {
                setMobileOpen(false);
                navigate("/register");
              }}
              sx={{ mb: 2 }}
            >
              Prueba Gratuita
            </Button>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              onClick={() => window.location.href = import.meta.env.VITE_APP_URL || "http://localhost:5173/login"}
              sx={{ color: "text.primary", borderColor: "divider" }}
            >
              Iniciar Sesión
            </Button>
          </Box>
        </List>
      </Drawer>
    </AppBar>
  );
}
