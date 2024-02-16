[![Courier: Your Complete Communication Stack](https://marketing-assets-public.s3.us-west-1.amazonaws.com/github_nodejs.png)](https://courier.com)

<a href="https://www.npmjs.com/package/courier-vue-embedded"><img src="https://img.shields.io/npm/v/courier-vue-embedded.svg?sanitize=true" alt="Version"></a>

This is the unofficial vue Toast/Inbox wrapper for [@trycourier/courier](https://github.com/trycourier/courier-node)

## Installation (via [npm](https://www.npmjs.com/package/ArcticGizmo/courier-vue-embedded))

```bash
npm install courier-vue-embedded
```

### Requirements

You will need to get a Courier API key to get started. You can sign up and create one for free at
[courier.com](https://courier.com).

### Getting Started

#### Configuration

At run time, configure Courier and listen to messages for a user

```ts
import { Courier } from 'courier-vue-embedded';

Courier.init({
  clientKey: '{{your_client_key}}',
  userId: '{{user_id}}'
});
```

#### Import Components

Import the Inbox/Toast components and you are ready to go. Here we are importing it in `src/App.vue`

```html
<template>
  <div id="app">
    <CourierToastVue />
    <CourierInboxVue />
  </div>
</template>

<script setup lang="ts">
  import { CourierToastVue, CourierInboxVue } from 'courier-vue-embedded';
</script>

<style scoped>
  /* If you would like to have a right-floating inbox */
  courier-inbox {
    position: fixed;
    z-index: 1000;
    right: 2rem;
    top: 1rem;
  }
</style>
```

NB: the toast component can be imported anywhere

## Versions

To maintain some semblance of reason, here is how courier-vue-embedded versions map to courier component versions

| courier-vue-embedded | courier components |
| -------------------- | ------------------ |
| 1.X                  | 3.Y                |
| 4.Y.Z\*              | 4.Y.Z              |

(\*patch version may differ if there are any bugs found within this wrapper package)

### Vue 2.7 support
if you are still looking for support for a vue 2.7 project, please use version < 4.5.0
