<template>
  <main class="home page-height">
    <div class="container">
      <h2 class="title">Todos os dados de Star Wars que você sempre quis:</h2>
      <h3 class="subtitle">Planetas, naves espaciais, veículos, pessoas, filmes e espécies</h3>

      <div class="input-container">
        <input v-model="searchTerm" placeholder="Busque por pessoas, planetas, naves espaciais.." class="input"
          type="text">
        <img v-if="searchTerm.length" @click="clearSearch" class="clear-search" src="@/assets/cancel.svg" alt="">
      </div>

      <div class="search-content">
        <div class="not-found self-start" v-if="data.count === 0 && !loading">
          <p class="not-found__title">Não conseguimos encontrar nenhum personagem com o termo “{{ unavailableSearchTerm
            }}”
          </p>
          <p class="not-found__subtitle">Tente novamente com outro termo de pesquisa</p>
        </div>
        <div class="error-message self-start" v-if="errorMessage.length">
          {{ errorMessage }}
        </div>
        <DataList v-if="data.count > 0" :data="data.results" />
      </div>

      <div class="loading" v-if="loading">
        Carregando...
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { debounce } from 'lodash';
import { type IAPIResponse } from '@/types';
import axios from 'axios';
import DataList from '@/components/DataList.vue';
import { baseURL } from '~/config';

defineOptions({
  name: 'IndexPage'
});

const data = ref<IAPIResponse>({
  count: -1,
  results: []
});

const searchTerm = ref('');
const unavailableSearchTerm = ref('');
const loading = ref(false);
const errorMessage = ref('');

const clearSearch = () => searchTerm.value = '';

const checkEmptyResponse = () => {
  if (data.value.count === 0) {
    unavailableSearchTerm.value = searchTerm.value;
  }
}

const checkEmptySearchTermBeforeRequest = () => {
  if (!searchTerm.value.length) {
    data.value = {
      count: -1,
      results: []
    };
  }
}

const getData = async () => {
  loading.value = true;
  errorMessage.value = '';

  try {
    checkEmptySearchTermBeforeRequest();
    if (searchTerm.value.length) {
      const response = await axios.get<IAPIResponse>(`${baseURL}/people/?search=${searchTerm.value}`);
      data.value = response.data;
    }
    checkEmptyResponse();
  } catch (error) {
    errorMessage.value = 'Ocorreu um erro inesperado.'
  } finally {
    loading.value = false;
  }
}

watch(searchTerm, debounce(() => {
  getData();
}, 500))
</script>

<style lang="scss">
.home {
  padding-top: 88px;
  padding-bottom: 88px;
}

.container {
  max-width: 1090px;
  width: 100%;
  margin: 0 auto;
}

.input-container {
  max-width: 1090px;
  width: 100%;
  position: relative;
}

.input {
  border-radius: 8px;
  width: 100%;
  padding: 16px 48px;
  border: 1px solid #434343;
  background: url("../assets/search.svg") no-repeat left;
  background-size: 24px;
  background-position-x: 16px;
  background-repeat: no-repeat;
  color: #fff;
  font-family: Inter, sans-serif;

  &:focus {
    outline: none !important;
    border: 1px solid #DBA90D;
  }
}

.clear-search {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 16px;
  cursor: pointer;
}

.title,
.subtitle {
  color: #fff;
  text-align: center;
}

.title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 16px;
}

.subtitle {
  font-size: 24px;
  color: #8D8D8D;
  margin-bottom: 72px;
  margin-top: 0;
}

.search-content {
  margin: 72px auto 0 auto;
  width: 100%;
}

.loading {
  color: #fff;
  align-self: center;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.error-message {
  font-size: 24px;
  color: #fff;
}

.not-found {

  &__title,
  &__subtitle {
    font-size: 24px;
    color: #fff;
  }

  &__title {
    font-weight: bold;
    margin-bottom: 16px;
  }

  &__subtitle {
    color: #8D8D8D;
  }
}
</style>
