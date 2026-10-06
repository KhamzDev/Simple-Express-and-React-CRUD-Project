import { useRef } from "react";
import styles from "./DisplayCom.module.css";
import AddModal from "./modal/AddModal";

function DisplayCom({users, setUsers}) {

    const modalRef = useRef(null)

    const openAddModal = () => {
        modalRef.current?.showModal();
    }
    const closeAddModal = () => {
        modalRef.current?.close();
    }

    async function handleDeleteUser(user){
        try{
            const response = await fetch(`http://localhost:3000/api/users/${user.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if(!response.ok) return console.log('could not Delete');

            const data = await response.text();
            console.log(data)
            setUsers(prev => prev.filter((u) => u.id !== user.id))
        }catch(err){
            console.log("not working", err)
        }     
    }
  
  return (
    <div className={styles.container}>
          {users.map((user) => (
            <div className={styles.div} key={user.id}>
              <span>{`id: ${user.id} user: ${user.user} username: ${user.username}`}</span>
              <div className={styles.div_edit}>
                <span onClick={openAddModal}>✏️</span>
                <span onClick={() => handleDeleteUser(user)}>🗑️</span>
              </div>
            <AddModal 
              modalRef={modalRef} 
              closeAddModal={closeAddModal} 
              user={user}
              setUsers={setUsers}/>
            </div>
          ))}
    </div>
  )
}

export default DisplayCom;