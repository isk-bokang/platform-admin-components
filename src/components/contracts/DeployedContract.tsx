import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ChainApi } from "../../apis/ChainApi";
import { ContractApi } from "../../apis/ContractApi";
import { ContractDeployApi, DeployedContractDto } from "../../apis/ContractDeployApi";
import { ServiceApi } from "../../apis/ServiceApi";
import { RadioTargListDiv } from "../utils/InputDiv";
import { TargListView } from "../utils/OutputDiv";
import { ListViewChain } from "./ChainDiv";
import { ListViewContract } from "./ContractsDiv";
import { ListViewService } from "./ServicesDiv";

export function DeployedContractsRouter() {
    return (
        <Routes>
            <Route path="/" element={<DeployedContractListDiv />} />
            <Route path="/add" element={<ContractDeployDiv />} />
        </Routes>
    )
}

interface DeployedContracts {
    id: string
    contractName: string
    serviceName: string
    chainId: string
    address: string


}


export function DeployedContractListDiv() {
    const [deployedContractList, setDeployedContractList] = useState<DeployedContracts[]>([])

    useEffect(() => {
        ContractDeployApi.getDeployedContracts()
            .then(res => {
                setDeployedContractList(
                    res.data.map(item => {
                        return {
                            id: item.id,
                            contractName: item.contract.name,
                            serviceName: item.service.name,
                            chainId: item.chain.chainId,
                            address: item.address
                        }
                    })
                )
            })

    }, [])


    return (<div>
        {deployedContractList.length !== 0 && <TargListView targList={deployedContractList} />}
    </div>)

}

const UNKNOWN = -1

export function ContractDeployDiv() {
    const [contract, setContract] = useState<number>(UNKNOWN)
    const [service, setService] = useState<number>(UNKNOWN)
    const [chain, setChain] = useState<number>(UNKNOWN)

    return(
    <div>
        <SelectContract idSetter={setContract}/>
        <hr/>
        <SelectChain idSetter={setChain}/>
        <hr/>
        <SelectService idSetter={setService}/>
    </div>)

}

type setterProp = { idSetter: Dispatch<SetStateAction<number>> }

export function SelectContract(prop : setterProp) {
    const [contractList, setContractList] = useState<ListViewContract[]>([])
    useEffect(() => {
        ContractApi.getContractList()
            .then(res => {
                setContractList(
                    res.data.map(item => {
                        return {
                            id: item.id,
                            name: item.name,
                            contractType: item.contractType
                        }
                    })
                )
            })
    }, [])

    return (
        <div>
            {contractList.length !== 0 && <RadioTargListDiv targList={contractList} setTarg={prop.idSetter} />}
        </div>
    )
}

export function SelectChain(prop : setterProp){
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
    return (
    <div>
        {chainList.length !== 0 && <RadioTargListDiv targList={chainList} setTarg={prop.idSetter} />}
    </div>)
}

export function SelectService(prop:setterProp){
    const [serviceList, setServiceList] = useState<ListViewService[]>([])
    useEffect(() => {
        ServiceApi.getServices()
            .then(res => {
                setServiceList(
                    res.data.map(item => {
                        return {
                            id: item.id,
                            name: item.name,
                            category: item.category
                        }
                    })
                )
            })
    }, [])
    
    return (
        <div>
            {serviceList.length !== 0 && <RadioTargListDiv targList={serviceList} setTarg={prop.idSetter}/>}
        </div>
    )
}




