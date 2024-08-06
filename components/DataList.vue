<template>
  <div class="data-list page-height">
    <div v-for="obj in data" :key="obj.name">
      <div class="card">
        <p class="card__name">{{ obj.name }}</p>
        <p class="card__info">Altura: {{ obj.height }}</p>
        <p class="card__info">Peso: {{ obj.mass }}</p>
        <NuxtLink class="card__link" :to="`/details/${getId(obj.url)}`">Ver todos os detalhes
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type IDetail } from '@/types';

interface Props {
  data: IDetail[];
};

defineProps<Props>()

function extractId(str: any) {
  let id = "";
  for (let i = 0; i < str.length; i++) {
    if (!isNaN(str[i])) {
      id += str[i];
    }
  }
  return id
}

const getId = (url: string) => {
  return extractId(url);
}
</script>

<style lang="scss" scoped>
.data-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 24px;
}

.card {
  padding: 40px 64px;
  background-color: #000;
  border: 1px solid #fff;
  border-radius: 8px;

  &__name {
    color: #fff;
    font-size: 24px;
    margin-top: 0;
    margin-bottom: 8px;
  }

  &__info {
    color: #8D8D8D;
    font-size: 16px;
    margin-bottom: 0;
    margin-top: 0;
  }

  &__link {
    display: block;
    text-decoration: underline;
    color: #DBA90D;
    margin-top: 8px;
    margin-bottom: 0;
    font-size: 16px;
  }
}
</style>
