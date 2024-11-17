<script setup>
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CircleHelp } from "lucide-vue-next";

const props = defineProps({
  showTooltip: { type: Boolean, required: false },
  tooltipValue: { type: String, required: false, default: "Type your input" },
});
</script>

<template>
  <label class="text-[#858B9F] flex gap-x-2 mb-1">
    <p>
      <slot />
    </p>
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
</template>
