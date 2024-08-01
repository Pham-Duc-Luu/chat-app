'use client';
import PostCard, { Post } from '@/components/PostCard';
import { useAppSelector } from '@/lib/hooks';
import dummyjson from '@/test/DummyJSON';
import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
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
    <div className=" flex-1">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
        {posts?.map((item, index) => (
          <PostCard key={index} post={item}></PostCard>
        ))}
      </Masonry>
    </div>
  );
}

export default Collection;
