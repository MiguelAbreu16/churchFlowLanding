import { createTheme } from "@mui/material/styles";

// A more professional, trustworthy "Corporate SaaS" theme
// Inspired by high-trust platforms like Stripe, Slack, and Linear
export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2563EB", // Deep, reliable Blue
      light: "#60A5FA",
      dark: "#1E40AF",
      contrastText: "#fff",
    },
    secondary: {
      main: "#10B981", // Solid Green for success/conversion
      light: "#34D399",
      dark: "#059669",
    },
    background: {
      default: "#F8FAFC", // Soft Gray/White background
      paper: "#FFFFFF",
    },
    text: {
      primary: "#0F172A", // Deep Navy/Slate for readability
      secondary: "#475569",
      disabled: "#94A3B8",
    },
    divider: "#E2E8F0",
    error: { main: "#EF4444" },
    warning: { main: "#F59E0B" },
    success: { main: "#10B981" },
  },
  typography: {
    fontFamily: '"Inter", "Outfit", sans-serif',
    h1: { 
      fontWeight: 800, 
      letterSpacing: "-0.03em",
      color: "#0F172A", 
    },
    h2: { 
      fontWeight: 700, 
      letterSpacing: "-0.02em",
      color: "#0F172A",
    },
    h3: { 
      fontWeight: 700, 
      color: "#1E293B",
    },
    h4: { 
      fontWeight: 600,
      color: "#1E293B",
    },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    subtitle1: { color: "#475569" },
    body1: { lineHeight: 1.7, color: "#334155" },
    button: { 
      fontFamily: '"Inter", sans-serif', 
      fontWeight: 600,
    },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollBehavior: "smooth",
          "& .section": {
            padding: "100px 0",
          },
          "& .gradient-text": {
            background: "linear-gradient(135deg, #1E40AF 0%, #2563EB 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          fontWeight: 600,
          padding: "10px 20px",
          transition: "all 0.2s ease-in-out",
        },
        containedPrimary: {
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
          "&:hover": {
            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
            transform: "translateY(-1px)",
          },
        },
        outlined: {
          borderColor: "#E2E8F0",
          color: "#0F172A",
          "&:hover": {
            backgroundColor: "#F1F5F9",
            borderColor: "#CBD5E1",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          "&.glass-card": {
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(226, 232, 240, 0.8)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            backgroundColor: "#fff",
            "& fieldset": {
              borderColor: "#E2E8F0",
            },
            "&:hover fieldset": {
              borderColor: "#CBD5E1",
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(12px)",
          color: "#0F172A",
          borderBottom: "1px solid #E2E8F0",
        },
      },
    },
  },
});
