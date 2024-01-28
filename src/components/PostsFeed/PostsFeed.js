import styles from "./PostsFeed.module.sass";
import PostCard from "../PostCard/PostCard";
import { useNavigate } from "react-router-dom";

const PostsFeed = ({posts, locale}) => {
    const navigate = useNavigate();

    const onPostClick = (id) => {
        navigate(`/${locale}/posts/${id}`);
    }

    return (
        <div className={styles.postsfeed}>
            {
                posts.map((post, idx) => (
                    <div key={idx} className={styles.postContainer}>
                        <PostCard postData={post} onClick={() => onPostClick(post.bloggerId)}/>
                    </div>
                ))
            }
        </div>
    )
};

export default PostsFeed;