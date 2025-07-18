"use client";

import Image from "next/image";
import { useState } from "react";
import Link from 'next/link';
import Script from "next/script";


export default function BrokenImages() {
    //Return Images in a random order and with two of them with broken src path
    const imagesSrc  = [
        { index: 1, value: "BalloonsAtBasin.png" },
        { index: 2, value: "Italy-2.jpg"},
        { index: 3, value: "sun.svg"},
        { index: 4, value: "Queenstown-2.png" },
        { index: 5, value: "Rome-2.jpg"},
        { index: 6, value: "SnowGhosts-2.jpg"},
        { index: 7, value: "St Pierre Cathedral.jpg"},
        { index: 8, value: "Wanaka-2.jpg"}]

    //Suffle the array and then pick the first two elements
    shuffle(imagesSrc)
    imagesSrc[0].value = "random.png"
    imagesSrc[1].value = "random.jpg"
    shuffle(imagesSrc)
     return (
        <div className="flex flex-row flex-wrap gap-2">
           {imagesSrc.map((src) => (
            <div key={src.index}>
                
                {imageElement(src.value)}
            </div>
            
           ))}
        </div>
     )


  }



function imageElement(srcString: string ){
    return (
        
            <Image 
                src={`/${srcString}`}
                width={100}
                height={100}
                alt=""
            />
       
    )
}

function shuffle(array: any) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }