import { useQuery } from "@tanstack/react-query";
import { Post } from "./PostList";
import { supabase } from "../supabase-client";
import { LikeButton } from "./LikeButton";
import { CommentSection } from "./CommentSection";



interface Props{
   postId:number;
}


const fetchPostsById = async(id:number):Promise<Post> =>{
  const {data,error} = await supabase
  .from("posts")
  .select("*")
  .eq("id",id)
  .single()

  if(error) throw new Error(error.message);

  return data as Post;
};





export const PostDetail = ({postId}:Props) => {
  const {data,error,isLoading} = useQuery<Post,Error>({
    queryKey:["post",postId],
    queryFn:() => fetchPostsById(postId),
  });

  console.log(data)

  if(isLoading){
      return <div>Loading posts...</div>;
  }
     

  if(error) {
    return <div>Error:{error.message}</div>
  }

  const imageUrl = data?.image_url ? JSON.parse(data.image_url).publicUrl : null;

  return <div className="space-y-6">
      <h2 className="text-6xl font-bold mb-6 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        {data?.title}
        </h2>
    {data && <img 
    src={imageUrl} 
    alt={data.title}
    className="mt-4 rounded object-cover w-full h-64"/>}
    <p className="text-gray-400">{data?.content}</p>
    <p className="text-gray-500 text-sm font-mono">Posted on: {data?.created_at ? new Date(data!.created_at).toLocaleDateString() : "Unknown date"}</p>
   
   <LikeButton postId={postId}/>
   <CommentSection postId={postId}/>

  </div>
}