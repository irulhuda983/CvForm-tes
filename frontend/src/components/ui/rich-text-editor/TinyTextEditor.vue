<script setup>
import { ref } from "vue";
import Editor from "@tinymce/tinymce-vue";

const modelValue = ref("");
const apiKey = ref("zrsng3633x1bpntx7mrn4yx8efkpcyn3qt3r5sebh01ijff5");
</script>

<template>
  <div>
    <Editor
      v-model="modelValue"
      :api-key="apiKey"
      :init="{
        height: 500,
        menubar: false,
        plugins: 'lists link image table',
        toolbar: 'undo redo | formatselect | bold italic underline | bullist numlist | link image',
      }"
    />

    <div v-html="modelValue"></div>
  </div>
</template>
