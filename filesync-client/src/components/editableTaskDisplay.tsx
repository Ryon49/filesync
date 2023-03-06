import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useState, useRef } from "react"
import Task from "@/models/task"


export default function EditableTaskDisaply({ task, updateTask, removeTask }: TaskDisplayProp) {
    const [editing, setEditing] = useState(false)
    const [deleting, setDeleting] = useState(false)

    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const tagRef = useRef(null);

    const changeTaskStatus = () => {
        const newTask = new Task(task.id,
            task.title,
            task.description,
            !task.completed,
            task.archived)
        updateTask(newTask)
    }

    const startEdit = () => {
        setEditing(true)
    }

    const confirmEdit = () => {
        setEditing(false)

        const newTask = new Task(task.id,
            titleRef.current?.value!,
            descriptionRef.current?.value!,
            task.completed,
            task.archived)

        if (!newTask.equals(task)) {
            updateTask(newTask)
        }
    }

    const startDelete = () => {
        setDeleting(true)
    }

    const confirmDelete = () => {
        setDeleting(false)
        removeTask()
    }

    const discardAction = () => {
        setEditing(false)
        setDeleting(false)
    }

    return (
        <li className="flex flex-row items-start bg-white mr-4 mb-4 border-2">
            <div className="flex-none mx-4">
                <div className="flex flex-col items-center">
                    <div><input type="checkbox" className="w-4 h-4 mt-1" onChange={changeTaskStatus} checked={task.completed} /></div>


                    {/* Edit mode */}
                    {editing && <>
                        <button onClick={confirmEdit}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <button onClick={discardAction}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                            </svg>
                        </button>
                    </>}

                    {/* Delete mode */}
                    {deleting && <>
                        <button onClick={confirmDelete}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <button onClick={discardAction}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                            </svg>
                        </button>
                    </>}

                    {/* Normal view mode */}
                    {!editing && !deleting && <>
                        <button onClick={startEdit}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                                <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                            </svg>
                        </button>
                        <button onClick={startDelete}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </>}
                </div>
            </div>
            <div className="flex-1 flex-col">
                {editing && <>
                    <div className="flex"><input type="text" className="basis-1/2 placeholder:text-gray-500" ref={titleRef} defaultValue={task.title} /></div>
                    <div className="flex">
                        <textarea className="basis-3/4" rows={5} ref={descriptionRef} defaultValue={task.description}></textarea>
                    </div>
                    <div>WIP</div>
                </>}

                {!editing && <>
                    <div className={task.completed ? "line-through" : ""}>{task.title}</div>
                    <div className={task.completed ? "line-through" : ""}><ReactMarkdown className="ml-10" children={task.description} remarkPlugins={[remarkGfm]} /></div>
                    <div>Placeholder</div>
                </>}
            </div>
        </li>
    )
}

type TaskDisplayProp = {
    task: Task,
    updateTask: (_: Task) => void
    removeTask: () => void
}