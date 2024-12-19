<template>
  <div class="container">
    <form enctype="multipart/form-data" method="post">
      <div id="card-formulario" class="card mb-5">
        <div id="card-header-formulario" class="card-header py-1">
          <p class="text-primary m-0 fw-bold d-flex justify-content-between">
            <span class="titulo-formulario">
              <i class="fas fa-user-md"></i> Examen Físico
            </span>
            <span class="opciones-formulario"></span>
          </p>
        </div>

        <div class="card-body">
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="registro-tab"
                data-bs-toggle="tab"
                data-bs-target="#registro"
                type="button"
                role="tab"
                aria-controls="registro"
                aria-selected="true"
                @click="pestanaActiva = 'registro'"
              >
                Registro
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="historial-tab"
                data-bs-toggle="tab"
                data-bs-target="#historial"
                type="button"
                role="tab"
                aria-controls="historial"
                aria-selected="false"
                @click="pestanaActiva = 'historial'"
              >
                Historial
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="neurologico-tab"
                data-bs-toggle="tab"
                data-bs-target="#neurologico"
                type="button"
                role="tab"
                aria-controls="neurologico"
                aria-selected="false"
                @click="pestanaActiva = 'neurologico'"
              >
                Estado Neurológico
              </button>
            </li>
          </ul>

          <div class="tab-content" id="myTabContent">
            <!-- Pestaña de Registro -->
            <div
              class="tab-pane fade show active"
              id="registro"
              role="tabpanel"
              aria-labelledby="registro-tab"
              tabindex="0"
            >
              <div class="row mt-3">
                <div
                  class="col-md-3 mb-3"
                  v-for="campo in camposExamenFisico"
                  :key="campo.id"
                >
                  <label :for="campo.id" class="form-label">
                    {{ campo.label }}
                  </label>
                  <textarea
                    class="form-control"
                    :id="campo.id"
                    v-model="formData[campo.id]"
                    rows="3"
                  ></textarea>
                </div>
                <div class="col-12 mb-3">
                  <label for="observaciones" class="form-label">
                    Observaciones
                  </label>
                  <textarea
                    class="form-control"
                    id="observaciones"
                    v-model="formData.observaciones"
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Pestaña de Historial -->
            <div
              class="tab-pane fade"
              id="historial"
              role="tabpanel"
              aria-labelledby="historial-tab"
              tabindex="0"
            >
              <!-- DataTable -->
              <div class="container">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="table-responsive">
                      <table
                        ref="dataTable"
                        class="table table-striped table-bordered"
                        style="width: 100%"
                      >
                        <thead>
                          <tr>
                            <th>Fecha</th>
                            <th>Tipo/Especificación</th>
                            <th>Escala Dolor</th>
                            <th>Motivo Consulta</th>
                            <th>Opciones</th>
                          </tr>
                        </thead>
                        <tbody></tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Data Table -->
            </div>

            <!-- Pestaña de Estado Neurológico -->
            <div
              class="tab-pane fade"
              id="neurologico"
              role="tabpanel"
              aria-labelledby="neurologico-tab"
              tabindex="0"
            >
              <div class="row mt-3">
                <div
                  class="col-md-4 mb-3"
                  v-for="(campo, index) in camposGlasgow"
                  :key="index"
                >
                  <label class="mb-2">{{ campo.label }}</label>
                  <select
                    class="form-select"
                    v-model="glasgow[campo.id]"
                    @change="calcularPuntuacionGlasgow"
                  >
                    <option disabled value="">Seleccione</option>
                    <option
                      v-for="opcion in ExamenFisico[campo.opciones]"
                      :key="opcion.id"
                      :value="opcion.id"
                    >
                      {{ opcion.label }}
                    </option>
                  </select>
                </div>
                <div class="col-12 mb-3">
                  <label for="observaciones" class="form-label">
                    Observaciones
                  </label>
                  <textarea
                    class="form-control"
                    id="observaciones"
                    v-model="formData.observaciones"
                    rows="3"
                  ></textarea>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-12 text-end">
                  <label class="d-inline-block me-2">Puntuación:</label>
                  <input
                    type="text"
                    class="form-control d-inline-block"
                    v-model="glasgow.puntuacion"
                    readonly
                    style="width: 60px"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Botón para capturar los datos -->
          <div class="mt-3" v-if="pestanaActiva !== 'historial'">
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
import { ExamenFisico } from "../../bd/bd.js";
import { ref, onMounted } from "vue";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";

