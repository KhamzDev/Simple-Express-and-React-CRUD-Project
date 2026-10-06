import { useRef } from "react";
import "./AddCom.module.css";

function AddCom({ setUsers }) {

    const modalRef = useRef(null)

    const openAddModal = () => {
    modalRef.current?.showModal();
    }
    const closeAddModal = () => {
    modalRef.current?.close();
    }

    async function handleAddUser(e){

        e.preventDefault();

        const inputVals = e.target.elements;
        const userVal = inputVals.user.value;
        const usernameVal = inputVals.username.value;

        try{
            const response = await fetch("http://localhost:3000/api/users", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: userVal,
                    username: usernameVal,
                })
            })

            if(!response.ok) return console.log('could not post');

            const data = await response.json();
            setUsers(data)
            closeAddModal()
        }catch(err){
            console.log("not working", err)
        }
    }

    return (
        <div style={container}>
            <span onClick={openAddModal} style={addBtn}>Add User</span>
            <dialog ref={modalRef} style={modalStyle}>
            <form style={formStyle} onSubmit={handleAddUser}>
                <span style={closeBtn} onClick={closeAddModal}>X</span>
                <input placeholder="user" name="user" required></input>
                <input placeholder="username" name="username" required></input>
                <button type="submit">Submit</button>
            </form>
            </dialog>
        </div>
    )
}

export default AddCom

const container = {
    margin: "50px",
}

const addBtn = {
    width: "100px",
    height: "100px",
    backgroundColor: "#d6d6d6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
}

const modalStyle = {
    width: "400px",
    height: "450px",
    backgroundColor: "hsl(0, 5%, 90%)",
    border: "none",
    outline: "none",
    boxShadow: "2px 4px 10px hsla(0, 0%, 0%, 0.20)",
    justifySelf: "center",
    alignSelf: "center",
}

const formStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
}

const closeBtn = {
    width: "25px",
    height: "25px",
    position: "absolute",
    top: "5px",
    right: "5px",
    backgroundColor: 'red',
    border: "1px solid black",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
}