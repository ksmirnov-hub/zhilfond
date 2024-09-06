<template>
    <div class="flex row item" @click="onClick">
        <div>
            <img
                alt=""
                src="~assets/avatarEmpty.svg"
                style="width: 70px; height: 70px"
            >
        </div>
        <div class="column info" :class="{
            [$style.current]: currentId === props.id
        }">
            <div class="username">
                {{ props.userName }}
            </div>
            <div class="email">
                {{ props.email }}
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios'
import { storeToRefs } from 'pinia'
import { useAxios } from '@vueuse/integrations/useAxios'
import { useCurrentUserStore } from 'stores/current-user-store'

const updateStore = useCurrentUserStore()
const { id: currentId } = storeToRefs(updateStore)
const { setCurrentUser } = updateStore

defineOptions({
  name: 'OneUserItem'
})
const props = defineProps({
  userName: String,
  id: Number,
  email: String
})
const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
})

const onClick = async () => {
  try {
    const { data, isFinished } = await useAxios('/users', {
      method: 'GET',
      params: { id: props.id }
    }, instance)

    if (isFinished) {
      setCurrentUser(data.value[0])
    }
  } catch {
  }
}
</script>
<style scoped>
.username {
    font-family: Montserrat;
    font-size: 14px;
    font-weight: 600;
    line-height: 17.07px;
    text-align: left;
}
.email {
    font-family: Montserrat;
    font-size: 14px;
    font-weight: 400;
    line-height: 17.07px;
    text-align: left;
    color: rgba(118, 120, 125, 1);
    width: 140px;
    overflow: hidden;
}
.info {
    padding: 15px 0px 10px 15px;
    width: 100%;
    border-radius: 0px 10px 10px 0px;
}
.item {
    width: 240px;
    height: 70px;
    cursor: pointer;
    border-radius: 10px;
    opacity: 0px;
    flex-wrap: nowrap;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
}
</style>
<style module>
.current {
    background: rgba(224, 224, 224, 1);
}
</style>
