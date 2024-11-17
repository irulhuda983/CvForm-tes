<script setup>
import { ref } from "vue";
import { useVModel } from "@vueuse/core";
import { cn } from "@/lib/utils";

import { vMaska } from "maska/vue";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CircleHelp } from "lucide-vue-next";

const props = defineProps({
  id: { type: null, required: true },
  mask: { type: String, required: true },
  defaultValue: { type: [String, Number], required: false },
  modelValue: { type: [String, Number], required: false },
  label: { type: null, required: false },
  showTooltip: { type: Boolean, required: false },
  disabled: { type: Boolean, required: false },
  type: { type: [String, Number], required: false },
  tooltipValue: { type: String, required: false, default: "Type your input" },
  placeholder: { type: String, required: false },
  class: { type: null, required: false },
});

const emits = defineEmits(["update:modelValue", "onKeyup", "onChange"]);

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});
</script>

<template>
  <div class="w-full box-border">
    <label v-if="label" :for="id" class="text-[#858B9F] flex gap-x-2 mb-1">
      <p>{{ label }}</p>
      <TooltipProvider v-if="showTooltip">
        <Tooltip>
          <TooltipTrigger>
            <CircleHelp class="size-4 text-[#458FE9]" />
          </TooltipTrigger>
          <TooltipContent>
            <p>{{ tooltipValue }}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </label>
    <!-- @input="applyMask" -->
    <input
      :id="id"
      v-model="modelValue"
      v-maska
      :data-maska="mask"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="
        cn(
          'flex text-[#1F2530] h-10 w-full rounded-sm outline-none ring-none bg-input px-3 py-1 text-sm shadow-sm placeholder:font-medium transition-colors file:border-0 file:bg-input file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:border-b-2 focus:border-[#458FE9] disabled:cursor-not-allowed disabled:bg-zinc-300',
          props.class
        )
      "
    />
  </div>
</template>
