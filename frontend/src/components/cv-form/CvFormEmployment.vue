<script setup>
import { ref } from "vue";
import { nanoid } from "nanoid";
import { format, parse } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputMask } from "@/components/ui/input-mask";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/custom-label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Trash2 } from "lucide-vue-next";

const isCurrentJob = ref(false);
const accordionOpen = ref(false);

const employments = ref([
  {
    id: nanoid(),
    jobTitle: "Sofware Engineer",
    companyName: "Tokopedia",
    city: "Jakarta",
    isCurrentJob: false,
    startDate: "01/2022",
    endDate: "07/2022",
    desc: "<p>Created and implement</p>",
  },
]);

const addEmployment = () => {
  const id = nanoid();

  const data = {
    id,
    jobTitle: null,
    companyName: null,
    city: null,
    isCurrentJob: false,
    startDate: null,
    endDate: null,
    desc: null,
  };

  employments.value = [...employments.value, data];

  accordionOpen.value = id;
};

const removeEmployment = (id) => {
  const index = employments.value.findIndex((item) => item.id == id);

  if (index !== -1) {
    employments.value.splice(index, 1);
  }
};

const parseDate = (item) => {
  const dateRegex = /^(0[1-9]|1[0-2])\/\d{4}$/;
  const isvalidDate = dateRegex.test(item);

  if (!isvalidDate) {
    return item ?? "";
  }

  const date = parse(item, "MM/yyyy", new Date());

  return format(date, "MMM yyyy");
};

const getList = () => {
  return employments.value;
};

defineExpose({ getList });
</script>

<template>
  <div class="w-full box-border mb-8 lg:mb-14">
    <div class="w-full mb-5">
      <h1 class="text-xl font-bold">Employment History</h1>
      <p class="text-[#9196AA]">Show your relevant experience last (10 years). Use bullet points to note your achievements. if possible - use numbers/facts (Achieved X, measured by Y, by doing Z).</p>
    </div>

    <div class="w-full box-border mb-5">
      <Accordion type="single" collapsible v-model="accordionOpen">
        <AccordionItem v-for="(item, i) in employments" :value="item.id" class="border border-border px-5 mb-2">
          <AccordionTrigger class="no-underline hover:no-underline">
            <div>
              <h1 class="text-base font-semibold text-[#1F2531] text-start">
                <span v-if="item.jobTitle">{{ item.jobTitle }} at {{ item.companyName ?? "-" }}</span>
                <span v-else>(Not specified)</span>
              </h1>
              <div class="text-[#848BA0] flex items-center gap-x-2">
                <span v-if="item.startDate">{{ parseDate(item.startDate) }} - {{ item.isCurrentJob ? "Sekarang" : `${parseDate(item.endDate)}` }}</span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div class="w-full box-border pt-6">
              <div class="w-full box-border flex flex-col lg:flex-row items-center gap-x-0 lg:gap-x-5 gap-y-4 lg:gap-y-0 mb-5">
                <Input label="Job Title" v-model="item.jobTitle" name="jobTitle" type="text" placeholder="e.g Backend Developer" />
                <Input label="Company Name" v-model="item.companyName" name="companyName" type="text" placeholder="e.g Tokopedia" />
              </div>

              <div class="w-full box-border flex items-center gap-x-2 mb-5">
                <Checkbox
                  id="position"
                  @update:checked="
                    () => {
                      item.endDate = null;
                      item.isCurrentJob = !item.isCurrentJob;
                    }
                  "
                  :checked="item.isCurrentJob"
                />
                <label for="position" class="text-sm font-medium leading-none text-[#858B9F]">This is my current job</label>
              </div>

              <div class="w-full box-border flex flex-col lg:flex-row items-center gap-x-0 lg:gap-x-5 gap-y-4 lg:gap-y-0 mb-5">
                <div class="w-full box-border">
                  <Label :showTooltip="true" tooltipValue="Type your date format MM/YYYY">Start & End Date</Label>
                  <div class="w-full box-border flex flex-col lg:flex-row items-center gap-x-0 lg:gap-x-5 gap-y-4 lg:gap-y-0">
                    <InputMask :id="`startDate-${i}`" v-model="item.startDate" placeholder="MM/YYYY" mask="##/####" />
                    <InputMask :id="`endDate-${i}`" v-model="item.endDate" placeholder="MM/YYYY" mask="##/####" :disabled="item.isCurrentJob" />
                  </div>
                </div>
                <Input label="City" v-model="item.city" name="city" type="text" placeholder="e.g Jakarta" />
              </div>

              <div class="w-full box-border gap-x-8 mb-5">
                <Label>Description</Label>
                <div class="w-full bg-input">
                  <RichTextEditor v-model="item.desc" placeholder="e.g Graduated with High Honors." />
                </div>
              </div>

              <div class="w-full">
                <Button type="button" @click.prevent="removeEmployment(item.id)" variant="destructive" size="sm" class="rounded-sm">
                  <Trash2 class="size-4" />
                  Remove
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>

    <div class="w-full box-border">
      <!-- <FormEmployment ref="formAddEmployment" @onSaved="(val) => addEmployment(val)" /> -->
      <button @click.prevent="addEmployment('askfas')" class="flex items-center gap-x-3 font-bold text-sm text-[#458FE9] hover:text-[#458FE990]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" stroke="currentColor" class="size-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>

        <span>Add one more employment</span>
      </button>
    </div>
  </div>
</template>
