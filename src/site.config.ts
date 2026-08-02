// Configuración central del sitio.
// Casi todo el contenido de marca/personal se edita AQUÍ: al reutilizar este
// proyecto como template, cambia estos valores y el resto de la UI se actualiza.
//
// La URL del sitio (`site.url`) también se usa en `astro.config.mjs`, que la
// importa desde este archivo para no repetirla.

export const site = {
  /** Nombre corto / marca. Aparece en la pestaña y el footer. */
  name: 'Resoluble',
  /**
   * Lo que se muestra arriba a la izquierda (enlace al inicio). Puede ser un
   * símbolo como '~' (estilo terminal) o el nombre del sitio. Ej.: site.name.
   */
  homeLabel: '~',
  /** Nombre completo del autor. */
  author: 'Jorge Espinoza Abud',
  /** Nombre corto del autor (para descripciones, RSS, etc.). */
  shortAuthor: 'Jorge Espinoza',
  /** Descripción por defecto (meta description y og:description). */
  description:
    'Sitio personal de Jorge Espinoza Abud: proyectos, notas técnicas, reseñas e ideas.',
  /** URL de producción (sin barra final). También la lee astro.config.mjs. */
  url: 'https://jabud.github.io',
  /** Idioma del documento (atributo lang del <html>). */
  lang: 'es',
  /** Locale para formatear fechas (ej. 'es-MX', 'es-ES'). */
  locale: 'es-MX',
  /**
   * Color de acento (enlaces, detalles, píldoras activas) en tema claro.
   * Cambia estos dos valores para personalizar el color del sitio.
   */
  accent: '#5f00ff',
  /** Color de acento en tema oscuro (conviene uno más claro para que resalte). */
  accentDark: '#8870ff',
} as const;

// Enlaces sociales (iconos SVG inline, sin dependencias externas).
// `path` es el atributo `d` de un <path> dentro de un viewBox 0 0 24 24.
export const socials = [
  {
    name: 'GitHub',
    href: 'https://github.com/jabud',
    path: 'M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.3-1.8-1.3-1.8-1.1-.7 0-.7 0-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.3-.5-1.5.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.3v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jorgeabud/',
    path: 'M20.45 20.45h-3.56v-5.57c0-1.33 0-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z',
  },
  {
    name: 'Telegram',
    href: 'https://telegram.me/jorge_abud',
    path: 'M23.95 2.18a1 1 0 0 0-1.36-.94L1.4 9.4c-.9.35-.88 1.62.02 1.95l5.4 1.94 2.1 6.6a1 1 0 0 0 1.65.4l3-2.86 5.28 3.9a1 1 0 0 0 1.57-.63l3.5-17.9a1 1 0 0 0 .03-.62zM9.6 14.2l-.35 4.02-1.5-4.86 9.9-6.1L9.6 14.2z',
  },
] as const;

// Menú lateral (Sidebar). `icon` es el contenido interno de un <svg> con
// stroke="currentColor" y viewBox 0 0 24 24.
export const nav = [
  {
    href: '/notas',
    label: 'notas',
    icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
  },
  {
    href: '/resenas',
    label: 'reseñas',
    icon: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  },
  {
    href: '/projects',
    label: 'proyectos',
    icon: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
  },
] as const;

// Enlaces de la barra superior derecha.
export const topNav = [{ href: '/contexto', label: 'contexto' }] as const;
