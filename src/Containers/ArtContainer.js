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
        {
            name: 'Paul Cezanne',
            value: '40482',
            birthYear: 1839,
            deathYear: 1906,
            bio: "Paul Cézanne was a French artist and Post-Impressionist painter whose work introduced new modes of representation and influenced avant-garde artistic movements of the early 20th century. Cézanne is said to have formed the bridge between late 19th-century Impressionism and the early 20th century's new line of artistic enquiry, Cubism."
        },
        {
            name: 'Salvador Dali',
            value: '34123',
            birthYear: 1904,
            deathYear: 1989,
            bio: "Salvador Domingo Felipe Jacinto Dalí i Domènech, Marquess of Dalí of Púbol, known as Salvador Dalí, was a Spanish surrealist artist renowned for his technical skill, precise draftsmanship, and the striking and bizarre images in his work."
        },
        {
            name: 'Edgar Degas',
            value: '40543',
            birthYear: 1834,
            deathYear: 1917,
            bio: "Edgar Degas was a French Impressionist artist famous for his pastel drawings and oil paintings."
        },
        {
            name: 'Eugene Delacroix',
            value: '40545',
            birthYear: 1798,
            deathYear: 1863,
            bio: "Ferdinand Victor Eugène Delacroix was a French Romantic artist regarded from the outset of his career as the leader of the French Romantic school."
        },
        {
            name: 'Edouard Manet',
            value: '35577',
            birthYear: 1832,
            deathYear: 1883,
            bio: "Édouard Manet was a French modernist painter. He was one of the first 19th-century artists to paint modern life, as well as a pivotal figure in the transition from Realism to Impressionism."
        },
        {
            name: 'Claude Monet',
            value: '35809',
            birthYear: 1840,
            deathYear: 1926,
            bio: "Oscar-Claude Monet was a French painter and founder of impressionist painting who is seen as a key precursor to modernism, especially in his attempts to paint nature as he perceived it."
        },
        {
            name: 'Pablo Picasso',
            value: '36198',
            birthYear: 1881,
            deathYear: 1973,
            bio: "Pablo Ruiz Picasso was a Spanish painter, sculptor, printmaker, ceramicist and theatre designer who spent most of his adult life in France. One of the most influential artists of the 20th century, he is known for co-founding the Cubist movement, the invention of constructed sculpture, the co-invention of collage, and for the wide variety of styles that he helped develop and explore."
        },
        {
            name: 'Pierre-Auguste Renoir',
            value: '36351',
            birthYear: 1841,
            deathYear: 1919,
            bio: "Pierre-Auguste Renoir was a French artist who was a leading painter in the development of the Impressionist style."
        },
        {
            name: 'Rembrandt van Rijn',
            value: '40796',
            birthYear: 1606,
            deathYear: 1669,
            bio: "Rembrandt Harmenszoon van Rijn, usually simply known as Rembrandt, was a Dutch Golden Age painter, printmaker and draughtsman. An innovative and prolific master in three media, he is generally considered one of the greatest visual artists in the history of art."
        },
        {
            name: 'Peter Paul Rubens',
            value: '36487',
            birthYear: 1577,
            deathYear: 1640,
            bio: "Sir Peter Paul Rubens was a Flemish artist and diplomat from the Duchy of Brabant in the Southern Netherlands (modern-day Belgium). He is considered the most influential artist of the Flemish Baroque tradition."
        }
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

            <div className="select-container">
                <ArtistSelect artists={artists} onArtistSelected={updateSelectedArtist}/>

                <br />

                { selectedArtist && <ArtworkSelect
                    key={selectedArtist.value}
                    artworks={artworks}
                    onArtworkSelected={updateSelectedArtwork}
                />}
            </div>

            { selectedArtist && !selectedArtwork && <ArtistDetail artist={selectedArtist}/> }

            { selectedArtwork &&
                <div className="button-container">
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