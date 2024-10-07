// script.js
let albums = [];
let originalAlbums = []; 

// window.onload = function() {
//     const storedAlbums = localStorage.getItem('albums');
//     if (storedAlbums) {
//         albums = JSON.parse(storedAlbums);
//         originalAlbums = [...albums]; 
//         displayAlbums();
//     } else {
//         fetch('https://jsonplaceholder.typicode.com/albums')
//             .then(response => response.json())
//             .then(data => {
//                 albums = data;
//                 originalAlbums = [...data]; 
//                 displayAlbums();
//             });
//     }
// }

window.onload = function() {
    const storedAlbums = localStorage.getItem('albums');
    if (storedAlbums) {
        albums = JSON.parse(storedAlbums);
        // Establecer todos los álbumes como no nuevos
        albums.forEach(album => album.isNew = false);
        originalAlbums = [...albums]; 
        displayAlbums();
    } else {
        fetch('https://jsonplaceholder.typicode.com/albums')
            .then(response => response.json())
            .then(data => {
                albums = data;
                // Establecer todos los álbumes como no nuevos
                albums.forEach(album => album.isNew = false);
                originalAlbums = [...data]; 
                displayAlbums();
            });
    }
}

function displayAlbums(albumsToDisplay = albums, isFiltered = false, isNew = false) { 
    const albumList = document.getElementById('albumList');
    albumList.innerHTML = '';
    albumsToDisplay.forEach(album => { 
        const div = document.createElement('div');
        div.className = 'list-group-item d-flex justify-content-between align-items-center';
        
        if (isFiltered) {
            div.classList.add('filtered');
        }

        if (album.isNew) {
            div.classList.add('isNew');
        }
        
        div.textContent = album.title;

        const deleteBox = document.createElement('span');
        deleteBox.className = 'badge badge-primary badge-pill';
        deleteBox.textContent = 'X';
        deleteBox.style.cursor = 'pointer';
        deleteBox.onclick = function() {
            deleteAlbum(album.id);
        };

        div.appendChild(deleteBox);
        albumList.appendChild(div);
    });
    localStorage.setItem('albums', JSON.stringify(albums));
}

// function addAlbum() {
//     const newAlbum = document.getElementById('newAlbum').value;
//     const newAlbumObject = { title: newAlbum, id: Math.max(...originalAlbums.map(album => album.id)) + 1 }; // Creamos un nuevo objeto de álbum con un ID único
//     albums.unshift(newAlbumObject);
//     originalAlbums.unshift(newAlbumObject); 
//     displayAlbums();
// }

function addAlbum() {
    const newAlbum = document.getElementById('newAlbum').value;
    if (newAlbum !== '') {
        const album = { id: Date.now(), title: newAlbum, isNew: true };
        albums.unshift(album);
        originalAlbums.unshift(album);
        localStorage.setItem('albums', JSON.stringify(albums));
        localStorage.setItem('originalAlbums', JSON.stringify(originalAlbums));
        displayAlbums();
    }
}

// function searchAlbum() {
//     const searchAlbum = document.getElementById('searchAlbum').value;
//     if (searchAlbum === '') {
//         displayAlbums(originalAlbums);
//     } else {
//         const filteredAlbums = originalAlbums.filter(album => album.title.includes(searchAlbum));
//         displayAlbums(filteredAlbums); 
//     }
// }

function searchAlbum() {
    const searchAlbum = document.getElementById('searchAlbum').value;
    if (searchAlbum === '') {
        displayAlbums(originalAlbums);
    } else {
        const filteredAlbums = originalAlbums.filter(album => album.title.includes(searchAlbum));
        displayAlbums(filteredAlbums, true);
    }
}

// function deleteAlbum(id) {
//     albums = albums.filter(album => album.id !== id);
//     originalAlbums = originalAlbums.filter(album => album.id !== id);
//     displayAlbums();
// }

function deleteAlbum(id) {
    albums = albums.filter(album => album.id !== id);
    originalAlbums = originalAlbums.filter(album => album.id !== id);
    localStorage.setItem('albums', JSON.stringify(albums));
    localStorage.setItem('originalAlbums', JSON.stringify(originalAlbums));
    displayAlbums();
}