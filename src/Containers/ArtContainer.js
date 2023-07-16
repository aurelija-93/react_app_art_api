import React, { useEffect, useState } from "react";
import ArtworkSelect from "../Components/ArtworkSelect";
import ArtDetail from "../Components/ArtDetail";
import ArtistSelect from "../Components/ArtistSelect";
import ArtistDetail from "../Components/ArtistDetail";


function ArtContainer() {

    const [artworks, setArtworks] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [selectedArtwork, setSelectedArtwork] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(null);

    useEffect(() => {
        getArtworks();
    })

    const artists = [
        {name: 'Paul Cezanne', value: '40482'},
        {name: 'Salvador Dali', value: '34123'},
        {name: 'Edgar Degas', value: '40543'},
        {name: 'Eugene Delacroix', value: '40545'},
        {name: 'Edouard Manet', value: '35577'},
        {name: 'Claude Monet', value: '35809'},
        {name: 'Pablo Picasso', value: '36198'},
        {name: 'Pierre-Auguste Renoir', value: '36351'},
        {name: 'Rembrandt van Rijn', value: '40796'},
        {name: 'Peter Paul Rubens', value: '36487'}
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
        setSelectedArtwork(null);
    }

    async function updateSelectedArtwork(id) {
        const res = await fetch(`https://api.artic.edu/api/v1/artworks/${id}`);
        const data = await res.json();
        setSelectedArtwork(data.data);

        const newIndex = artworks.findIndex((artwork) => {
            return artwork.id === data.data.id;
        });
        setCurrentIndex(newIndex);
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

            { selectedArtist && <ArtworkSelect
                key={selectedArtist.value}
                artworks={artworks}
                onArtworkSelected={updateSelectedArtwork}
            />}

            { selectedArtist && !selectedArtwork && <ArtistDetail artist={selectedArtist}/> }

            { selectedArtwork &&
                <div>
                    <button
                        disabled={currentIndex < 1 ? true : false}
                        onClick={onPreviousClick}>
                        Previous
                    </button>
                    <button
                        disabled={currentIndex > 8 ? true : false}
                        onClick={onNextClick}>
                        Next
                    </button>
                </div>
            }
            
            { selectedArtwork && <ArtDetail artwork={selectedArtwork} />}

            <footer>
                <a href="https://api.artic.edu/docs/">Art Institute of Chicago API</a>
            </footer>
        </>
    );
};

export default ArtContainer;