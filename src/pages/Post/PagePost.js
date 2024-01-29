import styles from "./PagePost.module.sass";
import { Parser } from "html-to-react";
import { getString } from "../../i18n";
import PostsFeed from "../../components/PostsFeed/PostsFeed";
import { useEffect, useState } from "react";
import { Hearts } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
import { getPost } from "../../actions/posts";

const PagePost = () => {
    const parser = new Parser();

    const [postData, setPostData] = useState({
        post: null,
        err: null,
        loading: true,
        related: []
    });

    const {pathname} = useLocation();
    const locale = pathname.split("/")[1];

    useEffect(() => {
        const getPostData = async () => {
            const id = pathname.split("/")[pathname.split("/").length - 1];
            const {data, err} = await getPost(locale, id);

            setPostData({
                post: data,
                err: err,
                loading: false,
                related: []
            });
        }

        getPostData();
    }, []);

    return postData.loading || postData.err ?
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
            <div className={styles.postPage}>

                <div className={styles.post}>
                    <div className="container">
                        <div className={styles.title}>
                            <h1>{postData.post.title}</h1>
                        </div>
                        <div className={styles.content}>
                            {parser.parse(postData.post.content)}
                        </div>
                    </div>
                </div>

                <div className={styles.related}>
                    <div className="container">
                        <h1>{getString(locale, "singlePostPage.related.title")}</h1>
                        <PostsFeed locale={locale} posts={[]}/>
                    </div>
                </div>
            </div>
        )
}

export default PagePost;