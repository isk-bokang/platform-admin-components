import axios from "axios";


const targURL = "http://localhost:8090"

class GetContractDto {
    readonly id: string;
    readonly name: string;
    readonly contractType: string;
    readonly abi: string;
    readonly bytecode: string;

    constructor(
        id: string,
        name: string,
        contractType: string,
        abi: string,
        bytecode: string,
    ) {
        this.id = id
        this.name = name
        this.contractType = contractType
        this.abi = abi
        this.bytecode = bytecode
    }
}

export class ContractApi {
    static getContractList() {
        return axios.get<GetContractDto[]>(`${targURL}/contracts`)
    }
    static getContract(contractId : string){
        return axios.get<GetContractDto>(`${targURL}/contracts/${contractId}`)
    }
}

