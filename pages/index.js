import Image from "next/image";
import HeroImage from '../public/hero.webp'
import {Logo} from "../component/logo";
import Link from "next/link";

// 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

export default function Home() {
    return (
        <div className={`w-screen h-screen overflow-hidden flex justify-center items-center relative`}>
            <Image src={HeroImage} alt={`Hero`} fill className={`absolute`}/>
            <div
                className={`relative z-10 text-white px-10 py-5 text-center max-w-screen-sm bg-slate-900/90 rounded-md backdrop-blur-sm`}>
                <Logo/>
                <p>
                    The Ai Powered SAAS solution to generate SEO-optimized blog posts in minutes.
                    Get high-quality content, without sacrificing your time.
                </p>
                <Link href={"/post/new"} className={`btn rounded-full my-4 py-4`}>Begin</Link>
            </div>
        </div>
    );
}
