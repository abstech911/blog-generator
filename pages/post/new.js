import {withPageAuthRequired} from "@auth0/nextjs-auth0";
import {AppLayout} from "../../component/app layout";
import {useState} from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";

export default function NewPost(props) {

    const [postContent, setPostContent] = useState('');

    const handleClick = async () => {
        const response = await fetch('/api/generatePost', {
                method: "POST"
            }
        )
        const json = await response.json();
        if (!response.ok) {
            console.log(`Error `)
            setPostContent(`<div>Error</div>`);
            return;
        }
        setPostContent(json.post);
        console.log('Result ', json);
    }
    const copyToClipBoard = () => {

    }
    return (
        <div>
            <h1>This is the new Post page</h1>
            <button className={`btn`} onClick={handleClick}>
                Generate
            </button>
            <div className={`max-w-screen-sm p-10 text-center lg:m-auto`}
                 dangerouslySetInnerHTML={{__html: postContent.postContent}}/>
            <CopyToClipboard onCopy={copyToClipBoard} text={'Hello You have been copied'}>
                <button>copy</button>
            </CopyToClipboard>
        </div>
    );
}

NewPost.getLayout = function getLayout(page, pageProps) {
    return <AppLayout {...pageProps}>{page}</AppLayout>
}

export const getServerSideProps = withPageAuthRequired(() => {
        return {
            props: {}
        }
    }
)