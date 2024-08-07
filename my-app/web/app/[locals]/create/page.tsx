import dynamic from 'next/dynamic';
import CreatePost from './CreatePost';

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
  return (
    <div className="editor w-full">
      {/* {editorId && <Editor data={data} editorblock={editorId} />}
      <button
        className="savebtn"
        onClick={() => {
          alert(JSON.stringify(data));
        }}>
        Save
      </button> */}
      <CreatePost></CreatePost>
    </div>
  );
}

export default Page;
