import "./App.css";
import Header from "./components/Header/Header";
import LoginPage from "./components/screens/LoginPage/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Blogs from "./components/screens/MyBlogs/Blogs";
import LoginScreen from "./components/LoginScreen/LoginScreen";
import RegisterScreen from "./components/RegisterScreen/RegisterScreen";
import CreateBlog from "./components/screens/createBlog/Createblog";
import UpdateBlog from "./components/screens/updateBlog/UpdateBlog";

const App = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/createblog" element={<CreateBlog />} />
        <Route path="/blog/:id" element={<UpdateBlog />} />
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;
