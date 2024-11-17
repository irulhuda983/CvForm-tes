<script setup>
import { ref } from "vue";
import { nanoid } from "nanoid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, Trash2 } from "lucide-vue-next";

const openAccordionSkill = ref(null);
const showExperienceLevel = ref(false);
const skills = ref([{ id: nanoid(), name: "Docker", level: "experienced" }]);

const colorSkill = ref({
  null: "#78716c",
  beginner: "#78716c",
  intermediate: "#dc2626",
  skillful: "#E09737",
  experienced: "#68B87B",
  expert: "#9CA1F5",
});

const skillTalents = ref([
  { val: "JavaScript", isActive: false },
  { val: "Python", isActive: false },
  { val: "Java", isActive: false },
  { val: "SQL", isActive: false },
  { val: "C++", isActive: false },
  { val: "MySQL", isActive: false },
  { val: "PHP", isActive: false },
  { val: "HTML & CSS", isActive: false },
  { val: "TypeScript", isActive: false },
  { val: "Linux", isActive: false },
  { val: "MongoDB", isActive: false },
]);

const toogleActive = (data) => {
  const skillTalent = skillTalents.value.find((item) => item.val == data.val);
  const status = !skillTalent.isActive;

  skillTalent.isActive = status;
};

const addSkill = () => {
  const id = nanoid();
  const skill = { id, name: null, level: "beginner" };
  skills.value = [...skills.value, skill];

  openAccordionSkill.value = id;
};

const removeSkill = (id) => {
  const index = skills.value.findIndex((item) => item.id == id);

  if (index !== -1) {
    skills.value.splice(index, 1);
  }
};

const getList = () => {
  const talents = skillTalents.value.filter((talent) => talent.isActive == true).map((item) => item.val);
  const data = { ...skills.value, talents };
  return data;
};

defineExpose({ getList });
</script>

<template>
  <!-- Skills -->
  <div class="w-full box-border mb-8 lg:mb-14">
    <div class="w-full mb-5">
      <h1 class="text-xl font-bold">Skills</h1>
      <p class="text-[#9196AA] mb-3">Choose 5 of the most important skills to show your talents! Make sure they match the keywords of the job listing applying via an online system.</p>
      <div class="flex items-center space-x-2">
        <Switch id="experience-toogle" :checked="showExperienceLevel" @update:checked="showExperienceLevel = !showExperienceLevel" />
        <label for="experience-toogle" class="font-semibold">Don't show experience level</label>
      </div>
    </div>

    <!-- skills Talents -->
    <div class="w-full box-border flex items-center flex-wrap gap-x-5 gap-y-2 lg:gap-y-3 mb-5 lg:mb-10">
      <button
        v-for="(item, i) in skillTalents"
        @click.prevent="toogleActive(item)"
        class="group w-auto flex items-center gap-x-3 rounded px-3 py-1.5 text-sm"
        :class="item.isActive ? 'bg-blue-600 text-white' : 'bg-[#F0F2F8] hover:bg-gray-300'"
      >
        <span>{{ item.val }}</span>
        <Check v-if="item.isActive" class="size-4 text-white" />
        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" stroke="currentColor" class="size-4 text-[#848BA1] group-hover:text-muted-foreground">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
    </div>
    <!-- end skill talents -->

    <!-- skills -->
    <div class="w-full box-border mb-5">
      <Accordion type="single" collapsible v-model="openAccordionSkill">
        <AccordionItem v-for="(item, i) in skills" :value="item.id" class="border border-border px-5 mb-2">
          <AccordionTrigger class="no-underline hover:no-underline">
            <div>
              <h1 class="text-base font-semibold text-[#1F2531] text-start">{{ item.name ? item.name : "(Not specified)" }}</h1>
              <div v-if="!showExperienceLevel" class="text-[#848BA0] flex items-center gap-x-2 capitalize">
                {{ item.name ? item.level : null }}
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div class="w-full box-border flex flex-col lg:flex-row items-center justify-between gap-x-0 lg:gap-x-5 gap-y-3 lg:gap-y-0 py-4 mb-5">
              <div class="w-full lg:w-1/2 box-border">
                <Input label="Skill" v-model="item.name" type="text" placeholder="e.g JavaScript" />
              </div>

              <div class="w-full lg:w-1/2 box-border">
                <label class="flex gap-x-2 mb-1"
                  ><span class="text-[#858B9F]">Level - </span>
                  <div :class="`capitalize`" :style="`color: ${colorSkill[item.level]}`">{{ item.level }}</div></label
                >
                <div class="w-full h-10 flex items-center justify-between bg-opacity-50 rounded" :class="item.level ? `bg-[${colorSkill[item.level]}]` : `bg-[${colorSkill[item.level]}]`">
                  <label :for="`level-beginner-${i}`" class="w-full h-full box-border cursor-pointer rounded" :class="item.level == 'beginner' ? `bg-[#78716c]` : ''"></label>
                  <div class="w-px h-5" :class="item.level == 'beginner' || item.level == 'intermediate' ? 'bg-transparent' : `bg-[${colorSkill[item.level]}] bg-opacity-80 text-${item.level}`"></div>
                  <label :for="`level-intermediate-${i}`" class="w-full h-full box-border cursor-pointer rounded" :class="item.level == 'intermediate' ? `bg-[#dc2626]` : ''"></label>
                  <div class="w-px h-5" :class="item.level == 'intermediate' || item.level == 'skillful' ? 'bg-transparent' : `bg-[${colorSkill[item.level]}] bg-opacity-80`"></div>
                  <label :for="`level-skillful-${i}`" class="w-full h-full box-border cursor-pointer rounded" :class="item.level == 'skillful' ? `bg-[#E09737]` : ''"></label>
                  <div class="w-px h-5" :class="item.level == 'skillful' || item.level == 'experienced' ? 'bg-transparent' : `bg-[${colorSkill[item.level]}] bg-opacity-80`"></div>
                  <label :for="`level-experienced-${i}`" class="w-full h-full box-border cursor-pointer rounded" :class="item.level == 'experienced' ? `bg-[#68B87B]` : ''"></label>
                  <div class="w-px h-5" :class="item.level == 'experienced' || item.level == 'expert' ? 'bg-transparent' : `bg-[${colorSkill[item.level]}] bg-opacity-80`"></div>
                  <label :for="`level-expert-${i}`" class="w-full h-full box-border cursor-pointer rounded" :class="item.level == 'expert' ? `bg-[#9CA1F5]` : ''"></label>
                </div>
                <input :id="`level-beginner-${i}`" type="radio" class="sr-only" v-model="item.level" value="beginner" />
                <input :id="`level-intermediate-${i}`" type="radio" class="sr-only" v-model="item.level" value="intermediate" />
                <input :id="`level-skillful-${i}`" type="radio" class="sr-only" v-model="item.level" value="skillful" />
                <input :id="`level-experienced-${i}`" type="radio" class="sr-only" v-model="item.level" value="experienced" />
                <input :id="`level-expert-${i}`" type="radio" class="sr-only" v-model="item.level" value="expert" />
              </div>
            </div>
            <div class="w-full">
              <Button type="button" @click.prevent="removeSkill(item.id)" variant="destructive" size="sm" class="rounded-sm">
                <Trash2 class="size-4" />
                Remove
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
    <!-- skills -->
    <button @click.prevent="addSkill" class="flex items-center gap-x-3 font-bold text-sm text-[#458FE9] hover:text-[#458FE990]">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" stroke="currentColor" class="size-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>

      <span>Add one more skill</span>
    </button>
  </div>
  <!-- Skills -->
</template>
