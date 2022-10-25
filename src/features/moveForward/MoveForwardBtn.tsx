import React from 'react'

import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
import { IconButton } from '@mui/material'

import {
  deleteAllTasks,
  deleteTask,
  moveAllTasksForward,
  moveTaskForward,
} from '../../common/lists/listReducer'

type PropsType = {
  listId: number
  listIndex?: number
  taskId?: number
  dispatchList: any
  fullListForwardMode: boolean
}

export const MoveForwardBtn = ({
  listId,
  listIndex,
  taskId,
  dispatchList,
  fullListForwardMode,
}: PropsType) => {
  const moveForwardHandler = () => {
    if (fullListForwardMode) {
      if (listIndex === 0 || listIndex) {
        dispatchList(moveAllTasksForward(listId, listIndex))
        dispatchList(deleteAllTasks(listId))
      }
    } else {
      if ((listIndex === 0 || listIndex) && (taskId === 0 || taskId)) {
        //условаия === 0 для работы первых элементов в листах
        dispatchList(moveTaskForward(listId, listIndex, taskId))
        dispatchList(deleteTask(listId, taskId))
      }
    }
  }

  return (
    <div>
      <IconButton
        color={'primary'}
        size="small"
        aria-label="moveForward"
        onClick={moveForwardHandler}
      >
        <DoubleArrowIcon />
      </IconButton>
    </div>
  )
}
