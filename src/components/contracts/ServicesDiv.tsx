import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ServiceApi } from "../../apis/ServiceApi";
import { TargListView } from "../utils/OutputDiv";

export function ServicesRouter() {
    return (
        <Routes>
            <Route path="/" element={<ServiceListDiv />} />
        </Routes>
    )
}

interface Services {
    id: string
    name: string
    category: string
}



export function ServiceListDiv() {
    const [serviceList, setServiceList] = useState<Services[]>([])
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
            {serviceList.length !== 0 && <TargListView targList={serviceList}/>}
        </div>
    )
}
