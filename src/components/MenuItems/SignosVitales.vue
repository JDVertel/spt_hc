<template>
  <div class="container">
    <form enctype="multipart/form-data" method="post">
      <div id="card-formulario" class="card mb-5">
        <div id="card-header-formulario" class="card-header py-1">
          <p class="text-primary m-0 fw-bold d-flex justify-content-between">
            <span class="titulo-formulario">
              <i class="fa-solid fa-stethoscope"></i> Signos Vitales
            </span>
            <span class="opciones-formulario"></span>
          </p>
        </div>
        <div class="card-body">
          <div class="row">
            <div
              class="col-lg-6 col-md-12"
              v-for="(campo, index) in camposSignosVitales"
              :key="index"
            >
              <div class="mb-3">
                <label :for="campo.id" class="form-label">
                  <strong>{{ campo.label }}</strong>
                </label>
                <input
                  :id="campo.id"
                  class="form-control"
                  :type="campo.type"
                  :placeholder="campo.placeholder"
                  v-model="formData[campo.id]"
                  required
                />
              </div>
            </div>
            <div class="col-12">
              <div class="mb-3">
                <label for="observaciones" class="form-label">
                  <strong>Observaciones</strong>
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
      camposSignosVitales: [
        { id: "peso", label: "Peso (kg)", type: "number", placeholder: "0" },
        { id: "talla", label: "Talla (cm)", type: "number", placeholder: "0" },
        {
          id: "temperatura",
          label: "Temperatura (°C)",
          type: "number",
          placeholder: "0",
        },
        {
          id: "presionAbdominal",
          label: "Presión abdominal",
          type: "number",
          placeholder: "0",
        },
        {
          id: "porcentajeSatOxigeno",
          label: "Porcentaje sat oxígeno",
          type: "number",
          placeholder: "0",
        },
        {
          id: "tArterialSistolica",
          label: "T arterial sistólica mm(Hg)",
          type: "number",
          placeholder: "0",
        },
        {
          id: "tArterialDiastolica",
          label: "T arterial diastólica mm(Hg)",
          type: "number",
          placeholder: "0",
        },
        {
          id: "tArterialMedia",
          label: "T arterial media mm(Hg)",
          type: "number",
          placeholder: "0",
        },
        {
          id: "fRespiratoria",
          label: "F respiratoria (rpm)",
          type: "number",
          placeholder: "0",
        },
        {
          id: "fCardiaca",
          label: "F cardíaca",
          type: "number",
          placeholder: "0",
        },
        { id: "imc", label: "IMC", type: "number", placeholder: "0" },
        {
          id: "clasificacionImc",
          label: "Clasificación IMC",
          type: "text",
          placeholder: "",
        },
      ],
      formData: {
        peso: "",
        talla: "",
        temperatura: "",
        presionAbdominal: "",
        porcentajeSatOxigeno: "",
        tArterialSistolica: "",
        tArterialDiastolica: "",
        tArterialMedia: "",
        fRespiratoria: "",
        fCardiaca: "",
        imc: "",
        clasificacionImc: "",
        observaciones: "",
      },
    };
  },
  methods: {
    capturarDatos() {
      // Verificamos si algún campo está vacío
      const camposVacios = Object.entries(this.formData).filter(
        ([key, value]) => key !== "observaciones" && value === ""
      );

      if (camposVacios.length > 0) {
        alert("Por favor, complete todos los campos obligatorios.");
      } else {
        // Capturamos los datos si están todos completos
        const datosSignosVitales = { ...this.formData };
        console.log("Datos de Signos Vitales:", datosSignosVitales);
      }
    },
  },
};
</script>
