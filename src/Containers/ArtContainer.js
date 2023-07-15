import React, { useEffect, useState } from "react";
import ArtworkSelect from "../Components/ArtworkSelect";
import ArtDetail from "../Components/ArtDetail";
import ArtistSelect from "../Components/ArtistSelect";


function ArtContainer() {

    const [artworks, setArtworks] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [selectedArtwork, setSelectedArtwork] = useState(null);
    
    useEffect(() => {
        getArtworks();
    }, [])

    const artists = [
        {name: 'Pablo Picasso', value: 'picasso'},
        {name: 'Claude Monet', value: 'monet'},
        {name: 'Peter Paul Rubens', value: 'rubens'},
        {name: 'Salvador Dali', value: 'dali'},
        {name: 'Rembrandt', value: 'rembrandt'},
        {name: 'Pierre-Auguste Renoir', value: 'renoir'},
        {name: 'Johannes Vermeer', value: 'vermeer'},
        {name: 'Edouard Manet', value: 'manet'},
        {name: 'Paul Cezanne', value: 'cezanne'},
        {name: 'Caravaggio', value: 'caravaggio'}
    ];

    async function getArtworks() {
        const res = await fetch('https://api.artic.edu/api/v1/artworks/search?q=monet&limit=10');
        const data = await res.json();
        setArtworks(data.data);
    }

    async function updateSelectedArtwork(id) {
        const res = await fetch(`https://api.artic.edu/api/v1/artworks/${id}`);
        const data = await res.json();
        setSelectedArtwork(data.data);
    }

    function updateSelectedArtist(value) {
        const foundArtist = artists.find((artist) => {
            return artist.value === value;
        });
        setSelectedArtist(foundArtist);
    }

    return (
        <>
            <header>
                <h1>Art Institute of Chicago</h1>
                <h2>Famous European Artworks</h2>
            </header>
            <ArtistSelect artists={artists} onArtistSelected={updateSelectedArtist}/>
            <ArtworkSelect artworks={artworks} onArtworkSelected={updateSelectedArtwork} />
            { selectedArtwork && <ArtDetail artwork={selectedArtwork} />}
        </>
    );
};

export default ArtContainer;