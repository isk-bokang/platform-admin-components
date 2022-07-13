import React, { Dispatch, SetStateAction, useEffect, useState } from "react";




type targProps = { targ: any, setTarg: Dispatch<SetStateAction<any>> }

export function InputTargDiv(prop: targProps) {
    const [keys, setKeys] = useState<string[]>([])

    useEffect(() => {
        let tmpKeys: string[] = []
        tmpKeys = tmpKeys.concat(Object.keys(prop.targ))
        setKeys(tmpKeys)
    }, [prop.targ])

    function onChangeHandle(e: React.ChangeEvent<HTMLTextAreaElement>) {
        prop.targ[e.target.id] = e.target.value
        prop.setTarg( prop.targ )
    }

    return (
        <div>
            <table border={1} style={{ alignItems: "left" }}  >
                <tbody>
                    {
                        keys.map(key => {
                            return (
                                <tr key = {key+'_tr'}>
                                    <th id={key + '_th'}>{key}</th>
                                    <td id={key + 'td'} key={key + 'td'}> <textarea id={key}  onChange={onChangeHandle} /> </td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        </div>
    )

}