import React from 'react'
import { MessageSquare, X } from 'lucide-react'
import { useState } from 'react'
import ImageGenerator from './image-generator'

const Assistant = () => {
  const [openChat, setOpenChat] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpenChat(!openChat)}
        className='fixed bottom-6 right-[5%] z-50 bg-white hover:bg-gray-200 text-black p-4 rounded-full shadow-lg transition-all duration-300'
      >
        {openChat ? (
          <X className='w-10 h-10' />
        ) : (
          <MessageSquare className='w-10 h-10' />
        )}
      </button>

      {openChat && (
        <div className='fixed bottom-20 right-6 w-auto max-w-sm bg-white text-black rounded-lg shadow-lg border border-gray-300 z-50'>
          <ImageGenerator/>
        </div>
      )}
    </>
  )
}

export default Assistant
