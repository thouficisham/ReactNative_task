 const MYAPP_BASE_URL = "http://192.168.0.104:3000"

 const myAppUsers = `${MYAPP_BASE_URL}/users`
 const TodoList =(userId)=> `${MYAPP_BASE_URL}/task?userid=${userId}`
 const postTask = `${MYAPP_BASE_URL}/task`
 const putTask = (taskId) => `${MYAPP_BASE_URL}/task/${taskId}`
 const deleteTask = (taskId) => `${MYAPP_BASE_URL}/task/${taskId}`

 export const MyAppApi = {
    myAppUsers,
    TodoList,
    postTask,
    putTask,
    deleteTask
 }