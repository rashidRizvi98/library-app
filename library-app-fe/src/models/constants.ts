import { FormField, InputType } from "./form";

export const createAuthorformFields: FormField[] = [
    {
      key: "firstName",
      label: "Enter the First name",
      type: InputType.TEXT
    },
    {
      key: "lastName",
      label: "Enter the Last name",
      type: InputType.TEXT
    }
];

export const createBookformFields: FormField[] = [
  {
    key: "name",
    label: "Enter the name",
    type: InputType.TEXT
  },
  {
    key: "isbn",
    label: "Enter the Isbn",
    type: InputType.TEXT
  },
  {
    key: "author",
    label: "Select author",
    type: InputType.DROPDOWN
  }
];