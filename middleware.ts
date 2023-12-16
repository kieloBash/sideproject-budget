// export { default } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const { token } = req.nextauth;

    const user = token?.user
    const returnURL = `${process.env.NEXT_PUBLIC_SITE_URL}/home`;

    // if (pathname.startsWith("/home") && !user) {
    //   return NextResponse.redirect(returnURL);
    // }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log("tokenmiddle", token);
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/home/:path*",
  ],
};
