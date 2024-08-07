//import Editorjs component as a dynamic import where ssr is false
'use client';
import Editor from '@/components/Editor';
import { useId, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const CreateNewBlog = () => {
  const [content, setContent] = useState(null);
  const editorId = useId();
  const t = useTranslations('create.blog');
  return (
    <div className=" p-10">
      <Card>
        <CardHeader>
          <CardTitle className=" text-6xl">{t('title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Card>
            <Editor></Editor>
          </Card>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
};
export default CreateNewBlog;
