import {withPageAuthRequired} from "@auth0/nextjs-auth0";
import {AppLayout} from "../../component/app layout";
import {useState} from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {useRouter} from "next/router";
import {getAppProps} from "../../utils/getAppProps";

export default function NewPost(props) {

    const [topic , setTopic] = useState('');
    const [keywords, setKeywords] = useState('')
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`Hello this is generate Post`)
        const response = await fetch('/api/generatePost', {
                method: "POST",
                headers:{
                    'content-type': 'application/json'
                },
            body: JSON.stringify({topic ,keywords})
            }
        )
        const json = await response.json();
        console.log('RESULT',json)

        if(json?.postId){
            router.push(`/post/${json.postId.toString()}`)
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label><strong>Generate a blog post topic:</strong></label>
                    <textarea className={`resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm`} value={topic} onChange={(e) => setTopic(e.target.value)}/>
                </div>

                <div>
                    <label><strong>Targeting the following keywords:</strong></label>
                    <textarea className={`resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm`} value={keywords} onChange={(e)=> setKeywords(e.target.value)}/>
                </div>
                <button type={"submit"} className={`btn`}>
                    Generate
                </button>
            </form>

            <button>copy</button>
        </div>
    );
}

NewPost.getLayout = function getLayout(page, pageProps) {
    return <AppLayout {...pageProps}>{page}</AppLayout>
}

export const getServerSideProps = withPageAuthRequired({
        async getServerSideProps(ctx) {
            const props = await getAppProps(ctx);
            return {props};
        }
    }
)