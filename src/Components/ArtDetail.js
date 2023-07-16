import React from "react";

function ArtDetail({artwork}) {

    return (
        <>
            <header>
                <h3>{artwork.title}</h3>
                <h4>{artwork.artist_title.toUpperCase()}</h4>
                <h5>{artwork.medium_display}, {artwork.date_display}</h5>
            </header>
            <div className="img-container">
                <img src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`} alt={artwork.thumbnail.alt_text} />
            </div>
        </>
    );
};

export default ArtDetail;