import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import dummyjson from '@/test/DummyJSON';

import { Terminal } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function AlertDemo() {
  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  );
}

async function UserAvatar() {
  const user = (await dummyjson.user.getAllUsers()).data.users[0];

  return (
    <div>
      <Alert className=" flex gap-4">
        <Avatar>
          <AvatarImage src={user.image} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <AlertTitle>{user.firstName}</AlertTitle>
          <AlertDescription>{user.email}</AlertDescription>
        </div>
      </Alert>
    </div>
  );
}

export default UserAvatar;
