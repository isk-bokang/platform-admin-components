import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ServiceApi } from "../../apis/ServiceApi";
import { TargListView, TargView } from "../utils/OutputDiv";

export function ServicesRouter() {
    return (
        <Routes>
            <Route path="/" element={<ServiceListDiv />} />
        </Routes>
    )
}

export interface ListViewService {
    id: string
    name: string
    category: string
}



export function ServiceListDiv() {
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
            {serviceList.length !== 0 && <TargListView targList={serviceList}/>}
        </div>
    )
}

export function ServiceByPropDiv(prop : {serviceId : string}){
    const [service, setService] = useState<ListViewService>()
    useEffect( ()=>{
        ServiceApi.getService(prop.serviceId)
        .then(res =>{
            setService({
                id: res.data.id,
                name: res.data.name,
                category: res.data.category
            })
        })
    }, [prop.serviceId] )

    return(
        <div>
            {service && <TargView targ={service}/>}
        </div>
    )
}
