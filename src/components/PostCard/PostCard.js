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
            <h3 className={styles.title}>{postData.title}</h3>
            <div className={styles.thumbnail} style={{backgroundImage: `url(${postData.thumbnail})`}}></div>
            <p className={styles.date}><em>{postData.date}</em> <span>{postData.category}</span></p>
            <p className={styles.slug}>{postData.slug}</p>
        </div>
    )
};

export default PostCard;