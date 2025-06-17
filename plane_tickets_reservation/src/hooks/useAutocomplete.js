import { useState, useEffect, useRef } from "react";
import { useClickOutside } from "./useClickOutside";
import { AUTOCOMPLETE_TRIGGER_LENGTH } from "../utils/constants";

export function useAutocomplete(inputValue, allSuggestions) {
  const [suggestions, setSuggestions] = useState([]);
  const containerRef = useRef(null);

  useClickOutside(containerRef, () => setSuggestions([]));

  useEffect(() => {
    if (inputValue && inputValue.length >= AUTOCOMPLETE_TRIGGER_LENGTH) {
      const filtered = allSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().startsWith(inputValue.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [inputValue, allSuggestions]);

  const closeSuggestions = () => {
    setSuggestions([]);
  };

  return { suggestions, containerRef, closeSuggestions };
}
