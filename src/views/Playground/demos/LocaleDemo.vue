<template>
  <div class="d-flex flex-wrap ga-2 mb-4">
    <v-btn v-if="entry.name === 'setVqLocale'" color="primary" data-testid="apply-locale" @click="apply">
      setVqLocale(values)
    </v-btn>
    <v-btn v-else color="primary" variant="tonal" data-testid="apply-sample-locale" @click="apply">
      Change the labels first
    </v-btn>
    <v-btn variant="text" data-testid="reset-locale" @click="reset">resetVqLocale()</v-btn>
  </div>

  <VqForm id="playground-locale-form" :action="mockAction('members')">
    <VqSubmitBtn />
  </VqForm>
  <VqList id="playground-locale-list" class="mt-3" :action="mockAction('members')" :page-size="2">
    <template #default="{ items }">
      <v-list-item v-for="item in items as any[]" :key="item.id" :title="item.name" />
      <VqListLoadMoreBtn class="ma-2" />
    </template>
  </VqList>
</template>

<script setup lang="ts">
import { onBeforeUnmount } from 'vue'
import {
  VqForm,
  VqList,
  VqListLoadMoreBtn,
  VqSubmitBtn,
  resetVqLocale,
  setVqLocale
} from '@qnx/vuetify'
import { demoProps } from './demoProps'
import { mockAction } from '../utils/mockApi'

const props = defineProps(demoProps)

const apply = () => {
  const overrides = Object.fromEntries(
    Object.entries(props.config).filter(([, value]) => value !== '')
  )
  setVqLocale(overrides)
  props.log('setVqLocale', overrides)
}

const reset = () => {
  resetVqLocale()
  props.log('resetVqLocale')
}

onBeforeUnmount(() => resetVqLocale())
</script>
