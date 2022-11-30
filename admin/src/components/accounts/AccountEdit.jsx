import React from "react";
import { Edit, SimpleForm, TextInput, SelectInput, required } from "react-admin";
import { usePermissions } from "react-admin";
const AccountEdit = (props) => {
  const { permissions } = usePermissions();
  return permissions === "Admin" ? (
    <Edit {...props} undoable="false" mutationMode="pessimistic">
      <SimpleForm>
        <TextInput fullWidth disabled source="id" />
        <TextInput fullWidth disabled source="email" />
        <SelectInput
            source="role"
            validate={required()}
            choices={[
              { id: "Admin", name: "Admin" },
              { id: "User", name: "User" },
            ]}
          />
      </SimpleForm>
    </Edit>
  ) : (
    <div>No access</div>
  );
};
export default AccountEdit;
