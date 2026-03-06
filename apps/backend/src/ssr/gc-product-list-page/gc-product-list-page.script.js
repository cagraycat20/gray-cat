document.addEventListener('DOMContentLoaded', () => {
  const searchInputElement = document.getElementById('search-input');
  const searchButtonElement = document.getElementById('search-button');

  if (searchInputElement.attachEvent) {
    searchInputElement.attachEvent('onkeydown', searchInputElementKeyDownHandler);
  } else {
    searchInputElement.addEventListener('keydown', searchInputElementKeyDownHandler);
  }

  searchButtonElement.addEventListener('click', function() {
    const searchPhrase = searchInputElement.value;
    window.location.href = '?search=' + searchPhrase;
  });

  function searchInputElementKeyDownHandler(e) {
    if (e.keyCode == 13) {
      searchButtonElement.click();
    }
  }
});
