export default class Task {
    id: string
    title: string
    description: string
    completed: boolean
    archived: boolean

    constructor(id: string, title: string, description: string, completed: boolean, archived: boolean) {
        this.id = id
        this.title = title
        this.description = description
        this.completed = completed
        this.archived = archived
    }
    
    equals(otherTask: Task) {
        return this.id === otherTask.id &&
            this.title === otherTask.title &&
            this.description === otherTask.description &&
            this.completed === otherTask.completed &&
            this.archived === otherTask.archived
    }
}

export type TaskProps = {
    id: string
    title: string
    description: string
    completed: boolean
    archived: boolean
}