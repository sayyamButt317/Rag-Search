import React from 'react'
import Image from "next/image";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Header () {
  return (
    <>
         <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* <div className="h-8 w-8 rounded-md bg-gradient-to-br from-blue-600 to-indigo-600" /> */}
            <Image
              src="/assets/doc.png"
              alt="Oblio"
              className="h-8 w-8"
              width={32}
              height={32}
            />
            <div className="text-xl font-bold tracking-tight">OBLIO</div>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-600">
            <a href="#features" className="hover:text-slate-900">
              Features
            </a>
            <a href="#how" className="hover:text-slate-900">
              How it works
            </a>
            <a href="#demo" className="hover:text-slate-900">
              Live demo
            </a>
            <a href="#pricing" className="hover:text-slate-900">
              Pricing
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="#demo">Try demo</Link>
            </Button>
          </div>
        </div>
      </header>
    </>
  )
}

