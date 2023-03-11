import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import CharacterPage from "./pages/CharacterPage/CharacterPage";
import {Loader} from "./components/Loader/Loader";
import {createContext, useState} from "react";

    export const IsLoadingContext = createContext({
        setIsLoading: () => {
        }
    });
function App() {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <>
            <IsLoadingContext.Provider value={{setIsLoading}}>
            <Loader isLoading={isLoading} />
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/character/:id" element={<CharacterPage/>}/>
            </Routes>
            </IsLoadingContext.Provider>
        </>
    );
}

export default App;
