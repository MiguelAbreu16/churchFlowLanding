import {
  Box,
  Container,
  Typography,
  Grid,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const STOPS = [
  "arrive",
  "door",
  "people",
  "cells",
  "gathering",
  "formation",
  "house",
];

export default function ChurchWalkSection() {
  const { t } = useTranslation();

  return (
    <Box id="recorrido" className="section" sx={{ bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 680, mb: 6 }}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 800,
              letterSpacing: 1.5,
              color: "secondary.dark",
              textTransform: "uppercase",
              display: "block",
              mb: 2,
            }}
          >
            {t("walk.eyebrow")}
          </Typography>
          <Typography variant="h2" sx={{ mb: 2, fontSize: { xs: "2rem", md: "2.75rem" } }}>
            {t("walk.title")}
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: "1.05rem", lineHeight: 1.7 }}>
            {t("walk.subtitle")}
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {STOPS.map((key, index) => (
            <Grid key={key} size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  height: "100%",
                  p: 3,
                  borderRadius: 2,
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: "0.75rem",
                    letterSpacing: 1,
                    color: "primary.main",
                    mb: 1,
                  }}
                >
                  {String(index + 1).padStart(2, "0")} · {t(`walk.stops.${key}.plan`)}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                  {t(`walk.stops.${key}.title`)}
                </Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {t(`walk.stops.${key}.body`)}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
