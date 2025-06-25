// import { useEffect, useRef } from 'react'
import './chatPagee.css'
import NewPrompt from '../../components/newPrompt/newPrompt'
import { useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import Loader from '../loader'
import Markdown from 'react-markdown'
import { IKImage } from 'imagekitio-react'
import { useClerk } from '@clerk/clerk-react'
function ChatPagee () {
  const clerk = useClerk()
  const { user } = clerk
  if (!user) return <p>No Image URL found</p>

  const { imageUrl,firstName } = user
  const params = new URLSearchParams()

  params.set('height', '200')
  params.set('width', '200')
  params.set('quality', '100')
  params.set('fit', 'crop')

  const imageSrc = `${imageUrl}?${params.toString()}`
  const path=useLocation().pathname
  const chatId=path.split('/').pop()
  
  // console.log("chat id",chatId)
  const { isPending, error, data } = useQuery({
    queryKey: ['chat',chatId],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`,{credentials:"include"}).then((res) =>
        res.json(
        ),
      ),
  })
  return (
    <div className='chatPage'>
       <div className="wrapper">
        <div className="chat">
          {
            isPending?<Loader/>:error?("Something went wrong"):
            (
            data?.history?.map((message,i)=>(
              <>
              {message.image&&(
                <IKImage
                urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                path={message.image}
                height="300"
                width="400"
                transformation={[{height:300,width:400}]}
                loading='lazy'
                lqip={{active:true,quality:20}}
                key={i}
                />
              )}
              {
                message.role==='model'?(<div className='modeldiv'>
                  <div className='gpticon'>
              <img src='/logo.png' height={16} width={16}/>
              {/* <span>SKSM GPT</span> */}
              </div>
                  <div className='message' key={i}>
                <Markdown>{message.parts[0].text}</Markdown>
                </div>
                </div>

              ):(<div className='userdiv'>
                <div className='usericon'>
                <img src={imageSrc} height={16} width={16}/>
                {/* <span>{firstName}</span> */}
                </div>
                <div className='message user' key={i}>
                  <Markdown>{message.parts[0].text}</Markdown>
              </div>
              </div>
                )}
              </>
            ))
          )
           }
         {data && <NewPrompt data={data}/>}
        </div>
       </div>
    </div>
  )
}
export default ChatPagee