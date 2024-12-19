<template>
  <div
    class="modal fade modal-small"
    id="modalCIE10"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="modalCIE10Label"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div id="headerm-general" class="modal-header">
          <h1 class="modal-title fs-5 mt-2" id="modalCIE10Label">
            Agregar Examen de Laboratorio
          </h1>
          <button
            type="button"
            id="closem-general"
            class="close-modal bi bi-x ms-auto"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div id="contenidom-generalLab" class="modal-body">
          <form @submit.prevent="confirmarSeleccion">
            <div class="mb-3">
              <input
                type="text"
                class="form-control mt-2"
                v-model="busquedaLocal"
                @input="buscarCUPS"
                placeholder="Buscar CUPS"
              />
            </div>
            <div v-if="busquedaLocal" class="table-responsive mt-3">
              <table class="table">
                <thead>
                  <tr>
                    <th style="width: 20%">Código</th>
                    <th style="width: 60%">Descripción</th>
                    <th style="width: 20%">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in resultadosCUPS" :key="item.codigo">
                    <td>{{ item.codigo }}</td>
                    <td>
                      <div class="description-cell">
                        {{ item.descripcion }}
                      </div>
                    </td>
                    <td>
                      <button
                        class="custom-btn custom-edit-btn"
                        @click="seleccionarCUPS(item)"
                      >
                        <i class="fa-solid fa-plus"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="mt-3">
              <label for="selectedCUPS" class="form-label"
                >CUPS Seleccionado</label
              >
              <input
                type="text"
                id="selectedCUPS"
                class="form-control"
                :value="
                  selectedCUPS
                    ? selectedCUPS.codigo + ' - ' + selectedCUPS.descripcion
                    : ''
                "
                placeholder="CUPS Seleccionado"
                required
              />
            </div>
            <div class="mt-3">
              <label for="alias" class="form-label">Alias</label>
              <input
                type="text"
                id="alias"
                class="form-control"
                v-model="alias"
                required
              />
            </div>
            <div class="mt-3">
              <label for="requerimientos" class="form-label"
                >Requerimientos</label
              >
              <input
                type="text"
                id="requerimientos"
                class="form-control"
                v-model="requerimientos"
                required
              />
            </div>
            <div class="mt-3">
              <label for="observaciones" class="form-label"
                >Observaciones</label
              >
              <textarea
                type="text"
                id="observaciones"
                class="form-control"
                v-model="observaciones"
                required
              ></textarea>
            </div>
            <div class="modal-footer d-flex justify-content-between mt-3">
              <button type="submit" class="btn btn-custom">Confirmar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { Modal } from "bootstrap";

export default {
  name: "MCUPSLab",
  emits: ["seleccionado"],
  setup(props, { emit }) {
    const busquedaLocal = ref("");
    const resultadosCUPS = ref([]);
    const modalInstance = ref(null);
    const alias = ref("");
    const requerimientos = ref("");
    const observaciones = ref("");
    const selectedCUPS = ref(null);

    onMounted(() => {
      modalInstance.value = new Modal(document.getElementById("modalCIE10"));
    });

    const buscarCUPS = () => {
      if (busquedaLocal.value.trim() === "") {
        resultadosCUPS.value = [];
        return;
      }
      // Simulación de búsqueda con ejemplos de CUPS
      resultadosCUPS.value = [
        {
          codigo: "890201",
          descripcion: "Consulta de primera vez por medicina general",
        },
        {
          codigo: "890301",
          descripcion:
            "Consulta de control o de seguimiento por medicina general",
        },
        {
          codigo: "895001",
          descripcion: "Electrocardiograma de ritmo o de superficie SOD",
        },
        {
          codigo: "902213",
          descripcion:
            "Hemograma IV [Hemoglobina, Hematocrito, recuento de eritrocitos, índices eritrocitarios, Leucograma, recuento de plaquetas, índices plaquetarios y morfología electrónica e histograma] Método automático",
        },
        {
          codigo: "903841",
          descripcion: "Colesterol de alta densidad [HDL]",
        },
      ].filter(
        (item) =>
          item.codigo.includes(busquedaLocal.value) ||
          item.descripcion
            .toLowerCase()
            .includes(busquedaLocal.value.toLowerCase())
      );
    };

    const seleccionarCUPS = (item) => {
      selectedCUPS.value = item;
      busquedaLocal.value = ""; // Limpiar el campo de búsqueda
      resultadosCUPS.value = []; // Limpiar los resultados de búsqueda
    };

    const confirmarSeleccion = () => {
      if (
        !selectedCUPS.value ||
        !alias.value ||
        !requerimientos.value ||
        !observaciones.value
      ) {
        return;
      }

      emit("seleccionado", {
        ...selectedCUPS.value,
        alias: alias.value,
        requerimientos: requerimientos.value,
        observaciones: observaciones.value,
      });
      limpiarCampos();
      modalInstance.value.hide();
    };

    const limpiarCampos = () => {
      selectedCUPS.value = null;
      alias.value = "";
      requerimientos.value = "";
      observaciones.value = "";
    };

    const abrirModal = () => {
      modalInstance.value.show();
    };

    return {
      busquedaLocal,
      resultadosCUPS,
      buscarCUPS,
      seleccionarCUPS,
      confirmarSeleccion,
      abrirModal,
      alias,
      requerimientos,
      observaciones,
      selectedCUPS,
    };
  },
};
</script>

<style scoped>
.description-cell {
  max-width: 300px;
  white-space: normal;
  word-wrap: break-word;
  line-height: 1.2;
  max-height: 3.6em;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: start;
  -webkit-box-orient: vertical;
}

.modal-dialog {
  max-width: 80%;
}

.table th,
.table td {
  vertical-align: middle;
}
</style>
