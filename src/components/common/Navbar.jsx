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
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LangToggle from "./LangToggle";

const APP_URL = import.meta.env.VITE_APP_URL || "http://localhost:5173";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const NAV_LINKS = [
    { label: t("nav.modules"), to: "/#modules" },
    { label: t("nav.pricing"), to: "/pricing" },
    { label: t("nav.contact"), to: "/contacto" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const loginUrl = `${APP_URL}/login`;

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
            <img
              src="/logo.png"
              alt="Kahal Zerem"
              style={{ width: 32, height: 32, objectFit: "contain" }}
            />
            <Typography variant="h6" sx={{ fontWeight: 900, letterSpacing: -0.5, fontSize: "1.25rem" }}>
              Kahal Zerem
            </Typography>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2 }}>
            {NAV_LINKS.map((link) => (
              <Box
                key={link.to}
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
            <LangToggle />
            <Box sx={{ ml: 0.5, mr: 0.5, height: 16, width: 1, bgcolor: "divider" }} />
            <Button
              variant="text"
              onClick={() => { window.location.href = loginUrl; }}
              sx={{ fontWeight: 600, color: "#475569" }}
            >
              {t("nav.login")}
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => navigate("/register")}
              sx={{ px: 2.5, py: 1 }}
            >
              {t("nav.startTrial")}
            </Button>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", gap: 1 }}>
            <LangToggle />
            <IconButton sx={{ color: "#0F172A" }} onClick={() => setMobileOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{ sx: { width: "100%", maxWidth: 300, bgcolor: "#fff", p: 3 } }}
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
              key={link.to}
              component={Link}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              sx={{ mb: 1, borderRadius: 2 }}
            >
              <ListItemText primary={link.label} primaryTypographyProps={{ fontWeight: 600 }} />
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
              {t("nav.freeTrial")}
            </Button>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              onClick={() => { window.location.href = loginUrl; }}
              sx={{ color: "text.primary", borderColor: "divider" }}
            >
              {t("nav.login")}
            </Button>
          </Box>
        </List>
      </Drawer>
    </AppBar>
  );
}
