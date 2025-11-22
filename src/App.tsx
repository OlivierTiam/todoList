// import {useEffect, useState } from "react";
// import TodoItem from "./TodoItem";
// import { Construction } from "lucide-react";

// type Priority = 'Urgente' | 'Moyenne' | 'Basse';

// type Todo = {
//   id : number;
//   text : string;
//   priority: Priority;
// }

// function App() {
//   const [input, setInput] = useState<string>("")
//   const [priority, setPriority] = useState<Priority>("Moyenne")

//   const savedTodos = localStorage.getItem("todos")
//   const initialTodos = savedTodos ? JSON.parse(savedTodos) : []
//   const [todos, setTodos] = useState<Todo[]>(initialTodos)
//   const [filter, setFilter] = useState<Priority | "Tous">("Tous")

//   useEffect (()=>{
//     localStorage.setItem("todos", JSON.stringify(todos))
//   },[todos])

//   function addTodo(){
//     if(input.trim() === "") {
//       return;
//     }
//     const newTodo: Todo = {
//       id: Date.now(),
//       text: input.trim(),
//       priority: priority
//     };

//     const newTodos = [newTodo , ...todos]
//     setTodos(newTodos)
//     setInput("")
//     setPriority("Moyenne")
//     console.log(newTodos);
    
//   }

//   let filteredTodos: Todo[] = []

//   if (filter === "Tous"){
//     filteredTodos = todos
//   }else{
//     filteredTodos = todos.filter((todo) => todo.priority === filter)
//   }

//   const urgentCount = todos.filter ((t) => t.priority === "Urgente").length
//   const mediumCount = todos.filter ((t) => t.priority === "Moyenne").length
//   const lowCount = todos.filter ((t) => t.priority === "Basse").length
//   const totalCount = todos.length

//   function deleteTodo(id: number){
//     const newTodo = todos.filter((todo)=> todo.id !== id)
//     setTodos(newTodo)
//   }

//   const [selectedTodos , setSelectedTodos] = useState<Set<number>>(new Set())


// function toggleSelectedTod (id : number){
//   const newSelected = new Set(selectedTodos)
//   if (newSelected.has(id)){
//     newSelected.delete(id)
//   }else{
//     newSelected.add(id)
//   }
//   setSelectedTodos(newSelected)
// }

// function finishSelected() {
//   const newTodos = todos.filter((todo)=>{
//     if(selectedTodos.has(todo.id)){
//       return false
//     }else{
//       return true
//     }
//   })

//   setTodos(newTodos)
//   setSelectedTodos(new Set() )
// }

//   return (
//     <div className="flex justify-center">
//       <div className="w-2/3 flex flex-col gap-4 my-15 bg-base-300 p-5 rounded-2xl">
//         <div className="flex gap-4">
//           <input 
//             type="text"
//             className="input w-full" 
//             placeholder="Ajouter une tache..."
//             value={input}
//             onChange={(e)=>setInput(e.target.value)}
//           />
//           <select 
//             className="select  w-full"
//             value={priority}
//             onChange={(e)=>setPriority(e.target.value as Priority)}
//           >
            
//             <option value="Urgente">Urgente</option>
//             <option value="Moyenne">Moyenne</option>
//             <option value="Basse">Basse</option>
//           </select>

//           <button 
//             onClick={addTodo}
//             className="btn btn-primary">
//             Ajouter
//           </button>
//         </div>
//         <div className="space-y-2 flex-1 h-fit">
//           <div className="flex items-center justify-between">
//           <div className="flex flex-wrap gap-4">
//             <button 
//               className={`btn btn-soft ${filter === "Tous" ? "btn-primary" :""}`}
//               onClick={() => setFilter("Tous")}
//             >
//               Tous({totalCount})
//             </button>
//             <button 
//               className={`btn btn-soft ${filter === "Urgente" ? "btn-primary" :""}`}
//               onClick={() => setFilter("Urgente")}
//             >
//               Urgente({urgentCount})
//             </button>
//             <button 
//               className={`btn btn-soft ${filter === "Moyenne" ? "btn-primary" :""}`}
//               onClick={() => setFilter("Moyenne")}
//             >
//               Moyenne({mediumCount})
//             </button>
//             <button 
//               className={`btn btn-soft ${filter === "Basse" ? "btn-primary" :""}`}
//               onClick={() => setFilter("Basse")}
//             >
//               Basse({lowCount})
//             </button>
         
