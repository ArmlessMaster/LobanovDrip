import { useRecordContext } from "react-admin"
import { List, Datagrid, TextField, WrapperField, EditButton, TextInput, ImageInput, ImageField } from "react-admin";
import { ShowButton, DeleteButton } from 'react-admin';


const postFilters = [
    <TextInput source="q" label="Search" alwaysOn />,
];

export const ClothestList = () => (
    <List filters={postFilters}>
        <Datagrid>
            <TextField source="id" />
            <ImageField label="Picture" source="src" title="title" sx={{ '& img': { maxWidth: 50, maxHeight: 50, objectFit: 'contain' } }} />
            <TextField source="name" />
            <TextField source="color" />
            <TextField source="type" />
            <TextField source="price" />
            <TextField source="sale" />
            <TextField source="material" />
            <TextField source="care" />
            <TextField source="company" />
            <TextField source="sex" />
            <EditButton />
            <DeleteButton />;
        </Datagrid>
    </List>
);