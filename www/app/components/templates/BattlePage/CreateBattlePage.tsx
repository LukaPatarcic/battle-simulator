import {DataGrid} from "@mui/x-data-grid";
import {FC, useState} from "react";
import {columns} from "@template/HomePage/columns";
import {Battle} from "../../../types/api";
import {TextField} from "@mui/material";
import useForm from "@hook/useForm";
import { createBattle } from "api/battles";
import Button from "@mui/material/Button";

const BattlePage: FC = () => {
    const [loading, setLoading] = useState(false);
    const { getFieldProps, getFormProps, isFormValid, errors }= useForm({
        fields: {
            title: {
                isRequired: 'Please enter a title',
                isMaxLength: {
                    message: 'Max length is 100 characters',
                    length: 100,
                },
            },
        },
        onSubmit: async (context) => {
            if (context.isFormValid) {
                const { title } = context?.values || {};

                setLoading(true);
                createBattle({ title }).then(() => {
                    alert('success')
                }).catch(() => {
                    alert('error')
                }).finally(() => {
                    setLoading(false);
                })
            }
        },
        showErrors: 'blur',
    })
    return <div>
        <form {...getFormProps()}>
            <TextField
                hiddenLabel
                {...getFieldProps('title')}
                id="filled-hidden-label-normal"
                defaultValue="Normal"
                variant="filled"
            />
            <Button type="submit" title="Submit" />
        </form>

    </div>
}

export default BattlePage;
