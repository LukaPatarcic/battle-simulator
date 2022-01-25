import {GridColumns} from "@mui/x-data-grid";

export const columns: GridColumns = [
    { field: 'id', headerName: '#', width: 70 },
    { field: 'title', headerName: 'Title', width: 130 },
    {
        field: 'armies',
        headerName: 'Armies',
        // valueGetter: (params) =>
        //     `${params.getValue(params.id, 'firstName') || ''} ${
        //         params.getValue(params.id, 'lastName') || ''
        //     }`,
    },
];
