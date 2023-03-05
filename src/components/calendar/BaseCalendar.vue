<script lang="ts">
import { defineComponent, ref } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import esLocale from "@fullcalendar/core/locales/es";
import frLocale from "@fullcalendar/core/locales/fr";
import ruLocale from "@fullcalendar/core/locales/ru";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
import { DateInput, EventApi, EventClickArg } from "@fullcalendar/core";

import BaseButton from "@/components/button/BaseButton.vue";
import { IData } from "./types";

export default defineComponent({
  components: {
    BaseButton,
    FullCalendar,
  },
  setup() {
    const calendar = ref<typeof FullCalendar>(FullCalendar);

    return { calendar };
  },
  data: (vm): IData => ({
    calendarOptions: {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
      headerToolbar: false,
      locales: [esLocale, frLocale, ruLocale],
      locale: "ru",
      initialView: "dayGridMonth",
      initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      weekends: true,
      select: vm.handleDateSelect,
      eventClick: vm.handleEventClick,
      eventsSet: vm.handleEvents,
      /* you can update a remote database when these fire:
      eventAdd:
      eventChange:
      eventRemove:
      */
    },
    currentEvents: [],
    view: "dayGridMonth",
    title: "",
  }),
  mounted() {
    this.setTitle();
  },
  computed: {
    isDayView(): boolean {
      return this.view === "timeGridDay";
    },
    isListView(): boolean {
      return this.view === "listDay";
    },
  },
  methods: {
    handleDateSelect(selectInfo: DateInput | any): void {
      let title = prompt("Please enter a new title for your event");
      let calendarApi = selectInfo.view.calendar;
      calendarApi.unselect(); // clear date selection

      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
        });
      }
    },
    handleEventClick(clickInfo: EventClickArg) {
      if (
        confirm(
          `Are you sure you want to delete the event '${clickInfo.event.title}'`
        )
      ) {
        clickInfo.event.remove();
      }
    },
    handleEvents(events: EventApi[]) {
      this.currentEvents = events;
    },
    getCalendarApi() {
      return this.calendar.getApi();
    },
    goToPrevPeriod() {
      this.getCalendarApi()?.prev();
      this.setTitle();
    },
    goToNextPeriod() {
      this.getCalendarApi()?.next();
      this.setTitle();
    },
    goToday() {
      this.getCalendarApi()?.today();
      this.setTitle();
    },
    setTitle() {
      this.title = this.getCalendarApi().currentData.viewTitle;
    },
    changeView(view: string) {
      this.view = view;
      this.getCalendarApi().changeView(view);
      this.setTitle();
    },
  },
});
</script>

<template>
  <div class="box-border flex h-full flex-col p-4">
    <div class="mb-4 flex items-center justify-between">
      <base-button :text="'prev'" secondary @click="goToPrevPeriod" />
      <base-button :text="'next'" secondary @click="goToNextPeriod" />
      <base-button :text="'today'" secondary @click="goToday" />

      <div>{{ title }}</div>

      <base-button
        :text="'month'"
        secondary
        @click="changeView('dayGridMonth')"
      />
      <base-button
        :text="'week'"
        secondary
        @click="changeView('timeGridWeek')"
      />
      <base-button :text="'day'" secondary @click="changeView('timeGridDay')" />
      <base-button :text="'list'" secondary @click="changeView('listDay')" />
    </div>

    <div class="base-calendar__table flex">
      <div v-if="isDayView || isListView" class="base-calendar__left">
        <base-button :text="'создать задачу'" primary color="teal" />
      </div>
      <FullCalendar
        ref="calendar"
        class="base-calendar mx-auto my-0 h-full grow"
        :options="calendarOptions"
      >
        <template v-slot:eventContent="arg">
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
  </div>
</template>

<style lang="scss">
.base-calendar__table {
  height: calc(100% - 56px);
}
.base-calendar {
  h2 {
    margin: 0;
    font-size: 16px;
  }

  ul {
    margin: 0;
    padding: 0 0 0 1.5em;
  }

  li {
    margin: 1.5em 0;
    padding: 0;
  }

  b {
    margin-right: 3px;
  }

  .fc-h-event,
  .fc-v-event,
  .fc-event-main {
    background-color: rgba($teal, 0.3);
    border-color: $teal;
  }

  .fc-view:not(.fc-timeGridDay-view) {
    .fc-day-today {
      background-color: rgba($teal, 0.05);
    }
  }

  .fc-timeGridDay-view {
    .fc-day-today {
      background-color: transparent;
    }
  }
}
</style>
