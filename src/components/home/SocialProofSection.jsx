import { Box, Container, Typography, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function SocialProofSection() {
  const { t } = useTranslation();

  const items = [
    t("hero.proof1"),
    t("hero.proof2"),
    t("hero.proof3"),
  ];

  return (
    <Box sx={{ py: 6, bgcolor: "background.default", borderBottom: "1px solid", borderColor: "divider" }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={5}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 800,
                letterSpacing: 1.5,
                color: "primary.main",
                textTransform: "uppercase",
                display: "block",
                mb: 1.5,
              }}
            >
              {t("socialProof.eyebrow")}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5 }}>
              {t("socialProof.title")}
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
              {t("socialProof.subtitle")}
            </Typography>
          </Grid>
          <Grid item xs={12} md={7}>
            <Grid container spacing={2}>
              {items.map((text) => (
                <Grid item xs={12} sm={4} key={text}>
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: 2,
                      bgcolor: "#fff",
                      border: "1px solid",
                      borderColor: "divider",
                      height: "100%",
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.6 }}>
                      {text}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
