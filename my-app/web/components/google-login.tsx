import React from 'react';
import {FcGoogle} from 'react-icons/fc';
import {Button} from './ui/button';
import axios from 'axios';
import api from '@/config/axios.config';
import {useRouter} from 'next/navigation';
import {useDispatch} from "react-redux";
import {useAppDispatch} from "@/lib/hooks";
import {googleoauth} from "@/lib/store/userInfoSlice";
import Link from "next/link";

function GoogleSignIn() {
    const router = useRouter();
    const dispatch = useAppDispatch();


    return (

        <Button className=" w-full gap-2 " onClick={(e) => {
            e.preventDefault();
            window.open(process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/google", "_self");

        }}>
            <FcGoogle size={20}/>
            Google
        </Button>
    );
}

export default GoogleSignIn;
