import {DataGrid} from "@mui/x-data-grid";
import {FC} from "react";
import {columns} from "@template/HomePage/columns";
import {useRouter} from "next/router";

interface Props {
    rows: any;
}

const HomePage: FC<Props> = ({ rows }) => {
    const router = useRouter();
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                onRowClick={(row) => router.push(`/battles/${row.id}`)}
                onCellClick={console.log}
                pagination={undefined}
            />
        </div>
    )
}

export default HomePage;
