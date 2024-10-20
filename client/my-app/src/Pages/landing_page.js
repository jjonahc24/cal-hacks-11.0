import React, { useState, useEffect } from 'react';
import Profile from '../components/landing_page/profile';
import ProfileDropDown from '../components/landing_page/profile_dropdown';
import ProfileDropDown_SignedIn from '../components/landing_page/profile_dropdown_signedin';
import SearchBar from '../components/search_bar';

function LandingPage(props) {
  const [text, setText] = useState(""); // Current text being typed
  const [isDeleting, setIsDeleting] = useState(false); // State to track if we are deleting
  const [currentWordIndex, setCurrentWordIndex] = useState(0); // Index to track the current word
  const [letterIndex, setLetterIndex] = useState(0); // Index to track the current letter in the word

  const words = ["park easy", "park quick", "park with spot."]; // Words for the typewriter effect
  const typingSpeed = 150; // Speed of typing
  const deletingSpeed = 100; // Speed of deleting
  const delayBetweenWords = 1000; // Delay before typing the next word

  useEffect(() => {
    let typingTimeout;

    // Typing logic: either type or delete characters
    if (!isDeleting && letterIndex < words[currentWordIndex].length) {
      // Type the next letter
      typingTimeout = setTimeout(() => {
        setText(prev => prev + words[currentWordIndex][letterIndex]);
        setLetterIndex(letterIndex + 1);
      }, typingSpeed);
    } else if (isDeleting && letterIndex > 0) {
      // Delete the letter
      typingTimeout = setTimeout(() => {
        setText(words[currentWordIndex].substring(0, letterIndex - 1));
        setLetterIndex(letterIndex - 1);
      }, deletingSpeed);
    } else if (letterIndex === words[currentWordIndex].length && !isDeleting) {
      // Finished typing the word, start deleting after a delay
      typingTimeout = setTimeout(() => setIsDeleting(true), delayBetweenWords);
    } else if (letterIndex === 0 && isDeleting) {
      // Finished deleting the word, move to the next word
      setIsDeleting(false);
      setCurrentWordIndex((currentWordIndex + 1) % words.length); // Loop to the next word
    }

    return () => clearTimeout(typingTimeout); // Cleanup timeout on unmount or update
  }, [letterIndex, isDeleting, currentWordIndex, words]);

  return (
    <div className="App h-screen relative">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[230%] text-center text-3xl font-bold mb-4">{text}</h1> {/* Typewriter effect text */}
        <SearchBar setListings={props.setListings} setSearchedLocation={props.setSearchedLocation} setStartDate={props.setStartDate} setEndDate={props.setEndDate}/>
      </div>
    </div>
  );
}

export default LandingPage;