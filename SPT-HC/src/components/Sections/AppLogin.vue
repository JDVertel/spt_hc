<template>
  <div
    class="modal fade modal-small modal-transparent"
    id="login"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content modal-elegant">
        <div class="modal-body">
          <section class="py-4">
            <div class="container">
              <div class="card-login card">
                <div class="card-body d-flex flex-column align-items-center">
                  <LoginHeader />
                  <LoginForm @login="handleLogin" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginHeader from "../Sections/LoginHeader.vue";
import LoginForm from "../Sections/LoginForm.vue";

export default {
  name: "AppLogin",
  components: {
    LoginHeader,
    LoginForm,
  },
  methods: {
    handleLogin(credentials) {
      console.log("Iniciando sesión con:", credentials);
    },
  },
};
</script>
