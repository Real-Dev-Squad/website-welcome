it('Check addTodo function is able add todo to todoList', () => {
  document.body.innerHTML = `
      <input id="newTodoInput" />
      <button id="addTodoBtn">Add todo</button>
      <ol id="todoList"></ol>
    `;
  require('./sample.js');
  const newTodoInput = document.getElementById('newTodoInput');
  const addTodoBtn = document.getElementById('addTodoBtn');
  const todolist = document.getElementById('todoList');
  newTodoInput.value = 'welcome to RDS';
  addTodoBtn.click();
  expect(todolist.innerHTML).toBe('<li>welcome to RDS</li>');
});
