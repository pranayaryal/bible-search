import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';

const Chat = () => {
  const [open, setOpen] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const [formState, setFormState] = useState({
    email: {
      value: "",
      error: ""

    },
    message: {
      value: "",
      error: ""
    }

  })

  const dropIn = {
    hidden: {
      y: "4vh",
      opacity: 0
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.2,
        type: "stiff",
        damping: 25
      }

    },
    exit: {
      y: "4vh",
      opacity: 0
    }
  }

  const onChangeHandler = (field, value) => {
    let state = {
      [field]: {
        value,
        error: null
      }
    };
    setFormState({...formState, ...state})
  }

  const handleSubmit = async () => {
    let {email, message} = formState;
    let updatedState = {...formState}
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.value){
      updatedState.email.error = `Oops! Email cannot be empty`
      setFormState({...updatedState})
      return;
    }

    if (!message.value){
      updatedState.message.error = "Oops! Message cannot be empty"
      setFormState({...updatedState})
      return;
    }

    // Everything is fine, proceed with the call
    


  }

  return (
    <div>

    </div>
  )
};

export default Chat;