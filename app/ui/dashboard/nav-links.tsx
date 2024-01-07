'use client';
import { useState } from 'react';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  {
    name: 'Home',
    href: '/dashboard',
    icon: HomeIcon,
    sublinks: [],
  },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
    sublinks: [
      { name: 'Recent', href: '/dashboard/invoices/recent' },
      { name: 'Past', href: '/dashboard/invoices/past' },
    ],
  },
  {
    name: 'Customers',
    href: '/dashboard/customers',
    icon: UserGroupIcon,
    sublinks: [
      { name: 'All', href: '/dashboard/customers/all' },
      { name: 'Add New', href: '/dashboard/customers/add' },
    ],
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (index) => {
    setActiveLink(activeLink === index ? null : index);
  };

  return (
    <>
      {links.map((link, index) => {
        const LinkIcon = link.icon;
        return (
          <div key={link.name}>
            <div
              onClick={() => handleLinkClick(index)}
              className={clsx(
                'flex h-[48px] items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium cursor-pointer hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 transition-all duration-500 ease-in-out',
                {
                  'bg-sky-100 text-blue-600': pathname === link.href || activeLink === index,
                },
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </div>
            <div
              className={clsx('pl-8 overflow-hidden transition-all duration-500 ease-in-out', {
                'max-h-0': activeLink !== index,
                'max-h-[200px]': activeLink === index,
              })}
            >
              {link.sublinks.map((sublink) => (
                <Link key={sublink.name} href={sublink.href}>
                  <div className="flex items-center gap-2 py-1 pl-2 cursor-pointer hover:text-blue-600">
                    <p>{sublink.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}
