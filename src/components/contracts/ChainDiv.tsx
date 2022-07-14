import { useEffect, useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { ChainApi } from "../../apis/ChainApi";
import { TargListView, TargView } from "../utils/OutputDiv";

export function ChainsRouter(){
    return (
        <Routes>
            <Route path="/" element={<ChainListDiv />} />
            <Route path="/:chainSeq" element={<ChainDiv />} />
           
        </Routes>
    )
}

export interface ListViewChain {
    id: string
    name: string
    chainId: string
    rpcUrl: string
}

export function ChainListDiv() {
    const [chainList, setChainList] = useState<ListViewChain[]>([])
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

export function ChainDiv() {
    const { chainSeq } = useParams();
    const [chain, setChain] = useState<ListViewChain>()

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

export function ChainByPropDiv(prop : {chainSeq : string}) {
    const [chain, setChain] = useState<ListViewChain>()

    useEffect(() => {
        if (prop.chainSeq != null){
            ChainApi.getChain(prop.chainSeq)
                .then(res => {
                    setChain({
                        id: res.data.chainSeq,
                        chainId: res.data.chainId,
                        name: res.data.chainName,
                        rpcUrl : res.data.rpcUrl,
                    })
                })}
    }, [prop.chainSeq])


    return (
    <div id="chain">
        {chain && <TargView targ={chain}/>}
    </div>)
}
