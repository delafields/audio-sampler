import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios';

export default function Home() {

  const initialAudio = {
    "q": {"fileName": "", "audioBlob": "", "color": "#5FC4E8", "marginBump": 56*-5},
    "w": {"fileName": "", "audioBlob": "", "color": "#35DE97", "marginBump": 56*-3},
    "e": {"fileName": "", "audioBlob": "", "color": "#F7F8F1", "marginBump": 56*-1},
    "i": {"fileName": "", "audioBlob": "", "color": "#FD6721", "marginBump": 56*1},
    "o": {"fileName": "", "audioBlob": "", "color": "#7A36E5", "marginBump": 56*3},
    "p": {"fileName": "", "audioBlob": "", "color": "#FAA804", "marginBump": 56*5}
  }

  const [fullAudio, setFullAudio] = useState(initialAudio);
  const [isFocused, setFocus] = useState(false);

  const addAudio = (e) => {
    const { target: { name, files } } = e
    setFullAudio(prevState => ({
      ...prevState,
      [name]: {
        fileName: files[0].name, 
        audioBlob: URL.createObjectURL(files[0]),
        color: initialAudio[name].color,
        marginBump: initialAudio[name].marginBump
      }
    }));

    // uploadFile(files[0])
  }

  // unfinished s3 upload
  // const uploadFile = async (file) => {
  //   console.log(file.name, file.type)
  //   let { data } = await axios.post("/api/s3/uploadFile", {
  //     name: file.name,
  //     type: file.type
  //   });

  //   // grab url
  //   const url = data.url;

  //   await axios.put(url, file, {
  //     headers: {
  //       "Content-type": file.type,
  //       "Access-Control-Allow-Origin": "*"
  //     }
  //   });
  // }

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
      <div 
        className="flex items-center mt-4 hover:cursor-grab" 
        style={{marginLeft: marginBump}}
      >
        <div className="flex justify-center shadow-neuouter rounded-full w-12 py-2 bg-[#f2f2f2]">
          <div 
            className="font-black rounded-full text-center w-8 py-1" 
            style={{backgroundColor: color}}
          >
            {name.toUpperCase()}
          </div>
        </div>
      </div>
    )
  }

  const TEInputs = ({ name, color }) => {
    return (
      <div className="flex flex-col font-black">
        <label className="text-2xl hover:cursor-pointer active:cursor-progress">
          <input
            name={name}
            accept="audio/*"
            style={{ display: 'none' }}
            multiple
            type="file"
            onChange={addAudio}
          />
          ⮙
        </label>
        <p 
          className="text-4xl"
          onMouseEnter={() => setFocus(true)}
          onMouseLeave={() => setFocus(false)}
          style={{color: isFocused ? color : "black"}}
        >
          {name.toUpperCase()}
        </p>
        <a 
          className="text-2xl" 
          download={fullAudio[name].fileName} 
          href={fullAudio[name].audioBlob}
        >
          ⮛
        </a>
        {
          fullAudio[name].fileName !== "" 
          ?
            <p className="ml-2">{fullAudio[name].fileName.split(".")[0].slice(0,4)+"..."}</p>
          :
            <p className="text-black/[0]">{"x"}</p>
        }
      </div>
    )
  }

  return (
    <div className="w-screen h-screen min-h-full bg-fuzz p-8">
      <Head>
        <title>Baton Demo</title>
        <meta name="baton" content="demo" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main 
        className="min-h-full grid grid-rows-[0.5fr_6fr_1fr] pb-10 font-nunito"
        >
        <div>
          <Image 
            src="/baton.svg"
            height={20}
            width={100}
            alt="batonl logo"
            />
        </div>
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center">
            {Object.entries(fullAudio).map(([key, { color, marginBump }]) => (
              <TEButton key={key} name={key} color={color} marginBump={marginBump} />
            ))}
          </div>
        </div>
        <div className="flex justify-around items-center text-center border-2 border-black rounded-sm">
          {Object.entries(fullAudio).map(([key, { color }]) => (
            <TEInputs key={key} name={key} color={color}/>
          ))}
          {/* {JSON.stringify(fullAudio)} */}
        </div>
      </main>
    </div>
  )
}
