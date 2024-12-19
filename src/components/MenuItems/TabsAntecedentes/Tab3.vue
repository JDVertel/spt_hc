<template>
  <!-- tab 3 -->
  <div
    class="tab-pane fade show"
    id="patologicos"
    role="tabpanel"
    aria-labelledby="patologicos-tab"
  >
    <div class="row mt-3">
      <div class="col-md-3">
        <div class="mt-3">
          <label for="cie10" class="form-label"
            >1. Seleccione antecente - CIE-10</label
          >
          <button
            class="btn btn-custom btn-icon mb-2 w-100"
            @click="abrirModalCIE10P"
          >
            <i class="fa-solid fa-magnifying-glass"></i> Buscar
          </button>
          <input
            type="text"
            class="form-control"
            id="cie10-3"
            v-model="cie10"
            readonly
          />
        </div>
        <div class="mt-3">
          <label for="fecha" class="form-label">2. Fecha de antecedente</label>
          <input
            type="date"
            class="form-control"
            id="fecha3"
            :value="fecha"
            @input="updateFecha"
          />
        </div>
        <div class="mt-3">
          <label for="observaciones" class="form-label">3. Observaciones</label>
          <textarea
            class="form-control"
            id="observaciones3"
            rows="3"
            v-model="observaciones"
          ></textarea>
        </div>
        <button class="btn btn-custom btn-icon mt-2 w-100" @click="agregar">
          <i class="fa-solid fa-plus"></i> Agregar
        </button>
      </div>
      <div class="col-md-9">
        <h5 class="text-center mt-4">Registro de Antecedentes Patológicos</h5>
        <!-- DataTable -->
        <div class="container my-4">
          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div class="table-responsive">
                <table ref="dataTable" class="table table-striped">
                  <thead>
                    <tr>
                      <th class="centered">#</th>
                      <th class="centered">Fecha</th>
                      <th class="centered">CIE-10</th>
                      <th class="centered">Observaciones</th>
                      <th class="centered">Acciones</th>
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
    <ModalCIE10P @seleccionado="onCIE10Seleccionado" ref="modalCIE10PRef" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";

import ModalCIE10P from "../../ModalCIE10/MCIE10P.vue";

export default {
  name: "Tab3",
  components: {
    ModalCIE10P,
  },
  props: {
    fecha: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const dataTable = ref(null);
    const cie10 = ref("");
    const observaciones = ref("");
    const modalCIE10PRef = ref(null);

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

      $(dataTable.value).on("click", ".custom-delete-btn", function () {
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

    const agregar = () => {
      if (!cie10.value || !props.fecha || !observaciones.value) {
        Swal.fire({
          title: "¡Campos incompletos!",
          text: "Por favor, complete todos los campos del formulario.",
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

      const table = $(dataTable.value).DataTable();
      const rowIndex = table.rows().count() + 1;

      table.row
        .add([
          rowIndex,
          props.fecha,
          cie10.value,
          observaciones.value,
          `<button class="custom-btn custom-delete-btn"><i class="fa-solid fa-trash-can"></i></button>`,
        ])
        .draw(false);

      // Limpiar los campos del formulario
      cie10.value = "";
      observaciones.value = "";
    };

    const abrirModalCIE10P = () => {
      if (modalCIE10PRef.value) {
        modalCIE10PRef.value.abrirModal();
      } else {
        console.error("No se pudo encontrar la referencia del modal");
      }
    };

    const onCIE10Seleccionado = (item) => {
      cie10.value = `${item.codigo} - ${item.descripcion}`;
    };

    const updateFecha = (event) => {
      props.fecha = event.target.value;
    };

    onMounted(async () => {
      await initDataTable();
    });

    return {
      dataTable,
      cie10,
      observaciones,
      abrirModalCIE10P,
      modalCIE10PRef,
      onCIE10Seleccionado,
      agregar,
      updateFecha,
    };
  },
};
</script>
