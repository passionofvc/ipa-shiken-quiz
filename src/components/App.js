import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import Home from "./Home";
import Quiz from "./Quiz";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/"   element={<Home />} />
                <Route path="/Quiz" element={<Quiz />} />
            </Routes>
        </Router>
    );
}
export default App;