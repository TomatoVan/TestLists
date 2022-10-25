import React, { ChangeEvent, useState } from 'react'

import EditIcon from '@mui/icons-material/Edit'
import { IconButton } from '@mui/material'

import { changeTask } from '../../common/lists/listReducer'
import s from '../../common/tasks/Tasks.module.css'

type PropsType = {
  taskIndex: number
  listId: number
  dispatchList: any
  taskName: string
}

export const EditItem = ({ taskIndex, listId, dispatchList, taskName }: PropsType) => {
  const [title, setTitle] = useState(taskName)
  const [editMode, setEditMode] = useState(false)

  const editTaskHandler = () => {
    setEditMode(true)
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onBlurHandler = () => {
    setEditMode(false)
    dispatchList(changeTask(title, listId, taskIndex))
  }

  return (
    <>
      {editMode ? (
        <input value={title} onChange={onChangeHandler} autoFocus onBlur={onBlurHandler} />
      ) : (
        <div className={s.elem}>{taskName}</div>
      )}
      <div>
        <IconButton color={'primary'} size="small" aria-label="editItem" onClick={editTaskHandler}>
          <EditIcon />
        </IconButton>
      </div>
    </>
  )
}
