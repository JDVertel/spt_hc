<template>
  <div
    class="modal fade"
    id="imagenModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="imagenModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div id="headerm-general" class="modal-header">
          <h1 class="modal-title fs-5 mt-2" id="imagenModalLabel">
            {{ titulo }}
          </h1>
          <button
            type="button"
            id="closem-general"
            class="close-modal bi bi-x ms-auto"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <img :src="imagenSrc" class="img-fluid" :alt="titulo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { Modal } from "bootstrap";

export default {
  name: "ImagenModal",
  props: {
    titulo: String,
    imagenSrc: String,
  },
  setup() {
    const modalInstance = ref(null);

    onMounted(() => {
      modalInstance.value = new Modal(document.getElementById("imagenModal"));
    });

    const mostrar = () => {
      modalInstance.value.show();
    };

    const ocultar = () => {
      modalInstance.value.hide();
    };

    return {
      mostrar,
      ocultar,
    };
  },
};
</script>
