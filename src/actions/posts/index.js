import axios from "axios";

const BLOG_BASE_URL = "https://www.googleapis.com/blogger/v3"
const BLOG_ID = "3982832264187954572"
const BLOG_API_KEY = "AIzaSyAHvgHLly9AYOBvYpj6AfZ526kpvMgWT5o"
const BLOG_CATEGORIES_PAGE_ID = "1341748293566205615"

const pattern_LOCALE = "locale_";
const pattern_CATEGORY = "category_";
const pattern_ID = "id_";

const client = axios.create({
    // TODO: Implement for OAuth2
    // headers: {
    //     Authorization: "AIzaSyAHvgHLly9AYOBvYpj6AfZ526kpvMgWT5o"
    // }
    baseURL: BLOG_BASE_URL
});

const MONTHS = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec"
};

const parseTime = (time) => {
//     2024-01-28T09:22:00-08:00
    const year = time.substring(0, 4);
    const month = MONTHS[time.substring(5, 7)];
    const day = time.substring(8, 10);

    return `${month} ${day}, ${year}`;
}

const parsePost = (bloggerPostData) => {
    let {
        id: bloggerId,
        title,
        content,
        labels,
        published,
    } = bloggerPostData;

    if (!bloggerId || !title || !content || !labels || !published) {
        return;
    }

    const locale = labels
        .filter(label => label.startsWith(pattern_LOCALE))[0]
        .substring(pattern_LOCALE.length);

    const id = labels
        .filter(label => label.startsWith(pattern_ID))[0]
        .substring(pattern_ID.length);

    const category = labels
        .filter(label => label.startsWith(pattern_CATEGORY))[0]
        .substring(pattern_CATEGORY.length);

    if (!id || !locale || !category) {
        return;
    }

    let slug = undefined,
        thumbnail = undefined;

    const idxHeadStart = content.lastIndexOf("<head>");
    const idxHeadEnd = content.lastIndexOf("</head>") + "</head>".length;
    if (idxHeadStart !== -1 && idxHeadEnd !== -1) {
        const contentHead = content.substring(idxHeadStart, idxHeadEnd);

        for (const match of contentHead.matchAll(/src\s*=\s*"(.+?)"/gm)) {
            if (match[1].startsWith("http") || match[1].startsWith("https")) {
                thumbnail = match[1];
            }
        }

        const idxSlugStart = contentHead.lastIndexOf("<p>");
        const idxSlugEnd = contentHead.lastIndexOf("</p>");
        if (idxSlugStart !== -1 && idxSlugEnd !== -1) {
            slug = contentHead.substring(idxSlugStart + "<p>".length, idxSlugEnd);
        }

        content = content.replace(contentHead, "");
    }

    return {
        id: id,
        bloggerId: bloggerId,
        title: title,
        slug: slug,
        content: content,
        category: category,
        locale: locale,
        thumbnail: thumbnail,
        date: parseTime(published)
    }
}

export const getPost = async (postId) => {
    try {
        const {data} = await client.get(`/blogs/${BLOG_ID}/posts/${postId}?key=${BLOG_API_KEY}`);
        console.log(data);
        return {
            data: parsePost(data),
            nextPageToken: data.nextPageToken,
            err: null
        };
    } catch (err) {
        console.log(err);
        return {
            err,
            data: null
        }
    }
}
export const getPosts = async (locale, query, categories, pageToken) => {
    if (!locale) locale = 'en';

    let queryParams = `?q=label:${pattern_LOCALE}${locale}`;

    if (query) {
        queryParams += `+${query}`;
    }

    console.log(categories);

    if (categories) {
        queryParams += `+${categories.map(c => `label:${pattern_CATEGORY}${c.toLowerCase()}`)}`
    }

    queryParams += `&key=${BLOG_API_KEY}`;

    let path = `/blogs/${BLOG_ID}/posts/search${queryParams}`;

    if (pageToken) {
        path = pageToken;
    }

    console.log(path);

    try {
        const {data} = await client.get(path);
        return {
            data: data.items ? data.items.map(parsePost) : [],
            nextPageToken: data.nextPageToken,
            err: null
        };
    } catch (err) {
        console.log(err);
        return {
            err,
            data: null
        }
    }
}

export const getAllCategories = async () => {
    try {
        const {data} = await client.get(`/blogs/${BLOG_ID}/pages/${BLOG_CATEGORIES_PAGE_ID}?key=${BLOG_API_KEY}`);
        return {
            data: data.content.split("\n"),
            err: null
        };
    } catch (err) {
        console.log(err);
        return {
            err,
            data: null
        }
    }
}