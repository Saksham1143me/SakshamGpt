import { useEffect, useRef, useState } from 'react'
import './newPrompt.css'
import Upload from '../upload/upload'
import { IKImage } from 'imagekitio-react'
import Loader from '../../pages/loader'
import model from '../../utils/gemini'
import  Markdown from 'react-markdown'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useClerk } from '@clerk/clerk-react'
import Spinner from '../spinner/spinner'
function NewPrompt ({data}) {

  const clerk = useClerk()
  const { user } = clerk
  if (!user) return <p>No Image URL found</p>

  const { imageUrl} = user
  const params = new URLSearchParams()

  params.set('height', '200')
  params.set('width', '200')
  params.set('quality', '100')
  params.set('fit', 'crop')
  const imageSrc = `${imageUrl}?${params.toString()}`

  const [question,setQuestion]=useState('')
  const [answer,setAnswer]=useState('')
  const navigate=useNavigate()
  const [image,setImage]=useState({
    isLoading:false,
    error:'',
    dbData:{},
    aiData:{}
  })
  const endRef=useRef(null)

  const chat = model.startChat({
    history: [
      // data?.history?.map(({role,parts})=>({
      //   role,
      //   parts:[{text:parts[0].text}]
      // }))
    ],
    generationConfig:{
      // maxOutputTokens:100
    }
  });
const [loading,setLoading]=useState(false)
  const add=async(text,isInitial)=>{
    // console.log("text",text)
    try {
      if(!isInitial) {
        setQuestion(text)
      }
      const result=await chat.sendMessageStream(Object.entries(image.aiData).length?[image.aiData,text]:[text])
      console.log("result",result)
    let accumulatedText=""
    // setLoading(true)
    for await (const chunk of result.stream){
      const chunkText=chunk.text()
      console.log(chunkText)
      accumulatedText+=chunkText
      setAnswer(accumulatedText)
      // setLoading(false)
    }
    mutation.mutate()
    console.log("answer",answer)
    } catch (error) {
      console.log(error)
    }
  }

    useEffect(()=>{
        endRef.current.scrollIntoView({behavior:"smooth"})
   },[data,question, answer,image.dbData])

   const queryClient=useQueryClient()
   const mutation=useMutation({
   mutationFn:async()=>{
     return await fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data?._id}`,{
       method:'PUT',
       credentials:"include",
       headers:{
         "Content-Type":"application/json"
       },
       body:JSON.stringify({
        question:question.length?question:undefined,
        answer:answer,
        image:image.dbData?.filePath || undefined,
      })
     }).then((res)=>res.json())
   },
     onSuccess:()=>{
       queryClient.invalidateQueries({queryKey:['chat',data?._id]})
       .then(()=>{
        setAnswer('')
        setQuestion('')
        setImage(
          {isLoading:false,
          error:'',
          dbData:{},
          aiData:{}
       })
       console.log(`/dashboard/chats/${data?._id}`)
       navigate(`/dashboard/chats/${data._id}`)
       })
     },
     onError:(err)=>{
         console.log(err)    
     }
   })

   const handleSubmit=async(e)=>{
    e.preventDefault()
    const text=e.target.text.value
    if(!text) return
    add(text,false)
    e.target.text.value=''
   }
const hasRun=useRef(false)
   useEffect(()=>{
    if(!hasRun.current){
    if(data?.history?.length===1){
      add(data.history[0].parts[0].text,true)
    }
  }
  hasRun.current=true
   },[])
  return (
    <>
    {
      image?.isLoading &&(
       <Spinner/>
      )
    }
    {
      image?.dbData?.filePath &&(
        <IKImage
        urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
        path={image?.dbData?.filePath}
        width="380"
        transformation={[{width:"380"}]}
        />
      )
    }
    {question&&(<div className='userdiv'>
                    <div className='usericon'>
                    <img src={imageSrc} height={16} width={16}/>
                    {/* <span>{firstName}</span> */}
                    </div>
                    <div className='message user'>
                      <Markdown>{question}</Markdown>
                  </div>
                  </div>)}
    {answer&&(
       loading?<Spinner/>:(<div className='modeldiv'>
                      <div className='gpticon'>
                  <img src='/logo.png' height={16} width={16}/>
                  {/* <span>SKSM GPT</span> */}
                  </div>
                      <div className='message'>
                    <Markdown>{answer}</Markdown>
                    </div>
                    </div>))
      }
    <div className="endChat" ref={endRef}></div>
      <form className="newForm" onSubmit={handleSubmit}>
        <Upload  setImage={setImage}/>
        <input id='file' type='file' multiple={false} hidden/>
        <input type='text' name='text' placeholder='Ask me anything...'/>
        <button type='submit' aria-label="Send">
            <img src="/arrow.png" alt="arrow" />
        </button>
      </form>
    </>
  )
}
export default NewPrompt