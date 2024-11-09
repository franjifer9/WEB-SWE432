document.addEventListener('DOMContentLoaded', () => {
    class Sidebar {
        constructor() {
            this.sidebar = document.querySelector('.sidebar');
            this.toggleBtn = document.querySelector('.toggle-btn');
            this.sidebarContent = document.getElementById('barcontent');
            this.initialize();
        }

        initialize() {
            if (this.toggleBtn) {
                this.toggleBtn.addEventListener('click', () => this.toggleSidebar());
            }
        }

        toggleSidebar() {
            if (this.sidebar.classList.contains('collapsed')) {
                this.sidebar.classList.remove('collapsed');
                this.sidebarContent.style.display = 'block';
            } else {
                this.sidebar.classList.add('collapsed');
                this.sidebarContent.style.display = 'none';
            }
        }
    }

    class PlayButton {
        constructor() {
            this.playButton = document.getElementById('play');
            this.initialize();
        }

        initialize() {
            if (this.playButton) {
                this.playButton.addEventListener('click', () => this.togglePlay());
            }
        }

        togglePlay() {
            this.playButton.textContent = this.playButton.textContent === '||' ? 'I>' : '||';
        }
    }

    class DJDragAndDrop {
        constructor() {
            this.bubbles = document.querySelectorAll('.bubble');
            this.slots = document.querySelectorAll('.droppable');
            this.initialize();
        }

        initialize() {
            this.bubbles.forEach(bubble => bubble.addEventListener('dragstart', (e) => this.dragStart(e, bubble)));
            this.slots.forEach(slot => {
                slot.addEventListener('dragover', (e) => e.preventDefault());
                slot.addEventListener('drop', (e) => this.handleDrop(e, slot));
            });
        }

        dragStart(event, bubble) {
            const djNameElement = bubble.querySelector('.dj-name');
            if (djNameElement) {
                event.dataTransfer.setData('text', djNameElement.textContent);
            }
        }

        handleDrop(event, slot) {
            event.preventDefault();
            const djName = event.dataTransfer.getData('text');
            if (djName) {
                const newContent = document.createElement('div');
                newContent.textContent = djName;
                slot.appendChild(newContent);
            }
        }
    }

    class DateSubmitter {
        constructor() {
            this.submitButton = document.getElementById('submitBtn');
            this.calendar = document.getElementById('Calendar');
            this.initialize();
        }

        initialize() {
            if (this.submitButton) {
                this.submitButton.addEventListener('click', (e) => this.handleSubmit(e));
            }
        }

        handleSubmit(event) {
            event.preventDefault();
            const dateInput = document.getElementById('week');
            const selectedDate = new Date(dateInput.value);
            const currentDate = new Date();

            if (!dateInput.value || isNaN(selectedDate.getTime()) || selectedDate <= currentDate) {
                alert("Please select a valid future date.");
                return;
            }

            const dayOfWeek = selectedDate.getDay();
            const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const formattedDate = `${daysOfWeek[dayOfWeek]}, ${selectedDate.toLocaleDateString()}`;

            this.updateCalendarHeaders(dayOfWeek, formattedDate);
        }

        updateCalendarHeaders(dayOfWeek, formattedDate) {
            const headers = this.calendar.querySelectorAll('thead th');
            const rows = this.calendar.querySelectorAll('tbody tr');

            headers.forEach((header, index) => {
                header.style.display = index === 0 || index === dayOfWeek + 1 ? 'table-cell' : 'none';
                if (index === dayOfWeek + 1) header.textContent = formattedDate;
            });

            rows.forEach(row => {
                const cells = row.querySelectorAll('td');
                cells.forEach((cell, index) => {
                    cell.style.display = index === 0 || index === dayOfWeek ? 'table-cell' : 'none';
                });
            });
        }
    }

    class PlaylistManager {
        constructor() {
            this.producerPlaylist = [
                "Dákiti - Bad Bunny & Jhay Cortez", "Callaíta - Bad Bunny & Tainy", "Vivir Mi Vida - Marc Anthony", "Taki Taki - DJ Snake ft. Selena Gomez, Ozuna, Cardi B", "Yo Perreo Sola - Bad Bunny", "Me Gusta - Anitta ft. Cardi B & Mike Towers", "Despacito - Luis Fonsi ft. Daddy Yankee", "Baila Baila Baila - Rosalía", "La Canción - Bad Bunny & J Balvin", "Hasta el Amanecer - Nicky Jam", "Reggaetón Lento - CNCO", "La Modelo - Ozuna ft. Cardi B", "Te Boté (Remix) - Nio Garcia, Ozuna, Bad Bunny", "Con Calma - Daddy Yankee ft. Snow", "Adicto - Tainy, Anuel AA & Ozuna", "Mi Gente - J Balvin, Willy William ft. Beyoncé", "Súbeme La Radio - Enrique Iglesias ft. Descemer Bueno & Zion & Lennox", "Un Verano Sin Ti - Bad Bunny", "Criminal - Natti Natasha & Ozuna", "Reggaetón - DJ's Song"
            ];
            this.playlists = {
                "DJ Snake": ["Taki Taki - DJ Snake ft. Selena Gomez, Ozuna, Cardi B", "Turn Down for What - DJ Snake", "Let Me Love You - DJ Snake ft. Justin Bieber", "Magenta Riddim - DJ Snake"],
                "J Balvin": ["Mi Gente - J Balvin, Willy William ft. Beyoncé", "Ginza - J Balvin", "Baila Baila Baila - J Balvin", "Ay Vamos - J Balvin"],
                "Calvin Harris": ["Summer - Calvin Harris", "Feel So Close - Calvin Harris", "One Kiss - Calvin Harris & Dua Lipa", "Blame - Calvin Harris ft. John Newman"],
                "David Guetta": ["Titanium - David Guetta ft. Sia", "Play Hard - David Guetta ft. Ne-Yo & Akon", "Without You - David Guetta ft. Usher", "Lovers on the Sun - David Guetta ft. Sam Martin"],
                "Farruko": ["Pepas - Farruko", "La Tóxica - Farruko", "Baila Conmigo - Farruko", "Que Raro - Farruko"],
                "Bad Bunny": ["Dákiti - Bad Bunny & Jhay Cortez", "Mía - Bad Bunny ft. Drake", "Vete - Bad Bunny", "Yo Perreo Sola - Bad Bunny"],
                "Karol G": ["Bichota - Karol G", "Tusa - Karol G & Nicki Minaj", "Ahora Me Llama - Karol G", "Mi Cama - Karol G"],
                "Nicky Jam": ["Hasta el Amanecer - Nicky Jam", "X - Nicky Jam & J Balvin", "El Perdón - Nicky Jam & Enrique Iglesias", "Te Robaré - Nicky Jam & Daddy Yankee"],
                "Ozuna": ["Taki Taki - DJ Snake ft. Selena Gomez, Ozuna, Cardi B", "Baila Baila Baila - Rosalía", "Dile Que Tú Me Quieres - Ozuna", "Se Preparó - Ozuna"],
                "Maluma": ["Felices Los 4 - Maluma", "Hawái - Maluma", "Borró Cassette - Maluma", "Chantaje - Shakira & Maluma"]
            };
            this.playlistContainer = document.getElementById('producerPlaylist');
            this.submitSongButton = document.getElementById('SubmitSong');
            this.initialize();
        }

        initialize() {
            this.displayProducerPlaylist();
            if (this.submitSongButton) {
                this.submitSongButton.addEventListener('click', (e) => this.handleSubmit(e));
            }
        }

        displayProducerPlaylist() {
            if (this.playlistContainer) {
                const ol = document.createElement('ol');
                this.producerPlaylist.forEach(song => {
                    const li = document.createElement('li');
                    li.textContent = song;
                    ol.appendChild(li);
                });
                this.playlistContainer.appendChild(ol);
            }
        }

        handleSubmit(event) {
            event.preventDefault();
            const selectedDJ = document.getElementById('SelectedDJ').value;
            const djPlaylist = this.playlists[selectedDJ] || [];
            const djPlaylistContainer = document.getElementById('djPlaylist').querySelector('ol');
            djPlaylistContainer.innerHTML = '';
            djPlaylist.forEach(song => {
                const listItem = document.createElement('li');
                listItem.textContent = song;
                djPlaylistContainer.appendChild(listItem);
            });
            this.updateBothPlaylists(djPlaylist);
        }

 
        updateBothPlaylists(djPlaylist) {
            const bothPlaylistContainer = document.querySelector('.Playlist_Both .Playlistlist ol');
            bothPlaylistContainer.innerHTML = '';
            for (let i = 0; i < this.producerPlaylist.length; i++) {
                for (let j = 0; j < djPlaylist.length; j++) {
                    if (this.producerPlaylist[i] === djPlaylist[j]) {
                        const listItem = document.createElement('li');
                        listItem.textContent = this.producerPlaylist[i];
                        bothPlaylistContainer.appendChild(listItem);
                    }
                }
            }
            if (bothPlaylistContainer.children.length === 0) {
                const noCommonSongs = document.createElement('li');
                noCommonSongs.textContent = "No common songs found.";
                bothPlaylistContainer.appendChild(noCommonSongs);
            }
        }
    }

    class SearchFilter {
        constructor() {
            this.searchInput = document.getElementById('search-input');
            this.bubbleContainer = document.querySelector('.bubbles-container');
            this.bubbles = this.bubbleContainer.querySelectorAll('.bubble');
            this.initialize();
        }

        initialize() {
            this.searchInput.addEventListener('input', () => this.filterBubbles());
        }

        filterBubbles() {
            const searchTerm = this.searchInput.value.toLowerCase();
            if (!this.isAlphanumeric(searchTerm)) {
                alert('Please enter only alphanumeric characters for search.');
                this.searchInput.value = '';
                return;
            }
            this.bubbles.forEach(bubble => {
                const djName = bubble.querySelector('strong').textContent.toLowerCase();
                const description = bubble.textContent.toLowerCase();
                bubble.style.display = (djName.includes(searchTerm) || description.includes(searchTerm)) ? 'block' : 'none';
            });
        }

        isAlphanumeric(str) {
            return /^[a-zA-Z0-9]+$/.test(str);
        }
    }

    // Initialize all classes
    new Sidebar();
    new PlayButton();
    new DJDragAndDrop();
    new DateSubmitter();
    new PlaylistManager();
    new SearchFilter();
});
