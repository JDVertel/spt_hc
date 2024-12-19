<template>
  <div class="container">
    <form enctype="multipart/form-data" method="post">
      <div id="card-formulario" class="card mb-5">
        <div id="card-header-formulario" class="card-header py-1">
          <p class="text-primary m-0 fw-bold d-flex justify-content-between">
            <span class="titulo-formulario">
              <i class="fas fa-chart-line"></i> Análisis de la Consulta
            </span>
            <span class="opciones-formulario"></span>
          </p>
        </div>
        <div class="card-body">
          <div class="row">
            <div
              class="col-md-6 mb-3"
              v-for="campo in camposAnalisisConsulta"
              :key="campo.id"
            >
              <label :for="campo.id" class="form-label">
                {{ campo.label }}
              </label>
              <textarea
                :id="campo.id"
                class="form-control"
                rows="3"
                v-model="formData[campo.id]"
                :placeholder="campo.placeholder"
              ></textarea>
            </div>
          </div>
          <hr />
          <!-- Botón para capturar los datos -->
          <div class="mt-4">
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
      camposAnalisisConsulta: [
        {
          id: "descripcionAnalisis",
          label: "Descripción y Análisis Médico de la Consulta",
          placeholder: "Ingrese la descripción y análisis médico",
        },
        {
          id: "planManejo",
          label: "Plan de Manejo",
          placeholder: "Ingrese el plan de manejo",
        },
      ],
      formData: {
        descripcionAnalisis: "",
        planManejo: "",
      },
    };
  },
  methods: {
    capturarDatos() {
      // Verificamos si algún campo está vacío
      const camposVacios = Object.entries(this.formData).filter(
        ([key, value]) => value.trim() === ""
      );

      if (camposVacios.length > 0) {
        Swal.fire({
          title: "Error",
          text: "Por favor, complete todos los campos.",
          icon: "error",
          iconColor: "#d9534f",
          confirmButtonText: "Entendido",
          customClass: {
            confirmButton: "btn btn-custom mb-2",
          },
          background: "#ededed",
          backdrop: `rgba(0, 0, 0, 0.5)`,
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      } else {
        // Capturamos los datos si están todos completos
        const datosAnalisisConsulta = { ...this.formData };
        console.log(
          "Datos del Análisis de la Consulta:",
          datosAnalisisConsulta
        );

        Swal.fire({
          title: "¡Guardado!",
          text: "Los datos del análisis de la consulta han sido guardados correctamente.",
          icon: "success",
          iconColor: "#2a3f54",
          confirmButtonText: "Entendido",
          customClass: {
            confirmButton: "btn btn-custom mb-2",
          },
          background: "#ededed",
          backdrop: `rgba(0, 0, 0, 0.5)`,
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });

        // Limpiar el formulario
        this.formData = {
          descripcionAnalisis: "",
          planManejo: "",
        };
      }
    },
  },
};
</script>
