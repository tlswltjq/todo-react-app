import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  InputBase,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";

const Todo = (props) => {
  const [item, setItem] = useState(props.item);
  const [readOnly, setReadOnly] = useState(true);
  const deleteItem = props.deleteItem;
  const editItem = props.editItem;

  const turnOffReadOnly = () => {
    setReadOnly(false);
  };
  const turnOnReadOnly = (e) => {
    if (e.key === "Enter" && readOnly === false) {
      setReadOnly(true);
      editItem(item)
    }
  };

  const deleEventHandler = () => {
    deleteItem(item);
  };
  const editEventHandler = (e) => {
    setItem({...item, title: e.target.value });
  };
  const checkboxEventHandler = (e) => {
    item.done = e.target.checked;
    // console.log(e.target.checked);
    editItem(item);
  };
  return (
    <ListItem>
      <Checkbox checked={item.done} onChange={checkboxEventHandler} />
      <ListItemText>
        <InputBase
          inputProps={{ "aria-label": "naked", readOnly: readOnly }}
          onClick={turnOffReadOnly}
          onKeyDown={turnOnReadOnly}
          onChange={editEventHandler}
          type="text"
          id={item.id}
          name={item.id}
          value={item.title}
          multiline={true}
          fullWidth={true}
        />
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete Todo" onClick={deleEventHandler}>
          <DeleteOutline />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Todo;
