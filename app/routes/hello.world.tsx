import { useMatches } from "remix";

export default function helloWorld() {
    const matches = useMatches();
    console.log(matches);

    return <div>Hello World</div>;
    } 
