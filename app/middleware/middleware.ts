import { NextResponse } from 'next/server';

export default function middleware(req: Request) {
  const token = req.headers.get('Authorization')?.split(' ')[1];
  const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  try {
    // Verify JWT (add your secret key)
    const isValid = jwt.verify(token, JWT_SECRET as string);
    if (!isValid) throw new Error();
  } catch {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/home/:path*'],
};
