export function ErrorInfo({message}:{message:string}){
    return(
        <div className="p-4">
            <p>{message}</p>
        </div>
    )
}