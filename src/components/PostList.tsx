import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { PostItem } from "./PostItem";
import { FaHeart, FaCommentDots } from "react-icons/fa";

export interface Post {
  comment_count: number;
  like_count: number;
  avatar_url?: string;
  content: string;
  created_at: string;
  id: number;
  image_url: string;
  title: string;
}

const fetchPosts = async (): Promise<Post[]> => {
  const { data, error } = await supabase.rpc("get_post_with_counts");
  if (error) throw new Error(error.message);
  return data as Post[];
};

export const PostList = () => {
  const { data, error, isLoading } = useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-black p-4">
        <div className="w-full max-w-md bg-gray-800/40 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 shadow-xl animate-pulse">
          <div className="h-6 w-2/3 bg-gray-700/50 rounded-lg mb-8"></div>
          <div className="h-48 bg-gray-700/50 rounded-xl mb-4"></div>
          <div className="h-4 bg-gray-700/50 rounded-lg mb-2"></div>
          <div className="h-4 w-2/3 bg-gray-700/50 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-black p-4">
        <div className="w-full max-w-md bg-red-900/20 backdrop-blur-lg rounded-2xl p-8 border border-red-700/50 shadow-xl">
          <div className="flex items-center justify-center gap-3 text-red-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-xl font-bold">Error</span>
          </div>
          <p className="text-white/80 text-center">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-black p-4">
        <div className="w-full max-w-md bg-gray-800/40 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 shadow-xl text-center">
          <div className="flex justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No posts yet</h3>
          <p className="text-gray-400">Be the first to share something amazing!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Your Feed
          </h1>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full p-2 hover:scale-105 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {data.map((post) => (
            <div key={post.id} className="bg-gray-800/30 backdrop-blur-md rounded-xl p-4 border border-gray-700/40 shadow-sm">
              <PostItem post={post} />
              <div className="mt-4 flex items-center justify-start gap-6 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <FaHeart className="text-pink-500" />
                  <span>{post.like_count ?? 0}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCommentDots className="text-purple-400" />
                  <span>{post.comment_count ?? 0}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
