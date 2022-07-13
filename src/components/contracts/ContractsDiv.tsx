import { useEffect, useState } from "react"
import { ContractApi } from "../../apis/ContractApi"
import { TargListView } from "../utils/OutputDiv"

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

export function ContractDiv(){


    return(<div id="contract">
        <p>asdasd</p>
    </div>)
}
