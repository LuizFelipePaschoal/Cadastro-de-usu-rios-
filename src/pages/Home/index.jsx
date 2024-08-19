import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/api'


function Home() {

  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputCPF = useRef()
  const inputEmail = useRef()

  async function getUsers() {
    const usersFromApi = await api.get('/user')

    setUsers(usersFromApi.data)

  }
  async function createUsers() {
    await api.post('/user', {
      name: inputName.current.value,
      age: inputAge.current.value,
      cpf: inputCPF.current.value,
      email: inputEmail.current.value
    })
    getUsers()
  }

  async function deleteUsers(cpf) {
    await api.delete(`/user/${cpf}`)
    getUsers()
  }
  useEffect(() => {
    getUsers()
  }, [])


  return (

    <div className='container'>
      <form>
        <h1>user registration</h1>
        <input placeholder="Nome" name="name" type="text" ref={inputName} />
        <input placeholder="Age" name="age" type="number" ref={inputAge} />
        <input placeholder="CPF" name="cpf" type="cpf" ref={inputCPF} />
        <input placeholder="Email" name="email" type="email" ref={inputEmail} />
        <button type="button" onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map(user => (

        <div key={user.cpf} className='card'>
          <div>
            <p>Name: <span>{user.name}</span></p>
            <p>Age: <span>{user.age}</span></p>
            <p>CPF: <span>{user.cpf}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.cpf)}>
            <img src={Trash} />
          </button>
        </div>

      ))}


    </div>

  )
}

export default Home
