export default function EditableFileDisplay({ key, file, removeFileAt }: FileDisplayProps) {

    const FileSizeFormatter = (size: number): string => {
        const decimal = 0
        if (size < 1024) {
            return `${size} bytes`;
        }
        else if (size >= 1024 && size < 1048576) {
            return `${(size / 1024).toFixed(decimal)} KB`;
        }
        else if (size >= 1048576) {
            return `${(size / 1048576).toFixed(decimal)} MB`;
        }
        throw new Error("File size must be less than 1GB");
    }

    return (
        <tr key={`editableFileRow${key}`} className="odd:bg-gray-200 even:bg-white">
            <th className="pr-8 text-left">{file.name}</th>
            <th className="pr-8 text-left">{FileSizeFormatter(file.size)}</th>
            <th>
                <label htmlFor={`deleteFileButton${key}`} className="cursor-pointer">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                </label>
                <button id={`deleteFileButton${key}`} className="hidden" onClick={removeFileAt} />
            </th>
        </tr>
    )
}

type FileDisplayProps = {
    key: number,
    file: File,
    removeFileAt: () => void
}