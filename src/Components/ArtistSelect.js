import React from "react";

function ArtistSelect({artists, onArtistSelected}) {

    const artistOptions = artists.map((artist) => {
        return (
            <option key={artist.value} value={artist.value}>{artist.name}</option>
        );
    })

    function onChange(evt) {
        onArtistSelected(evt.target.value);
    }

    return (
        <select defaultValue="" onChange={onChange}>
            <option value="" disabled>--Select an artist--</option>
            {artistOptions}
        </select>
    );
};

export default ArtistSelect;