import styles from "./PostsFeed.module.sass";
import PostCard from "../PostCard/PostCard";

const PostsFeed = ({posts}) => {

    const onPostClick = (id) => {
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