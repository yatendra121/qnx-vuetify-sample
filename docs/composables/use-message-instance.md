# useMessageInstance

Singleton composable for displaying toast/snackbar notifications from anywhere in the app.

> **Prerequisite:** Place `<MessageQueue />` once in your root `App.vue` for messages to render.

## Returns

| Method | Signature | Description |
|--------|-----------|-------------|
| `success` | `(message: string) => void` | Shows a green success snackbar |
| `warning` | `(message: string) => void` | Shows a yellow warning snackbar |
| `error` | `(message: string) => void` | Shows a red error snackbar |

## Setup

```vue
<!-- App.vue -->
<script setup>
import { MessageQueue } from "@qnx/vuetify";
</script>

<template>
  <v-app>
    <MessageQueue />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
```

## Basic Usage

```typescript
import { useMessageInstance } from "@qnx/vuetify";

const message = useMessageInstance();

message.success("User created successfully!");
message.warning("This action cannot be undone.");
message.error("Failed to connect. Please try again.");
```

## After Form Submission

```vue
<script setup>
import { VqForm, VqTextField, VqSubmitBtn, useMessageInstance } from "@qnx/vuetify";

const message = useMessageInstance();
</script>

<template>
  <VqForm
    id="create-user"
    action="users/create"
    @submited-success="() => message.success('User created!')"
    @submited-error="() => message.error('Failed to create user.')"
  >
    <VqTextField name="name" label="Name" />
    <VqSubmitBtn>Create</VqSubmitBtn>
  </VqForm>
</template>
```

## After API Call

```vue
<script setup>
import { useMessageInstance, useFormFilterRepository } from "@qnx/vuetify";
import axios from "axios";

const message = useMessageInstance();
const { reload } = useFormFilterRepository("users_filter");

const exportData = async () => {
  try {
    await axios.post("users/export");
    message.success("Export started! You will receive an email shortly.");
  } catch {
    message.error("Export failed. Please try again.");
  }
};
</script>

<template>
  <v-btn @click="exportData" prepend-icon="mdi-export">Export Users</v-btn>
</template>
```
