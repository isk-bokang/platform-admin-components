import axios from "axios";


const targURL = "http://localhost:8090"

class GetChainDto {
    readonly id: string;
    readonly name: string;
    readonly chainId: string;
    readonly rpcUrl: string;

    constructor(
        id: string,
        name: string,
        chainId: string,
        rpcUrl: string
    ) {
        this.id = id
        this.name = name
        this.chainId = chainId
        this.rpcUrl = rpcUrl
    }
}

export class ChainApi {
    static getChainList() {
        return axios.get<GetChainDto[]>(`${targURL}/chains`)
    }
}
