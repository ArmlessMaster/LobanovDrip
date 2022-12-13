import React from 'react'
import { Edit, ImageInput, ImageField, SimpleForm, TextInput } from 'react-admin'
const ClothesEdit = (props) =>{
    return(
       <Edit title='Edit Post'{...props}>
       <SimpleForm>
        <TextInput disabled source='id'/>
        <ImageInput source="pictures" label="Picture" multiple placeholder={<p>Drop your file here</p>}>
        <ImageField source="src" />
        </ImageInput>
            <TextInput source="name" />
            <TextInput source="color" />
            <TextInput source="type" />
            <TextInput source="price" />
            <TextInput source="sale" />
            <TextInput source="material" />
            <TextInput source="care" />
            <TextInput source="company" />
            <TextInput source="sex" />
       </SimpleForm>
       </Edit> 
    )
}
export default ClothesEdit