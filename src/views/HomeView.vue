<script setup>
import jobs from '../datas/data.json';
import { ref, computed } from 'vue';

const jobList = ref(jobs);

function getImageUrl(name) {
  return new URL(`../assets/${name}`, import.meta.url).href;
}
</script>

<template>
  <header></header>
  <main class="">
    <section class="flex" v-for="job in jobList" :key="job.id">
      <img :src="getImageUrl(job.logo)" alt="" />
      <div class="card-txt">
        <p>
          {{ job.company }} <span>{{ job.new }}</span> <span>{{ job.new }}</span>
        </p>
        <p>{{ job.postedAt }} - {{ job.contract }} - {{ job.location }}</p>
        <ul class="flex">
          <li v-for="lang in job.languages" :key="lang">{{ lang }}</li>
        </ul>
      </div>
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

main {
  max-width: 1250px;
  margin-inline: auto;
}

section {
  margin-block: 2rem;
  border: 1px solid lightseagreen;
  padding: 2rem 0rem;
}
</style>
