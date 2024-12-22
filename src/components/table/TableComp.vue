<script setup>
import { computed, ref } from 'vue'
import { mdiDownload, mdiEye, mdiPencil, mdiTrashCan } from '@mdi/js'
import CardBoxModal from '@/components/ComponentsOne/CardBoxModal.vue'
import BaseButton from '@/components/ComponentsOne/BaseButton.vue'
import goTo from '@/stores/utils/goRoute'
import { encryptMe } from '@/stores/utils/encryption';
import BaseLevel from '../ComponentsOne/BaseLevel.vue'
import BaseButtons from '../ComponentsOne/BaseButtons.vue'
import ButtonComp from '../essencials/ButtonComp.vue'
import { mdiArrowLeftBoldBoxOutline, mdiArrowRightBoldBoxOutline } from '@mdi/js'
// Recibe items como prop
const props = defineProps({
  checkable: Boolean,
  headers: {
    type: Array,
    default: () => [],
    required: true,
  },
  items: {
    type: Array,
    default: () => [],
    required: true,
  },
  options: {
    type: Array,
    default: () => [],
    required: false,
  },
  formatCell: {
    type: Object,
    default: {},
    required: false,
  },
  classCell: {
    type: Object,
    default: {},
    required: false,
  },
  classRow: {
    type: Function,
    default: (_) => "",
    required: false,
  },
  exclude: {
    type: Array,
    default: () => [],
    required: false,
  },
  editRedirect: {
    type: String,
    default: '/',
    required: false,
  },
  buttonsCell: {
    type: Object,
    default: {},
    required: false
  },
  buttonsName: {
    type: Array,
    default: [],
    required: false
  },
  label: {
    type: String,
    default: "",
  },
  rowPerPage: {
    type: Number,
    default: 10
  },
  onClickEdit: {
    type: Function,
    default: null,
  },
  onClickRow: {
    type: Function,
    default: () => {}
  },
  onConfirmDelete: {
    type: Function,
    default: () => {}
  },
  
});

function format(value, name){
  const func = props.formatCell[name];
  if (func){
    return func(value);
  } 
  return value;
}


function classCell(name){
  const className = props.classCell[name];
  return className? className : "";
}

function onClickEdit(item){
  if (props.onClickEdit != null){
    return props.onClickEdit(item);
  }
  return (item) => {
    goTo(`${props.editRedirect}?id=${ encryptMe((item['id']).toString()) }`);
    //goTo('/');
  }
}

const idSelected = ref(-1);
const idDelete = ref(-1);



const excludeKeys = computed(() => props.exclude.map(e => String(e)));



const numPages = computed(() => Math.ceil(props.items.length / props.rowPerPage));

const BUTTONS_DISPLAY = (numPages.value > 14)?  14 : (numPages.value >= 2)?numPages.value : 1; 

const currentPage = ref(0);
const currentPageHuman = computed(() => currentPage.value + 1)

const pagesList = computed(() => {
  const pagesList = [];
  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i);
  }

  return pagesList;
});

const itemsPaginated = computed(() => {
  return props.items.slice(props.rowPerPage * currentPage.value, props.rowPerPage * (currentPage.value + 1))
})




const names = computed(() => props.headers
  .filter(key =>!excludeKeys.value
    .includes(Object.values(key)[0]))
  .map(item => Object.keys(item)[0]));

const headersTable = computed(() => props.headers
  .filter(key =>!excludeKeys.value
    .includes(Object.values(key)[0]))
  .map(item => Object.values(item)[0])
);

const optionsTable = computed(() => props.options.map(item => String(item)));

const isModalSeeActive = ref(false);
const isModalDeleteActive = ref(false);

const pressLeft = () => {
  if (currentPage.value < 1) return; 
  currentPage.value = currentPage.value - 1;
}

const pressRight = () => {
  if (currentPage.value >= numPages.value - 1) return;
  currentPage.value = currentPage.value + 1;
}

const initIndex = () => {
  if ((currentPage.value) < (BUTTONS_DISPLAY / 2)){
    return 0;
  }
  else if ((currentPage.value) + (BUTTONS_DISPLAY / 2) > numPages.value){
    
    return numPages.value - BUTTONS_DISPLAY;
  } else{
    return currentPage.value - (BUTTONS_DISPLAY/2);
  }
}

