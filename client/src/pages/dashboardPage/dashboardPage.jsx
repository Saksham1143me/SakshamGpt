import { useMutation, useQueryClient } from '@tanstack/react-query'
import './dashboardPage.css'
import { useNavigate } from 'react-router-dom'
function DashboardPage () {
  const queryClient=useQueryClient()
  const navigate=useNavigate()
  const mutation = useMutation({
    mutationFn: async (text) => {
      console.log("hihiii");
      console.log(import.meta.env.VITE_API_URL)
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      console.log("Response:", response);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const result = await response.json();
      console.log("Parsed Response JSON:", result);
      return result;
    },
    onSuccess:(_id)=>{
      console.log("success in dashboard")
      queryClient.invalidateQueries({queryKey:['userChats']})
      console.log("idi",_id)
      navigate(`/dashboard/chats/${_id}`)
    }
  })
  const handleSubmit=async(e)=>{
    console.log("inside dashboard")
    e.preventDefault()
   const text=e.target.text.value
   if(!text){
    return
   }
   mutation.mutate(text)
   e.target.text.value=''
  }
  return (
    <div className='dashboardPage'>
      <div className="texts">
          <div className="logo">
            <img src='/logo.png' alt='logo'></img>
            <h1>SKSM GPT</h1>
          </div>
        <div className="options">
        <div className="option">
          <img src='/chat.png' alt='chat'></img>
          <span>Create a New Chat</span>
        </div>  
        <div className="option">
          <img src='/image.png' alt='chat'></img>
          <span>Analyze Images</span>
        </div>  
        <div className="option">
          <img src='/code.png' alt='chat'></img>
          <span>Help me with my code</span>
        </div>  
        </div>
        </div>     
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <input type='text' name='text' placeholder='Ask anything...'></input>
          <button type='Submit'>
            <img src='/arrow.png' alt='send'></img>
          </button>
        </form>
        </div> 
    </div>
  )
}
export default DashboardPage