# Gobai

Gobai es una aplicación web moderna construida con **Next.js** (App Router) que cuenta con soporte completo de internacionalización (localización), animaciones enriquecidas y una interfaz de administración segura.

## Stack Tecnológico y Arquitectura

- **Framework Frontend**: [Next.js](https://nextjs.org/) (React, App Router) con localización a través de `next-intl`.
- **Estilos y Animaciones**: Tailwind CSS para diseño responsivo, combinado con GSAP y tsParticles para componentes interactivos avanzados.
- **Base de Datos y ORM**: Base de datos PostgreSQL alojada en [Neon Serverless Postgres](https://neon.tech/), utilizando [Prisma](https://www.prisma.io/) como ORM.
- **Autenticación**: Gestión segura de sesiones administrativas utilizando [NextAuth.js](https://next-auth.js.org/).
- **Despliegue y Serverless**: Alojado y desplegado en [Netlify](https://www.netlify.com/), utilizando Netlify Dev y Netlify Blobs.

---

## Estructura del Sitio Web

La aplicación está organizada en dos grupos principales de rutas que representan el portal público y el panel de administración privado:

### 1. Portal Público (`src/app/(public)`)
Las páginas públicas están localizadas bajo la ruta dinámica `[locale]` e incluyen las siguientes secciones:
- **Inicio (`/`)**: Muestra la sección principal (hero), servicios, características clave, alianzas/socios, datos/métricas y un llamado a la acción (CTA).
- **Blog (`/blog`)**: Artículos, noticias y análisis accesibles para todo el público.
- **Campañas Disruptivas (`/campanas-disruptivas`)**: Muestra campañas políticas innovadoras y de alto impacto.
- **Casos de Éxito (`/casos-de-exito`)**: Detalles de proyectos, hitos importantes e historias de éxito de campañas.
- **Gobiernos y Políticas (`/gobiernos-politicas`)**: Información sobre consultoría gubernamental, servicios institucionales y estrategias de políticas públicas.
- **Contacto (`/contacto`)**: Formulario de contacto seguro para consultas y mensajes de los usuarios.

### 2. Panel de Administración y Autenticación (`src/app/(admin-auth)`)
Área restringida que contiene la lógica de autenticación y los módulos de gestión interna.

#### Acceso y Registro de Administradores
- **Iniciar Sesión (`/auth/login`)**: Pantalla segura de inicio de sesión para administradores.
- **Registro (`/auth/register`)**: Formulario para dar de alta nuevos administradores (desactivada por default para prevenir el acceso no autorizado).

#### Módulos de Administración (`/admin`)
Una vez autenticados, los administradores tienen acceso a:
- **Panel de Control / Dashboard (`/admin/dashboard`)**: Consola principal con analíticas, métricas generales y accesos rápidos.
- **Gestión de Blog (`/admin/blog`)**: Un CMS (Sistema de Gestión de Contenido) completo con editor de texto enriquecido (Tiptap) para crear, editar, eliminar y publicar/despublicar artículos.
- **Gestión de Casos de Éxito (`/admin/success-cases`)**: Módulo para administrar los casos de éxito, subir imágenes, asignar ubicaciones, fechas y etiquetas descriptivas.
- **Mensajes de Contacto (`/admin/contact`)**: Bandeja de entrada para visualizar y gestionar las consultas enviadas desde el formulario de contacto público.
- **Gestión de Usuarios (`/admin/users`)**: Control de usuarios internos y configuración de accesos.
- **Perfil (`/admin/profile`)**: Configuración del perfil de administrador actual, correo electrónico y opciones de visualización.

---

## Esquema de Base de Datos (Prisma)

El esquema de la base de datos (`prisma/schema.prisma`) define los siguientes modelos principales:
- **User / Account / Session / VerificationToken**: Diseñados para gestionar las credenciales de administración, sesiones de NextAuth y verificación de cuentas.
- **Post**: Representa los artículos de blog localizados, con campos para título, slug único, contenido HTML enriquecido, imagen destacada, estado de publicación y relación con el autor.
- **SuccessCase**: Almacena el portafolio detallado de proyectos (título, slug, etiquetas, ubicación, fecha, imágenes y descripción localizada).
- **ContactSubmission**: Almacena las consultas enviadas por el formulario público (`name`, `email`, `phone`, `message`, `createdAt`).

---

## Guía de Inicio

### Desarrollo Local

1. **Instalar Dependencias**:
   ```bash
   npm install
   ```

2. **Configurar Variables de Entorno**:
   Crea un archivo `.env` en la raíz del proyecto con las credenciales de conexión a Neon Postgres y las claves de NextAuth.

3. **Migración de Base de Datos y Generación del Cliente**:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

4. **Ejecutar el Servidor de Desarrollo**:
   Inicia el entorno local utilizando la CLI de Netlify para asegurar compatibilidad con funciones serverless y Blobs (importante para poder probar los blobs de netlify en modo local):
   ```bash
   npm install netlify-cli -g
   netlify dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

### Despliegue en Producción

El proyecto está optimizado para desplegarse fácilmente en **Netlify**:

```bash
netlify deploy --prod
```
O configura Integración Continua (CI/CD) conectando tu repositorio de GitHub directamente a tu proyecto de Netlify para compilar de forma automática cada vez que hagas push a la rama `main`.
