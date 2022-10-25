import React from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from '@mui/material'

import { deleteTask } from '../../common/lists/listReducer'

type PropsType = {
  taskIndex: number
  listId: number
  dispatchList: any
}

export const DeleteItem = ({ taskIndex, listId, dispatchList }: PropsType) => {
  const deleteTaskHandler = (taskIndex: number) => {
    dispatchList(deleteTask(listId, taskIndex))
  }

  return (
    <>
      <IconButton
        color={'primary'}
        size="small"
        aria-label="deleteItem"
        onClick={() => deleteTaskHandler(taskIndex)}
      >
        <DeleteIcon />
      </IconButton>
    </>
  )
}
