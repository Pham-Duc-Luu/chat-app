'use client';
import PostCard, { Post } from '@/components/PostCard';
import useResponsiveLayout from '@/hook/useResponsiveLayout';
import { useAppSelector } from '@/lib/hooks';
import dummyjson from '@/test/DummyJSON';
import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';

// * for example

function Collection() {
  const items = [
    { content: 'Item 1' },
    { content: 'Item 2' },
    { content: 'Item 3' },
    { content: 'Item 4' },
    { content: 'Item 5' },
    { content: 'Item 6' },
    { content: 'Item 7' },
  ];
  const breakpointColumnsObj = {
    default: 4,
    1800: 3,
    1400: 2,
    1100: 1,
  };

  const { userinfo } = useAppSelector((state) => state.user.entities);

  const [posts, setposts] = useState<Post[]>();
  const layout = useResponsiveLayout();

  useEffect(() => {
    dummyjson.post.getAllPosts().then((res) => {
      setposts(
        res.data.posts.map((item) => {
          return { ...item, avatar: userinfo.avatar as string };
        })
      );
    });
  }, [userinfo]);

  return (
    <div className=" flex-1 grid-cols-1  lg:grid-cols-2 grid 2xl:grid-cols-4 lg:gap-8 gap-4 xl:grid-cols-3">
      {posts?.map((post, index) => {
        return <PostCard post={post} key={index}></PostCard>;
      })}
    </div>
  );
}

export default Collection;
