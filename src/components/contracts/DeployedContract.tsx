import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ChainApi } from "../../apis/ChainApi";
import { Abi, ContractApi, GetContractDto } from "../../apis/ContractApi";
import { ContractDeployApi, DeployedContractDto } from "../../apis/ContractDeployApi";
import { ServiceApi } from "../../apis/ServiceApi";
import { RadioTargListDiv } from "../utils/InputDiv";
import { TargListView } from "../utils/OutputDiv";
import { ChainByPropDiv, ListViewChain } from "./ChainDiv";
import { ContractByPropDiv, ContractDiv, ListViewContract } from "./ContractsDiv";
import { ListViewService, ServiceByPropDiv } from "./ServicesDiv";

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

enum STEPS {
    SELECT_TARGETS,
    SET_CONSTRUCTOR_PARAMS,
    DEPLOY
}

const UNKNOWN = -1

export function ContractDeployDiv() {

    const [contractId, setContractId] = useState<string>('')
    const [serviceId, setServiceId] = useState<string>('')
    const [chainId, setChainId] = useState<string>('')
    const [curStep, setCurStep] = useState<STEPS>(STEPS.SELECT_TARGETS)
    const [paramList, setParamList] = useState<string[]>([])
    function onClickNextStepHandle() {
        if (curStep === STEPS.SELECT_TARGETS) {
            if (contractId === '' || serviceId === '' || chainId === '') {
                alert(" SELECT ITEM FIRST ")
            }
            else {
                setCurStep(STEPS.SET_CONSTRUCTOR_PARAMS)
            }
        }
        else if (curStep === STEPS.SET_CONSTRUCTOR_PARAMS) {
            setCurStep(STEPS.DEPLOY)
            setParamList(paramList.map(item => {
                if (item == null || item === '') return '0x'
                else return item
            }))
        }
    }

    function onClickDeployHandle(){
        ContractDeployApi.deployContract({
            serviceId : serviceId,
            contractId : contractId,
            chainSeq : chainId, 
            deployParams : paramList
        })
        .then(()=>{
            alert('DEPLOY DONE')
            window.location.href = "/deployed"
        })
        .catch(err =>{
            alert("FATAL ERROR : DEPLOY FAIL")
            console.error(err)
        })
    }


    return (
        <div>
            {curStep === STEPS.SELECT_TARGETS && <SelectTargets serviceSetter={setServiceId} chainSetter={setChainId} contractSetter={setContractId} />}
            {curStep === STEPS.SET_CONSTRUCTOR_PARAMS && <SetConstructorParams contractId={contractId} params={paramList} paramSetter={setParamList} />}
            
            {curStep !== STEPS.DEPLOY && <button onClick={onClickNextStepHandle}> NEXT STEP </button>}
            {curStep !== STEPS.DEPLOY && <hr />}
            {(curStep > STEPS.SELECT_TARGETS) && <ChainByPropDiv chainSeq={chainId}/>}
            {(curStep > STEPS.SELECT_TARGETS) && <ServiceByPropDiv serviceId={serviceId}/>}
            {(curStep > STEPS.SELECT_TARGETS) && <ContractByPropDiv contractId={contractId}/>}
            {(curStep > STEPS.SET_CONSTRUCTOR_PARAMS) && <GetConstructorParams contractId={contractId} params={paramList} />}
            {curStep === STEPS.DEPLOY && <button onClick={onClickDeployHandle}> DEPLOY </button>}


        </div>)
}


type GetConstructorParamsProp = { contractId: string, params: string[] }
function GetConstructorParams(prop: GetConstructorParamsProp) {
    const [constructorAbi, setConstructorAbi] = useState<Abi>()
    useEffect(() => {
        ContractApi.getContract(prop.contractId)
            .then(res => {
                try {
                    const abi = JSON.parse(res.data.abi)
                    setConstructorAbi(abi.filter((item: Abi) => {
                        return item.type === "constructor"
                    })[0])

                }
                catch {
                    alert("WARN : Check ABI Format")
                    console.error(res.data.abi)
                    window.location.href = "/deployed/add"
                }
            })
    }, [prop.contractId])
    return (
        <>
            <table>
                {constructorAbi?.inputs.map((item, idx) => {
                    return (
                        <tr id={item.name} key={item.name}>
                            <td> {item.name} </td>
                            <td> {prop.params[idx]} </td>
                        </tr>
                    )
                })}
            </table>
        </>
    )
}



type SetConstructorParamsProp = { contractId: string, params: string[], paramSetter: Dispatch<SetStateAction<string[]>> }

function SetConstructorParams(prop: SetConstructorParamsProp) {
    const [constructorAbi, setConstructorAbi] = useState<Abi>()
    useEffect(() => {
        ContractApi.getContract(prop.contractId)
            .then(res => {
                try {
                    const abi = JSON.parse(res.data.abi)
                    setConstructorAbi(abi.filter((item: Abi) => {
                        return item.type === "constructor"
                    })[0])

                }
                catch {
                    alert("WARN : Check ABI Format")
                    console.error(res.data.abi)
                    window.location.href = "/deployed/add"
                }
            })
    }, [prop.contractId])

    function onChangeHandle(e: React.ChangeEvent<HTMLInputElement>) {
        prop.params[parseInt(e.target.id)] = e.target.value
        prop.paramSetter(prop.params)
    }
    return (
        <>
            <table>
                {constructorAbi?.inputs.map((item, idx) => {
                    return (
                        <tr id={item.name} key={item.name}>
                            <td> {item.name} </td>
                            <td>
                                {item.type.includes('int') && <input id={`${idx}`} type={"number"} onChange={onChangeHandle} />}
                                {item.type.includes('address') && <input id={`${idx}`} type={"text"} onChange={onChangeHandle} />}
                                {item.type.includes('data') && <input id={`${idx}`} type={"text"} onChange={onChangeHandle} />}
                            </td>
                        </tr>
                    )
                })}
            </table>
        </>
    )
}




type settersProp = { serviceSetter: Dispatch<SetStateAction<string>>, chainSetter: Dispatch<SetStateAction<string>>, contractSetter: Dispatch<SetStateAction<string>> }

function SelectTargets(prop: settersProp) {
    return (
        <>
            <SelectService idSetter={prop.serviceSetter} />
            <hr />
            <SelectChain idSetter={prop.chainSetter} />
            <hr />
            <SelectContract idSetter={prop.contractSetter} />
        </>
    )
}


type setterProp = { idSetter: Dispatch<SetStateAction<string>> }

export function SelectContract(prop: setterProp) {
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

export function SelectChain(prop: setterProp) {
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

export function SelectService(prop: setterProp) {
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
            {serviceList.length !== 0 && <RadioTargListDiv targList={serviceList} setTarg={prop.idSetter} />}
        </div>
    )
}




