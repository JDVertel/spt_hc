<template>
  <div
    class="modal fade modal-small"
    id="modalCUMedic"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="modalCUMedicLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div id="headerm-general" class="modal-header">
          <h1 class="modal-title fs-5 mt-2" id="modalCUMedicLabel">
            Agregar Medicamento
          </h1>
          <button
            type="button"
            id="closem-general"
            class="close-modal bi bi-x ms-auto"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div id="contenidom-generalMedic" class="modal-body">
          <form @submit.prevent="confirmarSeleccion">
            <div class="mb-3">
              <input
                type="text"
                class="form-control mt-2"
                v-model="busquedaLocal"
                @input="buscarMedicamentos"
                placeholder="Buscar Medicamento"
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
                  <tr v-for="item in resultadosMedicamentos" :key="item.codigo">
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
                        @click="seleccionarMedicamento(item)"
                      >
                        <i class="fa-solid fa-plus"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="mt-3">
              <label for="selectedMedicamento" class="form-label">Medicamento Seleccionado</label>
              <input
                type="text"
                id="selectedMedicamento"
                class="form-control"
                :value="selectedMedicamento ? selectedMedicamento.codigo + ' - ' + selectedMedicamento.descripcion : ''"
                placeholder="Medicamento Seleccionado"
                readonly
                required
              />
            </div>
            <div class="mt-3">
              <label for="principioActivo" class="form-label">Principio Activo</label>
              <input
                type="text"
                id="principioActivo"
                class="form-control"
                v-model="principioActivo"
                required
              />
            </div>
            <div class="mt-3">
              <label for="nombre" class="form-label">Nombre</label>
              <input
                type="text"
                id="nombre"
                class="form-control"
                v-model="nombre"
                required
              />
            </div>
            <div class="mt-3">
              <label for="presentacion" class="form-label">Presentación</label>
              <input
                type="text"
                id="presentacion"
                class="form-control"
                v-model="presentacion"
                required
              />
            </div>
            <div class="mt-3">
              <label for="posologia" class="form-label">Posología</label>
              <input
                type="text"
                id="posologia"
                class="form-control"
                v-model="posologia"
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
  name: "MCUMedic",
  emits: ["seleccionado"],
  setup(props, { emit }) {
    const busquedaLocal = ref("");
    const resultadosMedicamentos = ref([]);
    const modalInstance = ref(null);
    const principioActivo = ref("");
    const nombre = ref("");
    const presentacion = ref("");
    const posologia = ref("");
    const cantidad = ref("");
    const selectedMedicamento = ref(null);

    onMounted(() => {
      modalInstance.value = new Modal(document.getElementById("modalCUMedic"));
    });

    const buscarMedicamentos = () => {
      if (busquedaLocal.value.trim() === "") {
        resultadosMedicamentos.value = [];
        return;
      }
      // Simulación de búsqueda con ejemplos de medicamentos
      resultadosMedicamentos.value = [
        { codigo: "A01", descripcion: "Paracetamol 500mg" },
        { codigo: "A02", descripcion: "Ibuprofeno 400mg" },
        { codigo: "B01", descripcion: "Amoxicilina 500mg" },
        { codigo: "B02", descripcion: "Omeprazol 20mg" },
        { codigo: "C01", descripcion: "Loratadina 10mg" },
      ].filter(
        (item) =>
          item.codigo.includes(busquedaLocal.value) ||
          item.descripcion
            .toLowerCase()
            .includes(busquedaLocal.value.toLowerCase())
      );
    };

    const seleccionarMedicamento = (item) => {
      selectedMedicamento.value = item;
      busquedaLocal.value = ""; // Limpiar el campo de búsqueda
      resultadosMedicamentos.value = []; // Limpiar los resultados de búsqueda
    };

    const confirmarSeleccion = () => {
      if (
        !selectedMedicamento.value ||
        !principioActivo.value ||
        !nombre.value ||
        !presentacion.value ||
        !posologia.value ||
        !cantidad.value
      ) {
        return;
      }

      emit("seleccionado", {
        ...selectedMedicamento.value,
        principioActivo: principioActivo.value,
        nombre: nombre.value,
        presentacion: presentacion.value,
        posologia: posologia.value,
        cantidad: cantidad.value,
      });
      limpiarCampos();
      modalInstance.value.hide();
    };

    const limpiarCampos = () => {
      selectedMedicamento.value = null;
      principioActivo.value = "";
      nombre.value = "";
      presentacion.value = "";
      posologia.value = "";
      cantidad.value = "";
    };

    const abrirModal = () => {
      modalInstance.value.show();
    };

    return {
      busquedaLocal,
      resultadosMedicamentos,
      buscarMedicamentos,
      seleccionarMedicamento,
      confirmarSeleccion,
      abrirModal,
      principioActivo,
      nombre,
      presentacion,
      posologia,
      cantidad,
      selectedMedicamento,
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