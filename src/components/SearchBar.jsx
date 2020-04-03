import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestionValue(suggestion) {
  return suggestion;
}

function renderSuggestion(suggestion) {
  return (
    <>
      {suggestion}
    </>
  );
}

export default function SearchBar({ completions, handleInsert }) {
  function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());
    if (escapedValue === '') {
      return [];
    }
    const regex = new RegExp(`^${escapedValue}`, 'i');
    return completions.filter((x) => regex.test(x));
  }

  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(undefined);

  const onSuggestionsFetchRequested = ({ value }) => setSuggestions(getSuggestions(value));

  const onSuggestionsClearRequested = () => setSuggestions([]);

  const onSuggestionSelected = (_, { suggestion }) => {
    setSelected(suggestion);
    setInputValue('');
  };

  const onChange = (_, { newValue }) => !selected && setInputValue(newValue);

  const onKeyDown = (e) => {
    const { key } = e;
    if (key === 'Backspace' && selected) {
      e.preventDefault();
      setSelected(undefined);
    } else if (key === 'Enter' && selected !== undefined) {
      e.preventDefault();
      handleInsert(selected);
    }
  };

  const inputProps = {
    placeholder: 'Type an item!',
    value: inputValue,
    onChange,
    onKeyDown,
  };

  function renderBadge() {
    if (selected) {
      return (
        <div
          className="search-bar-selected-item"
        >
          {selected}
          <button
            type="button"
            className="search-bar-selected-item-remove"
            onClick={() => setSelected(undefined)}
          >
            ✕
          </button>
        </div>
      );
    }
    return '';
  }


  // useEffect(() => {
  //   document.addEventListener('keydown', onKeyPress);
  //   return () => {
  //     document.removeEventListener('keydown', onKeyPress);
  //   };
  // }, [selected]);

  /* eslint "react/jsx-props-no-spreading": [ 0 ] */
  const renderInputComponent = (props) => (
    <div className="search-bar-bar">
      {renderBadge()}
      <input
        {...props}
        className={`search-bar-input${selected ? ' search-bar-input-selected' : ''}`}
      />
      <button
        type="button"
        className="search-bar-button"
        onClick={() => handleInsert(selected)}
      >
        +
      </button>
    </div>
  );

  return (
    <div className="search-bar-section">
      <h2 className="search-bar-header">Search</h2>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        highlightFirstSuggestion
        renderInputComponent={renderInputComponent}
        focusInputOnSuggestionClick={!isMobile}
        onSuggestionSelected={onSuggestionSelected}
      />
    </div>
  );
}

SearchBar.propTypes = {
  completions: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleInsert: PropTypes.func.isRequired,
};
