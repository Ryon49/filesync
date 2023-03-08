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

const FileDateFormattor = (date: Date) : string => {
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(date)
}

export {FileSizeFormatter, FileDateFormattor}