const endIndex = () => {
  if ((currentPage.value) < (BUTTONS_DISPLAY / 2)){
    return currentPage.value + (BUTTONS_DISPLAY - currentPage.value);
  }
  else if ((currentPage.value) + (BUTTONS_DISPLAY / 2) > numPages.value){
    return numPages.value;
  } else{
    return (currentPage.value + (BUTTONS_DISPLAY /2));
  }
}

</script>

<template>
  <CardBoxModal v-if="isModalSeeActive" v-model="isModalSeeActive" button-label="CERRAR" class="h-full" button="primary" className="w-[80vw] h-[70vw]">
    <slot name="see" :idSelected="idSelected"></slot>
  </CardBoxModal>

  <CardBoxModal 
    v-if="isModalDeleteActive" 
    v-model="isModalDeleteActive" 
    title="Desea Eliminar" 
    button="danger" 
    button-label="Si" 
    has-cancel class-name="h-fit"
    v-on:confirm="props.onConfirmDelete(idDelete)">
    <p class="m-8">¿Desea eliminar al {{ label }}?</p>
  </CardBoxModal>
  
  <table class="border-2 shadow-md">
    <thead class="w-full">
      <tr class="bg-primary text-white hover:bg-terciary">
        <th>N°</th>
        <th v-for="(header, index) in headersTable" :key="index" class="">
          {{ (header) }}
        </th>
        <th v-if="options.length > 0 || buttonsName.length > 0" key="options" :colspan="options.length + buttonsName.length" class="text-center">
          {{ "Opciones" }}
        </th>
       

      </tr>
    </thead>
    <tbody>
      <tr 
        v-for="(item, index) in itemsPaginated" 
        :key="index" 
        :class="`transition-all duration-100 ease-in-out transform opacity-0 translate-y-5 ${props.classRow(item)}`"
        :style="{ animationDelay: `${index * 40}ms` }"
        :onclick="() => props.onClickRow(item.id)">
        <td>{{ (currentPage * 10) + (index + 1) }}</td>
        <td v-for="name in names" :key="name" :class="`${classCell(name)}`">
          {{ format(item[name], name) }}
        </td>
        <td v-for="(option, indexOption) in optionsTable" :key="indexOption">
          <BaseButton
            v-if="option === 'update'"
            type="button"
            color="success"
            :icon="mdiPencil"
            @click="() => onClickEdit(item)"
          />
          <BaseButton
            v-else-if="option === 'see'"
            type="button"
            color="sky"
            :icon="mdiEye"
            @click="() =>{
              idSelected = item['id'];
              isModalSeeActive = true;
            }"
          />
          <BaseButton
            v-else-if="option === 'delete'"
            type="button"
            color="danger"
            :icon="mdiTrashCan"
            @click="() => { 
              isModalDeleteActive = true; 
              idDelete = item['id']; 
            }"
          />
          <BaseButton
            v-else-if="option === 'dowload'"
            type="button"
            color="info"
            :icon="mdiDownload"
            @click="()=>{
              window.location.replace('https://example.com');
            }"
          />
        </td>
        <td v-for="(name, indexOption) of buttonsName" :key="indexOption">
          <button
            
            @click="() => buttonsCell[name](item, document)"
          > {{ name }}
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <div v-if="itemsPaginated.length === 0" class="flex w-full justify-center border-4">
    <p>NO HAY DATOS DISPONIBLES EN LA TABLA ESTE MOMENTO</p>
  </div>
  <div class="flex flex-nowrap overflow-x-auto h-12 p-3 px-6 border-t border-gray-100 dark:border-slate-800">
    <div class="w-1/6">

    </div>
    <div class="flex justify-center w-4/6">
      <BaseButtons>
        <ButtonComp
          :icon="mdiArrowLeftBoldBoxOutline"
          :is-icon-button="true"
          :on-click="pressLeft"
          >
        </ButtonComp>
        <BaseButton
          v-for="page in pagesList.slice(initIndex(), endIndex())"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          :color="page === currentPage ? 'lightDark' : 'whiteDark'"
          small
          @click="currentPage = page"
          :class="`hover:border-b-2 hover:border-b-secondary hover:shadow-2xl`"
        />
        <ButtonComp
          :icon="mdiArrowRightBoldBoxOutline"
          :is-icon-button="true"
          :on-click="pressRight"
        ></ButtonComp>
      </BaseButtons>
    </div>
      <div class="flex w-1/6 justify-end">
        <small class="flex justify-self-end">Pagina {{ currentPageHuman }} de {{ numPages !== 0? numPages : 1 }}</small>
      </div>
  </div>
</template>

<style>

tr {
  animation: fadeIn 0.5s forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
