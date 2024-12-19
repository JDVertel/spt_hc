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
            Buscar CUPS
          </h1>
          <button
            type="button"
            id="closem-general"
            class="close-modal bi bi-x ms-auto"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div id="contenidom-generalPro" class="modal-body">
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
                        type="button"
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
              <label for="cantidad" class="form-label">Cantidad</label>
              <input
                type="number"
                id="cantidad"
                class="form-control"
                v-model="cantidad"
                min="1"
                required
              />
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
  name: "MCUPS",
  emits: ["seleccionado"],
  setup(props, { emit }) {
    const busquedaLocal = ref("");
    const resultadosCUPS = ref([]);
    const modalInstance = ref(null);
    const cantidad = ref(1);
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
      if (!selectedCUPS.value || !cantidad.value) {
        return;
      }

      emit("seleccionado", {
        ...selectedCUPS.value,
        cantidad: cantidad.value,
      });
      limpiarCampos();
      modalInstance.value.hide();
    };

    const limpiarCampos = () => {
      selectedCUPS.value = null;
      cantidad.value = 1;
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
      cantidad,
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
