import {getSession, withPageAuthRequired} from "@auth0/nextjs-auth0";
import {AppLayout} from "../../component/app layout";
import client from "../../lib/mongoconnect";
import {ObjectId} from "mongodb";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHashtag} from "@fortawesome/free-solid-svg-icons/faHashtag";
import {getAppProps} from "../../utils/getAppProps";

export default function Post(props) {
    console.log(props)
    return (<div className={`overflow-auto h-full`}>
        <div className={`max-w-screen-sm mx-auto`}>
            <div className={`text-sm font-bold mt-6 p-2 bg-stone-200 rounded-sm`}>
                SEO title and Meta Description
            </div>
            <div className={`p-4 my-2 border border-stone-200 rounded-md`}>
                <div className={`text-blue-600 text-2xl font-bold`}>{props.title}</div>
                <div className={`mt-2`}>{props.metaDescription}</div>
            </div>
            <div className={`text-sm font-bold mt-6 p-2 bg-stone-200 rounded-sm`}>
                Keywords
            </div>
            <div className={`flex flex-wrap pt-2 gap-1`}>
                {props.keywords.split(",").map((keyword, i) => {
                    return <div key={i} className={`p-2 rounded-full bg-amber-500 text-white flex gap-1 items-center`}>
                        <FontAwesomeIcon icon={faHashtag}/>
                        <span>
                       {keyword}
                      </span>
                    </div>
                })}
            </div>
            <div className={`text-sm font-bold mt-6 p-2 bg-stone-200 rounded-sm`}>
                Seo Tags and Keywords
            </div>
            <div className={`flex flex-wrap pt-2 gap-1`}>
                {props.tags.map((keyword, i) => {
                    return <div key={i} className={`p-2 rounded-full bg-amber-500 text-white flex gap-1 items-center`}>
                        <FontAwesomeIcon icon={faHashtag}/>
                        <span>
                       {keyword}
                      </span>
                    </div>
                })}
            </div>
            <div className={`text-sm font-bold mt-6 p-2 bg-stone-200 rounded-sm`}>
                Blog Post
            </div>
            <div dangerouslySetInnerHTML={{__html: props?.postContent || ''}}/>
        </div>
    </div>);
}

Post.getLayout = function getLayout(page, pageProps) {
    return <AppLayout {...pageProps}>{page}</AppLayout>
}

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(ctx) {

        const props = await getAppProps(ctx);
        const userSession = await getSession(ctx.req, ctx.res);
        const clientConn = await client;
        const db = await clientConn.db("blog");
        const user = await db.collection("users").findOne({
            auth0Id: userSession.user.sub
        });

        const post = await db.collection("posts").findOne({
            _id: new ObjectId(ctx.params.id),
            userid: user._id
        });
        console.log(user._id, ' -> ', ctx.params.id)
        if (!post) {
            return {
                redirect: {
                    destination: "/post/new",
                    permanent: false,
                }
            }
        }

        return {
            props: {
                postContent: post?.postContent,
                title: post?.title,
                metaDescription: post?.metaDescription,
                tags: post?.tags,
                topic: post.topic,
                keywords: post.keywords,
                userid: post.userid.toString(),
                ...props
                // created: new Date()
            }
        }
    }
})