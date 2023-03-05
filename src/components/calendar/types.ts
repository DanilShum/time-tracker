import { EventApi, LocaleInput, PluginDef } from "@fullcalendar/core";
import { Id } from "@/service/types";

export interface headerToolbar {
  left: string;
  center: string;
  right: string;
}

export interface calendarOptions {
  plugins: PluginDef[];
  headerToolbar: headerToolbar | boolean;
  locales: LocaleInput[];
  locale: string;
  initialView: string;
  initialEvents: { id: Id; title: string; start: string }[]; // alternatively, use the `events` setting to fetch from a feed
  editable: boolean;
  selectable: boolean;
  selectMirror: boolean;
  dayMaxEvents: boolean;
  weekends: boolean;
  select: Function;
  eventClick: Function;
  eventsSet: Function;
}

export interface IData {
  calendarOptions: calendarOptions;
  currentEvents: EventApi[];
  view: string;
  title: string;
}
