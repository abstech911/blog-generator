import {withPageAuthRequired} from "@auth0/nextjs-auth0";
import {AppLayout} from "../component/app layout";
import {getAppProps} from "../utils/getAppProps";

export default function TokenTopUp() {
    const handleClick = async (e) => {
        e.preventDefault();
        const response = await fetch(`/api/addToken`, {
            method: 'POST',

        })


    }
    return (<div>
        <h1>This is the token top up page</h1>
        <button className={`btn`} onClick={handleClick}>Add token</button>
    </div>);
}

TokenTopUp.getLayout = function getLayout(page, pageProps){
    return <AppLayout {...pageProps}>{page}</AppLayout>
}
export const getServerSideProps = withPageAuthRequired({
        async getServerSideProps(ctx) {
            const props = await getAppProps(ctx);
            return {props};
        }
    }
)