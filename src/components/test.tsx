"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

export default function Test() {
    return (
        <div>
            <Button
                onClick={() => {
                    signIn("google");
                }}
            >
                Sign In with google
            </Button>
            <Button
                onClick={() => {
                    signIn("github");
                }}
            >
                Sign In with github
            </Button>
        </div>
    );
}
