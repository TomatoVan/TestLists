import React from 'react'

import { DeleteItem } from '../../features/deleteItem/DeleteItem'
import { EditItem } from '../../features/editItem/EditItem'
import { MoveForwardBtn } from '../../features/moveForward/MoveForwardBtn'
import { ListType } from '../lists/listReducer'

import s from './Tasks.module.css'

export type PropsType = {
  list: ListType
  dispatchList: any
  listIndex: number
}

export const Tasks = ({ list, dispatchList, listIndex }: PropsType) => {
  return (
    <>
      {list.tasks.map((task, index) => (
        <div key={index} className={s.elemBlock}>
          <div className={s.elemBlock}>
            {listIndex === 1 ? ( //2 список
              <>
                <EditItem
                  dispatchList={dispatchList}
                  taskName={task}
                  taskIndex={index}
                  listId={list.id}
                />
                <MoveForwardBtn
                  fullListForwardMode={false}
                  dispatchList={dispatchList}
                  listIndex={listIndex}
                  listId={list.id}
                  taskId={index}
                />
                <div>
                  <DeleteItem dispatchList={dispatchList} taskIndex={index} listId={list.id} />
                </div>
              </>
            ) : (
              <>
                <div className={s.elem}>{task}</div>
                <div>
                  <MoveForwardBtn
                    fullListForwardMode={false}
                    dispatchList={dispatchList}
                    listId={list.id}
                    listIndex={listIndex}
                    taskId={index}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </>
  )
}
