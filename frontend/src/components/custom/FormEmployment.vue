<script setup>
import { onMounted, ref, watch } from "vue";
import { useMainStore } from "@/stores/main";
import { useField, useForm } from "vee-validate";

import { employmentSchema } from "@/schemas/employmentSchema";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Save } from "lucide-vue-next";

const emits = defineEmits(["onSaved", "onCancel"]);

const { months, getYears } = useMainStore();
const years = getYears();
const isDialogVisible = ref(false);
const isCurrentJob = ref(false);

const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: employmentSchema,
});

const { value: jobTitle } = useField("jobTitle");
const { value: location } = useField("location");
const { value: companyName } = useField("companyName");
const { value: monthStartDate } = useField("monthStartDate");
const { value: yearStartDate } = useField("yearStartDate");
const { value: monthEndDate } = useField("monthEndDate");
const { value: yearEndDate } = useField("yearEndDate");

const onSaveHandler = handleSubmit((values) => {
  const data = { ...values, isCurrentJob: isCurrentJob.value };
  emits("onSaved", data);
  resetValueAndErrors();
  isDialogVisible.value = false;
});

const onCancelHandler = () => {
  resetValueAndErrors();
  isDialogVisible.value = false;
  emits("onCancel");
};

const resetValueAndErrors = () => {
  isCurrentJob.value = null;
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

        <span>Add one more employment</span>
      </button>
    </DialogTrigger>
    <DialogContent class="w-[360px] lg:w-[960px]">
      <DialogHeader>
        <DialogTitle>Add Employment History</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <form @submit.prevent="onSaveHandler">
        <div class="w-full box-border flex flex-col lg:flex-row items-center gap-x-8 mb-5">
          <div class="w-full lg:w-1/2 box-border mb-5 lg:mb-0">
            <Input label="Job Title" type="text" v-model="jobTitle" name="jobTitle" placeholder="e.g Backend Developer" :class="errors.jobTitle ? 'border-red-500' : ''" />
            <div class="text-red-500 text-xs mt-1 font-medium">{{ errors.jobTitle }}</div>
          </div>

          <div class="w-full lg:w-1/2 box-border">
            <Input label="Location" v-model="location" name="location" type="text" placeholder="e.g Jakarta" :class="errors.location ? 'border-red-500' : ''" />
            <div class="text-red-500 text-xs mt-1 font-medium">{{ errors.location }}</div>
          </div>
        </div>

        <div class="w-full box-border flex flex-col lg:flex-row items-center gap-x-8 mb-5">
          <div class="w-full box-border">
            <Input label="Company Name" v-model="companyName" name="companyName" type="text" placeholder="e.g Tokopedia" :class="errors.companyName ? 'border-red-500' : ''" />
            <div class="text-red-500 text-xs mt-1 font-medium">{{ errors.companyName }}</div>
          </div>
        </div>

        <div class="w-full box-border flex items-center gap-x-2 mb-5">
          <Checkbox
            id="position"
            @update:checked="
              () => {
                monthEndDate = null;
                yearEndDate = null;
                isCurrentJob = !isCurrentJob;
              }
            "
            :checked="isCurrentJob"
          />
          <label for="position" class="text-sm font-medium leading-none text-[#858B9F]">This is my current job</label>
        </div>

        <div class="w-full box-border flex flex-col lg:flex-row items-center gap-x-8 mb-5">
          <div class="w-full lg:w-1/2 box-border mb-5 lg:mb-0">
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

          <div class="w-full lg:w-1/2 box-border">
            <label for="" class="text-[#858B9F] flex gap-x-2 mb-1">End Date</label>
            <div class="w-full flex items-center gap-x-5">
              <div class="w-1/2">
                <Select v-model="monthEndDate" :disabled="isCurrentJob">
                  <SelectTrigger>
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem v-for="(month, i) in months" :value="month.val">{{ month.text }}</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div class="w-1/2">
                <Select v-model="yearEndDate" :disabled="isCurrentJob">
                  <SelectTrigger>
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem v-for="(year, i) in years" :value="year.val">{{ year.text }}</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button @click.prevent="onCancelHandler" class="border border-gray-400 text-foreground/50 hover:text-foreground" variant="outline" size="sm">
            <X class="size-4" />
            <span>Cancel</span>
          </Button>
          <Button type="submit" class="border border-gray-400 text-foreground/50 hover:text-foreground" variant="outline" size="sm">
            <Save class="size-4" />
            <span>Save</span>
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
