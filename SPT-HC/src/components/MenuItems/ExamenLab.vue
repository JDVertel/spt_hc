<template>
  <div class="container">
    <form>
      <div id="card-formulario" class="card mb-5">
        <div id="card-header-formulario" class="card-header py-1">
          <p class="text-primary m-0 fw-bold d-flex justify-content-between">
            <span class="titulo-formulario">
              <i class="fas fa-flask"></i> Exámenes de Laboratorio
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
              <div class="mt-3">
                <button
                  class="btn btn-custom btn-icon mb-2"
                  @click="abrirModalAgregarExamenLab"
                >
                  Agregar
                </button>
              </div>

              <h5 class="mt-4">Orden Médica</h5>
              <hr />

              <div class="table-responsive mt-3">
                <table class="table table-striped">
                  <thead class="bg-secondary text-white">
                    <tr>
                      <th>CUPS</th>
                      <th>Alias</th>
                      <th>Nombre</th>
                      <th>Requerimientos</th>
                      <th>Observaciones</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(examen, index) in examenes" :key="index">
                      <td>{{ examen.codigo }}</td>
                      <td>{{ examen.alias }}</td>
                      <td class="text-wrap">{{ examen.nombre }}</td>
                      <td class="text-wrap">{{ examen.requerimientos }}</td>
                      <td class="text-wrap">{{ examen.observaciones }}</td>
                      <td>
                        <button
                          class="custom-btn custom-delete-btn"
                          @click="eliminarExamen(index)"
                        >
                          <i class="fa-solid fa-trash-can"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
                            <th>CUPS</th>
                            <th>Alias</th>
                            <th>Nombre</th>
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
  <MCUPSLab ref="modalAgregarExamenLab" @seleccionado="onExamenAgregado" />
</template>

<script>
import { ref, onMounted } from "vue";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";

import MCUPSLab from "../ModalCUPS/MCUPSLab.vue";

export default {
  components: {
    MCUPSLab,
  },
  setup() {
    const examenes = ref([]);
    const modalAgregarExamenLab = ref(null);
    const dataTable = ref(null);

    const abrirModalAgregarExamenLab = () => {
      modalAgregarExamenLab.value.abrirModal();
    };

    const onExamenAgregado = (nuevoExamen) => {
      examenes.value.push({
        codigo: nuevoExamen.codigo,
        alias: nuevoExamen.alias,
        nombre: nuevoExamen.descripcion,
        requerimientos: nuevoExamen.requerimientos,
        observaciones: nuevoExamen.observaciones,
      });
      agregarExamenHistorial(nuevoExamen);
    };

    const eliminarExamen = (index) => {
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
          examenes.value.splice(index, 1);
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

    const agregarExamenHistorial = (examen) => {
      const table = $(dataTable.value).DataTable();
      const fechaActual = new Date().toLocaleDateString();
      table.row
        .add([
          fechaActual,
          "Tipo/Especificación",
          examen.codigo,
          examen.alias,
          examen.descripcion,
          examen.observaciones,
          `<button class="custom-btn custom-delete-btn" onclick="eliminarExamenHistorial(this)">
          <i class="fa-solid fa-trash-can"></i>
        </button>`,
        ])
        .draw(false);
    };

    window.eliminarExamenHistorial = (button) => {
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
        { className: "centered", targets: [0, 1, 2, 3, 4, 5, 6] },
        { orderable: false, targets: [6] },
        { searchable: false, targets: [1] },
      ],
      pageLength: 3,
      destroy: true,
      language: {
        lengthMenu: "Mostrar _MENU_ registros por página",
        zeroRecords: "Ningún examen encontrado",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Ningún examen encontrado",
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
      examenes,
      abrirModalAgregarExamenLab,
      onExamenAgregado,
      modalAgregarExamenLab,
      eliminarExamen,
      dataTable,
    };
  },
};
</script>