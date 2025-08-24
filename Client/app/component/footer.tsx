import React from "react";
export default function Footer (){
  return (
    <>
      <footer id="contact" className="border-t border-slate-100 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-blue-600 to-indigo-600" />
            <span className="font-semibold text-slate-900">OBLIO</span>
          </div>
          <p>© {new Date().getFullYear()} Oblio Labs. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a className="hover:text-slate-900" href="#privacy">
              Privacy
            </a>
            <a className="hover:text-slate-900" href="#terms">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

