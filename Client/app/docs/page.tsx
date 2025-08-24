"use client";
import React, {  useEffect } from 'react';
export default function Documents () {

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const url = "http:localhost:8000/document-list";
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Something went wrong try again");
        }
        return res.json();
      } catch (error) {
        console.log("error message", error);
      }
    };

    fetchDocument();
  }, []);

  return (
    <div>
      <h1>Docs</h1>
    </div>
  );
};

