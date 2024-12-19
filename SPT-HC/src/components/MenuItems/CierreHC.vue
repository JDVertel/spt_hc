<template>
  <div class="cierre-hc-container">
    <div class="alerta-wrapper">
      <div class="alerta-content">
        <div class="icono-atencion">
          <i class="fa-solid fa-triangle-exclamation"></i>
        </div>
        <div class="contenido-mensaje">
          <h3>¡Atención!</h3>
          <p>
            Está a punto de cerrar la historia clínica de la consulta realizada
            previamente. Este proceso almacenará la información tal como se
            encuentra actualmente y no podrá editarse nuevamente.
          </p>
          <p>
            Si está seguro de cerrar el documento, continúe. De lo contrario,
            verifique la información consignada.
          </p>
          <p class="ping-info">
            <i class="fa-solid fa-info-circle"></i>
            Se solicitará el ping para verificar su identidad y firmar el
            documento.
          </p>
        </div>
      </div>
      <div class="boton-wrapper">
        <button @click="confirmarCierre" class="btn-firmar">
          <i class="fa-solid fa-signature"></i> Firmar HC y Guardar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CierreHC",
  methods: {
    confirmarCierre() {
      Swal.fire({
        title: "¿Está seguro?",
        text: "¿Está seguro que desea firmar y cerrar la historia clínica? Esta acción no se puede deshacer.",
        icon: "warning",
        iconColor: "#2a3f54",
        showCancelButton: true,
        confirmButtonText: "Sí, cerrar",
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
          localStorage.removeItem("selectedMenuItems");
          Swal.fire({
            title: "Cerrado",
            text: "La historia clínica ha sido cerrada exitosamente.",
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
          }).then(() => {
            window.location.reload();
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.cierre-hc-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
}

.alerta-wrapper {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  max-width: 800px;
}

.alerta-content {
  display: flex;
  padding: 30px;
}

.icono-atencion {
  flex: 0 0 auto;
  margin-right: 30px;
  color: #f8a54a;
  font-size: 64px;
}

.contenido-mensaje {
  flex: 1;
}

.contenido-mensaje h3 {
  font-size: 24px;
  font-weight: bold;
  color: #f8a54a;
  margin-bottom: 15px;
}

.contenido-mensaje p {
  margin: 0 0 15px;
  font-size: 16px;
  line-height: 1.6;
  color: #4a4a4a;
}

.ping-info {
  background-color: #e9ecef;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 14px;
  color: #6c757d;
}

.ping-info i {
  margin-right: 8px;
}

.boton-wrapper {
  background-color: #f8f9fa;
  padding: 20px;
  text-align: center;
}

.btn-firmar {
  background-color: #f8a54a;
  color: #fff;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-firmar i {
  margin-right: 8px;
}

.btn-firmar:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .alerta-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .icono-atencion {
    margin-right: 0;
    margin-bottom: 20px;
  }

  .contenido-mensaje p {
    text-align: left;
  }
}
</style>