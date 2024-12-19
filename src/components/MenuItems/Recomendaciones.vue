<template>
  <div class="container">
    <form enctype="multipart/form-data" method="post">
      <div id="card-formulario" class="card mb-5">
        <div id="card-header-formulario" class="card-header py-1">
          <p class="text-primary m-0 fw-bold d-flex justify-content-between">
            <span class="titulo-formulario">
              <i class="fas fa-clipboard-check"></i> Recomendaciones
            </span>
            <span class="opciones-formulario"></span>
          </p>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-12">
              <div class="mb-3">
                <label for="observaciones" class="form-label">
                  Recomendaciones al paciente relacionadas con la consulta
                </label>
                <textarea
                  id="observaciones"
                  class="form-control"
                  rows="3"
                  v-model="formData.observaciones"
                ></textarea>
              </div>
            </div>
          </div>
          <!-- Botón para capturar los datos -->
          <div class="mt-3">
            <button
              type="button"
              class="btn btn-custom btn-icon mb-2"
              @click="capturarDatos"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        observaciones: "",
      },
      observacionesArray: [],
    };
  },
  methods: {
    capturarDatos() {
      if (this.formData.observaciones.trim() === "") {
        Swal.fire({
          title: "Campos incompletos",
          text: "Por favor, complete el campo de observaciones.",
          icon: "warning",
          iconColor: "#2a3f54",
          confirmButtonText: "Entendido",
          background: "#ededed",
          backdrop: `rgba(0, 0, 0, 0.5)`,
          customClass: {
            confirmButton: "btn btn-custom mb-2",
          },
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      } else {
        this.observacionesArray = this.formData.observaciones.split("\n");
        console.log("Array de Observaciones:", this.observacionesArray);

        Swal.fire({
          title: "Registrado",
          text: "Las recomendaciones han sido registradas correctamente.",
          icon: "success",
          iconColor: "#2a3f54",
          confirmButtonText: "Entendido",
          background: "#ededed",
          backdrop: `rgba(0, 0, 0, 0.5)`,
          customClass: {
            confirmButton: "btn btn-custom mb-2",
          },
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });

        // Limpiar campo de observaciones
        this.formData.observaciones = "";
      }
    },
  },
};
</script>
