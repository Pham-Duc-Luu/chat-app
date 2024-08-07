import React from 'react';
import { Input } from './ui/input';
import { Search, Scan, ScanSearch } from 'lucide-react';
import { useTranslations } from 'next-intl';

function SearchInput() {
  const t = useTranslations('home.navbar.searching');
  return (
    <div className="flex justify-center items-center w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  ">
      <Search />
      <Input
        onFocus={(e) => {}}
        placeholder={t('placeholder')}
        className=" focus-visible:ring-0 focus-visible:ring-offset-0 border-0"></Input>
      <ScanSearch />
    </div>
  );
}

export default SearchInput;
