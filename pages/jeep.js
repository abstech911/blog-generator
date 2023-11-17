export default function Jeep() {
    return (<div>
        <h1>This is the token top up page</h1>
    </div>);
}

export const ServerSideProps =() =>{
    return {
        props:{my:"Hello"}
    }
}