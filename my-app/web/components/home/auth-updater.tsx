import { useAppDispatch } from "@/lib/store";
import { setAuthState } from "@/lib/store/authSlice";
import React from "react";

const AuthUpdater = () => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <button onClick={() => dispatch(setAuthState(true))}>Log in</button>
      <button onClick={() => dispatch(setAuthState(false))}>Log out</button>
    </div>
  );
};
export default AuthUpdater;
