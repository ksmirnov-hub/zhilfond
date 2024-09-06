<template>
    <div class="q-pa-md info">
      <div class="empty" v-if="user === null">
        Выберите сотрудника, чтобы посмотреть его профиль
      </div>
      <div v-if="user !== null" class="row outer">
        <div>
          <img
              alt=""
              src="~assets/avatarEmptyBig.svg"
              style="width: 424px; height: 286px"
          >
        </div>
        <div class="baseInfo">
          <div class="name">
            {{ user?.name }}
          </div>
          <div class="row gap">
            <div class="title">email:</div>
            <div class="value">{{ user?.email }}</div>
          </div>
          <div class="row gap">
            <div class="title">phone:</div>
            <div class="value">{{ user?.phone }}</div>
          </div>
          <div class="name">
            О себе:
          </div>
          <div class="value">
            {{ user?.company?.catchPhrase }}
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useCurrentUserStore } from 'stores/current-user-store'

const updateStore = useCurrentUserStore()
const { user } = storeToRefs(updateStore)
defineOptions({
  name: 'InfoBlock'
})

// const props = defineProps({})
watch(user, (_, __) => {
  console.log(user)
})
</script>
<style scoped>
  .baseInfo {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }
  .info {
    margin-top: 2px;
    padding-top: 30px;
    background-color: white;
    margin-left: 0px;
    padding-left: 20px;
    height: 100%;
    border-radius: 0px 10px 10px 0px;
    box-shadow: 4px -2px 8px 0px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: row;
    column-gap: 72px;
  }
.gap {
  column-gap: 10px;
}
.outer {
  column-gap: 72px;
}
.name {
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 600;
  line-height: 22.4px;
  text-align: left;
  color: rgba(51, 51, 51, 1);
}
.empty {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 400;
  line-height: 17.07px;
  text-align: left;
  color: rgba(118, 120, 125, 1);
}
.title {
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 600;
  line-height: 17.07px;
  text-align: left;
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
</style>
