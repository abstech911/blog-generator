import {getSession} from "@auth0/nextjs-auth0";
import client from "../lib/mongoconnect";

export const getAppProps = async (ctx) => {
    const userSession = await getSession(ctx.req, ctx.res);
    const clientConn = await client;
    const db = clientConn.db("blog")
    const user = await db.collection("users").findOne({
        auth0Id: userSession.user.sub
    });
    if (!user) {
        return {
            availableToken: 0,
            post: [],
        }
    }

    const post = await db.collection("posts").find({
        userid: user._id
    }).sort({
        created: -1
    }).toArray();


    return {
        availableTokens: user.availableTokens,
        posts: post.map(({created, _id, userid, ...rest}) => {
            return {
                _id: _id.toString(),
                created: created.toString(),
                ...rest
            }
        }),
        postId : ctx.params?.id || null
    }
}