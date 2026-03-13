import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export default async function RedirectPage({ params }: { params: Promise<{ shortCode: string }> }) {
  const { shortCode } = await params;
  
  const link = await prisma.link.findUnique({
    where: { shortCode },
  });

  if (!link) {
    return <div>404 - Link not found</div>;
  }

  redirect(link.originalUrl);
}