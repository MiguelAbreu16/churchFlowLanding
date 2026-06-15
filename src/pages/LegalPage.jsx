import { Container, Typography, Box } from "@mui/material";
import Navbar from "../components/common/Navbar";

export default function LegalPage({ title, children }) {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Navbar />
      <Container maxWidth="md" sx={{ pt: 14, pb: 8 }}>
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 3 }}>
          {title}
        </Typography>
        <Typography component="div" color="text.secondary" sx={{ lineHeight: 1.8 }}>
          {children}
        </Typography>
      </Container>
    </Box>
  );
}
