<template>
  <div
    class="modal fade modal-small"
    id="modalMICA"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="modalMICALabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div id="headerm-general" class="modal-header">
          <h1 class="modal-title fs-5 mt-2" id="modalMICALabel">
            Buscar Motivo de Incapacidad
          </h1>
          <button
            type="button"
            id="closem-general"
            class="close-modal bi bi-x ms-auto"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div id="contenidom-general" class="modal-body">
          <input
            type="text"
            class="form-control mt-2"
            v-model="busquedaLocal"
            @input="buscarMotivos"
            placeholder="Buscar Motivo de Incapacidad"
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
                <tr v-for="item in resultadosMotivos" :key="item.codigo">
                  <td>{{ item.codigo }}</td>
                  <td>{{ item.descripcion }}</td>
                  <td>
                    <button
                      class="custom-btn custom-edit-btn"
                      @click="seleccionarMotivo(item)"
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
import { ref, onMounted } from "vue";
import { Modal } from "bootstrap";

export default {
  name: "MICA",
  emits: ["seleccionado"],
  setup(props, { emit }) {
    const busquedaLocal = ref("");
    const resultadosMotivos = ref([]);
    const modalInstance = ref(null);

    onMounted(() => {
      modalInstance.value = new Modal(document.getElementById("modalMICA"));
    });

    const buscarMotivos = () => {
      if (busquedaLocal.value.trim() === "") {
        resultadosMotivos.value = [];
        return;
      }
      // Simulación de búsqueda con ejemplos de motivos de incapacidad
      resultadosMotivos.value = [
        { codigo: "M01", descripcion: "Incapacidad por enfermedad común" },
        { codigo: "M02", descripcion: "Incapacidad por accidente laboral" },
        {
          codigo: "M03",
          descripcion: "Incapacidad por enfermedad profesional",
        },
      ].filter(
        (item) =>
          item.codigo.includes(busquedaLocal.value) ||
          item.descripcion
            .toLowerCase()
            .includes(busquedaLocal.value.toLowerCase())
      );
    };

    const seleccionarMotivo = (item) => {
      emit("seleccionado", item);
      modalInstance.value.hide();
    };

    const abrirModal = () => {
      modalInstance.value.show();
    };

    return {
      busquedaLocal,
      resultadosMotivos,
      buscarMotivos,
      seleccionarMotivo,
      abrirModal,
    };
  },
};
</script>
