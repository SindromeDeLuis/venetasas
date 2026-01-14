import { ref, watch } from "vue";

const theme = ref(localStorage.getItem("theme") || "dark");

export function useTheme() {
  watch(
    theme,
    (value) => {
      document.documentElement.setAttribute("data-bs-theme", value);
      localStorage.setItem("theme", value);
    },
    { immediate: true }
  );

  function toggleTheme() {
    theme.value = theme.value === "dark" ? "light" : "dark";
  }

  return {
    theme,
    toggleTheme
  };
}
