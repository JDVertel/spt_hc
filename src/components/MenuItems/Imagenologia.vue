<template>
  <div class="container">
    <form>
      <div id="card-formulario" class="card mb-5">
        <div id="card-header-formulario" class="card-header py-1">
          <p class="text-primary m-0 fw-bold d-flex justify-content-between">
            <span class="titulo-formulario">
              <i class="fas fa-x-ray"></i> Imagenología
            </span>
            <span class="opciones-formulario"></span>
          </p>
        </div>

        <div class="card-body">
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home-tab-pane"
                type="button"
                role="tab"
                aria-controls="home-tab-pane"
                aria-selected="true"
              >
                Actual
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile-tab-pane"
                type="button"
                role="tab"
                aria-controls="profile-tab-pane"
                aria-selected="false"
              >
                Historial
              </button>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div
              class="tab-pane fade show active"
              id="home-tab-pane"
              role="tabpanel"
              aria-labelledby="home-tab"
              tabindex="0"
            >
              <div class="mt-3">
                <button
                  class="btn btn-custom btn-icon mb-2"
                  @click="abrirModalAgregarImagen"
                >
                  Agregar
                </button>
              </div>

              <h5 class="mt-4">Orden Medica</h5>
              <hr />

              <div class="table-responsive mt-3">
                <table class="table table-striped">
                  <thead class="bg-secondary text-white">
                    <tr>
                      <th>CUPS</th>
                      <th>Nombre</th>
                      <th>Descripción</th>
                      <th>Cantidad</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(imagen, index) in imagenes" :key="index">
                      <td>{{ imagen.codigo }}</td>
                      <td>{{ imagen.descripcion }}</td>
                      <td class="text-wrap">{{ imagen.descripcion }}</td>
                      <td class="text-wrap">{{ imagen.cantidad }}</td>
                      <td>
                        <button
                          class="custom-btn custom-delete-btn"
                          @click="eliminarImagen(index)"
                        >
                          <i class="fa-solid fa-trash-can"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="profile-tab-pane"
              role="tabpanel"
              aria-labelledby="profile-tab"
              tabindex="0"
            >
              <div class="table-responsive mt-3">
                <table class="table table-striped">
                  <thead class="bg-secondary text-white">
                    <tr>
                      <th>Fecha</th>
                      <th>Nombre</th>
                      <th>Imagen</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(imagen, index) in imagenes" :key="index">
                      <td>{{ imagen.fecha }}</td>
                      <td>{{ imagen.descripcion }}</td>
                      <td>
                        <img
                          :src="getImageUrl(imagen.imagen)"
                          alt="Imagen"
                          style="
                            max-width: 100px;
                            max-height: 100px;
                            cursor: pointer;
                          "
                          @click="abrirImagenModal(imagen)"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ImagenModal
        ref="imagenModal"
        :titulo="imagenModalTitulo"
        :imagenSrc="imagenModalSrc"
      />
    </form>
    <ModalAgregarImagen
      ref="modalAgregarImagen"
      @imagen-agregada="onImagenAgregada"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import ModalAgregarImagen from "../ModalAgg/ModalAgregarImagen.vue";
import ImagenModal from "../ModalAgg/ImagenModal.vue";

export default {
  components: {
    ModalAgregarImagen,
    ImagenModal,
  },
  setup() {
    const imagenes = ref([]);
    const modalAgregarImagen = ref(null);
    const imagenModal = ref(null);
    const imagenModalTitulo = ref("");
    const imagenModalSrc = ref("");

    const abrirModalAgregarImagen = () => {
      modalAgregarImagen.value.abrirModal();
    };

    const onImagenAgregada = (nuevaImagen) => {
      imagenes.value.push(nuevaImagen);
    };

    const eliminarImagen = (index) => {
      imagenes.value.splice(index, 1);
    };

    const getImageUrl = (imagen) => {
      return imagen instanceof File ? URL.createObjectURL(imagen) : imagen;
    };

    const abrirImagenModal = (imagen) => {
      imagenModalTitulo.value = imagen.descripcion;
      imagenModalSrc.value = getImageUrl(imagen.imagen);
      imagenModal.value.mostrar();
    };

    return {
      imagenes,
      abrirModalAgregarImagen,
      onImagenAgregada,
      modalAgregarImagen,
      eliminarImagen,
      getImageUrl,
      imagenModal,
      imagenModalTitulo,
      imagenModalSrc,
      abrirImagenModal,
    };
  },
};
</script>