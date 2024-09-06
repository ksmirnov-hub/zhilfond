<template>
    <div class="q-pa-md left">
        <div class="title">Поиск сотрудников</div>
        <div class="input">
            <q-input
                outlined
                label="Введите id или имя"
                v-model="search"
                @update:model-value="onChange"
                :class="{
                  [$style.inputStyle]: true
                }"
            />
        </div>
        <div v-if="error" class="error">
          {{ error }}
        </div>
        <div v-if="!error">
          <div class="title"> Результаты </div>
          <div v-if="isDataLoading">
            <q-inner-loading :showing="isDataLoading">
                <q-spinner-gears size="50px" color="primary" />
            </q-inner-loading>
          </div>
          <div class="value" v-if="search && users.length === 0">Ничего не найдено</div>
          <div class="value" v-if="!search && users.length === 0">Начните поиск</div>
          <div class="list" v-if="users.length">
            <div v-for="(item, index) in users" :key="index">
              <OneUserItem
                :userName="item.username"
                :email="item.email"
                :id="item.id"
              />
            </div>
          </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import trim from 'lodash/trim'
import { useAxios } from '@vueuse/integrations/useAxios'
import { useCurrentUserStore } from 'stores/current-user-store'

const updateStore = useCurrentUserStore()
const { clearCurrentUser } = updateStore
import OneUserItem from './blocks/oneUserItem.vue'

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 50000
})

defineOptions({
  name: 'SearchBlock'
})
const search = ref('')
const isDataLoading = ref(false)
const users = ref([])
const error = ref('')

const onChange = async (value, update, abort) => {
  error.value = ''
  isDataLoading.value = false

  if (!value) {
    users.value = []
    clearCurrentUser()
    return
  }
  const paramValue = value
    .split(',')
    .map((v) => (isNaN(Number(trim(v))) ? trim(v) : Number(trim(v))))
    .filter((fv) => !!fv)

  const params = typeof paramValue[0] === 'number' ? { id: paramValue } : { username: paramValue }
  try {
    isDataLoading.value = true
    const { data, isFinished } = await useAxios('/users', {
      method: 'GET',
      params
    }, instance)

    if (isFinished) {
      users.value = data.value
      isDataLoading.value = false
    }
  } catch (e) {
    users.value = []
    clearCurrentUser()
    error.value = e.message
  }
}
</script>
<style scoped>
  .input {
    margin-bottom: 30px;
  }
  .error {
    color: red;
  }
  .list {
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    overflow-y: auto;
    overflow-x: hidden;
    height: 450px;
    padding: 5px;
  }
  .title {
    font-family: Montserrat;
    font-size: 16px;
    font-weight: 600;
    line-height: 22.4px;
    text-align: left;
    margin-bottom: 20px;
    color: rgba(51, 51, 51, 1);
  }
  .value {
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 400;
  line-height: 17.07px;
  text-align: left;
  color: rgba(118, 120, 125, 1);
  }
  .left {
    width: 300px;
    border-right: 1px solid rgba(222, 222, 221, 1);
    margin-top: 2px;
    background-color: white;
    margin-left: 50px;
    height: 100%;
    border-radius: 10px 0px 0px 10px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  }
</style>
<style module>
.inputStyle {
  width: 240px;
}
</style>
