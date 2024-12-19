<template>
  <div class="container">
    <form>
      <div id="card-formulario" class="card mb-5">
        <div id="card-header-formulario" class="card-header py-1">
          <p class="text-primary m-0 fw-bold d-flex justify-content-between">
            <span class="titulo-formulario">
              <i class="fas fa-book-medical"></i> Antecedentes</span
            >
            <span class="opciones-formulario"></span>
          </p>
        </div>

        <div class="card-body">
          <ul class="nav nav-tabs" id="antecedentesTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="personales-tab"
                data-bs-toggle="tab"
                data-bs-target="#personales"
                type="button"
                role="tab"
                aria-controls="personales"
                aria-selected="true"
              >
              <i class="fa-solid fa-person"></i> Antecedentes Personales
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="familiares-tab"
                data-bs-toggle="tab"
                data-bs-target="#familiares"
                type="button"
                role="tab"
                aria-controls="familiares"
                aria-selected="false"
              >
              <i class="fa-solid fa-people-group"></i> Antecedentes Familiares
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="patologicos-tab"
                data-bs-toggle="tab"
                data-bs-target="#patologicos"
                type="button"
                role="tab"
                aria-controls="patologicos"
                aria-selected="false"
              >
              <i class="fa-solid fa-heart-pulse"></i> Antecedentes Patológicos
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="no-patologicos-tab"
                data-bs-toggle="tab"
                data-bs-target="#no-patologicos"
                type="button"
                role="tab"
                aria-controls="no-patologicos"
                aria-selected="false"
              >
              <i class="fa-solid fa-heart"></i> Antecedentes No Patológicos
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="alergias-tab"
                data-bs-toggle="tab"
                data-bs-target="#alergias"
                type="button"
                role="tab"
                aria-controls="alergias"
                aria-selected="false"
              >
              <i class="fa-solid fa-hand-dots"></i> Alergias
              </button>
            </li>
          </ul>

          <div class="tab-content" id="antecedentesTabContent">
            <!-- tab 1 -->
            <Tab1 :fecha="fecha"></Tab1>
            <!-- tab 1 -->

            <!-- tab 2 -->
            <Tab2 :fecha="fecha"></Tab2>
            <!-- tab 2 -->

            <!-- tab 3 -->
            <Tab3 :fecha="fecha"></Tab3>
            <!-- tab 3 -->

            <!-- tab 4 -->
            <Tab4 :fecha="fecha"></Tab4>
            <!-- tab 4 -->

            <!-- tab 5 -->
            <Tab5 :fecha="fecha"></Tab5>
            <!-- tab 5 -->
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { familiares } from "../../bd/bd.js";
import Tab1 from "./TabsAntecedentes/Tab1.vue";
import Tab2 from "./TabsAntecedentes/Tab2.vue";
import Tab3 from "./TabsAntecedentes/Tab3.vue";
import Tab4 from "./TabsAntecedentes/Tab4.vue";
import Tab5 from "./TabsAntecedentes/Tab5.vue";

export default {
  components: {
    Tab1,
    Tab2,
    Tab3,
    Tab4,
    Tab5,
  },
  data() {
    return {
      cie10: "",
      fecha: this.getCurrentDate(),
      observaciones: "",
      familiar: "",
      familiares,
    };
  },
  methods: {
    getCurrentDate() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
  },
};
</script>
