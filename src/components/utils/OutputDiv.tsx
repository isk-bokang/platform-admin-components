import { useEffect, useState } from "react"

type listProps = { targList: any[] }

export function TargListView(prop: listProps) {
    const [keys, setKeys] = useState<string[]>([])

    useEffect(() => {
        let tmpKeys: string[] = []
        setKeys(tmpKeys.concat(Object.keys(prop.targList[0])))
        
    }, [prop.targList])

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
                                    
                                    return(
                                        <td>
                                            <a href="#contract">{entry[1] as string}</a>
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

type targProps = {targ : any}

export function TargView(prop: targProps){
    const [keys, setKeys] = useState<string[]>([])

    useEffect(() => {
        let tmpKeys: string[] = []
        tmpKeys = tmpKeys.concat(Object.keys(prop.targ))
        setKeys(tmpKeys)
    }, [prop.targ])

    return (
        <div>
            <table>{
                keys.map(key => {
                    return (
                        <tr>
                            <th>{key}</th>
                            <td>{prop.targ[key]}</td>
                        </tr>
                )
            } )}
            </table>
        </div>
    )


}

