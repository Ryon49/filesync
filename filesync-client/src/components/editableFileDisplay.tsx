import { FileSizeFormatter } from "@/util/fileUtil"

export default function EditableFileDisplay({ index, file, removeFileAt }: FileDisplayProps) {
    return (
        <tr key={`editableFileRow${index}`} className="odd:bg-gray-200 even:bg-white">
            <th className="pr-8 text-left">{file.name}</th>
            <th className="pr-8 text-left">{FileSizeFormatter(file.size)}</th>
            <th>
                <label htmlFor={`deleteFileButton${index}`} className="cursor-pointer">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                </label>
                <button id={`deleteFileButton${index}`} className="hidden" onClick={removeFileAt} />
            </th>
        </tr>
    )
}

type FileDisplayProps = {
    index: number,
    file: File,
    removeFileAt: () => void
}