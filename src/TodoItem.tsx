// import { Trash } from "lucide-react";

// type Priority = 'Urgente' | 'Moyenne' | 'Basse';

// type Todo = {
//   id : number;
//   text : string;
//   priority: Priority;
// }

// type Props = {
//     todo : Todo
//     onDelete:  () => void
//     isSelected : boolean
//     onToggleSelect: (id:number)=> void
// }
// const TodoItem = ({todo, onDelete , isSelected, onToggleSelect} : Props) => {
//   return (
//     <li className="p-3">
//         <div className="flex justify-between items-center">
//             <div className="flex items-center gap-2">
//                 <input
//                  type="checkbox"  
//                 className="checkbox checkbox-primary checkbox-sm"
//                 checked={isSelected}
//                 onChange={() => onToggleSelect(todo.id)}
//                  />

//                  <span className="text-md font-bold">
//                     <span>{todo.text}</span>
//                  </span>

//                  <span className={`badge badge-sm badge-soft
//                     ${todo.priority === "Urgente" 
//                         ?"badge-error"
//                         : todo.priority === "Moyenne"
//                         ?"badge-warning"
//                         :"badge-success"
//                      }`}>
//                     {todo.priority}
//                  </span>
//             </div>
//                 <button
//                 onClick={onDelete}
//                 className="btn btn-sm btn-error btn-soft"
//                 >
//                     <Trash className="w-4 h-4"/>
//                 </button>
//         </div>
//     </li>
//   )
// }

// export default TodoItem

// VERSION AMELIOREE ET EDITION

import { useState } from "react";
import { Edit2, Trash2, Save, X } from "lucide-react";

type Priority = 'Urgente' | 'Moyenne' | 'Basse';

type Todo = {
  id: number;
  text: string;
  priority: Priority;
}

interface TodoItemProps {
  todo: Todo;
  isSelected: boolean;
  onDelete: () => void;
  onToggleSelect: () => void;
  onEdit: (newText: string, newPriority: Priority) => void;
}

function TodoItem({ todo, isSelected, onDelete, onToggleSelect, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState<Priority>(todo.priority);

  const priorityColors = {
    Urgente: "bg-error/20 border-error text-error",
    Moyenne: "bg-warning/20 border-warning text-warning", 
    Basse: "bg-success/20 border-success text-success"
  };

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(editText.trim(), editPriority);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setEditPriority(todo.priority);
    setIsEditing(false);
  };

  return (
    <div className={`
      border rounded-lg p-4 transition-all duration-200
      ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}
      ${priorityColors[todo.priority]}
      hover:shadow-md
    `}>
      {isEditing ? (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="input input-bordered input-sm flex-1"
            autoFocus
          />
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value as Priority)}
            className="select select-bordered select-sm w-full sm:w-32"
          >
            <option value="Urgente">Urgente</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Basse">Basse</option>
          </select>
          <div className="flex gap-2 justify-end sm:justify-start">
            <button onClick={handleSave} className="btn btn-success btn-sm">
              <Save className="w-4 h-4" />
            </button>
            <button onClick={handleCancel} className="btn btn-ghost btn-sm">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelect}
            className="checkbox checkbox-primary"
          />
          
          <div className="flex-1">
            <p className="font-medium">{todo.text}</p>
            <span className={`badge badge-sm ${priorityColors[todo.priority]}`}>
              {todo.priority}
            </span>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setIsEditing(true)}
              className="btn btn-ghost btn-sm btn-square"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button 
              onClick={onDelete}
              className="btn btn-ghost btn-sm btn-square text-error"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoItem;