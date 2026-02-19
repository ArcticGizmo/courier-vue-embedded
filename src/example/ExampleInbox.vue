<template>
  <div style="padding: 2rem">
    <div class="card" style="height: 50vh">
      <CourierInboxVue v-if="visible" :key="renderId" height="100%" :mode>
        <template v-if="showCustomHeader" #header="data">
          <ul>
            <li v-for="feed of data.feeds" :key="feed.feedId">
              {{ feed.title }}
              <ul>
                <li v-for="tab of feed.tabs">{{ tab.title }}</li>
              </ul>
            </li>
          </ul>
          <hr />
        </template>
        <template v-if="showCustomItem" #item="data"> {{ data.index }} -- {{ data.message.messageId }} </template>
        <template v-if="showCustomEmpty" #empty="data"> {{ data.datasetId }} is empty </template>
        <template v-if="showCustomLoading" #loading="data"> {{ data.datasetId }} is loading </template>
        <template v-if="showCustomPagination" #pagination="data"> {{ data.datasetId }} page is loading </template>
      </CourierInboxVue>
    </div>

    <div class="card" style="margin-top: 2rem">
      <div class="title">Settings</div>
      <hr />
      <div class="d-flex gap-2 align-center">
        <div>Controls</div>
        <button @click="emits('sign-in')">Sign In</button>
        <button @click="emits('sign-out')">Sign Out</button>
        <button @click="visible = !visible">Toggle Visibility</button>
      </div>

      <hr />

      <div class="d-flex gap-2 align-center">
        <div>Custom Slots:</div>
        <SimpleCheckbox v-model="showCustomHeader" label="Header" @update:model-value="rerender()" />
        <SimpleCheckbox v-model="showCustomItem" label="Item" @update:model-value="rerender()" />
        <SimpleCheckbox v-model="showCustomEmpty" label="Empty" @update:model-value="rerender()" />
        <SimpleCheckbox v-model="showCustomError" label="Error" @update:model-value="rerender()" />
        <SimpleCheckbox v-model="showCustomLoading" label="Loading" @update:model-value="rerender()" />
        <SimpleCheckbox v-model="showCustomPagination" label="Pagination" @update:model-value="rerender()" />
      </div>

      <hr />

      <div class="d-flex gap-2 align-center">
        <div>Mode:</div>
        <div class="selector">
          <button :class="{ selected: mode === 'light' }" @click="mode = 'light'">Light</button>
          <button :class="{ selected: mode === 'dark' }" @click="mode = 'dark'">Dark</button>
          <button :class="{ selected: mode === 'system' }" @click="mode = 'system'">System</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CourierInboxVue from '@/components/CourierInboxVue.vue';
import { ref } from 'vue';
import SimpleCheckbox from './SimpleCheckbox.vue';

type Mode = 'light' | 'dark' | 'system';

const emits = defineEmits(['sign-in', 'sign-out']);

const renderId = ref(0);

const visible = ref(true);

const showCustomHeader = ref(false);
const showCustomItem = ref(false);
const showCustomEmpty = ref(false);
const showCustomError = ref(false);
const showCustomLoading = ref(false);
const showCustomPagination = ref(false);

const mode = ref<Mode>('light');

const rerender = () => {
  renderId.value++;
};
</script>

<style scoped>
.card {
  padding: 1rem;
  border: 1px solid grey;
  min-height: 4rem;
  width: 100%;
  border-radius: 0.5rem;
  box-sizing: border-box;
}
</style>
