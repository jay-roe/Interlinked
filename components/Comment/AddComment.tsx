import { FaPaperPlane } from 'react-icons/fa'

import { Comment } from "@/types/Post"
import { User } from "@/types/User"
import Button from "../Buttons/Button"
import { Dispatch, SetStateAction, useState } from 'react'
import { db } from '@/config/firestore';
import { arrayUnion, doc, Timestamp, updateDoc } from 'firebase/firestore';
import Card from '../Card/Card'
import CommentHeader from './CommentHeader'
import CommentBody from './CommentBody'

const AddComment = ({
  currentUser,
  authUser,
  postID,
  comments,
  setComments
}: {
  currentUser?: User
  authUser?
  postID?: string
  comments?: Comment[]
  setComments?: Dispatch<SetStateAction<Comment[]>>
}) => {
  const [content, setContent] = useState('')
  
  const addCommentToPost = async () => {
    if(content === '') return

    const newComment = {
      authorID: authUser.uid,
      author: currentUser.name || currentUser.email,
      content: content,
      date: new Timestamp(Date.now()/1000, 0)
    }
    
    await updateDoc(doc(db.posts, postID), {
      comments: arrayUnion(newComment)
    }
    )
    setContent("")
    setComments([newComment, ...comments || []])
  }

  return(
    <>
      {/* Comment area */}
      <Card>
        <div className="flex space-x-2 justify-between items-center">
          <textarea 
          value={content}
          className="block min-h-min w-full appearance-none rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
          placeholder="Say what's on your mind."
          required
          onChange={(e) => setContent(e.target.value)}
          />
          <Button onClick={addCommentToPost}><FaPaperPlane/></Button>
        </div>
      </Card>
    </>
  )
}


export default AddComment