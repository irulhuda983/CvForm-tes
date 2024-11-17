<script setup>
import { ref, watch } from "vue";
import { useMainStore } from "@/stores/main";
import { useField, useForm } from "vee-validate";

import { educationSchema } from "@/schemas/educationSchema";

import { Dialog, DialogScrollContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Save } from "lucide-vue-next";

const emits = defineEmits(["onSaved", "onCancel"]);

const { months, getYears } = useMainStore();
const years = getYears();
const isDialogVisible = ref(false);

const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: educationSchema,
});

const { value: degree } = useField("degree");
const { value: university } = useField("university");
const { value: study } = useField("study");
const { value: monthStartDate } = useField("monthStartDate");
const { value: yearStartDate } = useField("yearStartDate");
const { value: monthEndDate } = useField("monthEndDate");
const { value: yearEndDate } = useField("yearEndDate");

const onSaveHandler = handleSubmit((values) => {
  emits("onSaved", values);
  resetValueAndErrors();
  isDialogVisible.value = false;
});

const onCancelHandler = () => {
  resetValueAndErrors();
  isDialogVisible.value = false;
  emits("onCancel");
};

const resetValueAndErrors = () => {
  resetForm();
};

watch(
  () => isDialogVisible.value,
  (newValue, oldValue) => {
    if (newValue == false) {
      resetValueAndErrors();
    }
  }
);
</script>

<template>
  <Dialog v-model:open="isDialogVisible">
    <DialogTrigger class="w-full lg:w-auto">
      <button class="flex items-center gap-x-3 font-bold text-sm text-[#458FE9] hover:text-[#458FE990]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" stroke="currentColor" class="size-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>

        <span>Add one more education</span>
      </button>
    </DialogTrigger>
    <DialogScrollContent class="w-[360px] lg:w-[600px]">
      <DialogHeader>
        <DialogTitle>Add Education</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <form @submit.prevent="onSaveHandler">
        <div class="w-full box-border flex flex-col lg:flex-row items-center gap-x-8 mb-5">
          <div class="w-full box-border">
            <Input label="Degree" v-model="degree" name="degree" type="text" placeholder="e.g Bachelor" :class="errors.degree ? 'border-red-500' : ''" />
            <div class="text-red-500 text-xs mt-1 font-medium">{{ errors.degree }}</div>
          </div>
        </div>

        <div class="w-full box-border flex flex-col lg:flex-row items-center gap-x-8 mb-5">
          <div class="w-full box-border">
            <Input label="University" v-model="university" name="university" type="text" placeholder="e.g Harvard University" :class="errors.university ? 'border-red-500' : ''" />
            <div class="text-red-500 text-xs mt-1 font-medium">{{ errors.university }}</div>
          </div>
        </div>

        <div class="w-full box-border flex flex-col lg:flex-row items-center gap-x-8 mb-5">
          <div class="w-full box-border">
            <Input label="Field of Study" v-model="study" name="study" type="text" placeholder="e.g Business" :class="errors.study ? 'border-red-500' : ''" />
            <div class="text-red-500 text-xs mt-1 font-medium">{{ errors.study }}</div>
          </div>
        </div>

        <div class="w-full box-border gap-x-8 mb-5">
          <label for="" class="text-[#858B9F] flex gap-x-2 mb-1">Start Date</label>
          <div class="w-full flex items-center gap-x-5">
            <div class="w-1/2">
              <Select v-model="monthStartDate">
                <SelectTrigger :class="errors.monthStartDate ? 'border-red-500' : ''">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem v-for="(month, i) in months" :value="month.val">{{ month.text }}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div class="text-red-500 text-xs mt-1 font-medium">{{ errors.monthStartDate }}</div>
            </div>
            <div class="w-1/2">
              <Select v-model="yearStartDate">
                <SelectTrigger :class="errors.yearStartDate ? 'border-red-500' : ''">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem v-for="(year, i) in years" :value="year.val">{{ year.text }}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div class="text-red-500 text-xs mt-1 font-medium">{{ errors.yearStartDate }}</div>
            </div>
          </div>
        </div>

        <div class="w-full box-border gap-x-8 mb-5">
          <label for="" class="text-[#858B9F] flex gap-x-2 mb-1">End Date</label>
          <div class="w-full flex items-center gap-x-5">
            <div class="w-1/2">
              <Select v-model="monthEndDate">
                <SelectTrigger :class="errors.monthEndDate ? 'border-red-500' : ''">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem v-for="(month, i) in months" :value="month.val">{{ month.text }}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div class="text-red-500 text-xs mt-1 font-medium">{{ errors.monthEndDate }}</div>
            </div>
            <div class="w-1/2">
              <Select v-model="yearEndDate">
                <SelectTrigger :class="errors.yearEndDate ? 'border-red-500' : ''">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem v-for="(year, i) in years" :value="year.val">{{ year.text }}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div class="text-red-500 text-xs mt-1 font-medium">{{ errors.yearEndDate }}</div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button @click.prevent="onCancelHandler" class="border border-gray-400 text-foreground/50 hover:text-foreground" variant="outline" size="sm">
            <X class="size-4" />
            <span>Cancel</span>
          </Button>
          <Button type="submit" class="border border-gray-400 text-foreground/50 hover:text-foreground mb-3 lg:mb-0" variant="outline" size="sm">
            <Save class="size-4" />
            <span>Save</span>
          </Button>
        </DialogFooter>
      </form>
    </DialogScrollContent>
  </Dialog>
</template>
