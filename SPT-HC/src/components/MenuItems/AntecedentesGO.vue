<template>
  <div class="container">
    <div id="card-formulario" class="card mb-5">
      <div id="card-header-formulario" class="card-header py-1">
        <p class="text-primary m-0 fw-bold d-flex justify-content-between">
          <span class="titulo-formulario">
            <i class="fas fa-female"></i> Antecedentes Gineco-Obstétricos
          </span>
        </p>
      </div>
      <div class="card-body">
        <div class="antecedentes-go">
          <!-- Tabs -->
          <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="actual-tab"
                data-bs-toggle="tab"
                data-bs-target="#actual"
                type="button"
                role="tab"
                aria-controls="actual"
                aria-selected="true"
              >
                Actual
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="historial-tab"
                data-bs-toggle="tab"
                data-bs-target="#historial"
                type="button"
                role="tab"
                aria-controls="historial"
                aria-selected="false"
              >
                Historial
              </button>
            </li>
          </ul>

          <!-- Tab content -->
          <div class="tab-content mt-3">
            <!-- Pestaña Actual -->
            <div
              class="tab-pane fade show active"
              id="actual"
              role="tabpanel"
              aria-labelledby="actual-tab"
            >
              <form @submit.prevent="updateData">
                <div class="form-grid">
                  <div
                    v-for="(value, key) in formData"
                    :key="key"
                    class="form-group"
                  >
                    <label :for="key">{{ labels[key] }}</label>
                    <div class="input-group">
                      <input
                        v-if="!isSelect(key)"
                        :type="getInputType(key)"
                        :id="key"
                        v-model="formData[key]"
                        @change="updateField(key)"
                        @blur="validateField(key)"
                        :class="[{ 'is-invalid': errors[key] }, 'form-control']"
                      />
                      <select
                        v-else
                        :id="key"
                        v-model="formData[key]"
                        @change="updateField(key)"
                        @blur="validateField(key)"
                        :class="[{ 'is-invalid': errors[key] }, 'form-select']"
                      >
                        <option
                          v-for="option in selectOptions[key]"
                          :key="option.value"
                          :value="option.value"
                        >
                          {{ option.label }}
                        </option>
                      </select>
                    </div>
                    <small v-if="errors[key]" class="text-danger">{{
                      errors[key]
                    }}</small>
                    <small class="text-muted"
                      >Última actualización: {{ getLastUpdate(key) }}</small
                    >
                  </div>
                </div>
              </form>
            </div>

            <!-- Pestaña Historial -->
            <div
              class="tab-pane fade"
              id="historial"
              role="tabpanel"
              aria-labelledby="historial-tab"
            >
              <div class="change-history">
                <ul v-if="changeHistory.length">
                  <li v-for="(change, index) in changeHistory" :key="index">
                    {{ change.date }} - {{ labels[change.field] }}:
                    {{ change.oldValue }} → {{ change.newValue }}
                  </li>
                </ul>
                <p v-else>No hay cambios registrados.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from "vue";
import { antecedentesGoData, labels, selectOptions } from "../../bd/bd.js";

export default {
  name: "AntecedentesGo",
  setup() {
    const currentData = ref({ ...antecedentesGoData });
    const formData = reactive({ ...antecedentesGoData });
    const errors = reactive({});
    const changeHistory = ref([]);

    const isFormValid = computed(() =>
      Object.values(errors).every((error) => !error)
    );

    const updateField = (key) => {
      validateField(key);
      if (!errors[key] && formData[key] !== currentData.value[key]) {
        changeHistory.value.unshift({
          date: new Date().toLocaleString(),
          field: key,
          oldValue: currentData.value[key],
          newValue: formData[key],
        });
        currentData.value[key] = formData[key];
        Swal.fire({
          title: "¡Actualizado!",
          text: `Campo ${labels[key]} actualizado correctamente`,
          icon: "success",
          iconColor: "#2a3f54",
          confirmButtonText: "Entendido",
          customClass: {
            confirmButton: "btn btn-custom mb-2",
          },
          background: "#ededed",
          backdrop: `rgba(0, 0, 0, 0.5)`,
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      } else if (errors[key]) {
        Swal.fire({
          title: "Error",
          text: errors[key],
          icon: "error",
          iconColor: "#d9534f",
          confirmButtonText: "Entendido",
          customClass: {
            confirmButton: "btn btn-custom mb-2",
          },
          background: "#ededed",
          backdrop: `rgba(0, 0, 0, 0.5)`,
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }
    };

    const validateField = (key) => {
      const value = formData[key];
      if (isNumericField(key)) {
        errors[key] = value < 0 ? "El valor no puede ser negativo " : "";
      } else if (key === "edadInicioRelaciones") {
        errors[key] =
          value < 10 || value > 100
            ? "La edad debe estar entre 10 y 100 años "
            : "";
      } else if (key.startsWith("f")) {
        errors[key] = !isValidDate(value) ? "Fecha inválida " : "";
      } else {
        errors[key] = "";
      }
    };

    const isValidDate = (dateString) => {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      if (!regex.test(dateString)) return false;
      const date = new Date(dateString);
      return date instanceof Date && !isNaN(date);
    };

    const isNumericField = (key) => {
      return [
        "gestas",
        "partos",
        "abortos",
        "nVivos",
        "nMuertos",
        "cesareas",
        "embarazosMultiples",
        "companerosSeuxales",
      ].includes(key);
    };

    const isSelect = (key) =>
      [
        "gestante",
        "ciclo",
        "metodosPlanificacion",
        "seRealizaCitologias",
        "orientacionSexual",
      ].includes(key);

    const getInputType = (key) => {
      if (key.startsWith("f")) return "date";
      if (isNumericField(key) || key === "edadInicioRelaciones")
        return "number";
      return "text";
    };

    const getLastUpdate = (key) => {
      const lastChange = changeHistory.value.find(
        (change) => change.field === key
      );
      return lastChange ? lastChange.date : "No hay registro";
    };

    return {
      formData,
      labels,
      selectOptions,
      errors,
      changeHistory,
      isFormValid,
      updateField,
      validateField,
      isSelect,
      getInputType,
      getLastUpdate,
    };
  },
};
</script>

<style scoped>
.data-grid,
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
}

.data-item,
.form-group {
  background-color: #ffffff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.value-yes {
  color: green;
}

.value-no {
  color: red;
}
.change-history {
  max-height: 200px;
  overflow-y: auto;
}

.change-history ul {
  padding-left: 20px;
}

.change-history li {
  margin-bottom: 5px;
}
</style>