<template>
  <div class="container">
    <form>
      <div id="card-formulario" class="card mb-5">
        <div id="card-header-formulario" class="card-header py-3">
          <p class="text-primary m-0 fw-bold d-flex justify-content-between">
            <span class="titulo-formulario">
              <i class="fas fa-calendar-times"></i> Incapacidad Médica
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
                <!-- Motivo de Incapacidad médica -->
                <div class="col-md-6 mb-3">
                  <label for="motivo-incapacidad" class="form-label"
                    >Motivo de Incapacidad médica</label
                  >
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      id="motivo-incapacidad"
                      v-model="motivoIncapacidad"
                      readonly
                    />
                    <button
                      class="btn btn-custom btn-icon"
                      type="button"
                      @click="abrirModalMotivo"
                    >
                      Buscar
                    </button>
                  </div>
                  <textarea
                    class="form-control mt-2"
                    rows="3"
                    v-model="descripcionMotivo"
                    readonly
                  ></textarea>
                </div>

                <!-- Diagnóstico de la consulta -->
                <div class="col-md-6 mb-3">
                  <label for="diagnostico-consulta" class="form-label"
                    >Diagnóstico de la consulta</label
                  >
                  <textarea
                    class="form-control"
                    id="diagnostico-consulta"
                    rows="6"
                    v-model="diagnosticoConsulta"
                  ></textarea>
                </div>
              </div>

              <div class="row mt-3">
                <!-- Días de incapacidad médica -->
                <div class="col-md-6 mb-3">
                  <div class="mb-2">
                    <label for="dias-recomendados" class="form-label"
                      >Días Recomendados:</label
                    >
                    <input
                      type="number"
                      class="form-control"
                      id="dias-recomendados"
                      v-model="diasRecomendados"
                    />
                  </div>
                  <div>
                    <label for="dias-ordenados" class="form-label mt-5"
                      >Días ordenados</label
                    >
                    <input
                      type="number"
                      class="form-control"
                      id="dias-ordenados"
                      v-model="diasOrdenados"
                    />
                  </div>
                </div>

                <!-- Análisis de la consulta -->
                <div class="col-md-6 mb-3">
                  <label for="analisis-consulta" class="form-label"
                    >Análisis de la consulta</label
                  >
                  <textarea
                    class="form-control"
                    id="analisis-consulta"
                    rows="3"
                    v-model="analisisConsulta"
                  ></textarea>
                  <div class="mt-2">
                    <label for="fecha-finalizacion" class="form-label">
                      Fecha Finalización de incapacidad médica</label
                    >
                    <input
                      type="date"
                      class="form-control"
                      id="fecha-finalizacion"
                      v-model="fechaFinalizacion"
                      readonly
                    />
                  </div>
                </div>
              </div>

              <hr />

              <div class="row mt-3">
                <!-- Observaciones de la incapacidad médica -->
                <div class="col-12 mb-3">
                  <label for="observaciones-incapacidad" class="form-label"
                    >Observaciones de la incapacidad médica</label
                  >
                  <textarea
                    class="form-control"
                    id="observaciones-incapacidad"
                    rows="3"
                    v-model="observacionesIncapacidad"
                  ></textarea>
                </div>
              </div>

              <!-- Botón para generar incapacidad médica -->
              <div class="mt-3">
                <button
                  type="button"
                  class="btn btn-custom btn-icon mb-2"
                  @click="generarIncapacidad"
                >
                  Generar
                </button>
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
                            <th>Dias</th>
                            <th>Motivo</th>
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
  <MICA ref="modalMotivo" @seleccionado="seleccionarMotivo" />
</template>

<script>
import { ref, computed, onMounted } from "vue";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";

import MICA from "../ModalIncap/MICA.vue";

export default {
  components: {
    MICA,
  },
  setup() {
    const motivoIncapacidad = ref("");
    const descripcionMotivo = ref("");
    const diagnosticoConsulta = ref("");
    const diasRecomendados = ref(0);
    const diasOrdenados = ref(0);
    const analisisConsulta = ref("");
    const fechaFinalizacion = ref("");
    const observacionesIncapacidad = ref("");
    const dataTable = ref(null);
    const modalMotivo = ref(null);

    const fechaActual = new Date().toISOString().split("T")[0];

    const calcularFechaFinalizacion = computed(() => {
      if (diasOrdenados.value) {
        let fecha = new Date();
        fecha.setDate(fecha.getDate() + parseInt(diasOrdenados.value));
        return fecha.toISOString().split("T")[0];
      }
      return "";
    });

    const abrirModalMotivo = () => {
      if (modalMotivo.value) {
        modalMotivo.value.abrirModal();
      } else {
        console.error("modalMotivo is not defined");
      }
    };

    const seleccionarMotivo = (motivo) => {
      motivoIncapacidad.value = motivo.codigo;
      descripcionMotivo.value = motivo.descripcion;
    };

    const generarIncapacidad = () => {
      if (!motivoIncapacidad.value || !diasOrdenados.value) {
        Swal.fire({
          title: "Campos incompletos",
          text: "Por favor, complete todos los campos obligatorios.",
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
        return;
      }

      const incapacidad = {
        motivoIncapacidad: motivoIncapacidad.value,
        descripcionMotivo: descripcionMotivo.value,
        diagnosticoConsulta: diagnosticoConsulta.value,
        diasRecomendados: diasRecomendados.value,
        diasOrdenados: diasOrdenados.value,
        analisisConsulta: analisisConsulta.value,
        fechaFinalizacion: calcularFechaFinalizacion.value,
        observacionesIncapacidad: observacionesIncapacidad.value,
        fechaGeneracion: fechaActual,
      };

      console.log("Incapacidad generada:", incapacidad);
      agregarIncapacidadHistorial(incapacidad);

      // Limpiar campos
      motivoIncapacidad.value = "";
      descripcionMotivo.value = "";
      diagnosticoConsulta.value = "";
      diasRecomendados.value = 0;
      diasOrdenados.value = 0;
      analisisConsulta.value = "";
      observacionesIncapacidad.value = "";

      Swal.fire({
        title: "Registrado",
        text: "La incapacidad médica ha sido registrada correctamente.",
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
    };

    const agregarIncapacidadHistorial = (incapacidad) => {
      const table = $(dataTable.value).DataTable();
      const fechaActual = new Date().toLocaleDateString();
      table.row
        .add([
          fechaActual,
          "Tipo/Especificación",
          incapacidad.diasOrdenados,
          incapacidad.motivoIncapacidad,
          `<button class="custom-btn custom-delete-btn" onclick="eliminarIncapacidadHistorial(this)">
          <i class="fa-solid fa-trash-can"></i>
        </button>`,
        ])
        .draw(false);
    };

    window.eliminarIncapacidadHistorial = (button) => {
      const table = $(dataTable.value).DataTable();
      const row = $(button).closest("tr");
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
          table.row(row).remove().draw();
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
    };

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
        zeroRecords: "Ninguna incapacidad encontrada",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Ninguna incapacidad encontrada",
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
    };

    onMounted(async () => {
      await initDataTable();
    });

    return {
      motivoIncapacidad,
      descripcionMotivo,
      diagnosticoConsulta,
      diasRecomendados,
      diasOrdenados,
      analisisConsulta,
      fechaFinalizacion: calcularFechaFinalizacion,
      observacionesIncapacidad,
      dataTable,
      abrirModalMotivo,
      seleccionarMotivo,
      generarIncapacidad,
      modalMotivo,
    };
  },
};
</script>
