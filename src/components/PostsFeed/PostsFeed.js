import styles from "./PostsFeed.module.sass";
import PostCard from "../PostCard/PostCard";
import { useNavigate } from "react-router-dom";
import { getString } from "../../i18n";

const PostsFeed = ({posts, locale}) => {
    const navigate = useNavigate();

    const onPostClick = (id) => {
        navigate(`/${locale}/posts/${id}`);
    }

    return (
        <div className={styles.postsfeed}>
            {
                posts && posts.length > 0 ?
                posts.map((post, idx) => (
                    <div key={idx} className={styles.postContainer}>
                        <PostCard postData={post} onClick={() => onPostClick(post.bloggerId)}/>
                    </div>
                ))
                    :
                    <h3>{getString(locale, "postsFeed.noPosts.title")}</h3>
            }
        </div>
    )
};

export default PostsFeed;