<script setup>
import { ref } from "vue";
import * as cityCountry from "countrycitystatejson";
import { useField, useForm } from "vee-validate";

import { personalSchema } from "@/schemas/personalSchema";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { RichTextEditor } from "@/components/ui/rich-text-editor";

import { EmploymentsCvForm, EducationsCvForm, SkillsCvForm } from "@/components/cv-form";

const refCountry = ref();
const refCity = ref();
const employmentList = ref();
const educationList = ref();
const skillList = ref();
const photoRef = ref();
const previewPhoto = ref(null);

const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: personalSchema,
});

const { value: jobTitle } = useField("jobTitle");
const { value: firstName } = useField("firstName");
const { value: lastName } = useField("lastName");
const { value: email } = useField("email");
const { value: phone } = useField("phone");
const { value: country } = useField("country");
const { value: city } = useField("city");
const { value: address } = useField("address");
const { value: postalCode } = useField("postalCode");
const { value: drivingLicense } = useField("drivingLicense");
const { value: nationality } = useField("nationality");
const { value: professionalSummary } = useField("professionalSummary");

const errorPhoto = ref(null);

const countries = cityCountry
  .getCountries()
  .slice(0, 120)
  .map((item) => {
    return { value: item.shortName, text: item.name };
  });

const cities = ref([]);

const getCities = (shortName) => {
  const country = cityCountry.getCountryByShort(shortName);
  const states = country.states;
  for (const key in states) {
    let mapStates = states[key].map((item) => {
      return {
        value: item.id,
        text: item.name,
      };
    });

    cities.value = [...cities.value, ...mapStates];
  }
};

