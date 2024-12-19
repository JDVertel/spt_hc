<template>
  <div
    class="modal fade modal-small"
    id="modalAgregarImagen"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="modalAgregarImagenLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div id="headerm-general" class="modal-header">
          <h1 class="modal-title fs-5 mt-2" id="modalAgregarImagenLabel">
            Agregar Imagen Diagnóstica
          </h1>
          <button
            type="button"
            id="closem-general"
            class="close-modal bi bi-x ms-auto"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div id="contenidom-generalIM" class="modal-body">
          <form @submit.prevent="confirmarSeleccion">
            <div class="mb-3">
              <input
                type="text"
                class="form-control mt-2"
                v-model="busquedaLocal"
                @input="buscarImagenes"
                placeholder="Buscar Imagen Diagnóstica"
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
                  <tr v-for="item in resultadosImagenes" :key="item.codigo">
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
                        @click="seleccionarImagen(item)"
                      >
                        <i class="fa-solid fa-plus"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="mt-3">
              <label for="selectedImagen" class="form-label"
                >Imagen Seleccionada</label
              >
              <input
                type="text"
                id="selectedImagen"
                class="form-control"
                :value="
                  selectedImagen
                    ? selectedImagen.codigo + ' - ' + selectedImagen.descripcion
                    : ''
                "
                placeholder="Imagen Seleccionada"
                readonly
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
  name: "ModalAgregarImagen",
  emits: ["imagen-agregada"],
  setup(props, { emit }) {
    const busquedaLocal = ref("");
    const resultadosImagenes = ref([]);
    const modalInstance = ref(null);
    const cantidad = ref("");
    const selectedImagen = ref(null);

    onMounted(() => {
      modalInstance.value = new Modal(
        document.getElementById("modalAgregarImagen")
      );
    });

    const buscarImagenes = () => {
      if (busquedaLocal.value.trim() === "") {
        resultadosImagenes.value = [];
        return;
      }
      // Simulación de búsqueda con ejemplos de imágenes diagnósticas
      resultadosImagenes.value = [
        { codigo: "I01", descripcion: "Radiografía de tórax" },
        { codigo: "I02", descripcion: "Tomografía computarizada" },
        { codigo: "I03", descripcion: "Resonancia magnética" },
        { codigo: "I04", descripcion: "Ecografía abdominal" },
        { codigo: "I05", descripcion: "Mamografía" },
      ].filter(
        (item) =>
          item.codigo.includes(busquedaLocal.value) ||
          item.descripcion
            .toLowerCase()
            .includes(busquedaLocal.value.toLowerCase())
      );
    };

    const seleccionarImagen = (item) => {
      selectedImagen.value = item;
      busquedaLocal.value = ""; // Limpiar el campo de búsqueda
      resultadosImagenes.value = []; // Limpiar los resultados de búsqueda
    };

    const confirmarSeleccion = () => {
      if (!selectedImagen.value || !cantidad.value) {
        return;
      }

      emit("imagen-agregada", {
        ...selectedImagen.value,
        cantidad: cantidad.value,
        fecha: new Date().toISOString().split("T")[0], // Fecha actual
      });
      limpiarCampos();
      modalInstance.value.hide();
    };

    const limpiarCampos = () => {
      selectedImagen.value = null;
      cantidad.value = "";
    };

    const abrirModal = () => {
      modalInstance.value.show();
    };

    return {
      busquedaLocal,
      resultadosImagenes,
      buscarImagenes,
      seleccionarImagen,
      confirmarSeleccion,
      abrirModal,
      cantidad,
      selectedImagen,
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
