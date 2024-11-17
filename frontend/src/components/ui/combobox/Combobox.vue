<script setup>
import { ref, watch } from "vue";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, CircleHelp } from "lucide-vue-next";

const props = defineProps({
  defaultValue: { type: [String, Number], required: false },
  modelValue: { type: [String, Number], required: false },
  list: { type: null, required: false },
  name: { type: null, required: false },
  label: { type: [String, Number], required: true },
  error: { type: [String, Number], required: false },
  showTooltip: { type: Boolean, required: false },
  tooltipValue: { type: String, required: false, default: "Type your input" },
  placeholder: { type: String, required: false },
  class: { type: null, required: false },
});

const emits = defineEmits(["update:modelValue", "change", "onSelect"]);

const open = ref(false);
const value = ref(props.modelValue);

const onSelectHandler = (item) => {
  emits("onSelect", item);
};

const resetValue = () => {
  value.value = "";
};

const setValue = (val) => {
  value.value = val;
};

watch(
  () => value.value,
  (e) => {
    emits("update:modelValue", e);
  }
);

defineExpose({ resetValue, setValue });
</script>

<template>
  <label class="text-[#858B9F] flex gap-x-2 mb-1">
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
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="text-[#1F2530] h-10 w-full rounded-sm relative flex items-center justify-between bg-input px-3 py-1 outline-none focus:border-b-2 focus:border-blue-500"
      >
        {{ value ? list.find((item) => item.value === value)?.text : `Select ${label} ...` }}
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </button>
    </PopoverTrigger>
    <PopoverContent class="w-[360px] sm:w-[460px] lg:w-[600px] p-0">
      <Command>
        <CommandInput class="h-9" :placeholder="placeholder ? placeholder : `Search ${label}`" />
        <CommandEmpty>No data found.</CommandEmpty>
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="item in list"
              :key="item.value"
              :value="item.value"
              @click="emits('change')"
              @select="
                (ev) => {
                  onSelectHandler(ev.detail.value);
                  value = ev.detail.value;
                  // if (typeof ev.detail.value === 'string') {
                  //   value = ev.detail.value;
                  // }
                  open = false;
                }
              "
            >
              {{ item.text }}
              <Check :class="cn('ml-auto h-4 w-4', value === item.value ? 'opacity-100' : 'opacity-0')" />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
