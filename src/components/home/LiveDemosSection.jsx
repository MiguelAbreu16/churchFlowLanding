import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Grid,
  alpha,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import SeatMapDemo from "./SeatMapDemo";
import ParkingMapDemo from "./ParkingMapDemo";
import CampBedsDemo from "./CampBedsDemo";

const DEMO_KEYS = ["seats", "parking", "camps"];

export default function LiveDemosSection() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [tab, setTab] = useState(0);

  return (
    <Box
      id="live-demos"
      className="section"
      sx={{
        bgcolor: alpha(theme.palette.primary.main, 0.03),
        borderTop: `1px solid ${theme.palette.divider}`,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 4 }}>
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
            {t("liveDemos.eyebrow")}
          </Typography>
          <Typography
            variant="h2"
            sx={{ mb: 2, fontSize: { xs: "2rem", md: "2.75rem" } }}
          >
            {t("liveDemos.title")}
          </Typography>
          <Typography
            sx={{
              maxWidth: 640,
              mx: "auto",
              color: "text.secondary",
              fontSize: "1.05rem",
            }}
          >
            {t("liveDemos.subtitle")}
          </Typography>
        </Box>

        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          centered={false}
          sx={{
            mb: 3,
            "& .MuiTabs-flexContainer": {
              justifyContent: { md: "center" },
            },
            "& .MuiTab-root": {
              fontWeight: 700,
              textTransform: "none",
              minHeight: 48,
            },
          }}
        >
          {DEMO_KEYS.map((key) => (
            <Tab key={key} label={t(`liveDemos.tabs.${key}`)} />
          ))}
        </Tabs>

        <Grid container sx={{ justifyContent: "center" }}>
          <Grid size={{ xs: 12, md: 10, lg: 8 }}>
            {tab === 0 ? <SeatMapDemo /> : null}
            {tab === 1 ? <ParkingMapDemo /> : null}
            {tab === 2 ? <CampBedsDemo /> : null}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
