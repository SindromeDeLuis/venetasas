<template>
  <div class="skeleton-container py-2">
    <!-- Simulamos las secciones (ej. BCV, Binance, AirTM, etc.) -->
    <div v-for="section in 4" :key="section" class="mb-4 px-1">
      
      <!-- Skeleton del Header de la sección (SectionHeader.vue) -->
      <div class="d-flex justify-content-between align-items-center mb-2 px-1">
        <div class="skeleton-shimmer skeleton-section-title"></div>
        <div class="skeleton-shimmer skeleton-date"></div>
      </div>

      <!-- Grid de tarjetas idéntico al de RatesList (.row g-2) -->
      <div class="row g-2">
        <div v-for="card in 2" :key="card" class="col-6 col-md-3">
          <div class="card shadow-sm border-0 p-3 skeleton-card">
            <!-- Título de la tasa (ej. Dolar BCV / USDT) -->
            <div class="skeleton-shimmer skeleton-title mb-2"></div>
            <!-- Valor numérico principal -->
            <div class="skeleton-shimmer skeleton-rate mb-2"></div>
            <!-- Subtítulo o conversión inferior -->
            <div class="skeleton-shimmer skeleton-sub"></div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Animación base y estilo shimmer compartidos */
.skeleton-shimmer {
  background: linear-gradient(
    90deg, 
    rgba(150, 150, 150, 0.08) 25%, 
    rgba(150, 150, 150, 0.2) 50%, 
    rgba(150, 150, 150, 0.08) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 6px;
}

/* Tamaños específicos para imitar el SectionHeader */
.skeleton-section-title {
  height: 20px;
  width: 120px;
}

.skeleton-date {
  height: 14px;
  width: 90px;
}

/* Tarjeta fantasma emulando a RateCard */
.skeleton-card {
  height: 105px;
  background-color: var(--bs-card-bg, #fff);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Líneas internas simulando textos de la card */
.skeleton-title {
  height: 12px;
  width: 65%;
}

.skeleton-rate {
  height: 22px;
  width: 90%;
}

.skeleton-sub {
  height: 10px;
  width: 45%;
}

/* Animación de desplazamiento del brillo */
@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>