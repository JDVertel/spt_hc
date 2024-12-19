<template>
  <div
    class="modal fade"
    id="modalAgregarMedic"
    tabindex="-1"
    aria-labelledby="modalAgregarMedicLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div id="headerm-general" class="modal-header">
          <h5 class="modal-title" id="modalAgregarMedicLabel">
            Agregar Nuevo Medicamento
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
          <form @submit.prevent="agregarMedic">
            <div class="mb-3">
              <label for="cups" class="form-label">CUPS</label>
              <input
                type="number"
                class="form-control"
                id="cups"
                v-model="nuevoMedic.cups"
                required
              />
            </div>
            <div class="mb-3">
              <label for="activo" class="form-label">Principio Activo</label>
              <input
                type="text"
                class="form-control"
                id="activo"
                v-model="nuevoMedic.activo"
                required
              />
            </div>
            <div class="mb-3">
              <label for="nombre" class="form-label">Nombre</label>
              <input
                type="text"
                class="form-control"
                id="nombre"
                v-model="nuevoMedic.nombre"
                required
              />
            </div>
            <div class="mb-3">
              <label for="presentacion" class="form-label"
                >Presentación</label
              >
              <textarea
                class="form-control"
                id="presentacion"
                v-model="nuevoMedic.presentacion"
                rows="3"
              ></textarea>
            </div>
            <div class="mb-3">
              <label for="posologia" class="form-label"
                >Posologia</label
              >
              <textarea
                class="form-control"
                id="posologia"
                v-model="nuevoMedic.posologia"
                rows="3"
              ></textarea>
            </div>
            <div class="mb-3">
              <label for="cantidad" class="form-label">Cantidad</label>
              <input
                type="number"
                class="form-control"
                id="cantidad"
                v-model="nuevoMedic.cantidad"
                required
              />
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
  name: "ModalAgregarMedic",
  emits: ["medic-agregado"],
  setup(props, { emit }) {
    const nuevoMedic = ref({
      cups: "",
      activo: "",
      nombre: "",
      presentacion: "",
      posologia: "",
      cantidad: "",
    });

    const modalInstance = ref(null);

    onMounted(() => {
      modalInstance.value = new Modal(
        document.getElementById("modalAgregarMedic")
      );
    });

    const abrirModal = () => {
      modalInstance.value.show();
    };

    const agregarMedic = () => {
      emit("medic-agregado", { ...nuevoMedic.value });
      nuevoMedic.value = {
        cups: "",
        activo: "",
        nombre: "",
        presentacion: "",
        posologia: "",
        cantidad: "",
      };
      modalInstance.value.hide();
    };

    return {
      nuevoMedic,
      abrirModal,
      agregarMedic,
    };
  },
};
</script>
