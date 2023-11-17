import {withPageAuthRequired} from "@auth0/nextjs-auth0";
import {AppLayout} from "../component/app layout";

export default function TokenTopUp() {
    return (<div>
        <h1>This is the token top up page</h1>
    </div>);
}

TokenTopUp.getLayout = function getLayout(page, pageProps){
    return <AppLayout {...pageProps}>{page}</AppLayout>
}
export const getServerSideProps = withPageAuthRequired(()=>{
        return {
            props:{}
        }
    }
)