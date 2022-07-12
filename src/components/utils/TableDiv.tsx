import { useEffect, useState } from "react"



export type expressOpt = { excludes?: string[] }
type tableProps = { targList: any[], opt?: expressOpt }


export function TableDiv(prop: tableProps) {
    const [keys, setKeys] = useState<string[]>([])

    useEffect(() => {
        let tmpKeys: string[] = []

        tmpKeys = tmpKeys.concat(Object.keys(prop.targList[0]))
        console.log(tmpKeys)
        if (prop.opt?.excludes) {
            tmpKeys = tmpKeys.filter((val) => {
                if (!prop.opt?.excludes?.includes(val))
                    return val
            })
        }
        setKeys(tmpKeys)
        console.log("ret", tmpKeys)
    }, [])

    return (
        <div>
            <table>
                <thead>
                    {
                        keys.map(key => {
                            return (<th> {key} </th>)
                        })
                    }
                </thead>
                <tbody>
                    {
                        prop.targList.map( (val)=>{
                            return <tr>
                                {Object.entries(val).map((entry) =>{
                                    
                                    if(keys.includes(entry[0]))
                                    return(
                                        <td>
                                            {entry[1] as string}
                                        </td>
                                    )
                                })}
                            </tr>
                        } )
                    }

                </tbody>

            </table>
        </div>
    )

}
