import React, { useEffect, useState } from "react";
import ArtworkSelect from "../Components/ArtworkSelect";
import ArtDetail from "../Components/ArtDetail";


function ArtContainer() {

    const [artworks, setArtworks] = useState([]);
    const [selectedArtwork, setSelectedArtwork] = useState(null);
    
    useEffect(() => {
        getArtworks();
    }, [])
    
    async function getArtworks() {
        const res = await fetch('https://api.artic.edu/api/v1/artworks/search?q=monet&limit=10');
        const data = await res.json();
        setArtworks(data.data);
    }

    function updateSelectedArtwork(id) {
        const newSelectedArtwork = artworks.find((artwork) => {
            return artwork.id === Number(id);
        });
        setSelectedArtwork(newSelectedArtwork);
    }

    return (
        <>
            <header>
                <h1>Art Institute of Chicago</h1>
                <h2>Famous European Artworks</h2>
            </header>
            <ArtworkSelect artworks={artworks} onArtworkSelected={updateSelectedArtwork} />
            { selectedArtwork && <ArtDetail artwork={selectedArtwork} />}
        </>
    );
};

export default ArtContainer;