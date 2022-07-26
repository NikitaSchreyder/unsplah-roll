import React from 'react';

import './searchForm.css';

const SearchForm = ({searchPhotos}) => {
    const searchValueInput = React.createRef();
    const searchFormSubmitHansler = (e) => {
        e.preventDefault();
        const {value} = searchValueInput.current;
        searchPhotos(value);
    }
    return (
        <form onSubmit={searchFormSubmitHansler} action="#" >
            <input placeholder="Поиск" type="text" name="query" className="search-form__search-input" ref={searchValueInput}/>
            <input type="submit" value="" className="search-form__submit" />
        </form>
    )
}

export default SearchForm;