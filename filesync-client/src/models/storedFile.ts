export default class StoredFile {
    systemName: string
    userName: string

    constructor(props: StoredFileProps) {
        this.systemName = props.systemName
        this.userName = props.userName
    }
}

export type StoredFileProps = {
    systemName: string
    userName: string
}