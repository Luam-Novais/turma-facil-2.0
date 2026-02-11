import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

export interface CardProps {
  href: string;
  title: string;
  desc: string;
  icon: LucideIcon;
}
export function Card({ item }: { item: CardProps }) {
  return (
    <Link href={item.href} className="w-full h-50 bg-white border-l-6 border-violet-600 p-4 rounded-xl shadow-xl flex flex-col gap-4">
      <span className="flex justify-between">
        <h2 className="text-2xl">{item.title}</h2>
        {<item.icon />}
      </span>
      <p className='text-gray-600'>{item.desc}</p>
    </Link>
  );
}
