import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  alpha,
  useTheme,
} from "@mui/material";
import Check from "@mui/icons-material/Check";
import { useTranslation } from "react-i18next";
import { MODULE_PREVIEWS } from "../../constants/screenshots";
import { SCREENSHOT_ASPECT } from "./ProductScreenshotCarousel";

const TAB_KEYS = ["liveOps", "layouts", "teams", "events", "parking", "analytics"];
const PREMIUM_TABS = new Set(["events", "parking", "analytics"]);

export default function FeatureModulesSection() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [tab, setTab] = useState(0);
  const activeKey = TAB_KEYS[tab];

  return (
    <Box id="modules" className="section" sx={{ bgcolor: "#fff" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
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
            {t("modules.eyebrow")}
          </Typography>
          <Typography variant="h2" sx={{ mb: 2, fontSize: { xs: "2rem", md: "2.75rem" } }}>
            {t("modules.title")}
          </Typography>
          <Typography sx={{ maxWidth: 640, mx: "auto", color: "text.secondary", fontSize: "1.05rem" }}>
            {t("modules.subtitle")}
          </Typography>
        </Box>

        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            mb: 4,
            "& .MuiTab-root": { fontWeight: 600, textTransform: "none", minHeight: 48 },
          }}
        >
          {TAB_KEYS.map((key) => (
            <Tab
              key={key}
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {t(`modules.tabs.${key}`)}
                  {PREMIUM_TABS.has(key) && (
                    <Chip
                      label={t(`modules.${key}.badge`)}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: "0.65rem",
                        fontWeight: 800,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: "primary.main",
                      }}
                    />
                  )}
                </Box>
              }
            />
          ))}
        </Tabs>

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
              {t(`modules.${activeKey}.title`)}
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
              {t(`modules.${activeKey}.desc`)}
            </Typography>
            <List dense disablePadding>
              {[0, 1, 2].map((i) => (
                <ListItem key={i} disableGutters sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Check sx={{ color: "primary.main", fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText primary={t(`modules.${activeKey}.bullets.${i}`)} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: `0 20px 40px -15px ${alpha(theme.palette.primary.main, 0.15)}`,
                bgcolor: "#f1f5f9",
                aspectRatio: SCREENSHOT_ASPECT,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 1,
              }}
            >
              <Box
                component="img"
                src={MODULE_PREVIEWS[activeKey]}
                alt={t(`modules.${activeKey}.title`)}
                loading="lazy"
                decoding="async"
                sx={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                  display: "block",
                  borderRadius: 1,
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
