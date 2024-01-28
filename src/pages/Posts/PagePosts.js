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
        categories,
        filters: {
            query: "",
            categories: []
        },
    });

    const loadPosts = async () => {
        if (postsData.posts.nextPage) {
            const {
                data,
                nextPageToken,
                err
            } = await getPosts(postsData.filters.query, postsData.filters.categories, postsData.posts.nextPage);
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
            const {data, nextPageToken, err} = await getPosts(postsData.filters.query, postsData.filters.categories);
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
        setPostsData({
            ...postsData,
            filters: {
                ...postsData.filters,
                [e.target.name]: e.target.value
            }
        });
    }

    const onCategoryClick = (category) => {
        if (!isActive(category)) {
            setPostsData({
                ...postsData,
                filters: {
                    ...postsData.filters,
                    categories: [...postsData.filters.categories, category]
                }
            });
        } else {
            setPostsData({
                ...postsData,
                filters: {
                    ...postsData.filters,
                    categories: postsData.filters.categories.filter(cat => cat !== category)
                }
            });
        }
    }

    const onLoadMoreClick = () => {
        loadPosts();
    }

    const isActive = (category) => {
        return postsData.filters.categories.includes(category);
    }

    const arraysAreEqual = (arr1, arr2) => {
        if ((!arr1 && arr2) || (arr1 && !arr2)) {
            return false;
        }

        if (arr1.length !== arr2.length) {
            return false;
        }

        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }

        return true;
    }

    const getFiltersFromSearch = (search) => {
        const params = search.substring(1).split("&");
        let categories = params.filter(p => p.startsWith("categories"))[0];
        if (categories) {
            categories = categories.split("=")[1].split(",");
        }

        let query = params.filter(p => p.startsWith("query"))[0];
        if (query) {
            query = query.split("=")[1];
        }

        return { categories, query };
    }

    const searchIsState = (search) => {
        const filtersFromSearch = getFiltersFromSearch(search);
        return arraysAreEqual(postsData.filters.categories, filtersFromSearch.categories) && postsData.filters.query === filtersFromSearch.query;
    }


    const {pathname, search} = useLocation();
    const locale = pathname.split("/")[1];

    useEffect(() => {
        // if (!search || (search && searchIsState(search))) {
        //     loadPosts();
        // } else {
        //     setPostsData({
        //         ...postsData,
        //         filters: {
        //             ...postsData.filters,
        //             categories: ["Travel"]
        //         }
        //     })
        // }
        loadPosts();
    }, [postsData.filters]);

    return (
        <div className={styles.posts}>
            <div className="container">
                <div className={styles.filters}>
                    <div className={styles.query}>
                        <input type="text" name="query" value={postsData.filters.query} onChange={onChange}/>
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