'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdOutlineCancel } from 'react-icons/md';
import { CiImageOff } from 'react-icons/ci'; // Import the CiImageOff icon
import ScrollToTop from '../components/scrolltotop';
import axios from 'axios';
import { FaCirclePlus } from "react-icons/fa6";
import { FaMinusCircle } from "react-icons/fa";
import { db } from '@/firebase';
import { collection, getDocs, setDoc, doc, deleteDoc } from "firebase/firestore";
import { useUser } from '@clerk/nextjs';

export default function Search() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [actorDetails, setActorDetails] = useState({});
    const [addedMovies, setAddedMovies] = useState([]); 
    const [addedTVShows, setAddedTVShows] = useState([]);
    const [addedPeople, setAddedPeople] = useState([]); 
    const inputRef = useRef(null);
    const searchBarRef = useRef(null);

    const { user } = useUser();
    const userId = user?.id;

    useEffect(() => {
        if (isExpanded) {
            inputRef.current.focus();
        }
    }, [isExpanded]);

    useEffect(() => {
        if (searchTerm) {
            const fetchResults = async () => {
                try {
                    const response = await axios.get(
                        `https://api.themoviedb.org/3/search/multi?api_key=1d248ad4d6821d99cc838e53b0259a4f&query=${searchTerm}`
                    );
                    setSearchResults(response.data.results);
                } catch (error) {
                    console.error("Error fetching data from API", error);
                }
            };
            fetchResults();
        } else {
            setSearchResults([]);
        }
    }, [searchTerm]);

    useEffect(() => {
        if (hoveredItem && hoveredItem.media_type === 'person') {
            const fetchActorDetails = async () => {
                try {
                    const response = await axios.get(
                        `https://api.themoviedb.org/3/person/${hoveredItem.id}?api_key=1d248ad4d6821d99cc838e53b0259a4f`
                    );
                    setActorDetails(response.data);
                } catch (error) {
                    console.error("Error fetching actor details", error);
                }
            };
            fetchActorDetails();
        } else {
            setActorDetails({});
        }
    }, [hoveredItem]);

    const fetchSavedItems = async (userId) => {
        try{
            const moviesSnapshot = await getDocs(collection(db, `users/${userId}/savedMovies`));
            const tvShowsSnapshot = await getDocs(collection(db, `users/${userId}/savedTVShows`));
            const peopleSnapshot = await getDocs(collection(db, `users/${userId}/savedPeople`));
        
            setAddedMovies(moviesSnapshot.docs.map(doc => doc.data()));
            setAddedTVShows(tvShowsSnapshot.docs.map(doc => doc.data()));
            setAddedPeople(peopleSnapshot.docs.map(doc => doc.data()));
    } catch (error) {
        console.error("Error fetching saved items from Firestore", error);
    }
    };

    useEffect(() => {
        if (userId) {
        fetchSavedItems(userId);
        }
    }, [userId]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const clearSearch = () => {
        setSearchTerm('');
        setSearchResults([]);
    };


    const handleAddItem = async (item, userId) => {
        try {
            // Create a reference to the document with the item ID
            let docRef;
    
            if (item.media_type === 'movie') {
                if (!addedMovies.find((added) => added.id === item.id)) {
                    docRef = doc(db, `users/${userId}/savedMovies/${item.id}`);
                    await setDoc(docRef, item);
                    setAddedMovies((prev) => [...prev, item]);
                }
            } else if (item.media_type === 'tv') {
                if (!addedTVShows.find((added) => added.id === item.id)) {
                    docRef = doc(db, `users/${userId}/savedTVShows/${item.id}`);
                    await setDoc(docRef, item);
                    setAddedTVShows((prev) => [...prev, item]);
                }
            } else if (item.media_type === 'person') {
                if (!addedPeople.find((added) => added.id === item.id)) {
                    docRef = doc(db, `users/${userId}/savedPeople/${item.id}`);
                    await setDoc(docRef, item);
                    setAddedPeople((prev) => [...prev, item]);
                }
            }
        } catch (error) {
            console.error("Error adding item to Firestore", error);
        }
    };

    const handleRemoveItem = async (itemId, mediaType, userId) => {
        try {
            if (mediaType === 'movie') {
                // Delete the document with the specified itemId in the savedMovies collection
                await deleteDoc(doc(db, `users/${userId}/savedMovies/${itemId}`));
                // Update the state by filtering out the removed item
                setAddedMovies((prev) => prev.filter((item) => item.id !== itemId));
            } else if (mediaType === 'tv') {
                // Delete the document with the specified itemId in the savedTVShows collection
                await deleteDoc(doc(db, `users/${userId}/savedTVShows/${itemId}`));
                // Update the state by filtering out the removed item
                setAddedTVShows((prev) => prev.filter((item) => item.id !== itemId));
            } else if (mediaType === 'person') {
                // Delete the document with the specified itemId in the savedPeople collection
                await deleteDoc(doc(db, `users/${userId}/savedPeople/${itemId}`));
                // Update the state by filtering out the removed item
                setAddedPeople((prev) => prev.filter((item) => item.id !== itemId));
            }
        } catch (error) {
            console.error("Error removing item from Firestore", error);
        }
    };

    const isItemAdded = (itemId, mediaType) => {
        if (mediaType === 'movie') {
            return addedMovies.some((movie) => movie.id === itemId);
        } else if (mediaType === 'tv') {
            return addedTVShows.some((show) => show.id === itemId);
        } else if (mediaType === 'person') {
            return addedPeople.some((person) => person.id === itemId);
        }
        return false;
    };

    const handleClickOutside = (event) => {
        if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
            setIsExpanded(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

const handleAddItemClick = (item) => {
    if (userId) {
        handleAddItem(item, userId);
    }
};

const handleRemoveItemClick = (itemId, mediaType) => {
    if (userId) {
        handleRemoveItem(itemId, mediaType, userId);
    }
};

    return (
        <div className="min-h-screen h-full w-full bg-gradient-to-br from-gray-900 to-indigo-900 flex flex-col items-center">
            <div ref={searchBarRef} className="relative w-full max-w-2xl mt-4">
                <div className={`flex items-center bg-gray-900 rounded-full overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'w-full' : 'w-12 h-12'}`}>
                    <button //search icon expandable
                        className="p-3 text-gray-600 hover:text-gray-800 focus:outline-none"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <FaSearch size={24} />
                    </button>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search for movies, TV shows, or people..."
                        className={`w-full py-2 px-4 bg-gray-900 placeholder-purple-400 text-purple-400 leading-tight focus:outline-none ${isExpanded ? 'opacity-100' : 'opacity-0'}`}
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    {searchTerm && (
                        <button //close icon on search bar
                            className="p-3 text-gray-600 hover:text-gray-800 focus:outline-none"
                            onClick={clearSearch}
                        >
                            <MdOutlineCancel className='text-red-500 hover:text-red-700' size={24} />
                        </button>
                    )}
                </div>
                {isExpanded && searchResults.length > 0 && (
                    <div className="absolute w-full mt-2 bg-gray-900 rounded-lg shadow-lg max-h-96 overflow-y-auto z-10">
                        <ul className="divide-y divide-gray-700">
                            {searchResults.map((result) => (
                                <li 
                                    key={result.id}
                                    className="p-4 hover:bg-gray-700 cursor-pointer transition-colors duration-150 ease-in-out relative"
                                    onMouseEnter={() => setHoveredItem(result)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                >
                                    <div className="flex items-center">
                                        {result.media_type === 'person' ? (
                                            <div className="w-16 h-24 flex items-center justify-center bg-gray-200 rounded">
                                                {result.profile_path ? (
                                                    <img
                                                        src={`https://image.tmdb.org/t/p/w200${result.profile_path}`}
                                                        alt={result.name}
                                                        className="w-16 h-24 object-cover rounded"
                                                    />
                                                ) : (
                                                    <CiImageOff size={24} className="text-gray-500" />
                                                )}
                                            </div>
                                        ) : (
                                            <div className="w-16 h-24 flex items-center justify-center bg-gray-200 rounded">
                                                {result.poster_path ? (
                                                    <img
                                                        src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                                                        alt={result.title || result.name}
                                                        className="w-16 h-24 object-cover rounded"
                                                    />
                                                ) : (
                                                    <CiImageOff size={24} className="text-gray-500" />
                                                )}
                                            </div>
                                        )}
                                        <div className="ml-4 flex-1">
                                            <h3 className="font-semibold text-lg text-white">{result.title || result.name}</h3>
                                            {result.vote_average && result.media_type !== 'person' && (
                                                <p className="text-sm text-purple-400">Rating: {result.vote_average}</p>
                                            )}
                                        </div>
                                        <button
                                            className={`ml-2 ${isItemAdded(result.id, result.media_type) ? 'text-gray-400 cursor-not-allowed' : 'text-green-500 hover:text-green-700'} focus:outline-none`}
                                            onClick={() => handleAddItemClick(result)}
                                            disabled={isItemAdded(result.id, result.media_type)}
                                        >
                                            <FaCirclePlus size={20} />
                                        </button>
                                        <button
                                            className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                                            onClick={() => handleRemoveItemClick(result.id, result.media_type)}
                                        >
                                            <FaMinusCircle size={20} />
                                        </button>
                                    </div>
                                    {hoveredItem?.id === result.id && (
                                        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-90 p-4 rounded-lg max-w-xl shadow-lg flex flex-col items-start">
                                            <h4 className="text-lg font-semibold text-white">{result.title || result.name}</h4>
                                            {result.media_type === 'person' ? (
                                                <>
                                                    <p className="text-sm text-purple-400 overflow-hidden text-ellipsis line-clamp-5">{actorDetails.biography}</p>
                                                </>
                                            ) : (
                                                <p className="text-sm text-purple-400 overflow-hidden text-ellipsis line-clamp-5">{result.overview}</p>
                                            )}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Added Movies Section */}
            <div className="mt-6 w-full max-w-2xl bg-gray-800 p-4 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-purple-400 mb-4">Added Movies</h2>
                {addedMovies.length > 0 ? (
                    <ul className="space-y-4">
                        {addedMovies.map((movie) => (
                            <li key={movie.id} className="flex items-center justify-between bg-gray-900 p-4 rounded-lg">
                                <div className="flex items-center">
                                    <div className="w-16 h-24 flex items-center justify-center bg-gray-200 rounded">
                                        {movie.poster_path ? (
                                            <img
                                                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                                alt={movie.title}
                                                className="w-16 h-24 object-cover rounded"
                                            />
                                        ) : (
                                            <CiImageOff size={24} className="text-gray-500" />
                                        )}
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
                                    </div>
                                </div>
                                <button
                                    className="ml-auto text-red-500 hover:text-red-700 focus:outline-none"
                                    onClick={() => handleRemoveItemClick(movie.id, 'movie')}
                                >
                                    <FaMinusCircle size={20} />
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-white">No movies added yet</p>
                )}
            </div>

            {/* Added TV Shows Section */}
            <div className="mt-6 w-full max-w-2xl bg-gray-800 p-4 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-purple-400 mb-4">Added TV Shows</h2>
                {addedTVShows.length > 0 ? (
                    <ul className="space-y-4">
                        {addedTVShows.map((show) => (
                            <li key={show.id} className="flex items-center justify-between bg-gray-900 p-4 rounded-lg">
                                <div className="flex items-center">
                                    <div className="w-16 h-24 flex items-center justify-center bg-gray-200 rounded">
                                        {show.poster_path ? (
                                            <img
                                                src={`https://image.tmdb.org/t/p/w200${show.poster_path}`}
                                                alt={show.name}
                                                className="w-16 h-24 object-cover rounded"
                                            />
                                        ) : (
                                            <CiImageOff size={24} className="text-gray-500" />
                                        )}
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-white">{show.name}</h3>
                                    </div>
                                </div>
                                <button
                                    className="ml-auto text-red-500 hover:text-red-700 focus:outline-none"
                                    onClick={() => handleRemoveItemClick(show.id, 'tv')}
                                >
                                    <FaMinusCircle size={20} />
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-white">No TV shows added yet</p>
                )}
            </div>

            {/* Added People Section */}
            <div className="mt-6 w-full max-w-2xl bg-gray-800 p-4 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-purple-400 mb-4">Added People</h2>
                {addedPeople.length > 0 ? (
                    <ul className="space-y-4">
                        {addedPeople.map((person) => (
                            <li key={person.id} className="flex items-center justify-between bg-gray-900 p-4 rounded-lg">
                                <div className="flex items-center">
                                    <div className="w-16 h-24 flex items-center justify-center bg-gray-200 rounded">
                                        {person.profile_path ? (
                                            <img
                                                src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                                                alt={person.name}
                                                className="w-16 h-24 object-cover rounded"
                                            />
                                        ) : (
                                            <CiImageOff size={24} className="text-gray-500" />
                                        )}
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-white">{person.name}</h3>
                                    </div>
                                </div>
                                <button
                                    className="ml-auto text-red-500 hover:text-red-700 focus:outline-none"
                                    onClick={() => handleRemoveItemClick(person.id, 'person')}
                                >
                                    <FaMinusCircle size={20} />
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-white">No people added yet</p>
                )}
            </div>

            <ScrollToTop />
        </div>
    );
}
