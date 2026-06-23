import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import Close from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import { PRODUCT_TOUR_SLIDES } from "../../constants/screenshots";
import ProductScreenshotCarousel, { SCREENSHOT_ASPECT } from "./ProductScreenshotCarousel";

export default function ProductTourSection() {
  const { t } = useTranslation();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <Box id="product-tour" className="section" sx={{ bgcolor: "#fff" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 5 }}>
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
            {t("productTour.eyebrow")}
          </Typography>
          <Typography variant="h2" sx={{ mb: 2, fontSize: { xs: "2rem", md: "2.5rem" } }}>
            {t("productTour.title")}
          </Typography>
          <Typography sx={{ maxWidth: 560, mx: "auto", color: "text.secondary" }}>
            {t("productTour.subtitle")}
          </Typography>
        </Box>

        <ProductScreenshotCarousel
          slides={PRODUCT_TOUR_SLIDES}
          autoPlayMs={8000}
          onSlideClick={openLightbox}
        />
      </Container>

      <Dialog
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { bgcolor: "#f8fafc", borderRadius: 3 } }}
      >
        <IconButton
          onClick={() => setLightboxOpen(false)}
          sx={{ position: "absolute", right: 8, top: 8, color: "text.primary", zIndex: 2 }}
          aria-label="close"
        >
          <Close />
        </IconButton>
        <DialogContent sx={{ p: { xs: 2, md: 3 }, pt: 5 }}>
          <ProductScreenshotCarousel
            slides={PRODUCT_TOUR_SLIDES}
            autoPlayMs={0}
            startIndex={lightboxIndex}
            aspectRatio={SCREENSHOT_ASPECT}
            frameBg="#f8fafc"
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
