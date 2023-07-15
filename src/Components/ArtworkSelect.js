import React from "react";

function ArtworkSelect({artworks, updateSelected}) {

    const artworkOptions = artworks.map((artwork) => {
        return <option key={artwork.id} value={artwork.id}>{artwork.title}</option>
    })

    function onArtworkSelect(evt) {
        updateSelected(evt.target.value);
    }

    return (
        <select onChange={onArtworkSelect}>
            {artworkOptions}
        </select>
    );
};

export default ArtworkSelect;