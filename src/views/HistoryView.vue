<template>
  <div class="container min-h-[100dvh]">
    <div class="d-flex align-items-center pt-2 mb-3">
      <div class="bg-primary bg-opacity-10 p-2 rounded-3 me-3">
        <span class="fs-4">📜</span>
      </div>
      <div>
        <h5 class="fw-bold mb-0">Historial Oficial</h5>
        <p class="text-muted small mb-0">Consulta la evolución del BCV</p>
      </div>
    </div>

    <div class="card border-0 shadow-sm mb-2 rounded-4">
      <div class="card-body py-3">
        <div class="btn-group w-100 mb-2 p-1 bg-light rounded-3" role="group">
          <input type="radio" class="btn-check" name="mode" id="m30" value="30" v-model="mode">
          <label class="btn btn-sm border-0 rounded-3 py-2" for="m30">30 Días</label>
          
          <input type="radio" class="btn-check" name="mode" id="mDate" value="date" v-model="mode">
          <label class="btn btn-sm border-0 rounded-3 py-2" for="mDate">Fecha</label>
          
          <input type="radio" class="btn-check" name="mode" id="mRange" value="range" v-model="mode">
          <label class="btn btn-sm border-0 rounded-3 py-2" for="mRange">Rango</label>
        </div>

        <div class="row g-2 mb-2">
          <div v-if="mode === 'date'" class="col-12">
            <input type="date" v-model="date" class="form-control border-light-subtle" />
          </div>
          <template v-if="mode === 'range'">
            <div class="col-4">
              <label class="small text-muted mb-1 ms-1">Año</label>
              <select v-model="selectedYear" class="form-select border-light-subtle">
                <option v-for="y in 4" :key="y" :value="getTodayYear() - y + 1">{{ getTodayYear() - y + 1 }}</option>
              </select>
            </div>
            <div class="col-4">
              <label class="small text-muted mb-1 ms-1">Desde</label>
              <input type="date" :min="`${selectedYear}-01-01`" :max="`${selectedYear}-12-31`" v-model="startDate" class="form-control border-light-subtle" />
            </div>
            <div class="col-4">
              <label class="small text-muted mb-1 ms-1">Hasta</label>
              <input type="date" :min="`${selectedYear}-01-01`" :max="`${selectedYear}-12-31`" v-model="endDate" class="form-control border-light-subtle" />
            </div>
          </template>
        </div>

        <button class="btn btn-primary w-100 py-2 fw-bold shadow-sm" @click="loadData" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
          {{ loading ? 'Buscando...' : 'Consultar' }}
        </button>
      </div>
    </div>

    <div class="d-flex justify-content-center mb-3">
      <div class="bg-light p-1 rounded-pill d-inline-flex shadow-sm">
        <button 
          @click="view = 'table'" 
          class="btn btn-sm rounded-pill px-4"
          :class="view === 'table' ? 'btn-white shadow-sm' : 'text-muted border-0'"
        >
          📊 Tabla
        </button>
        <button 
          @click="view = 'chart'" 
          class="btn btn-sm rounded-pill px-4"
          :class="view === 'chart' ? 'btn-white shadow-sm' : 'text-muted border-0'"
        >
          📈 Gráfica
        </button>
      </div>
    </div>

    <Transition name="fade" mode="out-in">
      <div v-if="!loading && rates.length">
        <div v-if="view === 'table'" class="table-responsive rounded-4 shadow-sm p-2">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-dark">
              <tr>
                <th class="border-0 rounded-start ps-3">Fecha</th>
                <th class="border-0 text-end pe-3">USD</th>
                <th class="border-0 text-end pe-3">EUR</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in rates" :key="r.date">
                <td class="ps-3 py-2 fw-medium">{{ r.date }}</td>
                <td class="text-end pe-3 fw-bold text-primary">{{ r.usd?.toFixed(2) }} <small class="text-muted">Bs</small></td>
                <td class="text-end pe-3 fw-bold text-success">{{ r.eur?.toFixed(2) }} <small class="text-muted">Bs</small></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else class="card border-0 shadow-sm rounded-4 p-3 bg-white">
          <div style="height: 300px;">
            <canvas ref="chartRef"></canvas>
          </div>
        </div>
      </div>
      
      <div v-else-if="!loading" class="text-center py-5 opacity-50">
        <span class="fs-1">🔎</span>
        <p class="mt-2">No hay datos para mostrar</p>
      </div>
    </Transition>
  </div>
