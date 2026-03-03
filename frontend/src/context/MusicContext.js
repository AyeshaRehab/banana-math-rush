import React, { createContext, useState, useEffect, useRef } from "react";
import musicFile from "../audios/music.mp3";

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
    const [isMusicOn, setIsMusicOn] = useState(() => {
        return localStorage.getItem("musicOn") === "true";
    });

    const audioRef = useRef(null);

    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio(musicFile);
            audioRef.current.loop = true;
        }

        if (isMusicOn) {
            audioRef.current.play().catch((error) => console.log("Audio Play Error:", error));
        } else {
            audioRef.current.pause();
        }

        localStorage.setItem("musicOn", isMusicOn);

        return () => {
            audioRef.current.pause();
        };
    }, [isMusicOn]);

    return (
        <MusicContext.Provider value={{ isMusicOn, setIsMusicOn }}>
            {children}
        </MusicContext.Provider>
    );
};
