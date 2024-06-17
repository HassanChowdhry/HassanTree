"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import data from '../../data.json';
import { LuLink } from "react-icons/lu";
import AnimatedLetters from "../components/AnimatedLetters";
import Loader from "react-loaders";

function LinkCard({ i, title, href, image }: { i:number, title: string, href: string, image: string }) {
  const [isCopied, setIsCopied] = useState(false);
  
  const copyToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(href);
        setIsCopied(true);
        window.alert('Link copied to clipboard');
        setTimeout(() => {
            setIsCopied(false);
        }, 3000);
    } catch (err) {
        console.error(err);
    }
  };
  
  return (
    // #DADADB
    <div 
      className={`box _${i} flex items-center max-w-xl w-full rounded-md border-2
        transition-all border-gray-300 mb-6 bg-[#DADADB] p-2 hover:scale-105
        hover:border-2 text-gray-700 hover:text-primary  hover:border-primary hover:shadow-primary hover:shadow-card
        `}
        >
      <a href={href} target="_blank" className="flex text-center w-full">
        <Image 
          className="rounded-sm"
          src={image} 
          alt={title} 
          width={40} 
          height={40}/>
        <h3 className="font-medium w-full text-center text-base my-auto -ml-5">{title}</h3>
      </a>
      <div title="Click to copy link" className="p-2 h-full cursor-pointer hover:animate-spin transition-all" onClick={copyToClipboard}>
        <LuLink className="text-lg text-black my-auto" />
      </div>
    </div>
  )
}

export default function Home() {
  const [letterClass, setLetterClass] = useState('text-animate')
  const nameArray = data.name.split('');

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      const toRef = setTimeout(() => {
        setTimeout(() => {
          setLoading(false);
        }, 750);
      }, 700);
      return () => clearTimeout(toRef);
    }
  }, [isLoading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover');
    }, 4000);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center md:py-12 h-screen ">
      {!isLoading && (
        <main className="home flex items-center flex-col justify-center mx-auto w-full py-8 px-10">
          <Image
            src={data.avatar}
            alt={data.name}
            className="pfp rounded-full"
            width={120}
            height={120}
          />
          <h1 className="font-semibold mt-4 text-3xl md:text-3xl mb-12 text-gray-50">
            <AnimatedLetters
              letterClass={letterClass}
              strArray={nameArray}
              idx={1}
            />
          </h1>
          {data.links.map((link, index) => (<LinkCard key={index} i={index+1} {...link} />))}
        </main>
      )}
      {isLoading && <Loader active type="pacman" />}
    </div>
  );
}