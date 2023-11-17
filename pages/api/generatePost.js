import {Configuration, OpenAIApi} from 'openai'

export default async function handler(req, res) {
    const config = new  Configuration({
        apiKey : process.env.OPENAI_API_KEY
    });
    const openai = new OpenAIApi(config);

    const topic = 'Top 10 tips for dog owners';
    const keyword = "first-time tog owners, common dog health issues, best dog breeds"

    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            temperature: 0.3,
            max_tokens: 3600,
            prompt: `Write a long detailed SEO-friendly blog post about ${topic}, that target the following keywords ${keyword}
         the content should be formatted in SEO-friendly HTML.
         The response must also include appropriate HTML title and meta description content.
         Generate additional SEO tags
         The return format must be stringified JSON in the following format and remove all lines breaks for postContent:
         {
            "postContent" : "post content"
            "title": "title goes here"
            "metaDescription" : "meta description goes here"
            "tags" : "tags as an array of strings"  
         }`
        })
        const json = JSON.parse(response.data.choices[0]?.text) ;

        res.status(200).json({post: json})
    }catch (e) {
        console.log(e)
        res.status(404).json({e})
    }
}
