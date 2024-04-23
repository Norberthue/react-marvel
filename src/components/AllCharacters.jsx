import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from "./MyComponent.module.css";
import CharacterLayout from './CharacterLayout';


export default function AllCharacters() {
    const [url, setUrl] = useState('https://gateway.marvel.com/v1/public/characters?ts=1&apikey=a6cdc8e120e252145b2f3f19094f7051&hash=33cf76d7ded0e77398da5741d2c924ac&limit=20&offset=0')
    const [item, setItem] = useState(null)
    const [selectedCharacter, setSelectedCharacter] = useState(null)
    const [loading, setLoading] = useState(true)
    let [limit, setLimit] = useState(20)
    let [offset, setOffset] = useState(0)
    let id = 0
    const idSign = 'D'
    let idComplete = ''
    
    useEffect(() => {
        async function catchMarvel() {
            setLoading(true)
            const res = await axios.get(url)
            setItem(res.data.data.results)
            setLoading(false)
        }
        
        catchMarvel()
    },[url])

    
    
    
    
    async function nextCharacters() {
        setOffset(offset += 20)
        setUrl(`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=a6cdc8e120e252145b2f3f19094f7051&hash=33cf76d7ded0e77398da5741d2c924ac&limit=${limit}&offset=${offset}`)
        window.location.href= '#start'
    }

    function prevCharacters() {
        setOffset(offset -= 20)
        setUrl(`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=a6cdc8e120e252145b2f3f19094f7051&hash=33cf76d7ded0e77398da5741d2c924ac&limit=${limit}&offset=${offset}`)
        window.location.href= '#start'
    }

    function selectCharacter(c) {
        setSelectedCharacter(c)
    }

    
    


    return (
        <div>
        {loading ? <p className='text-6xl text-center'>Loading...</p> : <p></p>}
        {selectedCharacter
        ? (<CharacterLayout selectedCharacter={selectedCharacter} setSelectedCharacter={setSelectedCharacter} selectCharacter={selectCharacter} />) 
        : (<div id={'start'} className='flex flex-col gap-8 items-center w-full max-w-[1400px] mx-auto'>
            <img className='bg-white m-4' src='https://www.freepnglogos.com/uploads/marvel-logo-png/ubb-marvel-logo-psd-ubca-uadf-vectorhqm-23.png'></img>
            <div className='main-grid  grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 '>
                {item ? item.map((char, charIndex) =>{
                    id +=  1;
                    idComplete = idSign + id;
                    
                    
                    return (
                        <figure onClick={() => {selectCharacter(char.id)}} className='cursor-pointer' id={styles[idComplete]} key={charIndex}>
                            <img src={`${char.thumbnail.path}.${char.thumbnail.extension}`}></img>
                            <figcaption>
                                <div><div><h3>{char.name}</h3></div></div>
                            </figcaption>
                        </figure>
                    )
                }) : <p></p>} 
                
            </div>
            <div className='flex gap-10 mb-5'>
                {offset >= 20 ? <button onClick={prevCharacters} className='text-white pt-2 pb-2 pl-5 pr-5 bg-red-700 rounded-xl border-[2px] border-solid border-yellow-400 buttonShadow duration-200'>Previous</button> : <p></p> }
                <button onClick={nextCharacters} className='text-white pt-2 pb-2 pl-5 pr-5 bg-red-700 rounded-xl  border-[2px] border-solid border-yellow-400 buttonShadow duration-200'>Next</button>
            </div>
            </div>)}
        </div>
        
        
    )
}
