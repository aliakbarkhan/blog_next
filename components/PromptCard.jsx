"use client";

import { BiLike,BiDislike,BiSolidLike,BiSolidDislike } from 'react-icons/bi';


import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");
  const [like,setLike]=useState(false);
  const [dislike,setDisLike]=useState(false);
  const [likecount,setlikeCount]=useState(null);
  const [dislikecount,setdislikeCount]=useState(null);


  const handleLikes = ()=>{
    if(!like) {setLike(true); setlikeCount(likecount+1);}
    else {setLike(false); setlikeCount(likecount-1);}
  }

  const handleDisLikes = ()=>{
    if(!dislike) {setDisLike(true); setdislikeCount(dislikecount+1);}
    else {setDisLike(false); setdislikeCount(dislikecount-1);}
  }

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

       {/*Like Button*/}
       <div className=' mt-5 flex-center gap-4 '> 
       <p className=' cursor-pointer'onClick={handleLikes}>
        {like ? <BiSolidLike/> :<BiLike/>}{likecount}</p>
       
       {/*Dislike Button*/}
        <p className=' cursor-pointer' onClick={handleDisLikes} >
        {dislike ? <BiSolidDislike/> :<BiDislike/>}{dislikecount}</p>

         </div>
       
       
      

      {/*if currently logged in user is the creator and is on profile page then show div */}
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;