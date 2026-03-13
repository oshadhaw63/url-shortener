import { prisma } from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ shortCode: string }>;
}) {
  const { shortCode } = await params;

  const link = await prisma.link.findUnique({
    where: { shortCode: shortCode },
  });

  if (!link) {
    console.log(`Link not found for code: ${shortCode}`);
    return notFound();
  }

  // This ensures the URL is absolute so it doesn't try to redirect 
  // to localhost:3000/https://google.com
  const destination = link.originalUrl.startsWith('http')
    ? link.originalUrl
    : `https://${link.originalUrl}`;

  redirect(destination);
}