import React, { useState, useEffect } from "react";
import "./App.css";
import Todo from "./Todo";
import {
  AppBar,
  Container,
  List,
  Paper,
  Toolbar,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { call, signout } from "./service/ApiService";
import AddTodo from "./AddTodo";
import { cleanup } from "@testing-library/react";
function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    call("/todo", "GET", null).then((response) => {
      setItems(response.data);
      setLoading(false);
    });
  }, [cleanup]);

  const addItem = (item) => {
    call("/todo", "POST", item).then((response) => setItems(response.data));
  };

  const deleteItem = (item) => {
    call("/todo", "DELETE", item).then((response) => setItems(response.data));
  };

  const editItem = (item) => {
    call("/todo", "PUT", item).then((response) => setItems(response.data));
  };

  let todoItems = (
    <Paper style={{ margin: 16 }}>
      <List>
        {items.map((item) => (
          <Todo
            item={item}
            key={item.id}
            editItem={editItem}
            deleteItem={deleteItem}
          />
        ))}
      </List>
    </Paper>
  );
  let navigationBar = (
    <AppBar position="static">
      <Toolbar>
        <Grid justifyContent="space-between" container>
          <Grid item>
            <Typography variant="h6">Todo</Typography>
          </Grid>
          <Grid item>
            <Button color="inherit" raised onClick={signout}>
              로그아웃
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );

  let todoListPage = (
    <div className="App">
      {navigationBar}
      <Container maxWidth="md">
        <AddTodo addItem={addItem} />
        <div className="TodoList">{todoItems}</div>
      </Container>
    </div>
  );
  let loadingPage = <h1>Loading...</h1>;
  let content = loadingPage;
  if (!loading) {
    content = todoListPage;
  }
  return <div className="App">{content}</div>;
}

export default App;
