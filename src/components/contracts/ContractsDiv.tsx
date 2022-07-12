
import axios from "axios";
import { useEffect, useState } from "react";
import { targURL } from "../../contants/constants";
import { expressOpt, TableDiv } from "../utils/TableDiv";

export function ContractsDiv(){
    const [contractList, setContractList] = useState<any[]>([])
    const viewOption : expressOpt = {
        excludes : ["abi", "bytecode"]
    }
    useEffect( ()=>{
        axios.get(targURL + "/contracts")
        .then((value =>{
            setContractList(value.data)
        }))
    }, [] )

    return(<div>
        {contractList.length !== 0 && <TableDiv targList={contractList} opt = {viewOption}  /> }
    </div>)

}