import EditableTaskDisaply from "@/components/editableTaskDisplay";
import Task from "@/models/task";
import { useImmer } from "use-immer";
import { useEffect, useState, useCallback } from "react";
import axios from 'axios';

const serverAddr = process.env.SERVER_ADDR
const api = "api/todo"
const baseResource = `${serverAddr}/${api}`

export default function Page() {
    // Template from https://dribbble.com/shots/17884346-Disy-Task-management
    const [tasks, setTasks] = useImmer<Task[]>([])
    // A quick display for results returned from network request
    const [debugMessage, setDebugMessage] = useState("None")

    useEffect(() => {
        axios.get(baseResource).then((resp) => {
            var tasks: Array<Task> = resp.data
            setTasks(tasks)
        })
    }, [])

    const addTask = () => {
        axios.put(baseResource, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then((resp) => {
            setTasks(draft => {
                var data = resp.data
                var newTask = new Task(data.id, data.title, data.description,
                    data.completed, data.archived)
                draft.push(newTask)
                console.log(newTask)
            })
        })


    }

    const updateTask = useCallback((updatedTask: Task) => {
        setTasks(draft => {
            // update the tasks
            const index = draft.findIndex((task) => task.id == updatedTask.id)
            draft[index] = updatedTask

            // send the updatedTask to server
            const formdata = new FormData()
            formdata.append("id", updatedTask.id)
            formdata.append("title", updatedTask.title)
            formdata.append("description", updatedTask.description)
            formdata.append("completed", JSON.stringify(updatedTask.completed))
            formdata.append("archived", JSON.stringify(updatedTask.archived))

            const resource = `${serverAddr}/${api}/${updatedTask.id}`
            axios.put(resource, formdata)
        })
    }, [])

    const removeTask = useCallback((id: string) => {
        const resource = `${serverAddr}/${api}/${id}`
        setTasks(draft => {
            const index = draft.findIndex((task) => task.id == id)
            draft.splice(index, 1)
        })

        axios.delete(resource).then((resp) => {
            // todo
        })
    }, [])

    return (
        <div className="h-screen flex flex-col bg-gray-100 p-4 overflow-y-scroll">
            <div className="flex-none mb-4 text-lg">Implementation Roadmap:</div>
            <div className="flex-none mb-4">
                <label htmlFor="AddNewTaskButton" className="m-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center cursor-pointer">
                    <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                    </svg>
                    <span>New Task</span>
                </label>
                <input id="AddNewTaskButton" type="button" className="m-1 hidden" onClick={addTask} />
            </div>
            <div>Debug: {debugMessage}</div>
            {tasks.length == 0 && <div className="flex-none">No roadmap</div>}

            {tasks.length > 0 && <ul className="flex-none">
                {tasks.filter((task) => !task.completed).map((task, index) =>
                    <EditableTaskDisaply key={index} task={task} updateTask={updateTask} removeTask={() => removeTask(task.id)}/>
                )}
            </ul>}

            <div className="flex-none mb-4 text-lg">Completed:</div>
            {tasks.length > 0 && <ul className="flex-none">
                {tasks.filter((task) => task.completed).map((task, index) =>
                    <EditableTaskDisaply key={index} task={task} updateTask={updateTask} removeTask={() => removeTask(task.id)}/>
                )}
            </ul>}
        </div>
    )
}