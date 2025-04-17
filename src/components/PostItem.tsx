import { Link } from "react-router";
import { Post } from "./PostList";


interface Props {
  post: Post;
}

export const PostItem = ({ post }: Props) => {


  let imageUrl = post.image_url;

  // If image_url is stored as JSON (e.g., {"publicUrl": "..."}), parse it:
  try {
    const parsedUrl = JSON.parse(post.image_url);
    if (parsedUrl.publicUrl) {
      imageUrl = parsedUrl.publicUrl;
    }
  } catch {
    // If parsing fails, assume it's a normal URL string.
  }

  // Format date for display
  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });


  return (
    <div className="bg-gray-800/40 backdrop-blur-lg rounded-xl overflow-hidden border border-gray-700/50 shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
      {/* Post header */}
      <div className="p-4 flex items-center gap-3">

           {/* Conditional rendering Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
        {/* <img src={post.avatar_url} 
        alt="avatar url" 
        className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm"/>
        */}
          {post.avatar_url ? (
              <img
                src={post.avatar_url}
                alt="User Avatar"
                 className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm"
              />
            ) : (
              <div className="w-[35px] h-[35px] rounded-full bg-gradient-to-tl from-[#8A2BE2] to-[#491F70]" />
            )}
      
          {/* {post.title.charAt(0)} */}
        </div>
        <div>
          <div className="font-bold text-white">{post.title}</div>
          <div className="text-xs text-gray-400">{formattedDate}</div>
        </div>
      </div>

      {/* Post image */}
      <Link to={`/post/${post.id}`}>
        <div className="w-full aspect-video overflow-hidden">
          <img 
            src={imageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      </Link>

      {/* Post content */}
      <div className="p-4">
        <p className="text-gray-300">
          {post.content.length > 100 
            ? `${post.content.substring(0, 100)}...` 
            : post.content}
        </p>
      </div>

    </div>
  );
};