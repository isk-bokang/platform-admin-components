import { useEffect, useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { ChainApi } from "../../apis/ChainApi";
import { TargListView, TargView } from "../utils/OutputDiv";

export function ChainsRouter(){
    return (
        <Routes>
            <Route path="/" element={<ChainListDiv />} />
            <Route path="/:chainSeq" element={<ContractDiv />} />
           
        </Routes>
    )
}

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
        {chainList.length !== 0 && <TargListView targList={chainList} />}
    </div>)
}

export function ContractDiv() {
    const { chainSeq } = useParams();
    const [chain, setChain] = useState<any>()

    useEffect(() => {
        if (chainSeq != null){
            ChainApi.getChain(chainSeq)
                .then(res => {
                    setChain({
                        id: res.data.chainSeq,
                        chainId: res.data.chainId,
                        name: res.data.chainName,
                        rpcUrl : res.data.rpcUrl,
                    })
                })}
    }, [chainSeq])


    return (
    <div id="chain">
        {chain && <TargView targ={chain}/>}
    </div>)
}
