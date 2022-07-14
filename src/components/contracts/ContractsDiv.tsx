import { useEffect, useState } from "react"
import { Route, Routes, useParams } from "react-router-dom"
import { ContractApi, GetContractDto, PostContractDto } from "../../apis/ContractApi"
import { InputTargDiv } from "../utils/InputDiv"
import { TargListView, TargView } from "../utils/OutputDiv"

export function ContractsRouter() {
    return (
        <Routes>
            <Route path="/" element={<ContractListDiv />} />
            <Route path="/:contractId" element={<ContractDiv />} />
            <Route path="/add" element={<ContractRegisterDiv />} />
        </Routes>
    )
}

export interface ListViewContract {
    id : string
    name : string
    contractType : string
}

export function ContractListDiv() {
    const [contractList, setContractList] = useState<ListViewContract[]>([])

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
    const [contract, setContract] = useState<GetContractDto>()

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

export function ContractByPropDiv(prop : {contractId : string}) {

    const [contract, setContract] = useState<any>()

    useEffect(() => {
        if (prop.contractId != null){
            ContractApi.getContract(prop.contractId)
                .then(res => {
                    setContract({
                        id: res.data.id,
                        name: res.data.name,
                        contractType: res.data.contractType
                    })
                })}
    }, [prop.contractId])


    return (
    <div id="contract">
        {contract && <TargView targ={contract}/>}
    </div>)
}

export function ContractRegisterDiv(){
    const [postContract , setPostContract] = useState<PostContractDto>(new PostContractDto())
    function onClickRegisterHandle(){
        ContractApi.postContract(postContract)
        .then(res =>{
            window.location.href = `${res.data.id}`
        })
    }

    return(
        <div>
            { <InputTargDiv targ={postContract} setTarg={setPostContract}/>}
            { <button onClick={onClickRegisterHandle}> Register </button>}
        </div>
    )

}

