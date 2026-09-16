import { CURRENT_TERMS_VERSION } from "../../constants/legal";

/** Shared TyC body — used by TermsPage and register scroll modal. */
export default function TermsContent() {
  return (
    <>
      <p>
        <strong>Versión {CURRENT_TERMS_VERSION}</strong>. Al crear una cuenta o
        usar Kahal Zerem aceptas estos Términos y Condiciones. El servicio se
        ofrece como software en la nube (SaaS) para la gestión operativa de
        iglesias y ministerios.
      </p>

      <h3>1. Naturaleza del servicio</h3>
      <p>
        Kahal Zerem es una herramienta tecnológica. La iglesia u organización
        cliente (“Cliente”) actúa como <strong>Responsable del Tratamiento</strong>{" "}
        de los datos personales que registra (miembros, menores, campistas,
        vehículos, asistentes). Kahal Zerem actúa como{" "}
        <strong>Encargado del Tratamiento</strong> para prestar las
        funcionalidades contratadas, salvo respecto de datos propios de cuenta,
        facturación y soporte.
      </p>

      <h3>2. Propiedad Intelectual y Uso Aceptable</h3>
      <p>
        El pago de un plan o trial otorga únicamente una{" "}
        <strong>
          licencia de uso limitada, no exclusiva, intransferible y revocable
        </strong>{" "}
        de la suscripción SaaS. El Cliente{" "}
        <strong>no adquiere propiedad</strong> del código fuente, algoritmos,
        interfaces, Layout Builder, matrices o plantillas de distribución de
        asientos, esquemas de base de datos, marcas, documentación ni ningún
        otro componente de Kahal Zerem.
      </p>
      <p>Queda prohibido, salvo autorización escrita previa:</p>
      <ul>
        <li>Ingeniería inversa, descompilación o intento de extraer el código.</li>
        <li>
          Copia, sublicencia, redistribución o reventa del software o de sus
          componentes (incluidas matrices de asientos y configuraciones de
          producto).
        </li>
        <li>
          Extracción masiva de datos ajenos a la operación legítima del Cliente,
          scraping, bots abusivos o bloqueo intencional de inventario (asientos,
          espacios de estacionamiento u otros recursos).
        </li>
      </ul>

      <h3>3. Suspensión de cuenta</h3>
      <p>
        Nos reservamos el derecho de{" "}
        <strong>pausar o suspender el acceso</strong> de una organización
        (incluidos estados PAUSED / SUSPENDED) si detectamos uso ilícito, fraude,
        abuso técnico, violación de derechos de autor de terceros, o
        incumplimiento de estos Términos. La suspensión puede aplicarse desde el
        panel de administración de la plataforma sin perjuicio de otras acciones
        legales.
      </p>

      <h3>4. Módulos críticos</h3>
      <p>
        <strong>Iglesia de niños (Kids):</strong> el Cliente es responsable de
        la custodia presencial, consentimientos parentales, autorización para
        fotos y datos de salud, y del uso correcto de PINs y listados por
        personal autorizado. La plataforma no garantiza la identidad absoluta de
        quien retira a un menor ni sustituye protocolos de seguridad física.
      </p>
      <p>
        <strong>Tickets y códigos QR:</strong> son credenciales personales e
        intransferibles. Queda prohibida su reventa, cesión o publicación. La
        validación de un código acredita el código, no la identidad biométrica
        del portador.
      </p>
      <p>
        <strong>Asientos y layouts:</strong> son herramientas de gestión
        operativa; no garantizan aforo al 100% ante concurrencia, errores de
        configuración o abuso. Aplicamos límites de plan y uso justo (fair use).
      </p>
      <p>
        <strong>Estacionamiento:</strong> el registro de placas y vehículos es
        organizativo; no constituye vigilancia 24/7 ni seguro de vehículos. No
        respondemos por hurto, daños o accidentes en el predio.
      </p>
      <p>
        <strong>Campamentos y alojamiento:</strong> la supervisión presencial,
        separación por edades/sexos y protocolos de seguridad son
        responsabilidad exclusiva del Cliente. Los datos de salud y contactos de
        emergencia se tratan bajo su responsabilidad.
      </p>

      <h3>5. Facturación y trial</h3>
      <p>
        Los planes pueden incluir prueba de 14 días. Tras el trial se factura
        según el plan elegido (p. ej. vía PayPal). Puedes cancelar al final del
        período de facturación desde la app o el proveedor de pagos.
      </p>

      <h3>6. Limitación de responsabilidad</h3>
      <p>
        En la máxima medida permitida por la ley, Kahal Zerem no responde por
        daños indirectos, lucro cesante, pérdida de datos por causas atribuibles
        al Cliente o a terceros, ni por decisiones operativas del Cliente. Esta
        limitación no excluye responsabilidad por dolo, culpa grave u
        obligaciones inderogables aplicables a datos de menores o consumidores.
      </p>

      <h3>7. Contacto</h3>
      <p>
        Para soporte: soporte@kahalzerem.com. El tratamiento de datos personales
        se detalla en la Política de Privacidad.
      </p>
    </>
  );
}
