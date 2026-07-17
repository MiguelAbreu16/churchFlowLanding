import { Box, Button, Stack, useMediaQuery, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import RocketLaunch from "@mui/icons-material/RocketLaunch";

export default function StickyMobileCta() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isMobile || location.pathname !== "/") {
      setVisible(false);
      return undefined;
    }
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile, location.pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <Box
          component={motion.div}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          sx={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1200,
            p: 1.5,
            pb: "max(12px, env(safe-area-inset-bottom))",
            bgcolor: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(12px)",
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Stack direction="row" spacing={1}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<RocketLaunch />}
              onClick={() => navigate("/register")}
              sx={{ fontWeight: 800, py: 1.4 }}
            >
              {t("sticky.cta")}
            </Button>
          </Stack>
        </Box>
      )}
    </AnimatePresence>
  );
}
