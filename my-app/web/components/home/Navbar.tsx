'use client';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import CommandSearch from '../CommandProps';
import { Avatar as CdAvatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { MenuButton } from './Menu';
import Avatar, { genConfig } from 'react-nice-avatar';
import SearchInput from '../SearchInput.navbar';
import UserNavbarOptions from './UserNavbarOptions';
import { useEffect } from 'react';
import { signIn } from '@/lib/store/userInfoSlice';
export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const params = useParams<{ locals: string }>();
  const commands = [
    { value: 'calendar', label: 'Calendar' },
    { value: 'search-emoji', label: 'Search Emoji' },
    { value: 'calculator', label: 'Calculator' },
  ];
  const user = useAppSelector((state) => state.user.entities.userinfo);
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(signIn({ email: 'email', password: 'password' }));
  }, []);
  return (
    <div className=" sticky  shadow-md flex justify-center items-center">
      <div className=" flex w-full p-4">
        <SearchInput></SearchInput>
      </div>
      <div className="p-4">
        {user.username ? (
          <UserNavbarOptions></UserNavbarOptions>
        ) : (
          <div className=" flex justify-center  items-center gap-1">
            <Button
              onClick={() => router.push(`/${params.locals}/auth/sign-up`)}
              variant={'secondary'}
              className={`${theme === 'light' && ' boder'}`}>
              Sign up
            </Button>
            or
            <Button onClick={() => router.push(`/${params.locals}/auth/login`)}>
              Login in
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
