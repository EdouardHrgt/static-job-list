<script setup>
import jobs from '../datas/data.json';
import { ref, computed } from 'vue';

function getImageUrl(name) {
  return new URL(`../assets/${name}`, import.meta.url).href;
}

function setFeatured(bool) {
  if (bool) return 'featured';
}

function setNew(bool) {
  if (bool) return 'new!';
}

const jobList = ref(jobs);
const tagSet = ref(new Set());
// const tagsList = computed(() => {
//   return [...tagSet.value];
// });

function addToTags(tag) {
  tagSet.value.add(tag);
}

function removeTag(tag) {
  tagSet.value.delete(tag);
}

const reactiveJobs = computed(() => {
  const selectedTags = [...tagSet.value]; // Convertir les tagsSet en tableau
  if (selectedTags.length === 0) {
    return jobList.value; // Si aucun tag n'est sélectionné, renvoyer la liste complète de jobs
  } else {
    // Filtrer les jobs qui contiennent au moins un des tags sélectionnés
    return jobList.value.filter((job) => {
      // Vérifier si au moins un tag sélectionné est présent dans les langages, les outils, le rôle ou le niveau du job
      return selectedTags.some((tag) => {
        return job.languages.includes(tag) || job.tools.includes(tag) || job.role === tag || job.level === tag;
      });
    });
  }
});
</script>

<template>
  <header class="mb-16 lg:mb-0"></header>
  <main class="pb-[7rem] px-6 lg:px-6">
    <div
      v-show="tagSet.size > 0"
      class="flex gap-5 max-w-6xl bg-white rounded-md justify-center mx-auto relative top-[-4rem] lg:top-0 translate-y-[-50%] py-6 flex-wrap"
    >
      <div class="overflow-hidden rounded-md flex bg-cyan200 gap-2 pl-4 items-center h-[2rem]" v-for="tag in tagSet" :key="tag">
        <p class="block font-bold text-teal-500">{{ tag }}</p>
        <button
          @click="removeTag(tag)"
          class="text-white flex justify-center items-center h-[100%] font-bold bg-teal-500 px-2 hover:bg-black"
        >
          X
        </button>
      </div>
    </div>
    <section
      class="relative rounded-md md:flex max-w-6xl mx-auto md:my-10 mb-16 md:mb-0 items-center md:gap-5 lg:gap-8 px-8 py-8 bg-white border-l-[5px] border-teal-500 shadow-xl"
      v-for="job in reactiveJobs"
      :key="job.id"
    >
      <img :src="getImageUrl(job.logo)" alt="" class="absolute md:static top-[-2rem] w-16 md:w-auto" />
      <div class="card-txt mt-5 md:mt-0">
        <p class="font-bold text-teal-500">
          {{ job.company }}
          <span v-if="job.new" class="uppercase text-sm text-white bg-teal-500 px-3 py-1 rounded-full mx-2">{{
            setNew(job.new)
          }}</span>
          <span v-if="job.featured" class="uppercase text-sm text-white bg-slate-800 px-3 py-1 rounded-full mx-1">{{
            setFeatured(job.featured)
          }}</span>
        </p>
        <h2 class="text-xl font-bold my-1">{{ job.position }}</h2>
        <p class="text-gray-400 border-b-2 pb-2 md:border-0">{{ job.postedAt }} - {{ job.contract }} - {{ job.location }}</p>
      </div>
      <ul class="flex gap-3 ml-auto mt-4 md:mt-0 flex-wrap">
        <li class="bg-teal-50 px-2 py-1 font-bold text-teal-500" v-for="lang in job.languages" :key="lang">
          <button @click="addToTags(lang)">{{ lang }}</button>
        </li>
        <li class="bg-teal-50 px-2 py-1 font-bold text-teal-500" v-for="tool in job.tools" :key="tool">
          <button @click="addToTags(tool)">{{ tool }}</button>
        </li>
        <li class="bg-teal-50 px-2 py-1 font-bold text-teal-500">
          <button @click="addToTags(job.role)">{{ job.role }}</button>
        </li>
        <li class="bg-teal-50 px-2 py-1 font-bold text-teal-500">
          <button @click="addToTags(job.level)">{{ job.level }}</button>
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
header {
  background-image: url('../assets/bg-header-desktop.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: var(--clr-bg-cyan);
  width: 100%;
  height: 10rem;
}

section {
}
</style>
