<script setup>
import { ref } from "vue";
import { nanoid } from "nanoid";
import { format, parse } from "date-fns";

import { Input } from "@/components/ui/input";
import { InputMask } from "@/components/ui/input-mask";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/custom-label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Trash2 } from "lucide-vue-next";

const accordionOpen = ref(false);

const educations = ref([
  {
    id: nanoid(),
    degree: "Bachelor",
    university: "Mitchell Technical Institute",
    city: "Jakarta",
    startDate: "08/2022",
    endDate: "08/2024",
    desc: "<p>Graduated with High Honors.</p>",
  },
]);

const addEducation = () => {
  const id = nanoid();

  const data = {
    id,
    degree: null,
    university: null,
    city: null,
    startDate: null,
    endDate: null,
    desc: null,
  };

  educations.value = [...educations.value, data];

  accordionOpen.value = id;
};

const removeEducation = (id) => {
  const index = educations.value.findIndex((item) => item.id == id);

  if (index !== -1) {
    educations.value.splice(index, 1);
  }
};

const parseDate = (item) => {
  const dateRegex = /^(0[1-9]|1[0-2])\/\d{4}$/;
  const isvalidDate = dateRegex.test(item);

  if (!isvalidDate) {
    return item;
  }

  const date = parse(item, "MM/yyyy", new Date());

  return format(date, "MMM yyyy");
};

const getList = () => {
  return educations.value;
};

defineExpose({ getList });
</script>

<template>
  <div class="w-full box-border mb-8 lg:mb-14">
    <div class="w-full mb-5">
      <h1 class="text-xl font-bold">Education</h1>
      <p class="text-[#9196AA]">A varied education on your resume sums up the value that your learnings and background will bring to job.</p>
    </div>

    <div class="w-full box-border mb-5">
      <Accordion type="single" collapsible v-model="accordionOpen">
        <AccordionItem v-for="(item, i) in educations" :value="item.id" class="border border-border px-5 mb-2">
          <AccordionTrigger class="no-underline hover:no-underline">
            <div class="w-full">
              <h1 class="text-base font-semibold text-[#1F2531] text-start">
                <span v-if="item.university && item.degree">{{ item.degree }} at {{ item.university }}</span>
                <span v-else>(Not specified)</span>
              </h1>
              <div v-if="item.startDate" class="text-[#848BA0] flex items-center gap-x-2">
                <span>{{ parseDate(item.startDate) }} - {{ parseDate(item.endDate) }}</span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div class="w-full box-border pt-6">
              <div class="w-full box-border flex flex-col lg:flex-row items-center gap-x-8 mb-5">
                <div class="w-full box-border flex flex-col lg:flex-row items-center gap-x-0 lg:gap-x-5 gap-y-4 lg:gap-y-0">
                  <Input label="School" v-model="item.university" name="university" type="text" placeholder="e.g Harvard University" />
                  <Input label="Degree" v-model="item.degree" name="degree" type="text" placeholder="e.g Bachelor" />
                </div>
              </div>

              <div class="w-full box-border flex flex-col lg:flex-row items-center gap-x-8 mb-5">
                <div class="w-full box-border flex flex-col lg:flex-row items-center gap-x-0 lg:gap-x-5 gap-y-4 lg:gap-y-0">
                  <div class="w-full box-border">
                    <Label :showTooltip="true" tooltipValue="Type your date format MM/YYYY">Start & End Date</Label>
                    <div class="w-full box-border flex flex-col lg:flex-row items-center gap-x-0 lg:gap-x-5 gap-y-4 lg:gap-y-0">
                      <InputMask :id="`startDate-${i}`" v-model="item.startDate" placeholder="MM/YYYY" mask="##/####" />
                      <InputMask :id="`endDate-${i}`" v-model="item.endDate" placeholder="MM/YYYY" mask="##/####" />
                    </div>
                  </div>
                  <Input label="City" v-model="item.city" name="city" type="text" placeholder="e.g Jakarta" />
                </div>
              </div>

              <div class="w-full box-border gap-x-8 mb-5">
                <Label>Description</Label>
                <div class="w-full bg-input">
                  <RichTextEditor v-model="item.desc" placeholder="e.g Graduated with High Honors." />
                </div>
              </div>

              <div class="w-full">
                <Button type="button" @click.prevent="removeEducation(item.id)" variant="destructive" size="sm" class="rounded-sm">
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
      <button type="button" @click.prevent="addEducation" class="flex items-center gap-x-3 font-bold text-sm text-[#458FE9] hover:text-[#458FE990]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" stroke="currentColor" class="size-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>

        <span>Add one more education</span>
      </button>
      <!-- <FormEducation ref="formAddEducation" @onSaved="(val) => addEducation(val)" /> -->
    </div>
  </div>
</template>
