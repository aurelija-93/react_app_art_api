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
    }, [selectedArtist])

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
        if (!selectedArtist) {
            return null;
        };
        const res = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${selectedArtist.name}&limit=10`);
        const data = await res.json();
        setArtworks(data.data);
    }
    function updateSelectedArtist(value) {
        const foundArtist = artists.find((artist) => {
            return artist.value === value;
        });
        setSelectedArtist(foundArtist);
    }

    async function updateSelectedArtwork(id) {
        const res = await fetch(`https://api.artic.edu/api/v1/artworks/${id}`);
        const data = await res.json();
        setSelectedArtwork(data.data);
    }

    function navigateSelectedArtwork(modifier) {
        const currentIndex = artworks.findIndex((artwork) => {
            return artwork.id === selectedArtwork.id;
        });
        const newIndex = currentIndex + modifier;
        if (newIndex >=0 && newIndex <=9) {
            const newSelectedArtwork = artworks[newIndex];
            const newId = newSelectedArtwork.id;
            updateSelectedArtwork(newId);
        }
    };

    function onPreviousClick() {
        navigateSelectedArtwork(-1);
    };

    function onNextClick() {
        navigateSelectedArtwork(1);
    };

    return (
        <>
            <header>
                <h1>Art Institute of Chicago</h1>
                <h2>Famous European Artworks</h2>
            </header>
            <ArtistSelect artists={artists} onArtistSelected={updateSelectedArtist}/>
            { selectedArtist && <ArtworkSelect key={selectedArtist.value} artworks={artworks} onArtworkSelected={updateSelectedArtwork} />}
            <button onClick={onPreviousClick}>Previous</button>
            <button onClick={onNextClick}>Next</button>
            { selectedArtwork && <ArtDetail artwork={selectedArtwork} />}
            <footer>
                <a href="https://api.artic.edu/docs/">Art Institute of Chicago API</a>
            </footer>
        </>
    );
};

export default ArtContainer;