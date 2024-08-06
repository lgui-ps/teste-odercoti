<template>
  <main class="details page-height">
    <span class="breadcrumb navigation">
      <NuxtLink to="/">Home</NuxtLink> > Busca
    </span>
    <h2 class="title">Detalhes do personagem</h2>
    <h3 class="subtitle">{{ details.name }}</h3>

    <nav class="buttons">
      <Button @click.prevent="buttonAction(index)" v-for="(button, index) in buttons" class="button"
        :active="route.query.view === button.query || !route.query.view && index === 0" :label="button.label" />
    </nav>

    <section class="content-container">
      <div class="prev" @click="prev">
        <img src="@/assets/arrow.svg" alt="">
      </div>
      <Content :data="contentData" />
      <div class="next" @click="next">
        <img src="@/assets/arrow.svg" alt="">
      </div>
    </section>

    <NuxtLink class="back navigation" to="/">Voltar aos outros personagens</NuxtLink>
  </main>
</template>

<script setup lang="ts">
import axios from 'axios';
import Content from '@/components/Content.vue';
import Button from '@/components/Button.vue';
import { baseURL } from '@/config';
import type { ISpecie, IDetail, IFilm, IVehicle, IStarship } from '@/types';
import { parseDetails, parseFilms, parseSpecies, parseStarships, parseVehicles } from '~/helpers/parseData';
import { isEmpty } from 'lodash';
import { buttonsNav } from '~/__mocks__/buttons-nav';

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const details = ref<IDetail>({} as IDetail);
const species = ref<ISpecie>({} as ISpecie);
const films = ref<IFilm[]>([] as IFilm[]);
const vehicles = ref<IVehicle[]>([] as IVehicle[]);
const starships = ref<IStarship[]>([] as IStarship[]);

const currentIndex = ref(0);
const buttons = buttonsNav;

const getDetails = async () => {
  if (!isEmpty(details.value)) return;

  const response = await axios.get<IDetail>(`${baseURL}/people/${id}`);
  details.value = response.data;
}

const getSpecies = async () => {
  if (isEmpty(details.value)) await getDetails();
  if (!isEmpty(species.value)) return;

  const speciesUrl = details?.value?.species[0];

  if (speciesUrl) {
    const response = await axios.get<ISpecie>(speciesUrl);
    species.value = response.data;
  } else {
    const response = await axios.get<ISpecie>(`${baseURL}/species/1`);
    species.value = response.data;
  }
}

const getFilms = async () => {
  if (isEmpty(details.value)) await getDetails();
  if (films.value.length) return;

  const urls = [...details.value.films];

  if (urls.length) {
    axios.all(urls.map((url) => axios.get<IFilm>(url))).then(
      (data) => {
        films.value = data.map(film => {
          return film.data;
        });
      }
    );
  }
}

const getVehicles = async () => {
  if (isEmpty(details.value)) await getDetails();
  if (vehicles.value.length) return;

  const urls = [...details.value.vehicles];

  if (urls.length) {
    axios.all(urls.map((url) => axios.get<IVehicle>(url))).then(
      (data) => {
        vehicles.value = data.map(film => {
          return film.data;
        });
      }
    );
  }
}

const getStarships = async () => {
  if (isEmpty(details.value)) await getDetails();
  if (starships.value.length) return;

  const urls = [...details.value.starships];

  if (urls.length) {
    axios.all(urls.map((url) => axios.get<IStarship>(url))).then(
      (data) => {
        starships.value = data.map(film => {
          return film.data;
        });
      }
    );
  }
}

const checkRouteQueryAndFetch = (query: string) => {
  if (!query) {
    getDetails();
    return;
  }

  interface ObjectLiteral {
    [key: string]: () => void;
  }

  const possibleQueries: ObjectLiteral = {
    details: getDetails,
    species: getSpecies,
    films: getFilms,
    starships: getStarships,
    vehicles: getVehicles
  }

  possibleQueries[query]();
}

const onIndexChange = () => {
  buttons.map((button, index) => {
    if (index === currentIndex.value) {
      checkRouteQueryAndFetch(button.query);
      pushRoute(button.query);
    }
  })
}

const buttonAction = (index: number) => currentIndex.value = index;

const prev = () => {
  if (currentIndex.value === 0) return;
  currentIndex.value--;
}

const next = () => {
  if (currentIndex.value === 4) return;
  currentIndex.value++;
}

const pushRoute = (query: string) => {
  router.push({
    path: `/details/${id}`,
    query: { view: query },
  })
}

const contentData = computed(() => {
  const shouldShowParsedDetails = route.query.view === 'details' || !route.query.view;
  if (shouldShowParsedDetails) return parseDetails(details.value);
  if (route.query.view === 'species') return parseSpecies(species.value);
  if (route.query.view === 'films') return parseFilms(films.value);
  if (route.query.view === 'starships') return parseStarships(starships.value);
  if (route.query.view === 'vehicles') return parseVehicles(vehicles.value);
})

watch(currentIndex, () => {
  onIndexChange();
})

onMounted(() => {
  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i].query === route.query.view) currentIndex.value = i;
  }

  checkRouteQueryAndFetch(route.query.view as string);
  if (!route.query.view) {
    getDetails();
  }
})
</script>

<style lang="scss" scoped>
.details {
  background: url('@/assets/body_wallpaper.jpg') center center no-repeat;
  background-size: cover;
  padding-bottom: 72px;
}

.container {
  max-width: 1148px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 48px;
  margin-top: 40px;
}

.subtitle {
  text-align: center;
  font-size: 72px;
  font-weight: bold;
  color: #DBA90D;
  margin-bottom: 72px;
}

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 72px;
}

.button:not(:last-child) {
  margin-right: 32px;
}

.navigation {
  display: inline-block;
  margin-left: 64px;
  margin-top: 40px;
  font-size: 16px;
}

.breadcrumb {
  color: #8D8D8D;

  a {
    text-decoration: none;
    color: #8D8D8D;

    &:hover {
      color: #DBA90D;
    }
  }
}

.back {
  color: #DBA90D;
}

.content-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1148px;
}

.prev,
.next {
  height: 70px;
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #A5A29A;
  border-radius: 50%;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
}

.next {
  margin-left: -100px;
}

.prev img {
  transform: rotate(180deg);
}
</style>
