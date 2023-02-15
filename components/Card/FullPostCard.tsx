import type { Post } from "@/types/Post"
import { User } from "@/types/User"
import PostHeader from "../Post/PostHeader"
import Card from "./Card"
import CardGrid from "./CardGrid"

const FullPostCard = ({
  author,
  post
}: {
  author?: User
  post?: Post
}) => {
  return (
    <CardGrid gridTemplateColumns="grid-cols-2-1">
      <Card>
        <PostHeader/>
        <div>This is a post</div>

      </Card>
      <Card className="relative">
      <div className ="w-0 h-0 absolute left-[-12px] top-3 border-t-8 border-t-transparent border-r-[12px] border-r-white border-opacity-[0.12] border-b-8 border-b-transparent"></div>
        <div>This is a comment</div>
      </Card>
    </CardGrid>
  )
}

export default FullPostCard