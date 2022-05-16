import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'

// https://stackoverflow.com/questions/69237598/react-js-customizing-the-input-of-type-file-using-css
// BETTER INPUTS ^

export default function Home() {
  // https://stackoverflow.com/questions/63122527/react-hooks-update-dictionary-state
  // ^ updating dictionary state
  // https://medium.com/@bretdoucette/understanding-this-setstate-name-value-a5ef7b4ea2b4
  // updating state based on input name

  const initialAudio = {
    "q": {"fileName": "", "audioBlob": ""},
    "w": {"fileName": "", "audioBlob": ""},
    "e": {"fileName": "", "audioBlob": ""},
    "i": {"fileName": "", "audioBlob": ""},
    "o": {"fileName": "", "audioBlob": ""},
    "p": {"fileName": "", "audioBlob": ""}
  }

  const [fullAudio, setFullAudio] = useState(initialAudio)

  const addAudio = (e) => {
    const { target: { name, files } } = e
    console.log(e)
    setFullAudio(prevState => ({
      ...prevState,
      [name]: {fileName: files[0].name, audioBlob: URL.createObjectURL(files[0])}
    }))
  }

  const useKeyboardBindings = map => {
    useEffect(() => {
      const handlePress = ev => {
        const handler = map[ev.key];
  
        if (typeof handler === 'function') {
          handler();
        }
      };
  
      window.addEventListener('keydown', handlePress);
  
      return () => {
        window.removeEventListener('keydown', handlePress);
      };
    }, [map]);
  };

  const play = (keyBind) => {
    if (fullAudio[keyBind].audioBlob !== "") {
      new Audio(fullAudio[keyBind].audioBlob).play()
    }
  }

  useKeyboardBindings({
    q: () => play("q"),
    w: () => play("w"),
    e: () => play("e"),
    i: () => play("i"),
    o: () => play("o"),
    p: () => play("p"),
  });
  
  const TEButton = ({ name, color, marginBump }) => {
    return (
      <div className="flex items-center" style={{marginLeft: 48*marginBump}}>
        <div className="flex justify-center shadow-neuouter rounded-full w-12 py-2 bg-[#f2f2f2]">
          <div className="font-black rounded-full text-center w-8 py-1" style={{backgroundColor: color}}>
            {name.toUpperCase()}
          </div>
        </div>
        {/* add if null ternary */}
        <p className="ml-2">{fullAudio[name].fileName.split(".")[0]}</p>
        <label className="ml-2 -rotate-90 text-2xl hover:cursor-pointer">
          <input
            name={name}
            accept="audio/*"
            style={{ display: 'none' }}
            multiple
            type="file"
            onChange={addAudio}
          />
          ➱
        </label>
        <a 
          className="rotate-90 text-2xl" 
          download={fullAudio[name].fileName} 
          href={fullAudio[name].audioBlob}
        >
          ➱
        </a>
        {fullAudio[name].audioBlob !== "" ? <p>Peaks here</p> : ""}
      </div>
    )
  }

  return (
    <div className="w-screen h-screen min-h-full bg-fuzz p-8">
      <Head>
        <title>Baton Demo</title>
        <meta name="baton" content="demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main 
        className="min-h-full grid grid-rows-[1fr_6fr] pb-10 font-nunito"
        >
        <div>
          <Image 
            src="/baton.svg"
            height={20}
            width={100}
            />
        </div>
        <div className="flex flex-col">
          <TEButton name="q" color="#5FC4E8" marginBump={0} />
          <TEButton name="w" color="#35DE97" marginBump={1} />
          <TEButton name="e" color="#F7F8F1" marginBump={2} />
          <TEButton name="i" color="#FD6721" marginBump={3} />
          <TEButton name="o" color="#7A36E5" marginBump={4} />
          <TEButton name="p" color="#FAA804" marginBump={5} />
        </div>
        {JSON.stringify(fullAudio)}
      </main>
    </div>
  )
}
