import { useEffect, useState } from "react"




type tableProps = { targList: any[] }


export function TableDiv(prop: tableProps) {
    const [keys, setKeys] = useState<string[]>([])

    useEffect(() => {
        let tmpKeys: string[] = []
        tmpKeys = tmpKeys.concat(Object.keys(prop.targList[0]))
        setKeys(tmpKeys)
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
