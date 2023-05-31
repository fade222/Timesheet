import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import {
  text,
  relationship,
  password,
  timestamp,
  select,
  integer,
  calendarDay,
  checkbox,
} from "@keystone-6/core/fields";
import type { Lists } from ".keystone/types";
import {
  Boolean,
  ID,
} from "@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema";

export const lists: Lists = {
  Admin: list({
    access: allowAll,
    fields: {
      isSystemAdmin: checkbox(),
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: "unique",
      }),
      password: password({ validation: { isRequired: true } }),
      createdAt: timestamp({
        defaultValue: { kind: "now" },
      }),
    },
  }),

  TimeSheet: list({
    access: allowAll,
    fields: {
      labourTime: integer(),
      jobNumbers: relationship({ ref: "JobNumber", many: true }),
      employee: relationship({ ref: "Employee.timeSheets" }),
      description: text(),
      costCodes: relationship({ ref: "CostCode", many: true }),
      submitStatus: select({
        options: [
          { label: "open", value: "open" },
          { label: "closed", value: "closed" },
        ],
      }),
      timeSheetDate: calendarDay({
        isIndexed: "unique",
      }),
    },
  }),

  Employee: list({
    access: allowAll,
    fields: {
      firstName: text({ validation: { isRequired: true } }),
      LastName: text({ validation: { isRequired: true } }),
      password: text({ validation: { isRequired: true } }),
      isAdmin: checkbox(),
      timeSheets: relationship({ ref: "TimeSheet.employee", many: true }),
    },
  }),

  CostCode: list({
    access: allowAll,
    fields: {
      productionCode: text(),
      productionCodeDescription: text(),
    },
  }),

  JobNumber: list({
    access: allowAll,
    fields: {
      jobNumber: text(),
    },
  }),

  TimeClock: list({
    access: allowAll,
    fields: {
      timeStamp: timestamp(),
      timeIn: text(),
      timeOut: text(),
    },
    ui: {
      isHidden: true,
    },
  }),
};
