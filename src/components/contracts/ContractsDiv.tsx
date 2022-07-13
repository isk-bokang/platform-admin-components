import { useEffect, useState } from "react"
import { Route, Routes, useParams } from "react-router-dom"
import { ContractApi } from "../../apis/ContractApi"
import { TargListView, TargView } from "../utils/OutputDiv"

export function ContractsRouter() {
    return (
        <Routes>
            <Route path="/" element={<ContractListDiv />} />
            <Route path="/:contractId" element={<ContractDiv />} />
            <Route path="/asd" element={<ContractDiv />} />
        </Routes>
    )
}


export function ContractListDiv() {
    const [contractList, setContractList] = useState<any[]>([])

    useEffect(() => {
        ContractApi.getContractList()
            .then(res => {
                setContractList(
                    res.data.map((item) => {
                        return {
                            id: item.id,
                            name: item.name,
                            contractType: item.contractType
                        }
                    })
                )
            })
    }, [])

    return (<div>
        {contractList.length !== 0 && <TargListView targList={contractList} />}
    </div>)

}

export function ContractDiv() {
    const { contractId } = useParams();
    const [contract, setContract] = useState<any>()

    useEffect(() => {
        if (contractId != null){
            ContractApi.getContract(contractId)
                .then(res => {
                    setContract({
                        id: res.data.id,
                        name: res.data.name,
                        contractType: res.data.contractType,
                        bytecode: res.data.bytecode,
                        abi: res.data.abi,
                    })
                })}
    }, [contractId])


    return (
    <div id="contract">
        {contract && <TargView targ={contract}/>}
    </div>)
}
