<template>
  <div class="container">
    <form>
      <div id="card-formulario" class="card mb-5">
        <div id="card-header-formulario" class="card-header py-1">
          <p class="text-primary m-0 fw-bold d-flex justify-content-between">
            <span class="titulo-formulario">
              <i class="fas fa-diagnoses"></i> Diagnóstico
            </span>
            <span class="opciones-formulario"></span>
          </p>
        </div>

        <div class="card-body">
          <!-- Navegación con pestañas -->
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
            <!-- Tab de Actual -->
            <div
              class="tab-pane fade show active"
              id="home-tab-pane"
              role="tabpanel"
              aria-labelledby="home-tab"
              tabindex="0"
            >
              <div class="row mt-3">
                <div class="col-md-4 mb-3">
                  <label for="clasificacion-diagnostico" class="form-label"
                    >Clasificación diagnóstico</label
                  >
                  <select
                    class="form-select"
                    id="clasificacion-diagnostico"
                    v-model="diagnostico.clasificacion"
                  >
                    <option disabled value="">Seleccione</option>
                    <option
                      v-for="clasificacion in Diagnostico.clasificacionesDiagnostico"
                      :key="clasificacion.id"
                      :value="clasificacion.id"
                    >
                      {{ clasificacion.label }}
                    </option>
                  </select>
                </div>
                <div class="col-md-4 mb-3">
                  <label for="finalidad-consulta" class="form-label"
                    >Finalidad de la consulta</label
                  >
                  <select
                    class="form-select"
                    id="finalidad-consulta"
                    v-model="diagnostico.finalidad"
                  >
                    <option disabled value="">Seleccione</option>
                    <option
                      v-for="finalidad in Diagnostico.finalidadesConsulta"
                      :key="finalidad.id"
                      :value="finalidad.id"
                    >
                      {{ finalidad.label }}
                    </option>
                  </select>
                </div>
                <div class="col-md-4 mb-3">
                  <label for="causa-externa" class="form-label"
                    >Causa Externa</label
                  >
                  <select
                    class="form-select"
                    id="causa-externa"
                    v-model="diagnostico.causaExterna"
                  >
                    <option disabled value="">Seleccione</option>
                    <option
                      v-for="causa in Diagnostico.causasExternas"
                      :key="causa.id"
                      :value="causa.id"
                    >
                      {{ causa.label }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-3">
                  <h6>Diagnóstico Principal</h6>
                  <button
                    type="button"
                    class="btn btn-custom btn-icon mb-2"
                    @click="abrirModal('principal')"
                  >
                    BUSCAR CIE-10
                  </button>
                </div>
                <div class="col-md-9">
                  <label for="descripcion-principal" class="form-label"
                    >Descripción</label
                  >
                  <textarea
                    class="form-control"
                    id="descripcion-principal"
                    rows="3"
                    disabled
                    v-model="diagnostico.principal.descripcion"
                  ></textarea>
                </div>
              </div>

              <div class="row mt-3">
                <div class="col-md-3">
                  <h6>Relacionado Primario</h6>
                  <button
                    type="button"
                    class="btn btn-custom btn-icon mb-2"
                    @click="abrirModal('primario')"
                  >
                    BUSCAR CIE-10
                  </button>
                </div>
                <div class="col-md-9">
                  <label for="descripcion-primario" class="form-label"
                    >Descripción</label
                  >
                  <textarea
                    class="form-control"
                    id="descripcion-primario"
                    rows="3"
                    disabled
                    v-model="diagnostico.primario.descripcion"
                  ></textarea>
                </div>
              </div>

              <div class="row mt-3">
                <div class="col-md-3">
                  <h6>Relacionado Secundario</h6>
                  <button
                    type="button"
                    class="btn btn-custom btn-icon mb-2"
                    @click="abrirModal('secundario')"
                  >
                    BUSCAR CIE-10
                  </button>
                </div>
                <div class="col-md-9">
                  <label for="descripcion-secundario" class="form-label"
                    >Descripción</label
                  >
                  <textarea
                    class="form-control"
                    id="descripcion-secundario"
                    rows="3"
                    disabled
                    v-model="diagnostico.secundario.descripcion"
                  ></textarea>
                </div>
              </div>

              <div class="row mt-3">
                <div class="col-md-3">
                  <h6>Relacionado Terciario</h6>
                  <button
                    type="button"
                    class="btn btn-custom btn-icon mb-2"
                    @click="abrirModal('terciario')"
                  >
                    BUSCAR CIE-10
                  </button>
                </div>
                <div class="col-md-9">
                  <label for="descripcion-terciario" class="form-label"
                    >Descripción</label
                  >
                  <textarea
                    class="form-control"
                    id="descripcion-terciario"
                    rows="3"
                    disabled
                    v-model="diagnostico.terciario.descripcion"
                  ></textarea>
                </div>
              </div>

              <div class="row mt-3">
                <div class="col-md-3">
                  <h6>Relacionado Cuartenario</h6>
                  <button
                    type="button"
                    class="btn btn-custom btn-icon mb-2"
                    @click="abrirModal('cuartenario')"
                  >
                    BUSCAR CIE-10
                  </button>
                </div>
                <div class="col-md-9">
                  <label for="descripcion-cuartenario" class="form-label"
                    >Descripción</label
                  >
                  <textarea
                    class="form-control"
                    id="descripcion-cuartenario"
                    rows="3"
                    disabled
                    v-model="diagnostico.cuartenario.descripcion"
                  ></textarea>
                </div>
              </div>

              <hr class="mt-4">

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

            <!-- Tab de Historial -->
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
                            <th>Clasificación</th>
                            <th>Finalidad</th>
                            <th>Causa Externa</th>
                            <th>Diagnóstico</th>
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

    <!-- Modal CIE-10 -->
    <ModalCIE10Diag ref="modalCIE10Diag" @seleccionado="agregarCIE10" />
  </div>
</template>

<script>
import { Diagnostico } from "../../bd/bd.js";
import { ref, onMounted } from "vue";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";
import ModalCIE10Diag from "../ModalDiag/MCIE10Diag.vue";

export default {
  components: {
    ModalCIE10Diag,
  },
  data() {
    return {
      Diagnostico,
      diagnostico: {
        clasificacion: "",
        finalidad: "",
        causaExterna: "",
        principal: { codigo: "", descripcion: "" },
        primario: { codigo: "", descripcion: "" },
        secundario: { codigo: "", descripcion: "" },
        terciario: { codigo: "", descripcion: "" },
        cuartenario: { codigo: "", descripcion: "" },
      },
      tipoActual: "",
      historialDiagnosticos: [],
    };
  },
  methods: {
    abrirModal(tipo) {
      this.tipoActual = tipo;
      this.$refs.modalCIE10Diag.abrirModal();
    },
    agregarCIE10(item) {
      this.diagnostico[this.tipoActual].codigo = item.codigo;
      this.diagnostico[this.tipoActual].descripcion = item.descripcion;
    },
    capturarDatos() {
      // Verificar si hay campos vacíos
      if (
        !this.diagnostico.clasificacion ||
        !this.diagnostico.finalidad ||
        !this.diagnostico.causaExterna ||
        !this.diagnostico.principal.descripcion
      ) {
        Swal.fire({
          title: "Error",
          text: "Por favor, complete todos los campos obligatorios.",
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
      const nuevoDiagnostico = {
        ...this.diagnostico,
        fecha: new Date().toLocaleDateString(),
      };
      this.historialDiagnosticos.push(nuevoDiagnostico);
      console.log(this.historialDiagnosticos);

      // Agregar los datos a la DataTable
      const table = $(this.$refs.dataTable).DataTable();
      table.row
        .add([
          nuevoDiagnostico.fecha,
          this.Diagnostico.clasificacionesDiagnostico.find(
            (c) => c.id === nuevoDiagnostico.clasificacion
          ).label,
          this.Diagnostico.finalidadesConsulta.find(
            (f) => f.id === nuevoDiagnostico.finalidad
          ).label,
          this.Diagnostico.causasExternas.find(
            (c) => c.id === nuevoDiagnostico.causaExterna
          ).label,
          nuevoDiagnostico.principal.descripcion,
          '<button class="custom-btn custom-delete-btn"><i class="fa-solid fa-trash-can"></i></button>',
        ])
        .draw();

      // Limpiar el formulario
      this.diagnostico = {
        clasificacion: "",
        finalidad: "",
        causaExterna: "",
        principal: { codigo: "", descripcion: "" },
        primario: { codigo: "", descripcion: "" },
        secundario: { codigo: "", descripcion: "" },
        terciario: { codigo: "", descripcion: "" },
        cuartenario: { codigo: "", descripcion: "" },
      };

      Swal.fire({
        title: "¡Guardado!",
        text: "Los datos del diagnóstico han sido guardados correctamente.",
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
        { className: "centered", targets: [0, 1, 2, 3, 4, 5] },
        { orderable: false, targets: [5] },
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
