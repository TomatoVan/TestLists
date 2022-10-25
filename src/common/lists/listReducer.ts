export type ListType = {
  id: number
  name: string
  tasks: Array<string>
}
export type StateType = Array<ListType>

export const initialState: StateType = [
  {
    id: 0,
    name: 'firstList',
    tasks: ['123', 'hey', 'Mike', 'Carl'],
  },
  {
    id: 1,
    name: 'secondList',
    tasks: ['1111', '2222', '3333'],
  },
  {
    id: 2,
    name: 'thirdList',
    tasks: ['bread', 'milk', 'potato', 'pizza'],
  },
]

export const listReducer = (state: StateType, action: ListActionsType): StateType => {
  switch (action.type) {
    case 'LIST/MOVE-TASK-FORWARD': {
      const listFromMove = state.filter(list => list.id === action.payload.listId) //лист, с которого берем таску
      const taskToMove = listFromMove[0].tasks.filter((_, index) => index === action.payload.taskId) //таска, которую нужно переместить

      return state.map((list, index) => {
        const listIndex = //index листа, в который должны прийти данные
          state[state.length - 1].id === action.payload.listId //проверка является ли лист последним
            ? index + state.length - 1 //если последний, то перемещается таску листа в первый лист(index первого листа становится равным 2)
            : index - 1 //index след. листа

        return listIndex === action.payload.listIndex
          ? { ...list, tasks: [...list.tasks, taskToMove[0]] } //добавление таски из предыдущего листа
          : list
      })
    }

    case 'LIST/DELETE-TASK': {
      return state.map(list => {
        return list.id === action.payload.listId
          ? { ...list, tasks: list.tasks.filter((task, index) => index !== action.payload.taskId) } //удаляем таску при перемещении / удалении во втором листе
          : list
      })
    }

    case 'LIST/MOVE-ALL-TASKS-FORWARD': {
      const listFullFromMove = state.filter(list => list.id === action.payload.listId) //лист, с которого берем таски
      const tasksToMove = listFullFromMove[0].tasks //таски, которые нужно переместить

      return state.map((list, index) => {
        const listIndex = //index листа, в который должны прийти данные
          state[state.length - 1].id === action.payload.listId //проверка является ли лист последним
            ? index + state.length - 1 //если последний, то перемещается таску листа в первый лист(index первого листа становится равным 2)
            : index - 1 //index след. листа

        return listIndex === action.payload.listIndex
          ? { ...list, tasks: [...list.tasks, ...tasksToMove] } //добавление таски из предыдущего листа
          : list
      })
    }
    case 'LIST/DELETE-ALL-TASKS': {
      return state.map(list => {
        return list.id === action.payload.listId
          ? { ...list, tasks: [] } //удаляем таску при перемещении / удалении во втором листе
          : list
      })
    }
    case 'LIST/ADD-TASK': {
      return state.map(list => {
        return list.id === action.payload.listId
          ? { ...list, tasks: [action.payload.task, ...list.tasks] }
          : list
      })
    }
    case 'LIST/CHANGE-TASK': {
      return state.map(list => {
        return list.id === action.payload.listId
          ? {
              ...list,
              tasks: list.tasks.map((task, index) =>
                index === action.payload.taskIndex ? action.payload.title : task
              ),
            }
          : list
      })
    }
    default:
      return state
  }
}

export const moveTaskForward = (listId: number, listIndex: number, taskId: number) => {
  return { type: 'LIST/MOVE-TASK-FORWARD', payload: { listId, listIndex, taskId } } as const
}
export const deleteTask = (listId: number, taskId: number) => {
  return { type: 'LIST/DELETE-TASK', payload: { listId, taskId } } as const
}

export const moveAllTasksForward = (listId: number, listIndex: number) => {
  return { type: 'LIST/MOVE-ALL-TASKS-FORWARD', payload: { listId, listIndex } } as const
}

export const deleteAllTasks = (listId: number) => {
  return { type: 'LIST/DELETE-ALL-TASKS', payload: { listId } } as const
}

export const addTask = (listId: number, task: string) => {
  return { type: 'LIST/ADD-TASK', payload: { listId, task } } as const
}

export const changeTask = (title: string, listId: number, taskIndex: number) => {
  return { type: 'LIST/CHANGE-TASK', payload: { title, listId, taskIndex } } as const
}

export type MoveTaskForwardType = ReturnType<typeof moveTaskForward>
export type MoveAllTasksForwardType = ReturnType<typeof moveAllTasksForward>
export type DeleteTaskType = ReturnType<typeof deleteTask>
export type DeleteAllTasksType = ReturnType<typeof deleteAllTasks>
export type AddTaskType = ReturnType<typeof addTask>
export type ChangeTaskType = ReturnType<typeof changeTask>

export type ListActionsType =
  | MoveTaskForwardType
  | DeleteTaskType
  | MoveAllTasksForwardType
  | DeleteAllTasksType
  | AddTaskType
  | ChangeTaskType
