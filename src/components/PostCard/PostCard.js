import styles from "./PostCard.module.sass";

// {
//     id: id,
//         bloggerId: bloggerId,
//     title: title,
//     slug: slug,
//     content: content,
//     category: category,
//     locale: locale,
//     thumbnail: thumbnail,
//     date: published
// }

const PostCard = ({postData, onClick}) => {
    return (
        <div className={styles.postCard} onClick={onClick}>
            <h3>{ postData.title }</h3>
            <p><em>{ postData.date }</em></p>
            <div className={styles.thumbnail} style={{ backgroundImage: `url(${postData.thumbnail})` }}></div>
            <p>{postData.slug}</p>
        </div>
    )
};

export default PostCard;