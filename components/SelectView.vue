<template>
  <div v-if="data?.length">
    <div class="select">
      <div @click="toggleSelect" class="select-action">
        <span>{{ data[selectedOption].title || data[selectedOption].name }}</span>
        <img :class="showSelectOptions && 'active'" src="../assets/chevron-down.svg" alt="Arrow down">
      </div>

      <div v-show="showSelectOptions" class="select-options">
        <div @click="setOption(index)" v-for="(option, index) in data" class="option"
          :class="selectedOption === index ? 'active' : ''">
          {{ option.title || option.name }}
        </div>
      </div>
    </div>

    <div v-for="(value, key) in propList" class="select-row">
      <span class="select-row__prop">{{ key }}</span>
      <span class="select-row__value">{{ value }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { cloneDeep } from 'lodash';
import type { IFilm, IVehicle, IStarship } from '~/types';

interface Props {
  withSelect?: boolean;
  data: IFilm[] & IVehicle[] & IStarship[];
}

const props = defineProps<Props>();

const propList = computed(() => {
  if (props.data[selectedOption.value]) {
    const values = cloneDeep(props.data[selectedOption.value]);
    if (values.name) delete values.name;
    if (values.title) delete values.title;
    return values;
  }
});

const showSelectOptions = ref(false);
const toggleSelect = () => showSelectOptions.value = !showSelectOptions.value;
const selectedOption = ref(0);

const setOption = (index: number) => {
  selectedOption.value = index;
  toggleSelect();
}
</script>

<style lang="scss" scoped>
.select {
  border-bottom: 1px solid #A5A29A;
  color: #fff;
  font-size: 24px;
  margin-bottom: 32px;
  position: relative;

  img {
    transition: .2s;

    &.active {
      transform: rotate(180deg);
    }
  }

  &:hover {
    cursor: pointer;

    img,
    span {
      opacity: 0.8;
    }
  }
}

.select-action {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding: 18px 24px;
}

.select-options {
  position: absolute;
  left: 0;
  top: 77px;
  border: 1px solid #A5A29A;
  border-top: none;
  width: 100%;
}

.option {
  padding: 12px 24px;
  color: #A5A29A;
  background-color: #151515;

  &:hover {
    color: #202020;
    background-color: #A5A29A;
  }

  &.active {
    color: #202020;
    background-color: #A5A29A;
  }
}

.select-row {
  display: flex;
  align-items: center;


  &:not(:last-child) {
    margin-bottom: 32px;
  }

  &__prop {
    font-size: 24px;
    color: #DBA90D;
    margin-right: 16px;
  }

  &__value {
    font-size: 24px;
    color: #fff;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>