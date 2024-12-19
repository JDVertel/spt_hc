<template>
  <div class="mb-3 col-lg-3 col-md-12">
    <label :for="id" class="form-label">{{ label }}</label>
    <textarea
      v-if="type === 'textarea'"
      :id="id"
      class="form-control scrollable-textarea"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
    <input
      v-else
      :type="type"
      :id="id"
      class="form-control"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "FormField",
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    modelValue: {
      type: [String, Number],
      required: true,
    },
  },
};
</script>
