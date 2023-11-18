import {Configuration, OpenAIApi} from 'openai'
import {getSession, withApiAuthRequired} from "@auth0/nextjs-auth0";
import client from "../../lib/mongoconnect";

export default withApiAuthRequired(async function handler(req, res) {
        const {user} = await getSession(req, res)

        const clientConn = await client;
        const db = await clientConn.db("blog")
        const userProfile = await db.collection("users").findOne({
            auth0Id: user.sub
        });
        if (!userProfile?.availableTokens) {
            return res.status(403).json({error: "No token"});
        }

        const config = new Configuration({
            apiKey: process.env.OPENAI_API_KEY
        });

        const {topic, keywords} = req.body;
        const openai = new OpenAIApi(config);

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            temperature: 1,
            max_tokens: 3600,
            prompt: `Write a long detailed SEO-friendly blog post about ${topic}, that target the following keywords ${keywords}
         the content should be formatted in SEO-friendly HTML.
         The response must also include appropriate HTML title and meta description content.
         Generate additional SEO tags
         The return format must be stringified JSON in the following format and each in quotes:
         {
            "postContent" : "post content",
            "title": "title goes here",
            "metaDescription" : "meta description goes here",
            "tags" : "tags as an array of strings"  
         }`
        });

        try {

            const image = await openai.createImage({prompt: `Images related to ${topic},`, n: 2, size: "1024x1024"});
            console.log(image.data.data[0])
        } catch (e) {
            console.log(e)
        }


        const json = JSON.parse(response.data.choices[0]?.text.split("\n").join(""));

        await db.collection("users").updateOne({
            auth0Id: user.sub
        }, {
            $inc: {
                availableTokens: -1
            }
        });

        const post = await db.collection("posts").insertOne({
            postContent: json?.postContent,
            title: json?.title,
            metaDescription: json?.metaDescription,
            tags: json?.tags,
            topic,
            keywords,
            userid: userProfile._id,
            created: new Date()
        })
        console.log('Post ', post);
        res.status(200).json({postId: post.insertedId})

    }
)