//           </div>
//              <button
//              onClick={finishSelected}
//             className="btn btn-primary"
//             disabled = {selectedTodos.size == 0}>
//               Finir la selection ({selectedTodos.size})
//             </button>
//           </div>
          

//           {filteredTodos.length > 0 ? (
//             <ul className="divide-y divide-primary/20 ">
//               {filteredTodos.map((todo) => (
//                 <li key={todo.id} >
//                   <TodoItem 
//                    todo = {todo}
//                    isSelected={selectedTodos.has(todo.id)}
//                    onDelete={() => deleteTodo(todo.id)}
//                    onToggleSelect ={toggleSelectedTod}
//                    />
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <div className="flex justify-center items-center flex-col p-5">
//               <div>
//                 <Construction strokeWidth={1} className="w-40 h-40 text-primary"/>
//               </div>
//               <p className="text-sm">Aucune teche pour ce filtre</p>
//             </div>
//           )}

//         </div>

//       </div>
      
//     </div>
//   )
// }

// export default App

// VERSION AMELIOREE ET EDITION

import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { Construction, Plus, Filter, CheckCircle2 } from "lucide-react";

type Priority = 'Urgente' | 'Moyenne' | 'Basse';

type Todo = {
  id: number;
  text: string;
  priority: Priority;
}

