<template>
  <div class="container">
    <form>
      <div id="card-formulario" class="card mb-5">
        <div id="card-header-formulario" class="card-header py-1">
          <p class="text-primary m-0 fw-bold d-flex justify-content-between">
            <span class="titulo-formulario">
              <i class="fas fa-procedures"></i> Procedimientos
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
                  @click="abrirModalAgregarProcedimiento"
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
                      <th>Cantidad</th>
                      <th>Descripción</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(procedimiento, index) in procedimientos"
                      :key="index"
                    >
                      <td>{{ procedimiento.codigo }}</td>
                      <td>{{ procedimiento.cantidad }}</td>
                      <td class="text-wrap">{{ procedimiento.descripcion }}</td>
                      <td>
                        <button
                          class="custom-btn custom-delete-btn"
                          @click="eliminarProcedimiento(index)"
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
                            <th>Procedimiento</th>
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
  <MCUPS
    ref="modalAgregarProcedimiento"
    @seleccionado="onProcedimientoAgregado"
  />
</template>

<script>
import { ref, onMounted } from "vue";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";

import MCUPS from "../ModalCUPS/MCUPS.vue";

export default {
  components: {
    MCUPS,
  },
  setup() {
    const procedimientos = ref([]);
    const modalAgregarProcedimiento = ref(null);
    const dataTable = ref(null);

    const abrirModalAgregarProcedimiento = () => {
      modalAgregarProcedimiento.value.abrirModal();
    };

    const onProcedimientoAgregado = (nuevoProcedimiento) => {
      procedimientos.value.push({
        codigo: nuevoProcedimiento.codigo,
        cantidad: nuevoProcedimiento.cantidad,
        descripcion: nuevoProcedimiento.descripcion,
      });
      agregarProcedimientoHistorial(nuevoProcedimiento);
    };

    const eliminarProcedimiento = (index) => {
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
          procedimientos.value.splice(index, 1);
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

    const agregarProcedimientoHistorial = (procedimiento) => {
      const table = $(dataTable.value).DataTable();
      const fechaActual = new Date().toLocaleDateString();
      table.row
        .add([
          fechaActual,
          "Tipo/Especificación",
          procedimiento.codigo,
          procedimiento.descripcion,
          `<button class="custom-btn custom-delete-btn" onclick="eliminarProcedimientoHistorial(this)">
          <i class="fa-solid fa-trash-can"></i>
        </button>`,
        ])
        .draw(false);
    };

    window.eliminarProcedimientoHistorial = (button) => {
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
        zeroRecords: "Ningún procedimiento encontrado",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Ningún procedimiento encontrado",
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
      procedimientos,
      abrirModalAgregarProcedimiento,
      onProcedimientoAgregado,
      modalAgregarProcedimiento,
      eliminarProcedimiento,
      dataTable,
    };
  },
};
</script>
