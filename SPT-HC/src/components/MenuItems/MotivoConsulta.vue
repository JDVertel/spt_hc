<template>
  <div class="container">
    <form>
      <div id="card-formulario" class="card mb-5">
        <div id="card-header-formulario" class="card-header py-1">
          <p class="text-primary m-0 fw-bold d-flex justify-content-between">
            <span class="titulo-formulario">
              <i class="fas fa-clipboard-list"></i> Motivo de Consulta
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
              <div class="row mt-3">
                <!-- Textarea - Motivo Consulta -->
                <div class="col-lg-6 col-md-12">
                  <div class="mb-3">
                    <label for="motivo-consulta" class="form-label"
                      >Motivo Consulta</label
                    >
                    <textarea
                      class="form-control scrollable-textarea"
                      id="motivo-consulta"
                      v-model="formData.motivoConsulta"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
                <!-- Input - Dias Evolución -->
                <div class="col-lg-6 col-md-12">
                  <div class="mb-3">
                    <label for="dias-evolucion" class="form-label"
                      >Días Evolución</label
                    >
                    <input
                      type="number"
                      class="form-control"
                      id="dias-evolucion"
                      v-model="formData.diasEvolucion"
                      placeholder="0"
                    />
                  </div>
                </div>
                <!-- Textarea - Enfermedad Actual -->
                <div class="col-lg-6 col-md-12">
                  <div class="mb-3">
                    <label for="enfermedad-actual" class="form-label"
                      >Enfermedad Actual</label
                    >
                    <textarea
                      class="form-control scrollable-textarea"
                      id="enfermedad-actual"
                      v-model="formData.enfermedadActual"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
                <!-- Select - Llegada de paciente -->
                <div class="col-lg-6 col-md-12">
                  <div class="mb-3">
                    <label for="llegada-paciente" class="form-label"
                      >Llegada de paciente</label
                    >
                    <select
                      class="form-select"
                      id="llegada-paciente"
                      v-model="formData.llegadaPaciente"
                      required
                    >
                      <option disabled selected>Seleccione</option>
                      <option
                        v-for="medio in mediosllegada"
                        :key="medio.id"
                        :value="medio.id"
                      >
                        {{ medio.label }}
                      </option>
                    </select>
                  </div>
                </div>
                <!-- Select - Escala de dolor -->
                <div class="col-lg-6 col-md-12">
                  <div class="mb-3">
                    <label for="escala-dolor" class="form-label"
                      >Escala de dolor</label
                    >
                    <select
                      class="form-select"
                      id="escala-dolor"
                      v-model="formData.escalaDolor"
                      required
                    >
                      <option disabled selected>Seleccione</option>
                      <option
                        v-for="dolor in esdolor"
                        :key="dolor.id"
                        :value="dolor.id"
                      >
                        {{ dolor.label }}
                      </option>
                    </select>
                  </div>
                </div>
                <!-- Select - ¿Es Gestante? -->
                <div class="col-lg-6 col-md-12">
                  <div class="mb-3">
                    <label for="es-gestante" class="form-label"
                      >¿Es Gestante?</label
                    >
                    <select
                      class="form-select"
                      id="es-gestante"
                      v-model="formData.esGestante"
                      required
                    >
                      <option disabled selected>Seleccione</option>
                      <option
                        v-for="opcion in gestante"
                        :key="opcion.id"
                        :value="opcion.id"
                      >
                        {{ opcion.label }}
                      </option>
                    </select>
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
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mediosllegada, esdolor, gestante } from "../../bd/bd.js";
import { ref, onMounted } from "vue";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";

export default {
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
      mediosllegada,
      esdolor,
      gestante,
      formData: {
        motivoConsulta: "",
        diasEvolucion: "",
        enfermedadActual: "",
        llegadaPaciente: "",
        escalaDolor: "",
        esGestante: "",
      },
    };
  },
  methods: {
    capturarDatos() {
      // Verificar si los campos están vacíos
      if (
        !this.formData.motivoConsulta ||
        !this.formData.diasEvolucion ||
        !this.formData.enfermedadActual ||
        !this.formData.llegadaPaciente ||
        !this.formData.escalaDolor ||
        !this.formData.esGestante
      ) {
        Swal.fire({
          title: "¡Campos incompletos!",
          text: "Por favor, complete todos los campos antes de continuar.",
          icon: "warning",
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
        return;
      }

      const datosCapturados = {
        motivoConsulta: this.formData.motivoConsulta,
        diasEvolucion: this.formData.diasEvolucion,
        enfermedadActual: this.formData.enfermedadActual,
        llegadaPaciente: this.formData.llegadaPaciente,
        escalaDolor: this.formData.escalaDolor,
        esGestante: this.formData.esGestante,
      };

      console.log("Datos capturados:", datosCapturados);

      // Agregar los datos a la DataTable
      const table = $(this.$refs.dataTable).DataTable();
      const rowIndex = table.rows().count() + 1;

      table.row
        .add([
          new Date().toLocaleDateString(), // Fecha actual
          datosCapturados.llegadaPaciente,
          datosCapturados.escalaDolor,
          datosCapturados.motivoConsulta,
          `<button class="custom-btn custom-delete-btn"><i class="fa-solid fa-trash-can"></i></button>`,
        ])
        .draw(false);

      // Limpiar los campos del formulario
      this.formData.motivoConsulta = "";
      this.formData.diasEvolucion = "";
      this.formData.enfermedadActual = "";
      this.formData.llegadaPaciente = "";
      this.formData.escalaDolor = "";
      this.formData.esGestante = "";

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
