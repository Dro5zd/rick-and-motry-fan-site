import {Loader} from "./components/Loader/Loader";
import {createContext, useState} from "react";
import Routing from "./routes/Routes";

export const IsLoadingContext = createContext({});

function App() {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <>
            <IsLoadingContext.Provider value={{setIsLoading}}>
                {isLoading && <Loader/>}
                <Routing/>
            </IsLoadingContext.Provider>
        </>
    );
}

export default App;
