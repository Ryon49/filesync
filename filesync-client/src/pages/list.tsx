import { useEffect, useState } from "react"
import axios from "axios"
import StoredFile from "@/models/storedFile"
import { FileSizeFormatter, FileDateFormattor } from "@/util/fileUtil"

const serverAddr = process.env.SERVER_ADDR
const api = "api/file"
const baseResource = `${serverAddr}/${api}`

export default function Page() {
    const [debugMessage, setDebugMessage] = useState("None")
    const [files, setFiles] = useState<StoredFile[]>([])

    useEffect(() => {
        axios.get(baseResource).then((resp) => {
            var loaded: StoredFile[] = resp.data
            setFiles(loaded)
        })
    }, [])

    const downloadFile = (systemName: string, userName: string) => {
        const resource = `${baseResource}/${systemName}`
        axios.get(resource).then((resp) => {
            // credit: 
            //      https://stackoverflow.com/questions/41938718/how-to-download-files-using-axios
            //      https://stackoverflow.com/questions/27120757/failed-to-execute-createobjecturl-on-url

            // A work around due to "Failed to execute 'createObjectURL' on 'URL':" error.
            var binaryData = [];
            binaryData.push(resp.data);
            // create file link in browser's memory
            const href = URL.createObjectURL(new Blob(binaryData));

            // create "a" HTML element with href to file & click
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', userName); //or any other extension
            document.body.appendChild(link);
            link.click();

            // clean up "a" element & remove ObjectURL
            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        })
    }

    return (
        <div className="h-screen p-4 bg-white flex flex-col">
            <div className="flex-none text-lg">List of files stored in the server: </div>
            <div className="flex-none">Debug: {debugMessage}</div>
            <div>&nbsp;</div>
            <div className="flex-1 flex flex-row text-left">
                <table className="basis-3/4">
                    <thead>
                        <tr className="flex flex-row">
                            <th className="basis-3/5">Name</th>
                            <th className="basis-1/5">Size</th>
                            <th className="basis-1/5">Last Modified</th>
                            <th className="basis-1/5"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.map((file, index) => (
                            <tr key={index} className="flex flex-row hover:bg-gray-100">
                                <th className="basis-3/5 font-normal">{file.userName}</th>
                                <th className="basis-1/5 font-normal">{FileSizeFormatter(file.size)}</th>
                                <th className="basis-1/5 font-normal">{FileDateFormattor(new Date(file.lastModified))}</th>
                                <th className="basis-1/5 flex justify-center items-center">
                                    <button onClick={() => downloadFile(file.systemName, file.userName)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                            <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                                            <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                                        </svg>
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}