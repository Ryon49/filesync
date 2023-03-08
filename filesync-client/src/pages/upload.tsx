import EditableFileDisplay from "@/components/editableFileDisplay";
import React from "react"
import { ChangeEvent, useState } from "react";
import { useImmer } from "use-immer";
import axios from 'axios';

export default function Page() {
    const [debugMessage, setDebugMessage] = useState("None")
    const [debugHTTPResult, setDebugHTTPResult] = useState("")


    // A controller variable for disabling further operation when current one is not done
    const [disableButton, setDisableButton] = useState(false)
    // temporay container for uploading files to server
    const [pending, setPending] = useImmer<File[]>([])

    const removeFileAt = (index: number) => {
        try {
            setDisableButton(true);
            setPending(draft => {
                draft.splice(index, 1)
                if (draft.length == 0) {
                    setDebugMessage("None")
                } else {
                    setDebugMessage(`${draft.length} files selected`)
                }
            })
        } finally {
            setDisableButton(false);
        }
    }

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        try {
            setDisableButton(true);

            const selected = event.target.files; FileList
            if (selected == null || selected.length == 0) {
                return;
            }

            setDebugMessage(`${selected.length} files selected`)
            setPending(draft => {
                for (const file of Array.from(selected)) {
                    draft.push(file)
                }
            })
        } finally {
            setDisableButton(false);
        }
    }

    const handleFileSubmit = (e: React.FormEvent) => {
        try {
            setDisableButton(true)
            e.preventDefault()

            if (pending.length == 0) {
                setDebugMessage("no file selected")
                return
            }
            const formdata = new FormData()
            for (const file of pending) {
                formdata.append("files", file)
            }

            const serverAddr = process.env.SERVER_ADDR
            const api = "api/file"
            const resource = `${serverAddr}/${api}`

            setDebugMessage(resource)
            axios.post(resource, formdata)
                .then((resp) => {
                    setDebugHTTPResult(resp.data)
                }).catch((resp) => {
                    setDebugHTTPResult(`Error ${resp.data}`)
                })
        } finally {
            setDisableButton(false)
        }
    }

    return (
        <div className="p-4">
            <form onSubmit={handleFileSubmit}>
                <h3 className="m-1">Upload File: </h3>
                <label htmlFor="fileUploadInput"
                    className="m-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-2">
                        <path fillRule="evenodd" d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z" clipRule="evenodd" />
                    </svg>
                    <span>Choose Files</span>
                </label>
                <input id="fileUploadInput" type="file" className="m-1 hidden" multiple onChange={handleOnChange} disabled={disableButton} />

                <label htmlFor="fileUploadSubmit" className="m-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center cursor-pointer">
                    <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                    </svg>
                    <span>Submit</span>
                </label>
                <input id="fileUploadSubmit" type="submit" className="m-1 hidden" multiple disabled={disableButton} />
            </form>

            <div>{debugMessage}</div>
            <div>{debugHTTPResult}</div>

            {pending.length > 0 &&
                <table className="boarder-collapse">
                    <thead>
                        <tr>
                            <th className="pr-8">Name</th>
                            <th className="pr-8">Size</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {pending.map((f, index) => <EditableFileDisplay key={index} index={index} file={f} removeFileAt={()=>removeFileAt(index)}/>)}

                    </tbody>
                </table>
            }
        </div>
    )
}