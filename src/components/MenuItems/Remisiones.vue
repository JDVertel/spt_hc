<template>
  <div class="container">
    <form>
      <div id="card-formulario" class="card mb-5">
        <div id="card-header-formulario" class="card-header py-1">
          <p class="text-primary m-0 fw-bold d-flex justify-content-between">
            <span class="titulo-formulario">
              <i class="fas fa-paper-plane"></i> Remisiones
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
              <!-- Primera fila: Motivo de remisión y Diagnóstico -->
              <div class="row mt-3">
                <div class="col-md-6 mb-3">
                  <label for="motivo-remision" class="form-label">
                    Motivo de la remisión</label
                  >
                  <textarea
                    class="form-control scrollable-textarea"
                    id="motivo-remision"
                    rows="3"
                    v-model="motivoRemision"
                  ></textarea>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="diagnostico-consulta" class="form-label">
                    Diagnóstico de la consulta</label
                  >
                  <textarea
                    class="form-control scrollable-textarea"
                    id="diagnostico-consulta"
                    rows="3"
                    v-model="diagnosticoConsulta"
                    readonly
                  ></textarea>
                </div>
              </div>

              <!-- Segunda fila: Tipo de servicio y Análisis -->
              <div class="row mt-3">
                <div class="col-md-6 mb-3">
                  <!-- Grupo de clasificación y especificación del servicio -->
                  <div class="mb-2">
                    <label for="clasificacion-servicio" class="form-label">
                      Clasificación Servicio
                    </label>
                    <select
                      class="form-select mb-4"
                      id="clasificacion-servicio"
                      v-model="clasificacionServicio"
                    >
                      <option value="" disabled>Seleccione una opción</option>
                      <option
                        v-for="opcion in clasificacionesServicio"
                        :key="opcion.id"
                        :value="opcion.id"
                      >
                        {{ opcion.label }}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label for="especificacion-servicio" class="form-label">
                      Especificación del servicio
                    </label>
                    <select
                      class="form-select"
                      id="especificacion-servicio"
                      v-model="especificacionServicio"
                    >
                      <option value="" disabled>Seleccione una opción</option>
                      <option
                        v-for="opcion in especificacionesServicio"
                        :key="opcion.id"
                        :value="opcion.id"
                      >
                        {{ opcion.label }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="col-md-6 mb-3">
                  <label for="analisis-consulta" class="form-label"
                    >Análisis de la consulta</label
                  >
                  <textarea
                    class="form-control scrollable-textarea2"
                    id="analisis-consulta"
                    rows="3"
                    v-model="analisisConsulta"
                    readonly
                  ></textarea>
                </div>
              </div>

              <hr />

              <!-- Tercera fila: Plan de manejo -->
              <div class="row mt-3">
                <div class="col-12 mb-3">
                  <label for="plan-manejo" class="form-label"
                    >Plan de manejo</label
                  >
                  <textarea
                    class="form-control scrollable-textarea"
                    id="plan-manejo"
                    rows="3"
                    v-model="planManejo"
                    readonly
                  ></textarea>
                </div>
              </div>

              <!-- Cuarta fila: Observaciones de la remisión -->
              <div class="row mt-3">
                <div class="col-12 mb-3">
                  <label for="observaciones-remision" class="form-label"
                    >Observaciones de la remisión</label
                  >
                  <textarea
                    class="form-control scrollable-textarea"
                    id="observaciones-remision"
                    rows="3"
                    v-model="observacionesRemision"
                  ></textarea>
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
                            <th>Tipocita/Especificación</th>
                            <th>Tipo/Remision</th>
                            <th>Motivo/Remision</th>
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

import {
  clasificacionesServicio,
  especificacionesServicio,
} from "../../bd/bd.js";

export default {
  setup() {
    const motivoRemision = ref("");
    const diagnosticoConsulta = ref(
      "aquí va el diagnóstico primario seleccionado en la ventana de diagnóstico."
    );
    const clasificacionServicio = ref("");
    const especificacionServicio = ref("");
    const analisisConsulta = ref(
      "aquí va el análisis de la consulta consignado en la pestaña análisis."
    );
    const planManejo = ref(
      "aquí va el análisis de la consulta consignado en la pestaña análisis."
    );
    const observacionesRemision = ref("");

    const dataTable = ref(null);

    const capturarDatos = () => {
      if (
        !motivoRemision.value.trim() ||
        !clasificacionServicio.value ||
        !especificacionServicio.value ||
        !observacionesRemision.value.trim()
      ) {
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

      const datosRemision = {
        motivoRemision: motivoRemision.value,
        diagnosticoConsulta: diagnosticoConsulta.value,
        clasificacionServicio: clasificacionServicio.value,
        especificacionServicio: especificacionServicio.value,
        analisisConsulta: analisisConsulta.value,
        planManejo: planManejo.value,
        observacionesRemision: observacionesRemision.value,
      };

      console.log("Datos de la remisión:", datosRemision);
      agregarRemisionHistorial(datosRemision);

      // Limpiar campos
      motivoRemision.value = "";
      clasificacionServicio.value = "";
      especificacionServicio.value = "";
      observacionesRemision.value = "";

      // Mostrar alerta de éxito
      Swal.fire({
        title: "Registrado",
        text: "La remisión ha sido registrada correctamente.",
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

    const agregarRemisionHistorial = (remision) => {
      const table = $(dataTable.value).DataTable();
      const fechaActual = new Date().toLocaleDateString();
      table.row
        .add([
          fechaActual,
          remision.clasificacionServicio,
          remision.especificacionServicio,
          remision.motivoRemision,
          `<button class="custom-btn custom-delete-btn" onclick="eliminarRemisionHistorial(this)">
          <i class="fa-solid fa-trash-can"></i>
        </button>`,
        ])
        .draw(false);
    };

    window.eliminarRemisionHistorial = (button) => {
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
        zeroRecords: "Ninguna remisión encontrada",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Ninguna remisión encontrada",
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
      motivoRemision,
      diagnosticoConsulta,
      clasificacionServicio,
      especificacionServicio,
      analisisConsulta,
      planManejo,
      observacionesRemision,
      dataTable,
      capturarDatos,

      clasificacionesServicio,
      especificacionesServicio,
    };
  },
};
</script>