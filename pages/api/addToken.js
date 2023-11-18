import {getSession} from "@auth0/nextjs-auth0";
import client from "../../lib/mongoconnect";

export default async function  handler(req, res) {
    const {user} = await getSession(req,res);
    console.log(user);

    const clientConnection = await client;

    const db = client.db("blog");

    const userProfile = await db.collection("users").updateOne({
        auth0Id : user.sub
    }, {
        $inc :{
            availableTokens : 10
        },
        $setOnInsert:{
            auth0Id : user.sub
        }
    }, {upsert : true})

    console.log(userProfile)
    res.status(200).json({ name: 'John Doe' })
}
