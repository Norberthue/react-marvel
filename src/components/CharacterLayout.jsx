import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from "./MyCharacterLayout.module.css";

export default function CharacterLayout(props) {
    const {selectedCharacter, setSelectedCharacter ,selectCharacter} = props
    const [url, setUrl] = useState(`https://gateway.marvel.com/v1/public/characters/${selectedCharacter}/comics?ts=1&apikey=a6cdc8e120e252145b2f3f19094f7051&hash=33cf76d7ded0e77398da5741d2c924ac&limit=20&offset=0`)
    const [item, setItem] = useState(null)
    useEffect(() => {
        async function catchMarvel() {
            const res = await axios.get(url)
            
            setItem(res.data.data.results)
            
        }
        catchMarvel()
    },[url])
    console.log(item)
    return (
        <div className='flex flex-col items-center '>
            <div  className='flex flex-col gap-4 justify-end cursor-pointer items-center mb-5'>
                <img className='w-[450px] h-[350px]' src='https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Marvel_Comics_1990_logo.svg/220px-Marvel_Comics_1990_logo.svg.png'></img>
                <p onClick={() => {selectCharacter(null)}} className=' bg-red-600  text-yellow-400 p-4 font-semibold uppercase rounded-full hover:bg-black duration-500'>Go Back</p>
            </div>
            <div className='comics-grid grid grid-cols-3 gap-6 p-[20px]'>
                {item ? item.map((char, charIndex) => {
                return (
                    <figure className='bg-black  flex flex-col' key={charIndex}>
                        <img src={`${char.thumbnail.path}.${char.thumbnail.extension}`}></img>
                        <div className='text-white break-words line-clamp-1 hover:line-clamp-6'>{char.title}</div>
                    </figure>
                )
                }): <div className='flex align-middle justify-center'><div className=' text-5xl text-center'>Loading...</div></div>}
            </div>
            
        </div>
  )
}
