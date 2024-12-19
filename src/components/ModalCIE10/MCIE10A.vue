<template>
  <div
    class="modal fade modal-small"
    id="modalCIE10A"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="modalCIE10Aabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div id="headerm-generalA" class="modal-header">
          <h1 class="modal-title fs-5 mt-2" :id="`${config.id}modalCIE10ALabel`">
            {{ config.title }}
          </h1>
          <button
            type="button"
            id="closem-generalA"
            class="close-modal bi bi-x ms-auto"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div id="contenidom-generalA" class="modal-body">
          <input
            type="text"
            class="form-control mt-2"
            v-model="busquedaLocal"
            @input="buscarCIE10"
            placeholder="Buscar CIE-10"
          />
          <br />
          <div v-if="busquedaLocal" class="table-responsive mb-3">
            <table class="table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Descripción</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in resultadosCIE10" :key="item.codigo">
                  <td>{{ item.codigo }}</td>
                  <td>{{ item.descripcion }}</td>
                  <td>
                    <button
                      class="custom-btn custom-edit-btn"
                      @click="seleccionarCIE10(item)"
                    >
                      <i class="fa-solid fa-plus"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-between"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { modalCIE10 } from "../../bd/bd.js";
import { ref, onMounted } from "vue";
import { Modal } from "bootstrap";

export default {
  name: "ModalCIE10A",
  emits: ["seleccionado"],
  setup(props, { emit }) {
    const busquedaLocal = ref("");
    const resultadosCIE10 = ref([]);
    const modalInstance = ref(null);

    onMounted(() => {
      modalInstance.value = new Modal(document.getElementById("modalCIE10A"));
    });

    const buscarCIE10 = () => {
      if (busquedaLocal.value.trim() === "") {
        resultadosCIE10.value = [];
        return;
      }
      // Aquí implementarías la lógica real de búsqueda
      resultadosCIE10.value = [
        { codigo: "A00", descripcion: "Cólera" },
        { codigo: "A01", descripcion: "Fiebres tifoidea y paratifoidea" },
        // ... más resultados ...
      ];
    };

    const seleccionarCIE10 = (item) => {
      emit("seleccionado", item);
      modalInstance.value.hide();
    };

    const abrirModal = () => {
      modalInstance.value.show();
    };

    return {
      busquedaLocal,
      resultadosCIE10,
      buscarCIE10,
      seleccionarCIE10,
      abrirModal,
      config: modalCIE10,
    };
  },
};
</script>
