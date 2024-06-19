import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import type { NextAuthConfig, Session } from "next-auth";
import axios from "axios";
import {client} from "@/utils/redis";
import {useDispatch} from "react-redux";
import {ChangeToken} from "@/provider/redux/SetToken";

export interface EnrichedSession extends Session {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: number;
    accessTokenIssuedAt: number;
}

export const config: NextAuthConfig = {
    theme: {
        logo: "https://next-auth.js.org/img/logo/logo-sm.png",
    },
    providers: [
        Google({
            authorization: {
                params: {
                    access_type: "offline",
                    prompt: "consent",
                    scope: [
                        "openid",
                        "https://www.googleapis.com/auth/userinfo.email",
                        "https://www.googleapis.com/auth/userinfo.profile",
                        "https://www.googleapis.com/auth/gmail.readonly",
                        "https://www.googleapis.com/auth/gmail.send", // Added scope for sending emails
                        "https://www.googleapis.com/auth/calendar",
                    ].join(" "),
                    response: "code",
                },
            },
        }),
    ],
    basePath: "/api/auth",
    callbacks: {
        authorized({ request, auth }) {
            return !!auth;
        },
        async jwt({ token, user, account }) {
            // Initial sign in
            if (account && user) {
                return {
                    ...token,
                    access_token: account.access_token,
                    issued_at: Date.now(),
                    expires_at: Date.now() + Number(account.expires_in) * 1000,
                    refresh_token: account.refresh_token,
                };
            } else if (Date.now() < Number(token.expires_at)) {
                return token;
            } else {
                try {
                    const response = await fetch("https://oauth2.googleapis.com/token", {
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: new URLSearchParams({
                            client_id: process.env.AUTH_GOOGLE_ID as string,
                            client_secret: process.env.AUTH_GOOGLE_SECRET as string,
                            grant_type: "refresh_token",
                            refresh_token: token.refresh_token as string,
                        }),
                        method: "POST",
                    });

                    const tokens = await response.json();

                    if (!response.ok) throw tokens;

                    return {
                        ...token,
                        access_token: tokens.access_token,
                        expires_at: Date.now() + Number(tokens.expires_in) * 1000,
                        refresh_token: tokens.refresh_token ?? token.refresh_token,
                    };
                } catch (error) {
                    console.error("Error refreshing access token", error);
                    return { ...token, error: "RefreshAccessTokenError" as const };
                }
            }
        },
        async session({ session, token }) {
            try {
                return {
                    ...session,
                    accessToken: String(token.access_token),
                    refreshToken: String(token.refresh_token),
                    accessTokenIssuedAt: Number(token.issued_at),
                    accessTokenExpiresAt: Number(token.expires_at),
                } as EnrichedSession;
            } catch (error) {
                console.error("Error fetching emails:", error);
                return {
                    ...session,
                    accessToken: "",
                    refreshToken: "",
                    accessTokenIssuedAt: 0,
                    accessTokenExpiresAt: 0,
                } as EnrichedSession;
            }
        },
    },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
