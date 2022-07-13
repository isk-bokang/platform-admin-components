import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ContractDeployApi, DeployedContractDto } from "../../apis/ContractDeployApi";
import { TargListView } from "../utils/OutputDiv";

export function DeployedContractsRouter() {
    return (
        <Routes>
            <Route path="/" element={<DeployedContractListDiv />} />
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
        .then(res =>{
            setDeployedContractList(
                res.data.map(item =>{
                    return{
                        id : item.id,
                        contractName : item.contract.name,
                        serviceName : item.service.name,
                        chainId : item.chain.chainId,
                        address : item.address
                    }
                })
            )
        })

    }, [])


    return (<div>
        {deployedContractList.length !== 0 && <TargListView targList={deployedContractList} />}
    </div>)

}
