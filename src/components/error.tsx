import Link from 'next/link';
import  {ArrowLeft} from 'lucide-react'
export function ErrorInfo({message, href}:{message:string, href:string}){
    return(
        <div className="p-4">
            <Link href={href}><ArrowLeft/></Link>
            <p>{message}</p>
        </div>
    )
}