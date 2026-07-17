import { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Alert,
  Stack,
  IconButton,
  alpha,
  useTheme,
} from "@mui/material";
import Send from "@mui/icons-material/Send";
import AttachFile from "@mui/icons-material/AttachFile";
import Close from "@mui/icons-material/Close";
import { useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { SUBMIT_CONTACT_INQUIRY } from "../graphql/operations";
import { PLANS } from "../constants/plans";

const MAX_ATTACHMENTS = 3;
const MAX_BYTES = 400 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif"];

function readFileAsAttachment(file) {
  return new Promise((resolve, reject) => {
    if (!ALLOWED.includes(file.type)) {
      reject(new Error("Solo se permiten imágenes JPG, PNG, WEBP o GIF"));
      return;
    }
    if (file.size > MAX_BYTES) {
      reject(new Error("Cada imagen debe pesar menos de 400KB"));
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve({
        name: file.name,
        mimeType: file.type,
        dataUrl: reader.result,
      });
    };
    reader.onerror = () => reject(new Error("No se pudo leer la imagen"));
    reader.readAsDataURL(file);
  });
}

export default function ContactPage() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: "",
    churchName: "",
    email: "",
    planInterest: "",
    message: "",
  });
  const [attachments, setAttachments] = useState([]);
  const [attachError, setAttachError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [submit, { loading, error }] = useMutation(SUBMIT_CONTACT_INQUIRY);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = "";
    setAttachError("");
    if (!files.length) return;
    try {
      const next = [...attachments];
      for (const file of files) {
        if (next.length >= MAX_ATTACHMENTS) break;
        next.push(await readFileAsAttachment(file));
      }
      setAttachments(next.slice(0, MAX_ATTACHMENTS));
    } catch (err) {
      setAttachError(err.message || "Error al adjuntar");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submit({
        variables: {
          ...form,
          pageUrl: window.location.href,
          userAgent: navigator.userAgent,
          attachments,
        },
      });
      setSubmitted(true);
    } catch {
      /* error state from Apollo */
    }
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Navbar />
      <Box
        sx={{
          pt: { xs: 12, md: 16 },
          pb: 8,
          background: `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 400px)`,
        }}
      >
        <Container maxWidth="sm">
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 1.5 }}>
              {t("contact.title")}
            </Typography>
            <Typography color="text.secondary">{t("contact.subtitle")}</Typography>
          </Box>

          <Paper
            elevation={0}
            component="form"
            onSubmit={handleSubmit}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 4,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            {submitted ? (
              <Alert severity="success">{t("contact.success")}</Alert>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                <TextField
                  required
                  label={t("contact.name")}
                  value={form.name}
                  onChange={handleChange("name")}
                  fullWidth
                />
                <TextField
                  required
                  label={t("contact.church")}
                  value={form.churchName}
                  onChange={handleChange("churchName")}
                  fullWidth
                />
                <TextField
                  required
                  type="email"
                  label={t("contact.email")}
                  value={form.email}
                  onChange={handleChange("email")}
                  fullWidth
                />
                <TextField
                  select
                  label={t("contact.plan")}
                  value={form.planInterest}
                  onChange={handleChange("planInterest")}
                  fullWidth
                >
                  <MenuItem value="">{t("contact.planAny")}</MenuItem>
                  {PLANS.map((p) => (
                    <MenuItem key={p.id} value={p.id}>
                      {t(p.nameKey)}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  required
                  multiline
                  minRows={4}
                  label={t("contact.message")}
                  value={form.message}
                  onChange={handleChange("message")}
                  fullWidth
                />
                <Box>
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<AttachFile />}
                    sx={{ textTransform: "none" }}
                  >
                    Adjuntar imágenes (máx. {MAX_ATTACHMENTS})
                    <input
                      type="file"
                      hidden
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      multiple
                      onChange={handleFiles}
                    />
                  </Button>
                  {attachError && (
                    <Alert severity="warning" sx={{ mt: 1 }}>
                      {attachError}
                    </Alert>
                  )}
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ mt: 1, flexWrap: "wrap" }}
                    useFlexGap
                  >
                    {attachments.map((att, idx) => (
                      <Box
                        key={`${att.name}-${idx}`}
                        sx={{ position: "relative" }}
                      >
                        <Box
                          component="img"
                          src={att.dataUrl}
                          alt={att.name}
                          sx={{
                            width: 72,
                            height: 72,
                            objectFit: "cover",
                            borderRadius: 2,
                            border: `1px solid ${theme.palette.divider}`,
                          }}
                        />
                        <IconButton
                          size="small"
                          onClick={() =>
                            setAttachments((prev) =>
                              prev.filter((_, i) => i !== idx),
                            )
                          }
                          sx={{
                            position: "absolute",
                            top: -8,
                            right: -8,
                            bgcolor: "background.paper",
                            boxShadow: 1,
                          }}
                        >
                          <Close fontSize="small" />
                        </IconButton>
                      </Box>
                    ))}
                  </Stack>
                </Box>
                {error && <Alert severity="error">{t("contact.error")}</Alert>}
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  endIcon={<Send />}
                  disabled={loading}
                  sx={{ py: 1.5 }}
                >
                  {loading ? t("contact.sending") : t("contact.send")}
                </Button>
              </Box>
            )}
          </Paper>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
