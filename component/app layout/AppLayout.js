import Image from "next/image";
import Link from "next/link";
import {useUser} from "@auth0/nextjs-auth0/client";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCoins} from "@fortawesome/free-solid-svg-icons/faCoins";
import {Logo} from "../logo";

export const AppLayout = ({children}) => {
    const {user} = useUser();

    return (
        <div className={`grid grid-cols-[auto_1fr]  h-screen max-h-screen text-white`}>
            <div className={` flex flex-col overflow-hidden`}>
                <div className={`bg-slate-800 px-2`}>
                    <Logo />
                    <Link href={"/post/new"}
                          className={`bg-green-500 tracking-wider w-full text-center text-white font-bold cursor-pointer uppercase px-4 py-2 rounded-md hover:bg-green-600 transition-colors block`}>New
                        Post</Link>
                    <Link href={"/token-topup"} className={`block mt-2 text-center`}>
                        <FontAwesomeIcon icon={faCoins} className={`text-yellow-300`}/>
                        <span className={`pl-1`}>
                        0 tokens
                        </span>
                    </Link>
                </div>

                <div className={`flex-1 overflow-auto bg-gradient-to-b from-slate-800 to-cyan-700`}>
                    List of post
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
            <div className={`bg-sky-100 text-black overflow-y-auto`}>
                {children}
            </div>
        </div>
    )
}