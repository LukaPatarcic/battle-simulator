import type {NextPage} from 'next'
import Default from "@layout/Default/Default";
import CreateBattlePage from "@template/BattlePage/CreateBattlePage";

const CreateBattles: NextPage = () => {
    return <Default>
        <CreateBattlePage  />
    </Default>
}



export default CreateBattles;
