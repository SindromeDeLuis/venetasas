# 🇻🇪 VeneTasas

**VeneTasas** es una web app que permite comparar de forma clara y rápida las tasas de cambio en Venezuela, tomando como referencia:

- 💵 Dólar oficial (BCV)
- 💶 Euro oficial (BCV)
- 🔄 USDT Binance P2P (compra y venta)
- 🔄 USDC Binance P2P (compra y venta)

Incluye conversión dinámica entre **USD ↔ Bolívares**, diferencia porcentual frente al BCV y una interfaz optimizada para móviles.

---

## ✨ Características

- 📊 Comparación de tasas BCV vs Binance P2P
- 🔢 Conversión USD → Bs y Bs → USD
- 🔥 Resaltado automático de la mejor tasa
- 📉 Diferencia porcentual respecto al BCV
- 🕒 Fecha de última actualización por sección (BCV / Binance)
- 🌙 Modo oscuro por defecto
- 📱 Diseño mobile-first y compacto
- ⚡ Animaciones suaves al actualizar valores
- 🦴 Skeleton loader mientras cargan las tasas
- 📦 PWA instalable (Android)
- 🚫 Sin backend propio (solo APIs públicas + Netlify Functions)

---

## 🛠️ Stack Tecnológico

- **Frontend:** Vue 3 (Composition API)
- **UI:** Bootstrap 5
- **Build:** Vite
- **PWA:** Web App Manifest
- **Deploy:** Netlify
- **Proxy API:** Netlify Functions
- **Fuentes de datos:**
  - BCV: `api.dolarvzla.com`
  - Binance P2P

---

## 🚀 Demo

👉 **Live:** _https://venetasas.netlify.app/_  
👉 **Instalable como app (PWA)** desde el navegador móvil

---

## 📦 Instalación local

```bash
npm install
npm run dev
