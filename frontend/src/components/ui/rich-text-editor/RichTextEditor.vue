<script setup>
import { ref } from "vue";
import { useVModel } from "@vueuse/core";
import { cn } from "@/lib/utils";

import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";

const props = defineProps({
  defaultValue: { type: null, required: false },
  modelValue: { type: null, required: false },
  placeholder: { type: String, required: false },
});

const emits = defineEmits(["update:modelValue"]);

const defaultPlaceholder = ref("e.g Passionate science teacher with 8+ years of experience and a track record of ...");

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});
</script>

<template>
  <QuillEditor
    v-model:content="modelValue"
    contentType="html"
    theme="snow"
    toolbar="essential"
    :placeholder="placeholder ?? defaultPlaceholder"
    :style="`min-height: 250px; font-family: 'Inter', sans-serif;`"
  />
</template>
