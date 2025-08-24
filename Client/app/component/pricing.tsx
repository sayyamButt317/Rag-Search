import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function Pricing() {
  return (
    <>
        <section id="pricing" className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
            Simple, transparent pricing
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold">Starter</h3>
              <p className="mt-1 text-slate-600">
                Perfect for small teams testing RAG.
              </p>
              <p className="mt-4 text-3xl font-bold">Free</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>• Upload PDFs</li>
                <li>• Chat with citations</li>
                <li>• Local deployment</li>
              </ul>
              <Button className="mt-6" asChild>
                <Link href="#demo">Get started</Link>
              </Button>
            </div>
            <div className="rounded-2xl border border-blue-200 p-6 ring-2 ring-blue-500/20">
              <h3 className="text-lg font-semibold">Teams</h3>
              <p className="mt-1 text-slate-600">
                For production workloads and scale.
              </p>
              <p className="mt-4 text-3xl font-bold">Contact</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>• SSO and role-based access</li>
                <li>• Source connectors (Drive, Confluence)</li>
                <li>• Usage analytics and SLAs</li>
              </ul>
              <Button className="mt-6" variant="outline" asChild>
                <Link href="#contact">Contact sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}


