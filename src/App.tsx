import {
    Route,
    Routes,
    useLocation
} from "react-router-dom";
import {Mixer} from "./pages/Mixer.tsx";
import {PeselChecker} from "./pages/PeselChecker.tsx";
import {ApiLab} from "./pages/ApiLab.tsx";
import {
    QueryClient,
    QueryClientProvider
} from "@tanstack/react-query";

function App() {
    const location = useLocation();
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>

            <Routes location={location}>
                <Route path="/" element={<Mixer/>}/>
                    <Route path="/api-lab" element={<ApiLab/>}/>
                <Route path="/pesel-checker" element={<PeselChecker/>}/>
            </Routes>
        </QueryClientProvider>
    )
}

export default App
