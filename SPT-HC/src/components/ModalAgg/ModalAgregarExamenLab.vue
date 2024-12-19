<template>
  <div
    class="modal fade"
    id="modalAgregarExamenLab"
    tabindex="-1"
    aria-labelledby="modalAgregarExamenLabLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div id="headerm-general" class="modal-header">
          <h5 class="modal-title" id="modalAgregarExamenLabLabel">
            Agregar Nuevo Examen
          </h5>
          <button
            type="button"
            id="closem-general"
            class="close-modal bi bi-x ms-auto"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div id="contenidom-general" class="modal-body">
          <form @submit.prevent="agregarExamenLab">
            <div class="mb-3">
              <label for="cups" class="form-label">CUPS</label>
              <input
                type="number"
                class="form-control"
                id="cups"
                v-model="nuevoExamen.cups"
                required
              />
            </div>
            <div class="mb-3">
              <label for="alias" class="form-label">Alias</label>
              <input
                type="text"
                class="form-control"
                id="alias"
                v-model="nuevoExamen.alias"
                required
              />
            </div>
            <div class="mb-3">
              <label for="nombre" class="form-label">Nombre</label>
              <input
                type="text"
                class="form-control"
                id="nombre"
                v-model="nuevoExamen.nombre"
                required
              />
            </div>
            <div class="mb-3">
              <label for="requerimientos" class="form-label"
                >Requerimientos</label
              >
              <textarea
                class="form-control"
                id="requerimientos"
                v-model="nuevoExamen.requerimientos"
                rows="3"
              ></textarea>
            </div>
            <div class="mb-3">
              <label for="observaciones" class="form-label"
                >Observaciones</label
              >
              <textarea
                class="form-control"
                id="observaciones"
                v-model="nuevoExamen.observaciones"
                rows="3"
              ></textarea>
            </div>
            <div class="modal-footer d-flex justify-content-between">
              <button type="submit" class="btn btn-custom btn-icon mb-2">
                Agregar
              </button>
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
  name: "ModalAgregarExamenLab",
  emits: ["examen-agregado"],
  setup(props, { emit }) {
    const nuevoExamen = ref({
      cups: "",
      alias: "",
      nombre: "",
      requerimientos: "",
      observaciones: "",
    });

    const modalInstance = ref(null);

    onMounted(() => {
      modalInstance.value = new Modal(
        document.getElementById("modalAgregarExamenLab")
      );
    });

    const abrirModal = () => {
      modalInstance.value.show();
    };

    const agregarExamenLab = () => {
      emit("examen-agregado", { ...nuevoExamen.value });
      nuevoExamen.value = {
        cups: "",
        alias: "",
        nombre: "",
        requerimientos: "",
        observaciones: "",
      };
      modalInstance.value.hide();
    };

    return {
      nuevoExamen,
      abrirModal,
      agregarExamenLab,
    };
  },
};
</script>
