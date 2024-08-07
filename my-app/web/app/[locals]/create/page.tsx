'use client';
import Editor from '@/components/Editor';
import React, { useId, useState } from 'react';
// Initial Data
const INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: 'header',
      data: {
        text: 'This is my awesome editor!',
        level: 1,
      },
    },
  ],
};
function Page() {
  const [data, setData] = useState();
  const editorId = useId();
  return (
    <div className="editor w-full">
      <Editor data={data} onChange={setData} editorblock={editorId} />
      <button
        className="savebtn"
        onClick={() => {
          alert(JSON.stringify(data));
        }}>
        Save
      </button>
    </div>
  );
}

export default Page;
