import React from 'react';
import { Input } from './ui/input';

function SearchInput() {
  return (
    <div className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  ">
      <Input
        onFocus={(e) => {
          console.log(12);
        }}
        className=" focus-visible:ring-0 focus-visible:ring-offset-0 border-0"></Input>
    </div>
  );
}

export default SearchInput;
