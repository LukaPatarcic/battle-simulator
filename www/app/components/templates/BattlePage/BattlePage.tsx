import {DataGrid} from "@mui/x-data-grid";
import {FC} from "react";
import {columns} from "@template/HomePage/columns";
import {Battle} from "../../../types/api";

interface Props {
    battle: Battle;
}

const BattlePage: FC<Props> = ({ battle }) => {
    return <div>{JSON.stringify(battle)}</div>
}

export default BattlePage;
