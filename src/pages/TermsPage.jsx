import LegalPage from "./LegalPage";
import TermsContent from "../components/legal/TermsContent";
import { CURRENT_TERMS_VERSION } from "../constants/legal";

export default function TermsPage() {
  return (
    <LegalPage title={`Términos de Uso (v${CURRENT_TERMS_VERSION})`}>
      <TermsContent />
    </LegalPage>
  );
}
