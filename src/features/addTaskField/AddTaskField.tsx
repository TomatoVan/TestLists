import React, { ChangeEvent, KeyboardEvent, useState } from 'react'

import { Button, TextField } from '@mui/material'

import { addTask } from '../../common/lists/listReducer'

import s from './AddTaskField.module.css'

type PropsType = {
  dispatchList: any
  listId: number
}

export const AddTaskField = ({ dispatchList, listId }: PropsType) => {
  let [title, setTitle] = useState('')
  let [error, setError] = useState<boolean>(false)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    if (error) setError(false)
    if (e.key === 'Enter') {
      addTaskHandler()
    }
  }

  const addTaskHandler = () => {
    if (title.trim() !== '') {
      dispatchList(addTask(listId, title.trim()))
      setTitle('')
    } else {
      setError(true)
    }
  }

  return (
    <div className={s.addTaskField}>
      <TextField
        inputProps={{ style: { background: 'aliceblue' } }}
        color={'primary'}
        id="outlined-basic"
        size="small"
        error={error}
        label={error ? 'Title is required' : 'Add new'}
        variant="outlined"
        value={title}
        onChange={onChangeHandler}
        onKeyUp={onKeyPressHandler}
        className={error ? 'error' : ''}
        style={{
          width: '150px',
        }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={addTaskHandler}
        style={{
          minWidth: '38px',
          minHeight: '38px',
          marginLeft: '10px',
        }}
      >
        +
      </Button>
    </div>
  )
}
