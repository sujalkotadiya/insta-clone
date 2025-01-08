import React from 'react'
import { RiCloseLine } from 'react-icons/ri'
import "../css/Modal.css"
import { useNavigate } from 'react-router-dom'

const Modal = ({ setModalOpen }) => {
    const navigate=useNavigate()
    return (
        <div className="darkBg" onClick={() => setModalOpen(false)}>
            <div className="centered">
                <div className='modal'>

                    <div className="modelHeader">
                        <h5 className="heading">Confirm</h5>
                    </div>

                    <button className="closeBtn" onClick={() => setModalOpen(false)}>
                        <RiCloseLine></RiCloseLine>
                    </button>
                    <div className="modalContent">
                        Are you sure you want to delete this item?
                    </div>
                    <div className="modalActions">
                        <div className="actionsContainer">
                            <button className="logOutBtn"
                                onClick={() => {
                                    setModalOpen(false)
                                    localStorage.clear()
                                    navigate('/signin')
                                }}>logout</button>
                            <button className="cancelBtn" onClick={() => setModalOpen(false)}>cancel</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Modal
