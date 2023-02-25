<template>
  <div class="calendar">
    <base-calendar />
  </div>
</template>

<script>
import BaseCalendar from "@/components/calendar/BaseCalendar";
export default {
  name: "CalendarView",
  components: { BaseCalendar },
};
</script>

<style lang="scss">
.calendar {
  height: 100vh;
  overflow: hidden;
}
</style>
