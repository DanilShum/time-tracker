<script>
import BaseCalendar from "@/components/calendar/BaseCalendar";
export default {
  name: "CalendarView",
  components: { BaseCalendar },
};
</script>

<template>
  <div class="h-screen overflow-hidden">
    <base-calendar />
  </div>
</template>
