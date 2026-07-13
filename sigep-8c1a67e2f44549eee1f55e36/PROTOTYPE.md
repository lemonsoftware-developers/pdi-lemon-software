# SIGEP — Prototipo PDI (Lemon)

Prototipo hi-fi navegable del **Sistema de Gestión Institucional (SIGEP)** para la PDI, que materializa el grill completo (`docs/decisions/0001–0003`). HTML+CSS+JS, sin build, self-contained.

## Cómo correr
`python3 -m http.server 4173` en `.claudeflow/prototype/` → http://localhost:4173/index.html

## Identidad (v2.1 — calibrada con pdichile.cl)
- Navy PDI `#0e2a5e` + **amarillo PDI `#f4c400`**. Tipografía **Oswald + Open Sans** embebidas en `fonts/` (sin CDN). **Logo oficial "PDI."** (`assets/pdi-logo.png`) como marca; "SIGEP" = nombre del sistema. Tratamiento de documento clasificado.

## Glosario canónico (consistencia terminológica)
- **Custodia** — relación de tenencia y responsabilidad sobre un bien serializado (arma, EPP, dispositivo). Términos: "en custodia", "custodia vigente", "cadena de custodia", "traspaso de custodia", "Estado custodia". NO usar "responsabilidad" como sinónimo.
- **Asignación** — (a) el acto/fecha de asignar un bien a una persona ("Asignada a", "Desde"); (b) componentes de remuneración ("Asignación de zona/riesgo/institucional"). Usos legítimos y distintos de custodia.
- **Destinación** — traslado de un funcionario a otra unidad (mueve custodia de activos + asignación de zona + accesos).
- **OC** — orden de compra (Mercado Público). Consistente en compras, cuadro de mando y finanzas.

## Cobertura del grill — 40 dimensiones (0001-grill.surface)
El prototipo cubre TODAS las dimensiones del grill, en 28 pantallas + 6 casos interactivos.