</template>
<script setup>
import { ref, watch, nextTick, onMounted } from "vue";
import Chart from "chart.js/auto";
import { getRateByDate, getLast30Days, getRange } from "@/services/bcvHistory.service";
import { getTodayYear } from "@/utils/date";

const mode = ref("30");
const view = ref("table");
const rates = ref([]);
const loading = ref(false);
const chartRef = ref(null);
let chartInstance = null;

// Dates
const year = getTodayYear();
const date = ref(new Date().toISOString().split('T')[0]);
const startDate = ref("");
const endDate = ref("");
const selectedYear = ref(getTodayYear());

async function loadData() {
  try {
    loading.value = true;
    let data = [];

    if (mode.value === "30") data = await getLast30Days(year);
    else if (mode.value === "date" && date.value) data = await getRateByDate(date.value);
    else if (mode.value === "range" && startDate.value && endDate.value) {
      data = await getRange(startDate.value, endDate.value);
    }

    rates.value = Array.isArray(data) ? data : [data];
    
    if (rates.value.length < 2) {
      view.value = "table"; // Forzar tabla si no hay suficientes datos para gráfica
    }
    if (view.value === "chart") await drawChart();
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}

async function drawChart() {
  await nextTick();
  if (!chartRef.value || !rates.value.length) return;

  if (chartInstance) chartInstance.destroy();

  const isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark';
  const primaryColor = '#0d6efd';

  chartInstance = new Chart(chartRef.value, {
    type: "line",
    data: {
      labels: rates.value.map(r => r.date).reverse(),
      datasets: [
        {
          label: "USD BCV",
          data: rates.value.map(r => r.usd).reverse(),
          borderColor: primaryColor,
          backgroundColor: 'rgba(13, 110, 253, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 2,
          pointBackgroundColor: primaryColor
        },
        {
          label: "EUR BCV",
          data: rates.value.map(r => r.eur).reverse(),
          borderColor: '#198754',
          backgroundColor: 'rgba(25, 135, 84, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 2,
          pointBackgroundColor: primaryColor
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { 
          grid: { color: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' },
          ticks: { color: isDark ? '#adb5bd' : '#6c757d' }
        },
        x: { 
          grid: { display: false },
          ticks: { color: isDark ? '#adb5bd' : '#6c757d' }
        }
      }
    }
  });
}

// Carga inicial
onMounted(() => loadData());

// Cambiar vista sin recargar datos
watch(view, (newView) => {
  if (newView === "chart") drawChart();
});
</script>

<style scoped>
.card-body {
  padding: 0;
}

/* Segmented Control Custom */
.btn-check:checked + .btn-white {
  background-color: white !important;
}

.btn-white {
  background-color: white;
  border: none;
}

.bg-light {
  background-color: var(--bs-tertiary-bg) !important;
}

/* Animación de entrada */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Estilo para los inputs de fecha en móviles */
.form-select, 
.form-control[type="date"] {
  min-height: 45px;
  border-radius: 12px;
}

/* Estilo de los botones del segmented control */
.btn-group .btn-check + .btn {
  color: #6c757d;
  font-weight: 500;
  border: none;
}

.btn-group .btn-check:checked + .btn {
  background-color: white !important;
  color: var(--bs-primary);
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

[data-bs-theme="dark"] .btn-group .btn-check:checked + .btn {
  background-color: #212529 !important;
}
</style>