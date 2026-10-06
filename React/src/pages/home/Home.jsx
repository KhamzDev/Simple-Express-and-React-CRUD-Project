import { useState, useEffect } from 'react'
import AddCom from '../../components/add-com/AddCom'
import DisplayCom from '../../components/display-com/DisplayCom'
import styles from './Home.module.css'
import useFetch from '../../services/api/useFetch'

function Home() {

  const {data, loading, error} = useFetch("http://localhost:3000/api/users");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if(data){
      setUsers(data)
    }
  }, [data])

  if(loading || error) return <div>loading...</div>
  
  return (
    <div className={styles.container}>
      <AddCom setUsers={setUsers}/>
      <DisplayCom users={users} setUsers={setUsers}/>
    </div>
  )
}

export default Home