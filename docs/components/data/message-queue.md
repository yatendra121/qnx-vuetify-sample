# MessageQueue

Root-level component that renders queued snackbar notifications. Place it once in your app layout — notifications are triggered from anywhere using `useMessageInstance()`.

## Props

None.

## Features

- Reads messages from `useMessageStore` (Pinia)
- Renders `VSnackbarQueue` with a 2.5 second timeout
- Auto-removes messages after they are displayed
- Color-coded: `success` (green), `warning` (yellow), `error` (red)

## Setup

Place `MessageQueue` once in your root layout file:

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

## Triggering Notifications

Use `useMessageInstance()` from any component or composable:

```typescript
import { useMessageInstance } from "@qnx/vuetify";

const message = useMessageInstance();

// Green success message
message.success("User created successfully!");

// Yellow warning message
message.warning("Your session will expire in 5 minutes.");

// Red error message
message.error("Failed to save changes. Please try again.");
```

## Example — After Form Submission

```vue
<script setup>
import { VqForm, VqTextField, VqSubmitBtn, useMessageInstance } from "@qnx/vuetify";

const message = useMessageInstance();

const onSuccess = () => {
  message.success("Profile updated successfully!");
};

const onError = () => {
  message.error("Failed to update profile.");
};
</script>

<template>
  <VqForm
    id="profile"
    action="profile/update"
    method="PUT"
    @submited-success="onSuccess"
    @submited-error="onError"
  >
    <VqTextField name="name" label="Name" />
    <VqSubmitBtn>Save</VqSubmitBtn>
  </VqForm>
</template>
```

## Example — After Table Row Action

```vue
<script setup>
import { useMessageInstance, useFormFilterRepository } from "@qnx/vuetify";

const message = useMessageInstance();
const { reload } = useFormFilterRepository("users_filter");

const deleteUser = async (id) => {
  try {
    await axios.delete(`users/${id}`);
    message.success("User deleted.");
    reload();
  } catch {
    message.error("Could not delete user.");
  }
};
</script>
```
