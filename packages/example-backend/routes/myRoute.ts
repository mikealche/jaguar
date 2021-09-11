import { pipe, Yup } from "@jaguar/core";

const Schema = new Yup.ObjectSchema({
  name: Yup.string(),
});

export default pipe(Schema, ({ name }) => {
  return `Hello ${name}`;
});
