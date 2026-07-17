import { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
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
import LogoMark from "./LogoMark";

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
        <Toolbar disableGutters sx={{ justifyContent: "space-between", minHeight: { xs: 64, md: 72 } }}>
          <Box
            component={Link}
            to="/"
            aria-label="Kahal Zerem"
            sx={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}
          >
            <LogoMark size={52} markSize={46} showLabel />
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: { md: 1, lg: 2 },
              flexWrap: "nowrap",
              flexShrink: 0,
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                display: { xs: "none", lg: "flex" },
                alignItems: "center",
                gap: 2,
              }}
            >
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
                    whiteSpace: "nowrap",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {link.label}
                </Box>
              ))}
            </Box>
            <LangToggle />
            <Box
              sx={{
                mx: 0.5,
                width: "1px",
                height: 16,
                bgcolor: "divider",
                flexShrink: 0,
              }}
            />
            <Button
              variant="text"
              onClick={() => {
                window.location.href = loginUrl;
              }}
              sx={{
                fontWeight: 600,
                color: "#475569",
                whiteSpace: "nowrap",
                flexShrink: 0,
                px: { md: 1.5, lg: 2 },
              }}
            >
              {t("nav.login")}
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => navigate("/register")}
              sx={{
                px: { md: 1.75, lg: 2.5 },
                py: 1,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
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
