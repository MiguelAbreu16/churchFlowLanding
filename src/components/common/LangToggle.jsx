import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useTranslation } from "react-i18next";

const SUPPORTED = ["es", "en", "pt", "fr", "ht"];

export default function LangToggle({ size = "small" }) {
  const { i18n } = useTranslation();
  const base = i18n.language?.split("-")[0] || "es";
  const lang = SUPPORTED.includes(base) ? base : "es";

  return (
    <ToggleButtonGroup
      size={size}
      value={lang}
      exclusive
      onChange={(_, value) => {
        if (value) i18n.changeLanguage(value);
      }}
      aria-label="language"
      sx={{
        "& .MuiToggleButton-root": {
          px: 1.5,
          py: 0.25,
          fontWeight: 700,
          fontSize: "0.75rem",
          borderColor: "divider",
        },
      }}
    >
      <ToggleButton value="es">ES</ToggleButton>
      <ToggleButton value="en">EN</ToggleButton>
      <ToggleButton value="pt">PT</ToggleButton>
      <ToggleButton value="fr">FR</ToggleButton>
      <ToggleButton value="ht">HT</ToggleButton>
    </ToggleButtonGroup>
  );
}
