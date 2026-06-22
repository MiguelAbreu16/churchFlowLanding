import { Box, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import PricingSection from "../components/home/PricingSection";

export default function PricingPage() {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      <Box
        sx={{
          pt: 16,
          pb: 4,
          textAlign: "center",
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 70%)",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="caption"
            sx={{
              fontWeight: 900,
              letterSpacing: 3,
              color: "primary.light",
              textTransform: "uppercase",
              display: "block",
              mb: 2,
            }}
          >
            {t("pricing.pageEyebrow")}
          </Typography>
          <Typography variant="h1" sx={{ fontSize: { xs: "2.5rem", md: "3.5rem" }, mb: 3 }}>
            {t("pricing.pageTitle")}{" "}
            <Box component="span" className="gradient-text">
              {t("pricing.pageTitleHighlight")}
            </Box>
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
            {t("pricing.pageSubtitle")}
          </Typography>
        </Container>
      </Box>
      <PricingSection showComparison />
      <Footer />
    </>
  );
}
