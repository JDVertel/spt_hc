<template>
  <div
    class="modal fade"
    id="modalAgregarProcedimiento"
    tabindex="-1"
    aria-labelledby="modalAgregarProcedimientoLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div id="headerm-general" class="modal-header">
          <h1 class="modal-title fs-5 mt-2" :id="`${config.id}Label`">
            {{ config.title }}
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
          <form @submit.prevent="agregarProcedimiento">
            <div class="mb-3">
              <label for="cups" class="form-label">CUPS</label>
              <input
                type="number"
                class="form-control"
                id="cups"
                v-model="nuevoProcedimiento.cups"
                required
              />
            </div>
            <div class="mb-3">
              <label for="cantidad" class="form-label">Cantidad</label>
              <input
                type="number"
                class="form-control"
                id="cantidad"
                v-model="nuevoProcedimiento.cantidad"
                required
              />
            </div>
            <div class="mb-3">
              <label for="nombre" class="form-label">Nombre</label>
              <textarea
                class="form-control"
                id="nombre"
                v-model="nuevoProcedimiento.nombre"
                required
              ></textarea>
            </div>
            <div class="modal-footer d-flex justify-content-between">
              <button type="submit" class="btn btn-custom btn-icon mb-5">
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
import { modalConfig } from "../../bd/bd.js";
import { ref, onMounted } from "vue";
import { Modal } from "bootstrap";

export default {
  name: "ModalAgregarProcedimiento",
  emits: ["procedimiento-agregado"],
  setup(props, { emit }) {
    const nuevoProcedimiento = ref({
      cups: "",
      cantidad: 1,
      nombre: "",
    });

    const modalInstance = ref(null);

    const abrirModal = () => {
      modalInstance.value.show();
    };

    const agregarProcedimiento = () => {
      emit("procedimiento-agregado", { ...nuevoProcedimiento.value });
      nuevoProcedimiento.value = { cups: "", cantidad: 1, nombre: "" };
      modalInstance.value.hide();
    };

    onMounted(() => {
      modalInstance.value = new Modal(
        document.getElementById("modalAgregarProcedimiento")
      );
    });

    return {
      nuevoProcedimiento,
      abrirModal,
      agregarProcedimiento,
      config: modalConfig,
    };
  },
};
</script>
