import { Box, Container, Typography, Grid } from "@mui/material";
import AppRegistration from "@mui/icons-material/AppRegistration";
import Timer from "@mui/icons-material/Timer";
import EventAvailable from "@mui/icons-material/EventAvailable";
import { useTranslation } from "react-i18next";

const STEPS = [
  { key: "register", icon: AppRegistration, color: "#2563EB" },
  { key: "trial", icon: Timer, color: "#10B981" },
  { key: "operate", icon: EventAvailable, color: "#F59E0B" },
];

export default function HowItWorksSection() {
  const { t } = useTranslation();

  return (
    <Box id="how-it-works" className="section" sx={{ bgcolor: "background.default" }}>
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
            {t("howItWorks.eyebrow")}
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.5rem" } }}>
            {t("howItWorks.title")}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {STEPS.map(({ key, icon: Icon, color }, i) => (
            <Grid size={{ xs: 12, md: 4 }} key={key}>
              <Box
                sx={{
                  p: 4,
                  height: "100%",
                  borderRadius: 3,
                  bgcolor: "#fff",
                  border: "1px solid",
                  borderColor: "divider",
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    bgcolor: `${color}14`,
                    color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  <Icon />
                </Box>
                <Typography variant="overline" color="text.disabled" sx={{ fontWeight: 800 }}>
                  {String(i + 1).padStart(2, "0")}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                  {t(`howItWorks.steps.${key}.title`)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {t(`howItWorks.steps.${key}.desc`)}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
