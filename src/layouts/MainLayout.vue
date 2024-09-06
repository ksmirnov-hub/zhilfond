<template>
  <q-layout class="layout" view="hHh Lpr fFf">
    <q-header class="header q-mb-sm">
      <q-toolbar class="toolbar">
        <q-toolbar-title class="outerTitle">
          <div class="title">Жилфонд</div>
          <div class="user">Пользователь</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-footer class="footer"><q-toolbar /></q-footer>

    <q-page-container class="flex row">
      <q-page class="leftPage">
        <SearchBlock />
      </q-page>
      <q-page class="rightPage">
        <InfoBlock />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import SearchBlock from 'src/components/SearchBlock.vue'
import InfoBlock from 'src/components/InfoBlock.vue'

defineOptions({
  name: 'MainLayout'
})

// const leftDrawerOpen = ref(false)

</script>
<style scoped>
.leftPage {
  padding-bottom: 5px;
}
.rightPage {
  width: 100%;
  padding-bottom: 5px;
}
.row {
  flex-wrap: nowrap;
    flex-direction: row;
    margin: 0px 100px 0px 10px;
}
.footer {
  background-color: white;
}
  .header {
    margin-left: 50px;
    background-color: white !important;
  }
.user {
  font-family: Montserrat;
font-size: 16px;
font-weight: 400;
line-height: 19.5px;
text-align: left;
color: rgba(51, 51, 51, 1);
}
.outerTitle {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 100px;
}
  .button {
    color: black;
    height: 110px;
  }

  .toolbar {
    background-color: white;
    height: 100px;
    margin: 0;
  }
  .title {
    font-family: 'Montserrat';
    font-weight: 700;
    font-size: 32px;
    line-height: 39.01px;
    color: #E31F24;
  }
</style>
<style module>
.scroll {
  overflow: hidden;
}
.drawer {
  overflow: hidden;
}
</style>
