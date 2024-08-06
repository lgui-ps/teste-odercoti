<template>
  <div class="container">
    <div class="bg">
      <img class="bg__img" src="../assets/yellow_sw.svg" alt="Background">

      <div v-if="data.length" class="info with-select">
        <SelectView :data="data" />
      </div>

      <div v-else class="info">
        <div v-for="(value, key) in data" class="info-row">
          <span class="info-row__prop">{{ formatObjKey(key.toString()) }}</span>
          <span class="info-row__value">{{ value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IDetail, ISpecie, IFilm, IVehicle, IStarship } from '~/types';
import SelectView from '@/components/SelectView.vue';

interface Props {
  data: IDetail & ISpecie & IFilm[] & IVehicle[] & IStarship[];
}

defineProps<Props>()

const formatObjKey = (str: string) => {
  return str.replace('_', ' ');
}
</script>

<style lang="scss" scoped>
.no-content {
  color: #fff;
  font-size: 24px;
}

.bg {
  position: relative;
  width: 727px;
  height: 491px;
  border-radius: 24px;
  background-color: #DBA90D;
  padding: 84px 40px;
  margin-right: 230px;


  // Não sei qual efeito foi utilizado no Figma, mas foi uma forma que encontrei de destacar a imagem.
  // Só com a imagem sem o brightness a imagem não estava aparecendo por ser da mesma cor do background.
  &__img {
    filter: brightness(50%)
  }
}

.info {
  position: absolute;
  width: 628px;
  height: 436px;
  background-color: #151515;
  border-radius: 24px;
  left: 230px;
  top: 28px;
  padding: 54px 64px;

  &-row {
    display: flex;
    align-items: center;


    &:not(:last-child) {
      margin-bottom: 32px;
    }
  }

  &-row__prop {
    font-size: 24px;
    color: #DBA90D;
    margin-right: 29px;
  }

  &-row__value {
    font-size: 32px;
    color: #fff;
  }
}

.with-select {
  padding: 16px 32px;
}
</style>