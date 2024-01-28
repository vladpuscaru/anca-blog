import styles from "./PagePosts.module.sass";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPosts } from "../../actions/posts";
import { Hearts } from "react-loader-spinner";
import PostsFeed from "../../components/PostsFeed/PostsFeed";
import Button from "../../components/Button/Button";
import { getString } from "../../i18n";
import icSearch from "../../common/images/ic_search.svg";
import { ReactSVG } from "react-svg";

const PagePosts = ({categories = []}) => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [postsData, setPostsData] = useState({
        posts: {
            data: [],
            nextPage: null,
            err: null,
            loading: true
        },
        categories
    });

    const loadPosts = async () => {
        if (postsData.posts.nextPage) {
            const {
                data,
                nextPageToken,
                err
            } = await getPosts(postsData.posts.nextPage);
            setPostsData({
                ...postsData,
                posts: {
                    data,
                    nextPage: nextPageToken,
                    err,
                    loading: false
                }
            });
        } else {
            const {data, nextPageToken, err} = await getPosts();
            setPostsData({
                ...postsData,
                posts: {
                    data,
                    nextPage: nextPageToken,
                    err,
                    loading: false
                }
            });
        }
    }

    const onChange = (e) => {
        const {name, value} = e.target;
        setSearchParams({
            categories: searchParams.get("categories"),
            [name]: value}
        );
    }

    const onCategoryClick = (category) => {
        const categories = getFiltersFromSearch().categories || [];

        if (!isActive(category)) {
            setSearchParams({
                query: searchParams.get("query"),
                categories: [...categories, category].join(",")
            });
        } else {
            setSearchParams({
                query: searchParams.get("query"),
                categories: categories.filter(c => c !== category).join(",")
            });
        }
    }

    const onLoadMoreClick = () => {
        loadPosts();
    }

    const isActive = (category) => {
        return getFiltersFromSearch().categories?.includes(category);
    }

    const getFiltersFromSearch = () => {
        const categories = searchParams.get("categories")?.split(",");
        const query = searchParams.get("query");

        return {categories, query};
    }

    const {pathname} = useLocation();
    const locale = pathname.split("/")[1];

    useEffect(() => {
        loadPosts();
    }, [searchParams]);

    return (
        <div className={styles.posts}>
            <div className="container">
                <div className={styles.filters}>
                    <div className={styles.query}>
                        <input type="text" name="query" onChange={onChange}/>
                        <ReactSVG src={icSearch}/>
                    </div>
                    <div className={styles.categories}>
                        {

                            postsData.categories.data && postsData.categories.data.map((cat, idx) => (
                                <div key={idx} className={`${styles.category} ${isActive(cat) ? styles.active : ""}`}
                                     onClick={() => onCategoryClick(cat)}>
                                    <h3>{cat}</h3>
                                </div>
                            ))

                        }
                    </div>
                </div>

                <div className={styles.content}>
                    {
                        postsData.posts.loading ?
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
                            <PostsFeed posts={postsData.posts.data} locale={locale}/>
                    }

                    {
                        postsData.posts.nextPage ?
                            <Button text={getString(locale, "postsPage.loadMorePosts")} onClick={onLoadMoreClick}/>
                            :
                            ""
                    }
                </div>
            </div>
        </div>
    )
}

export default PagePosts;