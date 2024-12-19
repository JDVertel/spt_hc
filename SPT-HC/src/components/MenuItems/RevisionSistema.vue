<template>
  <div class="container">
    <form>
      <div id="card-formulario" class="card mb-5">
        <div id="card-header-formulario" class="card-header py-1">
          <p class="text-primary m-0 fw-bold d-flex justify-content-between">
            <span class="titulo-formulario">
              <i class="fas fa-heartbeat"></i> Revisión por Sistemas</span
            >
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
                Registro de Hallazgos
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
              <div class="row mt-3">
                <FormField
                  v-for="(field, index) in fields"
                  :key="index"
                  :id="field.id"
                  :label="field.label"
                  type="textarea"
                  v-model="formData[field.model]"
                />
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
            <div
              class="tab-pane fade"
              id="profile-tab-pane"
              role="tabpanel"
              aria-labelledby="profile-tab"
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
                            <th>Sistema</th>
                            <th>Hallazgo</th>
                            <th>Observaciones</th>
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
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";
import FormField from "../MenuItems/RevSis/FormField.vue";

export default {
  components: {
    FormField,
  },
  setup() {
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
        zeroRecords: "Ningún registro encontrado",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Ningún registro encontrado",
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
  data() {
    return {
      fields: [
        {
          id: "s-muscular-esqueletico",
          label: "S muscular/esqueletico",
          model: "sMuscularEsqueletico",
        },
        {
          id: "s-nervioso-central-periferico",
          label: "S nervioso central y periferico",
          model: "sNerviosoCentralPeriferico",
        },
        {
          id: "s-gastrointestinal",
          label: "S gastrointestinal",
          model: "sGastrointestinal",
        },
        { id: "s-endocrino", label: "S endocrino", model: "sEndocrino" },
        {
          id: "s-respiratorio",
          label: "S respiratorio",
          model: "sRespiratorio",
        },
        { id: "s-reproductor", label: "S reproductor", model: "sReproductor" },
        { id: "s-sanguineo", label: "S sanguineo", model: "sSanguineo" },
        { id: "s-linfatico", label: "S linfatico", model: "sLinfatico" },
        {
          id: "s-cardiovascular",
          label: "S cardiovascular",
          model: "sCardiovascular",
        },
        { id: "s-urinario", label: "S urinario", model: "sUrinario" },
        {
          id: "s-osteoarticular",
          label: "S osteoarticular",
          model: "sOsteoarticular",
        },
        { id: "s-digestivo", label: "S digestivo", model: "sDigestivo" },
        { id: "observaciones", label: "Observaciones", model: "observaciones" },
      ],
      formData: {
        sMuscularEsqueletico: "",
        sNerviosoCentralPeriferico: "",
        sGastrointestinal: "",
        sEndocrino: "",
        sRespiratorio: "",
        sReproductor: "",
        sSanguineo: "",
        sLinfatico: "",
        sCardiovascular: "",
        sUrinario: "",
        sOsteoarticular: "",
        sDigestivo: "",
        observaciones: "",
      },
    };
  },
  methods: {
    capturarDatos() {
      const datosCapturados = { ...this.formData };

      console.log("Datos capturados:", datosCapturados);

      // Agregar los datos a la DataTable
      const table = $(this.$refs.dataTable).DataTable();
      const rowIndex = table.rows().count() + 1;

      table.row
        .add([
          new Date().toLocaleDateString(), // Fecha actual
          "Sistema", // Aquí puedes agregar la lógica para determinar el sistema
          datosCapturados.sMuscularEsqueletico, // Ejemplo de hallazgo
          datosCapturados.observaciones,
          `<button class="custom-btn custom-delete-btn"><i class="fa-solid fa-trash-can"></i></button>`,
        ])
        .draw(false);

      // Limpiar los campos del formulario
      this.fields.forEach((field) => {
        this.formData[field.model] = "";
      });

      Swal.fire({
        title: "¡Datos guardados!",
        text: "Los datos han sido guardados correctamente.",
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
};
</script>
