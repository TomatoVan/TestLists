import React, { useReducer } from 'react'

import { AddTaskField } from '../../features/addTaskField/AddTaskField'
import { MoveForwardBtn } from '../../features/moveForward/MoveForwardBtn'
import { Tasks } from '../tasks/Tasks'

import { initialState, listReducer } from './listReducer'
import s from './Lists.module.css'

export const Lists = () => {
  const [lists, dispatchList] = useReducer(listReducer, initialState)

  return (
    <div className={s.lists}>
      {lists.map((list, index) => (
        <div key={index}>
          <div className={s.titleBlock}>
            <div className={s.title}>{list.name}</div>
            <MoveForwardBtn
              fullListForwardMode={true}
              dispatchList={dispatchList}
              listIndex={index}
              listId={list.id}
              taskId={index}
            />
          </div>
          {index === 1 && (
            <div>
              <AddTaskField dispatchList={dispatchList} listId={list.id} />
            </div>
          )}
          <div className={s.list}>
            <Tasks dispatchList={dispatchList} key={index} list={list} listIndex={index} />
          </div>
        </div>
      ))}
    </div>
  )
}
