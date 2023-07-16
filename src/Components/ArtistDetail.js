import React from "react";

function ArtistDetail({artist}) {
    return (
        <>
            <h3 className="artist-name">{artist.name}</h3>
            <h4>{artist.birthYear}-{artist.deathYear}</h4>
            <p>{artist.bio}</p>
        </>
    );
};

export default ArtistDetail;