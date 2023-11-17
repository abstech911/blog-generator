import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBrain} from "@fortawesome/free-solid-svg-icons/faBrain";

export const Logo =()=>{
    return (
        <div className={`text-xl text-center py-4 flex items-center justify-center gap-1 font-heading`}>
            <span className={`text-center`}>Business Generator</span>
            <FontAwesomeIcon className={`text-xl`} icon={faBrain} />
        </div>
    )
}