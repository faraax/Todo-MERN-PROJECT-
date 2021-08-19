import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';

const App = () => {

  const [todo, setTodo] = useState([]);
  const [list, setToList] = useState({ todo: '' });

  const fetchData = async () => {
    const { data } = await axios.get('https://merntodoappbyfaraz.herokuapp.com/api');
    return data
  }

  useEffect(() => {
    const getData = async () => {
      const getDataFrmDB = await fetchData();
      (getDataFrmDB) ? setTodo(getDataFrmDB) : setTodo([])
    }
    getData()
  }, [todo])

  const onSubmitForm = async (e) => {
    e.preventDefault()
    try {
      await axios.post('https://merntodoappbyfaraz.herokuapp.com/api/addtodo', list)
      // console.log(addToList)
    } catch (err) {
      // console.log('==>', err)
      alert("Please Fill the Input")
    }
    e.target.children[0].childNodes[1].value = ''
    setToList({ todo: '' })
  }

  const addToDB = async (e) => {
    const newList = { ...list }
    newList[e.target.className] = e.target.value
    setToList(newList)
  }

  const clearList = async (e) => {
    e.preventDefault()
    try {
      await axios.post('https://merntodoappbyfaraz.herokuapp.com/api/deleteData');
      // console.log(deleteAll);
    } catch (err) {
      console.log(err)
    }
  }

  const deleteTodo = async (e) => {
    e.preventDefault();
    const name = e.target.parentNode.firstChild.innerText;
    try {
      const id = todo;
      id.map(async (data, index) => {
        if (data.todo === name) {
          await axios.delete(`https://merntodoappbyfaraz.herokuapp.com/api/${data._id}`);
          // console.log(deleteTodo)
        }
      })
    } catch (err) {
      console.log(err);
    }
  }

  const edit = async (e) => {
    const name = e.target.parentNode.firstChild.innerText;
    const inp = prompt(`Enter the new todo to replace ${name}`)
    todo.map(async (data) => {
      if (data.todo === name) {
        let id = data._id
        try {
          await axios.put(`https://merntodoappbyfaraz.herokuapp.com/api/${id}`, { todo: inp });
          // console.log(updateData)
        } catch (err) {
          console.log(err);
        }
      }

    })

  }
  return (
    <div className="App">
      <form onSubmit={onSubmitForm}>
        <div className="header">
          <div className="lines">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <input type="text" name="todo" className='todo' onChange={addToDB} placeholder="What to todo today ?" />
          <button className='btn'>Submit</button>
          <button className='btn' onClick={clearList}>Clear list</button>
        </div>
      </form>
      <div className="form">
        <ul>
          {
            todo.map((data, index) =>
              <li key={index}>
                <div className='list'>
                  {data.todo}
                </div>
                <button className='btn' onClick={edit}>Edit</button>
                <button className='btn' onClick={deleteTodo}>Delete</button>
              </li>
            )
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
