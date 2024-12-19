<template>
    <form enctype="multipart/form-data" method="post">
      <div id="card-formulario" class="card">
        <div id="card-header-formulario" class="card-header py-3">
          <p class="text-primary m-0 fw-bold d-flex justify-content-between">
            <span class="titulo-formulario"
              >Formulario <i class="bi bi-ui-radios"></i
            ></span>
            <span class="opciones-formulario"></span>
          </p>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-6">
              <div class="mb-3">
                <label class="form-label"
                  ><strong class="strong-form">Texto</strong></label
                ><input
                  class="form-control"
                  type="text"
                  placeholder="Texto"
                  required="true"
                />
              </div>
            </div>
            <div class="col-6">
              <div class="mb-3">
                <label class="form-label"><strong>Numérico</strong></label
                ><input
                  class="form-control"
                  type="number"
                  placeholder="0"
                  required="true"
                />
              </div>
            </div>
            <div class="col-6">
              <div class="mb-3">
                <label class="form-label"><strong>Correo</strong></label
                ><input
                  class="form-control"
                  type="email"
                  placeholder="@gmail.com"
                  required="true"
                />
              </div>
            </div>
            <div class="col-6">
              <div class="mb-3">
                <label class="form-label"><strong>Selector</strong></label>
                <select class="form-select" required="true">
                  <option disabled selected>Seleccione</option>
                  <option>1</option>
                  <option>2</option>
                </select>
              </div>
            </div>
            <div class="col-12">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label"
                  ><strong>Email address</strong>
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                />
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label"
                  ><strong>Example textarea</strong>
                </label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
              </div>
            </div>
            <div class="col-6">
              <div class="mb-3">
                <label class="form-label"><strong>Checkbox</strong></label>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    required="true"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Ejemplo checkbox
                  </label>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="mb-3">
                <label class="form-label"><strong>Radio</strong></label>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                  <label class="form-check-label" for="flexRadioDefault1">
                    Ejemplo radio
                  </label>
                </div>
              </div>
            </div>

            <!-- --Campo de subida de imagenes-- -->
            <div class="col-15">
              <div class="mb-3">
                <strong>Imágenes *</strong>
                <p class="ifocarga">
                  {{ imagesSelected }} imágenes seleccionadas (Máximo 4)
                </p>
                <div class="logo">
                  <p class="logop">
                    <i class="bi bi-box-arrow-up"></i>
                  </p>
                  <br />
                  <input
                    class="foto"
                    :required="imagesSelected !== 4"
                    type="file"
                    ref="fileInput"
                    accept="image/*"
                    multiple
                    @change="handleFileUpload"
                  />
                </div>
                <div style="display: flex" class="d-flex flex-wrap gap-1">
                  <div
                    v-for="(image, index) in uploadedImages"
                    :key="index"
                    class="image-preview"
                  >
                    <img
                      class="fixed-size-image"
                      :src="image.src"
                      :alt="image.alt"
                    />
                  </div>
                  <i
                    class="eliminar-img bi bi-trash3"
                    @click="clearImages"
                    v-if="uploadedImages.length > 0"
                  ></i>
                </div>
              </div>
            </div>
            <!-- --Campo de subida de imagenes-- -->
          </div>
        </div>

        <!-- Botones con estilos generales y específicos -->
        <div class="text-center mb-3">
          <div class="modal-footer d-flex justify-content-center">
            <!-- Guardar botón -->
            <button type="submit" class="btn btn-custom btn-icon mx-2 mb-2">
              <i class="bi bi-floppy"></i> Guardar
            </button>

            <!-- Limpiar botón -->
            <button type="reset" class="btn btn-custom btn-icon mx-2 mb-2">
              <i class="bi bi-stars"></i> Limpiar
            </button>

            <!-- Abrir modal -->
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#ejemplo"
              class="btn btn-custom btn-icon mx-2 mb-2"
            >
              <i class="bi bi-fullscreen"></i> Abrir modal
            </button>
          </div>
        </div>
      </div>
    </form>
</template>

<script>
import { ref } from "vue";

export default {
  name: "AppForm",

  setup() {
    const uploadedImages = ref([]); // Almacenar las imágenes cargadas
    let imagesSelected = ref(0); // Contador de imágenes seleccionadas

    const handleFileUpload = (event) => {
      if (imagesSelected.value >= 4) {
        // Límite de 4 imágenes
        return;
      }

      const fileInput = event.target;
      const files = fileInput.files;

      // Recorrer los archivos seleccionados
      for (let i = 0; i < files.length; i++) {
        if (imagesSelected.value >= 4) {
          // Límite de 4 imágenes
          break;
        }

        const file = files[i];
        const imageURL = URL.createObjectURL(file);

        uploadedImages.value.push({ src: imageURL, alt: "Imagen" });
        imagesSelected.value++;
      }

      // Limpiar el campo de entrada de archivos
      fileInput.value = "";
    };

    const clearImages = () => {
      // Restablecer el array de imágenes cargadas y el contador
      uploadedImages.value = [];
      imagesSelected.value = 0;
    };

    return {
      uploadedImages,
      imagesSelected,
      handleFileUpload,
      clearImages,
    };
  },
};
</script>
