# VS International LLC — Sistema Administrativo & Operativo

Plataforma interactiva y dashboard de gestión corporativa desarrollado para **VS International LLC** ([vsinternationalllc.com](https://vsinternationalllc.com)), especializada en intermediación comercial internacional y soluciones logísticas multimodales.

---

## 1. Principios de Diseño UI/UX
- **Swiss / Clean Corporate Layout**: Estética sobria, funcional y minimalista basada en lienzo 100% blanco (`#ffffff`), escala de grises tenue (`#f8fafc`, bordes `#e2e8f0`) y tipografía sans-serif de alta legibilidad (`Plus Jakarta Sans`).
- **Cero Elementos Cliché / Cero IA Slop**: Eliminación de métricas falsas, badges superfluos y gráficos decorativos sin utilidad real. Cada indicador responde a una necesidad operativa directa.
- **Micro-interacciones refinadas**: Botones con estados activos táctiles (`active:scale-[0.98]`), transiciones fluidas de 150ms y bordes estándar `rounded-lg`.
- **Adaptabilidad Responsive Completa**:
  - **Móvil**: Drawer lateral de navegación accesible mediante menú superior y vistas de tarjetas estructuradas para clientes y operaciones.
  - **Escritorio**: Barra lateral fija con acceso rápido a módulos y tablas de datos con visualización optimizada de columnas.

---

## 2. Autenticación (Prototipo Corporativo)
- **Credenciales fijas**:
  - **Usuario**: `admin`
  - **Contraseña**: `admin`
- Validación de campos requeridos y reporte de error visual contextual.
- Botón de autocompletado rápido para facilitar pruebas.
- Cierre de sesión inmediato disponible en el encabezado.

---

## 3. Módulos del Sistema

### A) Directorio de Clientes (`ClientsDirectory`)
- Visualización en tabla para pantallas medianas/grandes y tarjetas adaptadas para smartphones.
- Búsqueda en tiempo real por razón social, nombre de contacto, país o correo electrónico.
- Filtrado por línea de servicio: `Logística`, `Comercio` y `Asesoría`.
- Modal reactivo para **Agregar Nuevo Cliente** con validación de correo y campos obligatorios.
- Opciones para **Editar** y **Eliminar** clientes con diálogo de confirmación y notificaciones toast.

### B) Control de Operaciones (`OperationsTracker`)
- Seguimiento de expedientes logísticos y solicitudes internas.
- Campos de control: ID de Operación (`VSI-2026-XXX`), Cliente Asociado, Ruta Comercial (`Origen → Destino`), Tipo de Carga, Fecha de Registro y Estado Operativo.
- Selector rápido directo en tabla y tarjeta para cambiar estados:
  - `Pendiente` (amarillo tenue institucional)
  - `En Tránsito` (azul cielo tenue con pulso sutil)
  - `Despachado` (esmeralda tenue)
  - `Cerrado` (gris neutro corporativo)
- Modal para **Registrar Nueva Operación** o editar detalles existentes.

### C) Perfil de Empresa (`CompanyProfile`)
- Ficha institucional con datos oficiales:
  - Razón Social: **VS International LLC**
  - Portal Web: [vsinternationalllc.com](https://vsinternationalllc.com)
  - Correo Oficial: `info@vsinternationalllc.com`
  - Teléfono y Sede Principal en Brickell Avenue, Miami, FL.
- Formulario interactivo para modificar datos corporativos en memoria.
- Función para exportar la ficha institucional en formato JSON.

---

## 4. Ejecución del Proyecto

```bash
# Instalar dependencias (si no se han instalado)
npm install

# Iniciar servidor de desarrollo local
npm run dev

# Compilar para producción
npm run build
```
