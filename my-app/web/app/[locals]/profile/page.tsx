import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import React from 'react';
import ProfileCard from './components/ProfileCard';
import Collection from './components/Collection';

function Profile() {
  return (
    <div className=" flex flex-col">
      <div className=" m-10">
        <Button variant={'ghost'} className=" w-14 h-14 rounded-full">
          <ArrowLeft />
        </Button>
      </div>

      <div className=" flex p-10 gap-8">
        <div>
          <ProfileCard></ProfileCard>
        </div>
        <Collection></Collection>
      </div>
    </div>
  );
}

export default Profile;
