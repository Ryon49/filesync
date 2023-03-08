import { useEffect, useState } from "react"
import { useImmer } from "use-immer"
import axios from "axios"
import StoredFile, { StoredFileProps } from "@/models/storedFile"

export default function Page() {
    const [debugMessage, setDebugMessage] = useState("None")
    const [files, setFiles] = useState<StoredFile[]>([])

    useEffect(() => {
        const serverAddr = process.env.SERVER_ADDR
        const api = "api/file"
        const resource = `${serverAddr}/${api}`
        
        axios.get(resource).then((resp) => {
            var networkData: StoredFileProps[] = resp.data
            var loaded: StoredFile[] = networkData.map((data) => new StoredFile(data))
            setFiles(loaded)
        })
    }, [])

    return (
        <div className="h-screen p-4 bg-gray-100">
            <div className="text-lg">List of files stored in the server: </div>
            <div>Debug: {debugMessage}</div>
            <ul className="list-none">
                {files.map((file, index) => <div key={index}>
                    <div>{file.userName}</div>
                </div>)}
            </ul>
        </div>
    )
}