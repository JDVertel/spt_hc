<template>
  <form @submit.prevent="submitForm" class="w-100">
    <div class="input-group mb-3">
      <span class="input-group-text"><i class="bi bi-envelope"></i></span>
      <input
        v-model="email"
        class="form-control"
        type="email"
        placeholder="Tu correo"
        required
      />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text"><i class="bi bi-lock"></i></span>
      <input
        v-model="password"
        class="form-control"
        type="password"
        placeholder="Contraseña"
        required
        minlength="8"
        maxlength="10"
      />
    </div>
    <div class="mb-3">
      <button type="submit" class="btn btn-custom btn-login w-100 mt-3">
        Iniciar sesión
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    submitForm() {
      this.$emit("login", { email: this.email, password: this.password });
    },
  },
};
</script>