export default {
  data() {
    return {
      pestanaActiva: "registro",
      ExamenFisico,
      camposExamenFisico: [
        { id: "cabeza", label: "Cabeza" },
        { id: "organoSentidos", label: "Órgano de los sentidos" },
        { id: "cuello", label: "Cuello" },
        { id: "torax", label: "Tórax" },
        { id: "cardiopulmonar", label: "Cardiopulmonar" },
        { id: "mama", label: "Mama" },
        { id: "corazon", label: "Corazón" },
        { id: "abdominal", label: "Abdominal" },
        { id: "pielFaneras", label: "Piel y faneras" },
        { id: "genitales", label: "Genitales" },
        { id: "pelvis", label: "Pelvis" },
        { id: "extSuperiores", label: "Ext superiores" },
        { id: "extInferiores", label: "Ext inferiores" },
        { id: "eOsteomuscular", label: "E osteomuscular" },
        { id: "eVascularPeriferico", label: "E vascular periférico" },
        { id: "estadoMental", label: "Estado mental" },
      ],
      camposGlasgow: [
        { id: "verbal", label: "Respuesta verbal", opciones: "glasgowVerbal" },
        { id: "ocular", label: "Respuesta ocular", opciones: "glasgowOcular" },
        { id: "motora", label: "Respuesta motora", opciones: "glasgowMotora" },
      ],
      formData: {},
      glasgow: {
        verbal: "",
        ocular: "",
        motora: "",
        puntuacion: 0,
      },
    };
  },
  created() {
    // Inicializar formData con campos vacíos
    this.camposExamenFisico.forEach((campo) => {
      this.formData[campo.id] = "";
    });
    this.formData.observaciones = "";
  },
  methods: {
    calcularPuntuacionGlasgow() {
      const verbal = this.glasgow.verbal ? parseInt(this.glasgow.verbal) : 0;
      const ocular = this.glasgow.ocular ? parseInt(this.glasgow.ocular) : 0;
      const motora = this.glasgow.motora ? parseInt(this.glasgow.motora) : 0;

      this.glasgow.puntuacion = verbal + ocular + motora;
    },
    capturarDatos() {
      // Verificar si hay campos vacíos
      const camposVacios = Object.entries(this.formData).filter(
        ([key, value]) => key !== "observaciones" && value.trim() === ""
      );

      if (camposVacios.length > 0) {
        Swal.fire({
          title: "Error",
          text: "Por favor, complete todos los campos obligatorios del examen físico.",
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
        return;
      }

      if (
        !this.glasgow.verbal ||
        !this.glasgow.ocular ||
        !this.glasgow.motora
      ) {
        Swal.fire({
          title: "Error",
          text: "Por favor, complete todos los campos de la escala de Glasgow.",
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
        return;
      }

      // Capturar los datos
      const datosExamenFisico = { ...this.formData };
      const datosGlasgow = { ...this.glasgow };

      // Agregar los datos a la DataTable
      const table = $(this.$refs.dataTable).DataTable();
      table.row
        .add([
          new Date().toLocaleDateString(),
          datosExamenFisico.cabeza,
          datosGlasgow.puntuacion,
          datosExamenFisico.observaciones,
          '<button class="custom-btn custom-delete-btn"><i class="fa-solid fa-trash-can"></i></button>',
        ])
        .draw();

      // Limpiar el formulario
      this.camposExamenFisico.forEach((campo) => {
        this.formData[campo.id] = "";
      });
      this.formData.observaciones = "";
      this.glasgow.verbal = "";
      this.glasgow.ocular = "";
      this.glasgow.motora = "";
      this.glasgow.puntuacion = 0;

      Swal.fire({
        title: "¡Guardado!",
        text: "Los datos del examen físico han sido guardados correctamente.",
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
    },
  },
  setup() {
    // Data Table
    const dataTable = ref(null);

    const dataTableOptions = {
      lengthMenu: [5, 10, 15, 20, 100, 200, 500],
      columnDefs: [
        { className: "centered", targets: [0, 1, 2, 3, 4] },
        { orderable: false, targets: [4] },
        { searchable: false, targets: [1] },
      ],
      pageLength: 3,
      destroy: true,
      language: {
        lengthMenu: "Mostrar _MENU_ registros por página",
        zeroRecords: "Ningún usuario encontrado",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Ningún usuario encontrado",
        infoFiltered: "(filtrados desde _MAX_ registros totales)",
        search: "Buscar:",
        loadingRecords: "Cargando...",
        paginate: {
          first: "Primero",
          last: "Último",
          next: "Siguiente",
          previous: "Anterior",
        },
      },
    };

    const initDataTable = async () => {
      if ($.fn.DataTable.isDataTable(dataTable.value)) {
        $(dataTable.value).DataTable().destroy();
      }

      $(dataTable.value).DataTable(dataTableOptions);

      $(dataTable.value).on("click", ".custom-delete-btn", function (event) {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del botón

        const table = $(dataTable.value).DataTable();
        const row = table.row($(this).parents("tr"));

        Swal.fire({
          title: "¿Está seguro?",
          text: "¿Desea eliminar esta fila? Esta acción no se puede deshacer.",
          icon: "warning",
          iconColor: "#2a3f54",
          showCancelButton: true,
          confirmButtonText: "Sí, eliminar",
          cancelButtonText: "Cancelar",
          background: "#ededed",
          backdrop: `rgba(0, 0, 0, 0.5)`,
          customClass: {
            confirmButton: "btn btn-custom mb-2 mr-2",
            cancelButton: "btn btn-custom mb-2",
          },
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            row.remove().draw();
            table.rows().every(function (rowIdx) {
              $(this.node())
                .find("td:first-child")
                .html(rowIdx + 1);
            });
            Swal.fire({
              title: "¡Eliminado!",
              text: "La fila ha sido eliminada.",
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
          }
        });
      });
    };

    onMounted(async () => {
      await initDataTable();
    });

    return {
      dataTable,
    };
  },
};
</script>
