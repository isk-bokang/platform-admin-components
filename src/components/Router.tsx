
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContractListDiv, ContractsRouter } from "./contracts/ContractsDiv";

export function Router() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/contracts/*" element={<ContractsRouter />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

