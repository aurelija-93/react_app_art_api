import React from "react";

function ArtworkSelect({artworks, onArtworkSelected}) {

    const artworkOptions = artworks.map((artwork) => {
        return (
        <option key={artwork.id} value={artwork.id}>{artwork.title}</option>
        );
    })

    function onChange(evt) {
        onArtworkSelected(evt.target.value);
    }

    return (
        <select defaultValue="" onChange={onChange}>
            <option value="" disabled>--Select an artwork--</option>
            {artworkOptions}
        </select>
    );
};

export default ArtworkSelect;