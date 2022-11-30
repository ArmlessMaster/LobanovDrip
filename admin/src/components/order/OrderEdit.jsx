import React from "react";
import { Edit, SimpleForm, TextInput } from "react-admin";
import { usePermissions } from "react-admin";
const OrderEdit = (props) => {
  const { permissions } = usePermissions();
  return permissions === "Admin" ? (
    <Edit {...props} undoable="false" mutationMode="pessimistic">
      <SimpleForm>
        <TextInput fullWidth disabled source="id" />
        <TextInput fullWidth source="status" />
        <TextInput fullWidth source="invoice" />
      </SimpleForm>
    </Edit>
  ) : (
    <div>No access</div>
  );
};
export default OrderEdit;
