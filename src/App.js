import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import Layout from "./containers/Layout/Layout";
import PageHome from "./pages/Home/PageHome";
import PagePosts from "./pages/Posts/PagePosts";
import PagePost from "./pages/Post/PagePost";
import Page404 from "./pages/404/Page404";
import "./common/sass/general.sass";
import LocaleRedirect from "./containers/LocaleRedirect/LocaleRedirect";

const App = () => {
    return (
        <BrowserRouter>
            <LocaleRedirect>
                <Layout>
                    <Routes>
                        <Route path="/:lang">
                            <Route path="/:lang/" element={<PageHome/>}/>
                            <Route path="/:lang/posts" element={<PagePosts/>}/>
                            <Route path="/:lang/posts/:postId" element={<PagePost/>}/>
                            <Route path="/:lang/*" element={<Page404/>}/>
                        </Route>
                    </Routes>
                </Layout>
            </LocaleRedirect>
        </BrowserRouter>
    );
}

export default App;
