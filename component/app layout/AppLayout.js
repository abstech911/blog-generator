import Image from "next/image";
import Link from "next/link";
import {useUser} from "@auth0/nextjs-auth0/client";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCoins} from "@fortawesome/free-solid-svg-icons/faCoins";
import {Logo} from "../logo";

export const AppLayout = ({children, availableTokens, posts, postId}) => {
    const {user} = useUser();
    console.log(availableTokens)

    return (
        <div className={`grid grid-cols-[300px_1fr]  h-screen max-h-screen text-white`}>
            <div className={` flex flex-col overflow-hidden`}>
                <div className={`bg-slate-800 px-2`}>
                    <Logo/>
                    <Link href={"/post/new"}
                          className={`bg-green-500 tracking-wider w-full text-center text-white font-bold cursor-pointer uppercase px-4 py-2 rounded-md hover:bg-green-600 transition-colors block`}>New
                        Post</Link>
                    <Link href={"/token-topup"} className={`block mt-2 text-center`}>
                        <FontAwesomeIcon icon={faCoins} className={`text-yellow-300`}/>
                        <span className={`pl-1`}>
                        {availableTokens} tokens
                        </span>
                    </Link>
                </div>

                <div className={`flex-1 overflow-auto bg-gradient-to-b from-slate-800 to-cyan-700`}>
                    {posts.map((post, index) => {
                        return (
                            <Link
                                className={`block text-ellipsis overflow-hidden whitespace-nowrap my-1 mx-2 px-2 py-2  bg-white/10 cursor-pointer rounded-sm hover:bg-white/50 transition-colors duration-200 hover:scale-105 transition-all ${postId === post._id ? 'bg-white/50 scale-[1.01]' : ''}`}
                                key={post._id}
                                href={`/post/${post._id}`}>
                                {post.topic}
                            </Link>
                        )
                    })}
                </div>

                <div className={`bg-cyan-700 flex items-center gap-2 border-t border-b-amber-300/30 h-20 px-2`}>
                    {!!user ?
                        <>
                            <div className={`min-w-[50px]`}>
                                <Image src={user.picture} alt={user.name} width={"50"} height={"50"}
                                       className={`rounded-full`}/>
                            </div>
                            <div>
                                <p className="">{user.email}</p>
                                <Link className={"text-sm"} href="/api/auth/logout">logout</Link>
                            </div>
                        </> :
                        <Link href="/api/auth/login">login</Link>
                    }
                </div>
            </div>
            <div className={`border-y-green-200 text-black overflow-y-auto`}>
                {children}
            </div>
        </div>
    )
}