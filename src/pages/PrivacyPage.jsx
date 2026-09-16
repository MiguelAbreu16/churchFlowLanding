import LegalPage from "./LegalPage";
import { CURRENT_TERMS_VERSION } from "../constants/legal";

export default function PrivacyPage() {
  return (
    <LegalPage title="Política de Privacidad">
      <p>
        <strong>Versión alineada a TyC {CURRENT_TERMS_VERSION}.</strong>{" "}
        Recopilamos datos de cuenta (nombre, correo, iglesia) para operar
        Kahal Zerem. Cumplimos con la normativa de protección de datos aplicable
        en la jurisdicción del Cliente (p. ej. Ley 172-13 en República
        Dominicana y, cuando corresponda, regímenes equivalentes).
      </p>
      <p>
        El Cliente (iglesia) es el Responsable del Tratamiento de los datos que
        carga en la plataforma: miembros, menores y tutores, alergias y
        medicamentos, fotos de check-out, placas vehiculares, campistas y
        contactos de emergencia. Kahal Zerem actúa como Encargado para prestar
        el servicio.
      </p>
      <p>
        Los correos promocionales solo se envían con consentimiento explícito.
        Puedes darte de baja desde el enlace en cada correo. Las fotos de
        retiro de menores y demás datos sensibles deben usarse solo con
        personal autorizado y con las finalidades informadas a los titulares.
      </p>
      <p>
        Para ejercer derechos de acceso, rectificación o eliminación respecto de
        tu cuenta de administrador, escríbenos a soporte@kahalzerem.com. Las
        solicitudes sobre datos de congregantes deben dirigirse primero a tu
        iglesia.
      </p>
    </LegalPage>
  );
}
