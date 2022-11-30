import React from "react";
import { Edit, SimpleForm, TextInput, SelectInput, required } from "react-admin";
import { usePermissions } from "react-admin";
const OrderEdit = (props) => {
  const { permissions } = usePermissions();
  return permissions === "Admin" ? (
    <Edit {...props} undoable="false" mutationMode="pessimistic">
      <SimpleForm>
        <TextInput fullWidth disabled source="id" />
        <SelectInput
            source="status"
            validate={required()}
            choices={[
              { id: "cart", name: "cart" },
              { id: "processing", name: "processing" },
              { id: "road", name: "road" },
              { id: "waiting", name: "waiting" },
              { id: "cancellation", name: "cancellation" },
              { id: "completed", name: "completed" },
            ]}
          />
        <TextInput fullWidth source="invoice" />
      </SimpleForm>
    </Edit>
  ) : (
    <div>No access</div>
  );
};
export default OrderEdit;
