# 🇻🇪 VeneTasas

VeneTasas es una aplicación web para comparar tasas de cambio en Venezuela de forma rápida y clara. El proyecto reúne información oficial del BCV, precios P2P de Binance y tasas de AirTM para ayudar a evaluar el valor del dólar y del euro en bolívares.

## ¿Qué hace la app?

- Compara el dólar y el euro oficial del BCV con mercados P2P.
- Muestra tasas de compra/venta de USDT en Binance.
- Incluye tasas de AirTM para complementar la comparación.
- Permite convertir entre USD y bolívares en tiempo real.
- Calcula la diferencia porcentual respecto al BCV.
- Muestra historial del BCV en tabla y gráfica.
- Tiene una interfaz mobile-first y es instalable como PWA.

## Características principales

- 📊 Comparación de tasas BCV vs P2P
- 💱 Conversión dinámica USD ↔ Bs
- 🔥 Resaltado automático de la mejor tasa disponible
- 📉 Diferencia porcentual respecto al valor oficial
- 🕒 Fecha de última actualización por fuente
- 📜 Historial oficial del BCV con filtros por 30 días, fecha o rango
- 📈 Vista de gráfico de evolución para el historial del BCV
- 🌙 Tema oscuro por defecto
- 📱 Diseño responsive optimizado para móviles
- ⚡ Carga con skeletons y animaciones suaves
- 📦 PWA instalable en móvil
- 🔒 Sin backend propio: usa APIs públicas a través de Netlify Functions

## Stack tecnológico

- Vue 3 + Composition API
- Vite
- Bootstrap 5 + Bootstrap Icons
- Chart.js
- Vue Router
- vite-plugin-pwa
- Netlify Functions

## Fuentes de datos

- BCV
- Binance P2P
- AirTM

## Demo

- **Live:** https://venetasas.netlify.app/
- Instalable como aplicación (PWA) desde el navegador móvil

## Requisitos

- Node.js 18+
- npm

## Instalación local

```bash
npm install
npm run dev
```

La aplicación quedará disponible en el puerto por defecto de Vite (normalmente `http://localhost:5173`).

## Build de producción

```bash
npm run build
```

Para previsualizar el build:

```bash
npm run preview
```

## Despliegue

El proyecto está preparado para desplegarse en Netlify con soporte para funciones serverless. La configuración del despliegue se encuentra en:

- `netlify.toml`
- `netlify/functions/`
