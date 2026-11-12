import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home.tsx";
import Search from "./pages/Search.tsx";
import Detail from "./pages/Detail.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/search"} element={<Search />} />
                <Route path={`/detail/:id`} element={<Detail />} />
            </Routes>
        </BrowserRouter>
    )
}
export default App;