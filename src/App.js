import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from "./containers/Layout/Layout";
import PageHome from "./pages/Home/PageHome";
import PagePosts from "./pages/Posts/PagePosts";
import PagePost from "./pages/Post/PagePost";
import Page404 from "./pages/404/Page404";

const App = () => {
    return (
    <BrowserRouter>
        <Layout>
            <Routes>
                <Route index element={<PageHome/>}/>
                <Route path="posts" element={<PagePosts/>}/>
                <Route path="posts/:postId" element={<PagePost/>}/>
                <Route path="*" element={<Page404/>}/>
            </Routes>
        </Layout>
    </BrowserRouter>
    );
}

export default App;
