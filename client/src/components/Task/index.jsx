import { useState } from "react"


function Task () {
    const [ task, setTask] = useState ('')
    const handleChange = e => {
    
        setTask(e.target.value)



    }
    return (
        <div>
            <form>
                <label>Creat a New Task</label>
                <input placeholder=" Enter" type="text" name="task" onChange={handleChange} value={task}/>
            </form>
        </div>

    )
}

export default Task


