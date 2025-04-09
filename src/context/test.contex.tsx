// import { useState, createContext, useEffect } from "react";
// import axios from "axios";

// const todoContext = createContext<{
//     id: number,
//     title: string,
//     author: string,
//     content: string,
// }>

// function TodoProvider({ children }: { children: React.ReactNode }) {
//     const [selectedTodo, setSelectedTodo] = useState<{
//         id: number,
//         title: string,
//         author: string,
//         content: string,
//     } | null>(null);

//     useEffect(() => {
//         // Fetch todos from API when component mounts
//         const fetchTodo = async (id: number) => {
//             try {
//                 // Fetch specific todo by ID
//                 const response = await axios.get(`http://localhost:8000/blogs/${id}`);
//                 if (response.data) {
//                     setSelectedTodo(response.data);
//                 }
//             } catch (error) {
//                 console.error('Error fetching todo:', error);
//             }
//         };

//         // Example: fetch todo with ID 1
//         fetchTodo(1);
//     }, []);
//     return (
//         <todoContext.Provider value={{ id,title,author,content }}>
//             {children}
//         </todoContext.Provider>
//     );
// }