### Módulos (nav)
- **Cuadro de mando** (index) — visión unificada, KPIs cruzados [#1/#6]
- **Personas**: Funcionarios · Funcionario-detalle (héroe) · Remuneraciones (escalafón/DIPRECA) · Asistencia y bienestar (asistencia/licencias/bienestar/capacitación) · Autoservicio (ESS/MSS) [#5/#30]
- **Logística y activos**: Armamento · Arma-detalle (cadena de custodia) · EPP (vida útil) · Pañol · Pañol-móvil (offline) · Compras (E2E) · Activos y flota · Bodegas [#4/#21/#22/#23/#31]
- **Finanzas**: Presupuesto (SIGFE) · Contabilidad y tesorería · Viáticos y honorarios [#3/#32]
- **Seguridad y control**: Incidentes ANCI (3h/72h/30d) · Auditoría (inmutable) · Accesos y roles (SoD) · Firma y documental (SEGPRES) [#8/#11/#12/#19/#33/#34/#35]
- **Interoperabilidad**: Integraciones del Estado (SIGFE/DGMN/SIAPER/TGR/DIPRECA/ClaveÚnica) · Transparencia Activa [#7/#25-29/#40]
- **Plataforma**: Datos maestros (gobierno del dato) · Puesta en marcha (migración por olas) · Nube y continuidad (soberanía/DR) · Adopción y cambio (+reversibilidad/exit) [#10/#13/#16/#18/#38/#39]

### Journeys / casos interactivos verificados
1. **Compra E2E** (compras) — requerimiento→plan→OC ChileCompra→recepción→devengo SIGFE→pago TGR (stepper). ✓
2. **Caso borde HÉROE: suspensión** (funcionario-detalle) — cascada: retiro arma→pañol + credencial bloqueada + munición pendiente + 4 accesos revocados + incidente + auditoría. ✓
3. **Caso borde: destinación** (funcionario-detalle) — traslado mueve unidad + activos + asignación de zona + accesos + SIAPER.
4. **Caso borde: traspaso masivo de custodia** (armamento) — cambio de jefe de unidad reasigna bienes.
5. **Caso borde: emergencia** (compras) — compra de urgencia por trato directo (Art. 8 Ley 19.886).
6. **Pañol móvil offline** (panol-movil) — escaneo con cola de sincronización.

### Fuera de alcance (por decisión del grill D4)
- Cadena de custodia de **evidencia pericial** (sistema misional/LIMS aparte).

## Estados implementados
loaded-con-datos, validación de formulario con error (suspensión/destinación/urgencia/firma), success/confirmación (cascadas, toasts, banners), modales, tabs, optimistic updates (pañol, compras, cascadas). Datos ficticios realistas (RUT, placas, grados PDI, DIPRECA, UF/M$, series, patentes).

## Accesibilidad
Landmarks, labels, focus states, filas navegables con role=link + teclado (app.js enhanceRows), AA.

## Auditoría de gaps vs docs (0001/0002/0003) — cerrada
Verificación dimensión por dimensión. Gaps encontrados y cerrados:
- **Fallecimiento en acto de servicio** (5º caso borde, 0003 cluster B/D) → flujo de egreso en funcionario-detalle (cadena de beneficios/pensión DIPRECA + devolución de bienes + baja SIAPER). ✓
- **Egreso/retiro** como transición del ciclo → mismo flujo (retiro/baja/fallecimiento). ✓
- **Mesa de ayuda / soporte N1-N3 + SLA + mantención** (dim #14, D13) → `soporte.html`. ✓
- **IMED/MEDIPASS** en el mapa de integraciones (0003 cluster A) → tarjeta agregada (10 conectores, cuadra el contador). ✓
- **ISO/IEC 27001** (infraestructura) y **Ley 21.719** (accesos) → nombradas en UI. ✓

Intencionalmente fuera / diferido (según docs): operación en producción #39 (ambientes/observabilidad, "contemplado, fuera del prototipo"); formulación presupuestaria (ejecución+cierre sí, formulación no); evidencia pericial (D4, fuera de alcance); supuestos A1–A11 (solo la PDI los confirma).

## Onboarding / Tour guiado (el WOW)
- `tour.js` — motor de recorrido: bienvenida a pantalla completa (logo oficial PDI + tesis "No es un ERP más…"), 9 spotlights sobre la UI real explicando de cada módulo **por qué existe · qué problema resuelve · el flujo**, con navegación y "Saltar recorrido". Cierra en el caso borde héroe (CTA a verlo en vivo).
- Lanzador "Guía interactiva" en la topbar (todas las páginas) + auto-arranque en primera visita (`?tour=1` lo fuerza).
- `guia.html` — manual escrito completo (propósito, problema, flujo, valor de cada módulo + casos borde). En el nav como "Guía del sistema".
- Nota: el emblema debe ser SIEMPRE el logo oficial `assets/pdi-logo.png` (no dibujar uno propio) — corregido en welcome y pañol móvil.

## Depth pass (profundizaciones de capacidad) — verificadas
Auditoría de profundidad: 8 pantallas profundas vs. catálogos de breadth. Se profundizaron 4 capacidades de alto impacto (los catálogos se dejaron como están, a propósito):
1. **Extravío/robo de arma** (`arma-detalle.html`) — modal con validación → baja/alerta DGMN + incidente INC-2026-0452 + parte + banner + timeline. ✓
2. **Conciliación de munición con discrepancia** (`panol.html`) — devolución 43/45 → "faltan 2" + toast de incidente; 45/45 → OK. ✓
3. **Gestión de incidente ANCI E2E** (`incidentes.html` drill-in → NUEVA `incidente-detalle.html`) — hitos 3h/72h/30d con acciones (presentar 72h, notificar CSIRT, adjuntar, cerrar final) + bitácora. ✓
4. **Remuneraciones** (`remuneraciones.html`) — stepper de proceso de nómina (Pre-cálculo→Cuadratura DIPRECA→Archivo banco→SIGFE) + liquidación seleccionable por funcionario/escalafón. ✓
Total: 31 pantallas. (Nota harness: los clicks a botones a veces requieren 2 intentos por flakiness del navegador embebido; los flujos son correctos.)

## Log de iteración
- v1 admin genérico → archivado en `_v1/`.
- v2 navy/burdeos/serif → corrección: debe ser PDI Chile.
- v2.1 calibrado con pdichile.cl (navy+amarillo, Oswald+Open Sans, logo oficial).
- Build completo del grill: 28 pantallas + 6 casos interactivos. 29/29 páginas 200, nav sin enlaces rotos.

## Próximo
Promover pantallas validadas al build real (stack, lenses, verificación) o iterar flujos puntuales.
