import styles from "./PageHome.module.sass";
import BannerHero from "../../components/BannerHero/BannerHero";
import { getString } from "../../i18n";
import { useLocation } from "react-router-dom";
import Banner from "../../components/Banner/Banner";
import PostsFeed from "../../components/PostsFeed/PostsFeed";
import { useEffect, useState } from "react";
import { getPosts } from "../../actions/posts";
import { Hearts } from "react-loader-spinner";
import Button from "../../components/Button/Button";
import ContactForm from "../../components/ContactForm/ContactForm";

const PageHome = () => {
    const [posts, setPosts] = useState({
        data: [],
        err: null,
        loading: true
    });

    useEffect(() => {
        const loadLatestPosts = async () => {
            const {data, err} = await getPosts();
            setPosts({
                data,
                err,
                loading: false
            });
        }

        loadLatestPosts();
    }, []);

    const {pathname} = useLocation();
    const locale = pathname.split("/")[1];


    const onLatestBtnClick = () => {

    }

    return (
        <div className={styles.home}>
            <BannerHero
                title={getString(locale, "homePage.bannerHero.title")}
                subtitle={getString(locale, "homePage.bannerHero.subtitle")}/>

            <div id="about" className={styles.about}>
                <div className="container">
                    <Banner
                        title={getString(locale, "homePage.about.title")}
                        description={getString(locale, "homePage.about.description")}/>
                </div>
            </div>

            <div id="latest" className={styles.latest}>
                <div className="container">
                    <div className={styles.title}>
                        <h1>{getString(locale, "homePage.latest.title")}</h1>
                    </div>
                    <div className={styles.feed}>
                        {
                            posts.loading ?
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
                                <PostsFeed posts={posts.data}/>
                        }
                    </div>
                    <Button text={getString(locale, "homePage.latest.button")} onClick={onLatestBtnClick}/>
                </div>
            </div>

            <div id="contact" className={styles.contact}>
                <div className="container">
                    <div className={styles.title}>
                        <h1>{getString(locale, "homePage.contact.title")}</h1>
                    </div>
                    <ContactForm locale={locale}/>
                </div>
            </div>
        </div>
    )
}

export default PageHome;