function App() {
  const [input, setInput] = useState<string>("")
  const [priority, setPriority] = useState<Priority>("Moyenne")
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768)

  const savedTodos = localStorage.getItem("todos")
  const initialTodos = savedTodos ? JSON.parse(savedTodos) : []
  const [todos, setTodos] = useState<Todo[]>(initialTodos)
  const [filter, setFilter] = useState<Priority | "Tous">("Tous")

  // Gestion du responsive
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  function addTodo() {
    if(input.trim() === "") {
      return;
    }
    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      priority: priority
    };

    const newTodos = [newTodo, ...todos]
    setTodos(newTodos)
    setInput("")
    setPriority("Moyenne")
  }

  let filteredTodos: Todo[] = []

  if (filter === "Tous"){
    filteredTodos = todos
  } else {
    filteredTodos = todos.filter((todo) => todo.priority === filter)
  }

  const urgentCount = todos.filter((t) => t.priority === "Urgente").length
  const mediumCount = todos.filter((t) => t.priority === "Moyenne").length
  const lowCount = todos.filter((t) => t.priority === "Basse").length
  const totalCount = todos.length

  function deleteTodo(id: number) {
    const newTodo = todos.filter((todo) => todo.id !== id)
    setTodos(newTodo)
  }

  const [selectedTodos, setSelectedTodos] = useState<Set<number>>(new Set())

  function toggleSelectedTodo(id: number) {
    const newSelected = new Set(selectedTodos)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedTodos(newSelected)
  }

  function finishSelected() {
    const newTodos = todos.filter((todo) => {
      if(selectedTodos.has(todo.id)) {
        return false
      } else {
        return true
      }
    })

    setTodos(newTodos)
    setSelectedTodos(new Set())
  }

  // Fonction pour éditer une todo
  function editTodo(id: number, newText: string, newPriority: Priority) {
    const newTodos = todos.map(todo => 
      todo.id === id ? { ...todo, text: newText, priority: newPriority } : todo
    )
    setTodos(newTodos)
  }

  return (
    <div className="flex justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl flex flex-col gap-4 my-8 bg-base-300 p-4 sm:p-6 rounded-2xl">
        {/* Header avec titre */}
        <div className="text-center mb-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">Ma TodoList</h1>
          <p className="text-sm text-base-content/70 mt-1">
            {totalCount} tâche{totalCount > 1 ? 's' : ''} au total
          </p>
        </div>

        {/* Formulaire d'ajout */}
        <div className={`flex gap-3 ${isMobile ? 'flex-col' : 'flex-row '} `}>
          <input 
            type="text"
            className="input input-bordered flex-1 w-full" 
            placeholder="Ajouter une tâche..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          />
          
          <select 
            className={`select select-bordered ${isMobile ? 'w-full' : 'w-32'}`}
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option value="Urgente">Urgente</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Basse">Basse</option>
          </select>

          <button 
            onClick={addTodo}
            className={`btn btn-primary ${isMobile ? 'w-full' : 'px-6'}`}
          >
            {isMobile ? <Plus className="w-5 h-5" /> : "Ajouter"}
          </button>
        </div>

        {/* Filtres et actions */}
        <div className="space-y-4">
          {/* Filtres */}
          <div className="bg-base-200 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4" />
              <span className="font-medium">Filtrer par priorité</span>
            </div>
            
            <div className={`flex gap-2 ${isMobile ? 'flex-col' : 'flex-row flex-wrap'}`}>
              <button 
                className={`btn btn-sm flex-1 justify-center ${filter === "Tous" ? "btn-primary" : "btn-ghost"}`}
                onClick={() => setFilter("Tous")}
              >
                Tous ({totalCount})
              </button>
              <button 
                className={`btn btn-sm flex-1 justify-center ${filter === "Urgente" ? "btn-primary" : "btn-ghost"}`}
                onClick={() => setFilter("Urgente")}
              >
                Urgente ({urgentCount})
              </button>
              <button 
                className={`btn btn-sm flex-1 justify-center ${filter === "Moyenne" ? "btn-primary" : "btn-ghost"}`}
                onClick={() => setFilter("Moyenne")}
              >
                Moyenne ({mediumCount})
              </button>
              <button 
                className={`btn btn-sm flex-1 justify-center ${filter === "Basse" ? "btn-primary" : "btn-ghost"}`}
                onClick={() => setFilter("Basse")}
              >
                Basse ({lowCount})
              </button>
            </div>
          </div>

          {/* Action de sélection */}
          {selectedTodos.size > 0 && (
            <div className="bg-warning/20 p-3 rounded-lg border border-warning">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-warning" />
                  <span className="font-medium">
                    {selectedTodos.size} tâche{selectedTodos.size > 1 ? 's' : ''} sélectionnée{selectedTodos.size > 1 ? 's' : ''}
                  </span>
                </div>
                <button
                  onClick={finishSelected}
                  className="btn btn-warning btn-sm"
                >
                  Terminer la sélection
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Liste des todos */}
        <div className="flex-1 min-h-0">
          {filteredTodos.length > 0 ? (
            <ul className="space-y-2 max-h-96 overflow-y-auto">
              {filteredTodos.map((todo) => (
                <li key={todo.id}>
                  <TodoItem 
                    todo={todo}
                    isSelected={selectedTodos.has(todo.id)}
                    onDelete={() => deleteTodo(todo.id)}
                    onToggleSelect={() => toggleSelectedTodo(todo.id)}
                    onEdit={(newText, newPriority) => editTodo(todo.id, newText, newPriority)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex justify-center items-center flex-col p-8 text-center">
              <Construction strokeWidth={1} className="w-24 h-24 sm:w-32 sm:h-32 text-primary/50 mb-4" />
              <p className="text-base-content/70 text-lg font-medium mb-2">Aucune tâche</p>
              <p className="text-base-content/50 text-sm">
                {filter === "Tous" 
                  ? "Commencez par ajouter votre première tâche !" 
                  : `Aucune tâche avec le filtre "${filter}"`
                }
              </p>
            </div>
          )}
        </div>

        {/* Statistiques en bas */}
        {todos.length > 0 && (
          <div className="bg-base-200 p-3 rounded-lg mt-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-error/10 p-2 rounded">
                <div className="text-error font-bold">{urgentCount}</div>
                <div className="text-xs text-error/70">Urgentes</div>
              </div>
              <div className="bg-warning/10 p-2 rounded">
                <div className="text-warning font-bold">{mediumCount}</div>
                <div className="text-xs text-warning/70">Moyennes</div>
              </div>
              <div className="bg-success/10 p-2 rounded">
                <div className="text-success font-bold">{lowCount}</div>
                <div className="text-xs text-success/70">Basses</div>
              </div>
              <div className="bg-primary/10 p-2 rounded">
                <div className="text-primary font-bold">{totalCount}</div>
                <div className="text-xs text-primary/70">Total</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App