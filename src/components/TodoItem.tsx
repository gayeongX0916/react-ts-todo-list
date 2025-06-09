const TodoItem = () => {
  return (
    <div className="todo-item">
      <div className="todo-item-left-wrapper">
        <input type="checkbox" className="todo-input-checkbox" />
        <span>강아지 산책 시키기</span>
      </div>
      <div className="todo-item-button-wrapper">
        <button>수정</button>
        <button>삭제</button>
      </div>
    </div>
  );
};

export default TodoItem;
