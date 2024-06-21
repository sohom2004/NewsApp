import { Routes, Route} from "react-router-dom";
import HomePage from "./components/homePage/HomePage";
import Article from "./components/article/Article";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/article/:title" element={<Article/>}/>
      </Routes>
    </div>
  );
}

export default App;
