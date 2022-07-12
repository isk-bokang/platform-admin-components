import { useEffect, useState } from "react";
import { ChainApi } from "../../apis/ChainApi";
import { TableDiv } from "../utils/TableDiv";

export function ChainListDiv() {
    const [chainList, setChainList] = useState<any[]>([])
    useEffect(() => {
        ChainApi.getChainList()
            .then(res => {
                setChainList(
                    res.data.map((item) => {
                        return {
                            id: item.chainSeq,
                            name: item.chainName,
                            chainId: item.chainId,
                            rpcUrl: item.rpcUrl
                        }
                    })
                )
            })
    }, [])

    return (<div>
        {chainList.length !== 0 && <TableDiv targList={chainList} />}
    </div>)
}
