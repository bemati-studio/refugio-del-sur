# Refugio del Sur — Cloudflare

Aplicación de reservas con sitio público, disponibilidad, carga de comprobantes y panel anfitrión. Requiere Workers, D1 y R2; no se publica como sitio estático en Netlify.

Este paquete conserva el diseño, los recursos y la lógica del proyecto recuperado y adapta su configuración a una cuenta de Cloudflare independiente. No contiene reservas ni comprobantes del alojamiento anterior. Los datos bancarios visibles siguen siendo de prueba; revisarlos antes de ofrecer reservas reales.

## 1. Crear los recursos

En la cuenta donde publicarás el proyecto:

- D1: crea una base llamada `refugio-db`.
- En wrangler.jsonc sustituye `00000000-0000-4000-8000-000000000000` por su Database ID real.
- R2: crea un bucket Standard llamado `refugio-comprobantes`. Mantén su acceso público desactivado.

Los servicios tienen límites gratuitos. Activar R2 implica una suscripción y puede requerir medio de pago; el uso que exceda la cuota incluida puede facturarse. Revisa las condiciones que muestra tu cuenta.

## 2. Subir el código y desplegar

Crea un repositorio privado en GitHub y sube el contenido del paquete, sin node_modules ni archivos locales de entorno.

En Cloudflare elige Create application → Connect GitHub y selecciona ese repositorio:

| Campo | Valor |
| --- | --- |
| Nombre | refugio-del-sur |
| Rama | main |
| Directorio raíz | raíz del repositorio |
| Build command | npm run build |
| Deploy command | npm run db:remote && npm run deploy |
| Node.js | 22.13 o posterior |

El primer deploy crea las tablas y publica el Worker. El token de build debe permitir editar D1, acceder a R2 y desplegar Workers. No guardes ese token en el repositorio.

Cloudflare entregará una dirección workers.dev. El sitio y el formulario serán públicos. El panel permanece bloqueado hasta configurar Access.

## 3. Proteger la administración

1. En Zero Trust habilita tu equipo y el método de inicio de sesión One-time PIN si deseas recibir un código por correo.
2. En Access → Applications crea una aplicación Self-hosted llamada Refugio Administración.
3. Dentro de la MISMA aplicación agrega el hostname real de tu Worker con cuatro rutas: `admin`, `admin/*`, `api/admin`, `api/admin/*`. Así cubres las rutas exactas y sus descendientes con la misma audiencia.
4. Crea una política Allow → Emails con los correos autorizados. No protejas todo el Worker: la web y las reservas deben seguir públicas.
5. Copia el dominio de equipo y Application Audience (AUD) Tag de la aplicación.
6. En las vars de wrangler.jsonc completa:

```json
"ADMIN_EMAILS": "correo-autorizado@ejemplo.com",
"ACCESS_TEAM_DOMAIN": "tu-equipo.cloudflareaccess.com",
"ACCESS_AUD": "AUD_REAL_DE_LA_APLICACION"
```

Puedes agregar varios correos separados por coma. Deben coincidir con la política de Access. Guarda el cambio y espera el nuevo deploy. El servidor valida firma, emisor, audiencia, vencimiento y correo del token; no basta enviar un correo en una cabecera.

El panel /admin permite revisar solicitudes y sus comprobantes y cambiar su estado. Las vistas previas versionadas están desactivadas para no generar URLs alternativas fuera de las rutas protegidas. Si agregas otro dominio, configura sus mismas rutas en Access.

## Desarrollo local

```sh
npm ci
npm run check
npm test
npm run db:local
npm run dev
```

Para probar el Worker compilado:

```sh
npm run build
npm run preview
```

La base y el bucket locales son de prueba. El acceso al panel también exige un token válido; no hay una entrada libre para desarrollo.

Publicación alternativa desde terminal:

```sh
npx wrangler login
npm run build
npm run db:remote
npm run deploy
```

## Antes de usar reservas reales

Revisa los datos comerciales y bancarios; prueba fechas, creación de solicitud, comprobante y cambio de estado desde el panel. No se ha transferido una base previa ni archivos operativos. Si existen, deben exportarse mediante acceso al alojamiento anterior y migrarse por separado.

Consulta VALIDACION.md. Las pruebas locales no equivalen a un despliegue verificado en tu cuenta.
