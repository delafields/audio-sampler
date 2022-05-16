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

  const [qAudio, setQAudio] = useState();
  const [wAudio, setWAudio] = useState();
  const [eAudio, setEAudio] = useState();
  const [iAudio, setIAudio] = useState();
  const [oAudio, setOAudio] = useState();
  const [pAudio, setPAudio] = useState();

  const addQAudio = (e) => { setQAudio(URL.createObjectURL(e.target.files[0])); }
  const addWAudio = (e) => { setWAudio(URL.createObjectURL(e.target.files[0])); }
  const addEAudio = (e) => { setEAudio(URL.createObjectURL(e.target.files[0])); }
  const addIAudio = (e) => { setIAudio(URL.createObjectURL(e.target.files[0])); }
  const addOAudio = (e) => { setOAudio(URL.createObjectURL(e.target.files[0])); }
  const addPAudio = (e) => { setPAudio(URL.createObjectURL(e.target.files[0])); }

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

  const playQ = () => { new Audio(qAudio).play() }
  const playW = () => { new Audio(wAudio).play() }
  const playE = () => { new Audio(eAudio).play() }
  const playI = () => { new Audio(iAudio).play() }
  const playO = () => { new Audio(oAudio).play() }
  const playP = () => { new Audio(pAudio).play() }

  useKeyboardBindings({
    // q: () => console.log("pushed q"),
    q: () => playQ(),
    w: () => console.log("pushed w"),
    e: () => console.log("pushed e"),
    i: () => console.log("pushed i"),
    o: () => console.log("pushed o"),
    p: () => console.log("pushed u"),
  });

  const TEButton = ({ children }) => {
    return (
      <div className="flex justify-center shadow-neuouter rounded-full w-12 py-2 bg-[#f2f2f2]">
        <div className="font-black rounded-full text-center w-8 py-1 bg-[#5FC4E8]">
          {children}
        </div>
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
            <button className="-rotate-90 text-2xl">➱</button>
            <button className="rotate-90 text-2xl">➱</button>
            <button className=" text-2xl">⤫</button>
        </div>
        <div className="flex flex-col">
          <div className="flex">
          <TEButton>Q</TEButton>
          <label htmlFor="contained-button-file" className="-rotate-90 text-2xl hover:cursor-pointer">
              <input
                accept="audio/*"
                style={{ display: 'none' }}
                id="contained-button-file"
                multiple
                type="file"
                onChange={addQAudio}
              />
              ➱
            </label>
            </div>
          <div className="ml-12 flex justify-center shadow-neuouter rounded-full w-12 py-2 bg-[#f2f2f2]">
            <button className="font-black rounded-full w-8 py-1 bg-[#35DE97]">
              W
            </button>
          </div>
          <div className="ml-24 flex justify-center shadow-neuouter rounded-full w-12 py-2 bg-[#f2f2f2]">
            <button className="font-black rounded-full w-8 py-1 bg-[#F7F8F1]">
              E
            </button>
          </div>
          <div className="ml-36 flex justify-center shadow-neuouter rounded-full w-12 py-2 bg-[#f2f2f2]">
            <button className="font-black rounded-full w-8 py-1 bg-[#FD6721]">
              I
            </button>
          </div>
          <div className="ml-48 flex justify-center shadow-neuouter rounded-full w-12 py-2 bg-[#f2f2f2]">
            <button className="font-black rounded-full w-8 py-1 bg-[#7A36E5]">
              O
            </button>
          </div>
          <div className="ml-60 flex justify-center shadow-neuouter rounded-full w-12 py-2 bg-[#f2f2f2]">
            <button className="font-black rounded-full w-8 py-1 bg-[#FAA804]">
              P
            </button>
          </div>


          {/* <button className="bg-slate-900 floating w-72 h-72 rounded-full flex flex-col justify-center items-center text-white">
            <label htmlFor="contained-button-file" className="m-0 w-100 flex flex-col hover:cursor-pointer">
              <input
                accept="audio/*"
                style={{ display: 'none' }}
                id="contained-button-file"
                multiple
                type="file"
                onChange={() => addAudio}
              />
              ADD AUDIO
              <Image
                src="/cloudwhite.svg"
                height={180}
                width={180}
              />
            </label>
          </button> */}

          {/* <p>Select a file to upload</p>
          <input type="file" onChange={(e) => addAudio(e)} accept="audio/*" /> */}


        </div>
      </main>
    </div>
  )
}
