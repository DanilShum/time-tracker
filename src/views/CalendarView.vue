<script lang="ts">
import { defineComponent } from "vue";
import BaseCalendar from "@/components/calendar/BaseCalendar.vue";
import BaseModal from "@/components/modal/Modal.vue";

export default defineComponent({
  name: "CalendarView",
  components: { BaseModal, BaseCalendar },
  data: () => ({
    showModal: false,
  }),
});
</script>

<template>
  <div class="h-screen overflow-hidden">
    <base-calendar @select="showModal = true" />
    <base-modal v-model="showModal" />
  </div>
</template>
