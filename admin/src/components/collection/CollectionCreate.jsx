import * as React from "react";
import {
  Create,
  FormTab,
  TabbedForm,
  TextInput,
  required,
  ImageInput,
  ImageField,
} from "react-admin";

const CollectionCreate = () => {
  return (
    <Create >
      <TabbedForm>
        <FormTab label="collection create" sx={{ maxWidth: "40em" }}>
          <TextInput autoFocus source="name" fullWidth validate={required()} />
          <TextInput source="description" fullWidth validate={required()} />
          <ImageInput multiple={true} source="pictures" accept="image/*" validate={required()}>
            <ImageField source="src" title="title" />
          </ImageInput>
        </FormTab>
      </TabbedForm>
    </Create>
  );
};

export default CollectionCreate;
