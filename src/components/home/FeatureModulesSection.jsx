import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
} from "@mui/material";
import Check from "@mui/icons-material/Check";
import QrCode2 from "@mui/icons-material/QrCode2";
import PeopleAlt from "@mui/icons-material/PeopleAlt";
import Diversity3 from "@mui/icons-material/Diversity3";
import AccountBalance from "@mui/icons-material/AccountBalance";
import School from "@mui/icons-material/School";
import VolunteerActivism from "@mui/icons-material/VolunteerActivism";
import { useTranslation } from "react-i18next";
import { MODULE_PREVIEWS } from "../../constants/screenshots";
import TabletFrame from "./TabletFrame";

const TAB_KEYS = [
  "qr",
  "liveOps",
  "people",
  "cells",
  "eventPlans",
  "formation",
  "offerings",
  "layouts",
  "events",
  "parking",
  "camps",
  "kids",
  "network",
  "analytics",
];
const MODULE_ICONS = {
  qr: QrCode2,
  people: PeopleAlt,
  cells: Diversity3,
  eventPlans: AccountBalance,
  formation: School,
  offerings: VolunteerActivism,
};

export default function FeatureModulesSection() {
  const { t } = useTranslation();
  const [tab, setTab] = useState(0);
  const activeKey = TAB_KEYS[tab];
  const badgeFor = (key) => {
    const value = t(`modules.${key}.badge`, { defaultValue: "" });
    return value || null;
  };
  const bullets = t(`modules.${activeKey}.bullets`, { returnObjects: true });
  const bulletList = Array.isArray(bullets) ? bullets : [0, 1, 2].map((i) => t(`modules.${activeKey}.bullets.${i}`));

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

        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            gap: 1,
            mb: 3,
            overflowX: "auto",
            pb: 0.5,
          }}
        >
          {TAB_KEYS.map((key, index) => (
                <ModuleButton
                  key={key}
                  active={tab === index}
                  featured={key === "qr"}
                  label={t(`modules.tabs.${key}`)}
                  badge={badgeFor(key)}
                  onClick={() => setTab(index)}
                />
          ))}
        </Box>

        <Grid container spacing={4} sx={{ alignItems: "flex-start" }}>
          <Grid size={{ xs: 12, md: 4 }} sx={{ display: { xs: "none", md: "block" } }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {TAB_KEYS.map((key, index) => (
                <ModuleButton
                  key={key}
                  active={tab === index}
                  featured={key === "qr"}
                  label={t(`modules.tabs.${key}`)}
                  badge={badgeFor(key)}
                  onClick={() => setTab(index)}
                  fullWidth
                />
              ))}
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Grid container spacing={3} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, md: activeKey === "qr" ? 12 : 6 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
              {t(`modules.${activeKey}.title`)}
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
              {t(`modules.${activeKey}.desc`)}
            </Typography>
            {activeKey === "qr" ? (
              <QrShowcase />
            ) : (
              <List dense disablePadding>
                {bulletList.map((text, i) => (
                  <ListItem key={i} disableGutters sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Check sx={{ color: "primary.main", fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            )}
          </Grid>
          {activeKey === "qr" ? null : (
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              {MODULE_PREVIEWS[activeKey] ? (
                <TabletFrame
                  src={MODULE_PREVIEWS[activeKey]}
                  alt={t(`modules.${activeKey}.title`)}
                />
              ) : (
                <ModuleMark icon={MODULE_ICONS[activeKey]} label={t(`modules.${activeKey}.title`)} />
              )}
            </Box>
          </Grid>
          )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function QrShowcase() {
  const { t } = useTranslation();
  const requests = t("modules.qr.requests", { returnObjects: true });
  const codes = t("modules.qr.codes", { returnObjects: true });

  return (
    <Box>
      <Box
        sx={{
          mb: 3,
          p: { xs: 2, md: 2.5 },
          borderRadius: 2,
          border: "1px solid",
          borderColor: "secondary.dark",
          bgcolor: "background.default",
        }}
      >
        <Typography
          variant="overline"
          sx={{ fontWeight: 800, letterSpacing: 1.2, color: "secondary.dark", display: "block" }}
        >
          {t("modules.qr.highlightEyebrow")}
        </Typography>
        <Typography sx={{ fontWeight: 800, mb: 1.5, fontSize: "1.05rem" }}>
          {t("modules.qr.highlightTitle")}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 1.5, lineHeight: 1.7 }}>
          {t("modules.qr.templates")}
        </Typography>
        <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
          {t("modules.qr.emails")}
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography sx={{ fontWeight: 800, mb: 1 }}>{t("modules.qr.requestsTitle")}</Typography>
          <CheckList items={Array.isArray(requests) ? requests : []} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography sx={{ fontWeight: 800, mb: 1 }}>{t("modules.qr.codesTitle")}</Typography>
          <CheckList items={Array.isArray(codes) ? codes : []} />
        </Grid>
      </Grid>
    </Box>
  );
}

function CheckList({ items }) {
  return (
    <List dense disablePadding>
      {items.map((text) => (
        <ListItem key={text} disableGutters sx={{ py: 0.35, alignItems: "flex-start" }}>
          <ListItemIcon sx={{ minWidth: 28, mt: 0.3 }}>
            <Check sx={{ color: "primary.main", fontSize: 18 }} />
          </ListItemIcon>
          <ListItemText
            primary={text}
            slotProps={{ primary: { sx: { lineHeight: 1.45 } } }}
          />
        </ListItem>
      ))}
    </List>
  );
}

function ModuleMark({ icon: Icon, label }) {
  if (!Icon) return null;
  return (
    <Box sx={{ textAlign: "center", px: 3, color: "primary.main" }}>
      <Icon sx={{ fontSize: 56, mb: 1.5 }} />
      <Typography sx={{ fontWeight: 700, color: "text.primary" }}>{label}</Typography>
    </Box>
  );
}

function ModuleButton({ active, featured = false, label, badge, onClick, fullWidth = false }) {
  return (
    <Button
      onClick={onClick}
      variant={active ? "contained" : "outlined"}
      color={active ? "primary" : "inherit"}
      fullWidth={fullWidth}
      sx={{
        height: 44,
        minHeight: 44,
        px: 2,
        flexShrink: 0,
        justifyContent: fullWidth ? "space-between" : "center",
        gap: 1,
        whiteSpace: "nowrap",
        fontWeight: featured ? 800 : 600,
        borderColor: active ? "primary.main" : featured ? "secondary.dark" : "divider",
        color: active ? "primary.contrastText" : featured ? "secondary.dark" : "text.primary",
      }}
    >
      <Box component="span" sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
        {label}
      </Box>
      {badge ? (
        <Box
          component="span"
          sx={{
            fontSize: "0.65rem",
            fontWeight: 800,
            letterSpacing: 0.3,
            lineHeight: 1,
            opacity: 0.9,
          }}
        >
          {badge}
        </Box>
      ) : null}
    </Button>
  );
}
