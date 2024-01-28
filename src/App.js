import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from "./containers/Layout/Layout";
import PageHome from "./pages/Home/PageHome";
import PagePosts from "./pages/Posts/PagePosts";
import PagePost from "./pages/Post/PagePost";
import Page404 from "./pages/404/Page404";
import "./common/sass/general.sass";
import LocaleRedirect from "./containers/LocaleRedirect/LocaleRedirect";
import { useEffect, useState } from "react";
import { getAllCategories } from "./actions/posts";
import { Hearts } from "react-loader-spinner";

const App = () => {
    const [categories, setCategories] = useState({
        data: [],
        loading: true
    });

    useEffect(() => {
        const loadCategories = async () => {
            const {data} = await getAllCategories();
            setCategories({
                data,
                loading: false
            });
        }

        loadCategories();
    }, []);

    return categories.loading ?
        <Hearts
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="hearts-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
        :
        (
            <BrowserRouter>
                <LocaleRedirect>
                    <Layout>
                        <Routes>
                            <Route path="/:lang">
                                <Route path="/:lang/" element={<PageHome/>}/>
                                <Route path="/:lang/posts" element={<PagePosts categories={categories}/>}/>
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