const readPhoto = (event) => {
  const file = event.target.files[0];

  errorPhoto.value = null;

  // validasi keberadaan file
  if (!file) {
    errorPhoto.value = "No file selected.";
    return;
  }

  // Validasi tipe file
  const validTypes = ["image/jpeg", "image/png", "image/gif"];
  if (!validTypes.includes(file.type)) {
    errorPhoto.value = "Only JPG, PNG, or GIF files are allowed.";
    return;
  }

  // Validasi ukuran file (contoh: maksimum 2MB)
  const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
  if (file.size > maxSizeInBytes) {
    errorPhoto.value = "File size must be less than 2MB.";
    return;
  }

  // Buat preview gambar menggunakan FileReader
  const reader = new FileReader();
  reader.onload = (e) => {
    previewPhoto.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const resetFormAndError = () => {
  refCity.value.resetValue();
  refCountry.value.resetValue();
  previewPhoto.value = null;
  photoRef.value = null;
  resetForm();
};

const onSubmit = handleSubmit((values) => {
  const photo = photoRef.value.files[0];
  const personalDetail = { ...values, photo };
  const employments = employmentList.value.getList();
  const educations = educationList.value.getList();
  const skills = skillList.value.getList();

  const data = { personalDetail, employments, educations, skills };
  console.log(data);
  resetFormAndError();
  alert(JSON.stringify(data, null, 2));
});
</script>

<template>
  <div class="w-full box-border p-6 px-8 lg:px-14">
    <form action="#" @submit.prevent="onSubmit">
      <div class="w-full box-border mb-8 lg:mb-14">
        <h1 class="text-xl font-bold mb-5">Personal Details</h1>
        <div class="w-full box-border flex flex-col lg:flex-row items-start gap-y-5 lg:gap-y-0 lg:gap-x-8 mb-6">
          <div class="w-full lg:w-1/2 box-border">
            <Input
              label="Wanted Job Title"
              type="text"
              name="jobTitle"
              v-model="jobTitle"
              :showTooltip="true"
              tooltipValue="Type your Job Title."
              :class="errors.jobTitle ? 'border-b-2 border-red-500 focus:border-red-500' : ''"
            />
            <div class="text-red-500 text-xs mt-1 font-medium">{{ errors.jobTitle }}</div>
          </div>

          <div class="w-full lg:w-1/2 box-border">
            <div class="w-full box-border flex items-center gap-x-5">
              <div class="flex-none size-16 bg-input flex items-center justify-center box-border overflow-hidden rounded">
                <img v-if="previewPhoto" :src="previewPhoto" alt="Preview Photo" />
                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-10 text-[#C0C3D3]">
                  <path
                    fill-rule="evenodd"
                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>

              <div class="w-full box-border flex-1">
                <label for="upload-photo" class="block px-6 cursor-pointer text-[#458FE9] hover:text-[#458FE990] font-medium">Upload photo</label>
                <input ref="photoRef" id="upload-photo" type="file" class="sr-only" @change="readPhoto" />
              </div>
            </div>

            <div class="text-red-500 text-xs mt-1 font-medium">{{ errorPhoto }}</div>
          </div>
        </div>

        <div class="w-full box-border flex flex-col lg:flex-row items-start gap-y-5 lg:gap-y-0 lg:gap-x-8 mb-6">
          <div class="w-full lg:w-1/2 box-border">
            <Input label="First Name" type="text" name="firstName" v-model="firstName" :showTooltip="false" :class="errors.firstName ? 'border-b-2 border-red-500 focus:border-red-500' : ''" />
            <div class="text-red-500 text-xs mt-1 font-medium">{{ errors.firstName }}</div>
          </div>

          <div class="w-full lg:w-1/2 box-border">
            <Input label="Last Name" type="text" name="lastName" v-model="lastName" :showTooltip="false" :class="errors.lastName ? 'border-b-2 border-red-500 focus:border-red-500' : ''" />
            <div class="text-red-500 text-xs mt-1 font-medium">{{ errors.lastName }}</div>
          </div>
        </div>

        <div class="w-full box-border flex flex-col lg:flex-row items-start gap-y-5 lg:gap-y-0 lg:gap-x-8 mb-6">
          <div class="w-full lg:w-1/2 box-border">
            <Input label="Email" type="email" name="email" v-model="email" :showTooltip="false" :class="errors.email ? 'border-b-2 border-red-500 focus:border-red-500' : ''" />
            <div class="text-red-500 text-xs mt-1 font-medium">{{ errors.email }}</div>
          </div>

          <div class="w-full lg:w-1/2 box-border">
            <Input label="Phone" type="tel" name="phone" v-model="phone" :class="errors.phone ? 'border-b-2 border-red-500 focus:border-red-500' : ''" />
            <div class="text-red-500 text-xs mt-1 font-medium">{{ errors.phone }}</div>
          </div>
        </div>

        <div class="w-full box-border flex flex-col lg:flex-row items-center gap-y-5 lg:gap-y-0 lg:gap-x-8 mb-6">
          <div class="w-full lg:w-1/2 box-border">
            <Combobox
              ref="refCountry"
              label="Country"
              :list="countries"
              name="country"
              v-model="country"
              @onSelect="
                (val) => {
                  refCity.resetValue();
                  getCities(val);
                }
              "
            />
            <div class="text-red-500 text-xs mt-1 font-medium">{{ errors.country }}</div>
          </div>

          <div class="w-full lg:w-1/2 box-border">
            <Combobox ref="refCity" label="City" :list="cities" name="city" v-model="city" />
          </div>
        </div>

        <div class="w-full box-border flex flex-col lg:flex-row items-start gap-y-5 lg:gap-y-0 lg:gap-x-8 mb-6">
          <div class="w-full lg:w-1/2 box-border">
            <Input label="Address" type="text" name="address" v-model="address" :class="errors.address ? 'border-b-2 border-red-500 focus:border-red-500' : ''" />
            <div class="text-red-500 text-xs mt-1 font-medium">{{ errors.address }}</div>
          </div>

          <div class="w-full lg:w-1/2 box-border">
            <Input label="Postal Code" type="number" name="postalCode" v-model="postalCode" :class="errors.postalCode ? 'border-b-2 border-red-500 focus:border-red-500' : ''" />
            <div class="text-red-500 text-xs mt-1 font-medium">{{ errors.postalCode }}</div>
          </div>
        </div>

        <div class="w-full box-border flex flex-col lg:flex-row items-start gap-y-5 lg:gap-y-0 lg:gap-x-8 mb-6">
          <div class="w-full lg:w-1/2 box-border">
            <Input
              label="Driving License"
              type="text"
              name="drivingLicense"
              v-model="drivingLicense"
              :showTooltip="true"
              tooltipValue="Type your Driving License."
              :class="errors.drivingLicense ? 'border-b-2 border-red-500 focus:border-red-500' : ''"
            />
            <div class="text-red-500 text-xs mt-1 font-medium">{{ errors.drivingLicense }}</div>
          </div>

          <div class="w-full lg:w-1/2 box-border">
            <Input
              label="Nationality"
              type="text"
              name="nationality"
              v-model="nationality"
              :showTooltip="true"
              tooltipValue="Type your Nationality."
              :class="errors.nationality ? 'border-b-2 border-red-500 focus:border-red-500' : ''"
            />
            <div class="text-red-500 text-xs mt-1 font-medium">{{ errors.nationality }}</div>
          </div>
        </div>
      </div>

      <!-- rich text editors -->
      <div class="w-full box-border mb-8 lg:mb-14">
        <div class="w-full mb-5">
          <h1 class="text-xl font-bold">Professional Summary</h1>
          <p class="text-[#9196AA]">
            Write 2-4 short & energetic sentences to interest the reader! Mention your role, experience & most importantly - your biggest archievements, best qualities and skills.
          </p>
        </div>
        <div class="w-full bg-input mb-10">
          <RichTextEditor v-model="professionalSummary" name="professionalSummary" />
        </div>
      </div>
      <!-- end rich text editor -->

      <!-- Employment History -->
      <EmploymentsCvForm ref="employmentList" />
      <!-- Employment History -->

      <!-- Education -->
      <EducationsCvForm ref="educationList" />
      <!-- Education -->

      <!-- Skills -->
      <SkillsCvForm ref="skillList" />
      <!-- Skills -->

      <div class="w-full box-border mt-5">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  </div>
</template>
