import { useEffect, useState } from "react"
import { ContractApi } from "../../apis/ContractApi"
import { TableDiv } from "../utils/TableDiv"

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
        {contractList.length !== 0 && <TableDiv targList={contractList} />}
    </div>)

}
