
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChainsRouter } from "./contracts/ChainDiv";
import { ContractListDiv, ContractsRouter } from "./contracts/ContractsDiv";
import { DeployedContractsRouter } from "./contracts/DeployedContract";
import { ServicesRouter } from "./contracts/ServicesDiv";

export function Router() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/contracts/*" element={<ContractsRouter />} />
                    <Route path="/chains/*" element={<ChainsRouter />} />
                    <Route path="/deployed/*" element={<DeployedContractsRouter/>}/>
                    <Route path="/services/*" element={<ServicesRouter/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

