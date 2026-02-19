<template>
  <div>
    <div class="inbox-container" :class="inboxPlacement">
      <CourierInboxPopupMenuVue v-if="visible" :key="renderId" :popup-alignment :mode popup-width="50rem">
        <template v-if="showCustomButton" #button="data"> {{ data.totalUnreadCount }} unread </template>
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
      </CourierInboxPopupMenuVue>
    </div>
    <div style="padding: 2rem">
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
          <div>
            <div>Placement</div>
            <AlignmentSelector v-model="inboxPlacement" />
          </div>
          <div>
            <div>Alignment</div>
            <AlignmentSelector v-model="popupAlignment" />
          </div>
        </div>

        <hr />

        <div class="d-flex gap-2 align-center">
          <div>Custom Slots:</div>
          <SimpleCheckbox v-model="showCustomButton" label="Button" @update:model-value="rerender()" />
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
  </div>
</template>

<script setup lang="ts">
import CourierInboxPopupMenuVue from '@/components/CourierInboxPopupMenuVue.vue';
import { useCourierInbox } from '@/ts/useCourier';
import { onMounted, ref } from 'vue';
import AlignmentSelector from './AlignmentSelector.vue';
import SimpleCheckbox from './SimpleCheckbox.vue';

type Mode = 'light' | 'dark' | 'system';

const emits = defineEmits(['sign-in', 'sign-out']);

const { inbox, handleEvent } = useCourierInbox();
const renderId = ref(0);

const visible = ref(true);
const inboxPlacement = ref('top-left');
const popupAlignment = ref('top-left');

const showCustomButton = ref(false);
const showCustomHeader = ref(false);
const showCustomItem = ref(false);
const showCustomEmpty = ref(false);
const showCustomError = ref(false);
const showCustomLoading = ref(false);
const showCustomPagination = ref(false);

const mode = ref<Mode>('light');

handleEvent('onMessageAdd', msg => {
  console.log('[handler] on message added', msg);
});

handleEvent('onPageAdded', ds => {
  console.log('[handler] page added', ds);
});

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

.title {
  font-size: 1.25rem;
}

.inbox-container {
  position: absolute;
  width: 3rem;
  height: 3rem;
  padding-left: 0.3rem;
  padding-top: 0.3rem;
  border: 1px solid orange;
  border-radius: 100%;
  background-color: rgba(255, 166, 0, 0.123);
}

.inbox-container.top-left {
  top: 0.5rem;
  left: 0.5rem;
}

.inbox-container.top-center {
  top: 0.5rem;
  left: 50vw;
}

.inbox-container.top-right {
  top: 0.5rem;
  right: 0.5rem;
}

.inbox-container.center-left {
  top: 50vh;
  left: 0.5rem;
}

.inbox-container.center-center {
  top: 50vh;
  left: 50vw;
}

.inbox-container.center-right {
  top: 50vh;
  right: 0.5rem;
}

.inbox-container.bottom-left {
  bottom: 0.5rem;
  left: 0.5rem;
}

.inbox-container.bottom-center {
  bottom: 0.5rem;
  left: 50vw;
}

.inbox-container.bottom-right {
  bottom: 0.5rem;
  right: 0.5rem;
}

.selector button:not(.selected) {
  background-color: transparent;
}
</style>
