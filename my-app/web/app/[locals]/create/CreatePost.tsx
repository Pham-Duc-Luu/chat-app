//import Editorjs component as a dynamic import where ssr is false
'use client';
import Editor from '@/components/Editor';
import { useId, useState } from 'react';

const CreateNewBlog = () => {
  const [content, setContent] = useState(null);
  const editorId = useId();
  return (
    <div>
      <Editor editorblock={editorId}></Editor>
    </div>
  );
};
export default CreateNewBlog;
