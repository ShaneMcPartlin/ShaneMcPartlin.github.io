// Code by 521dimensions / serversideup for amplitudejs
// https://521dimensions.com/open-source/amplitudejs/docs/examples/blue-playlist.html

// Code adapted May 2021 by Ian M / Lyrus - https://github.com/7bitlyrus

function initPlayer(player_song_list) {
    songListElement = document.getElementById('song-list')
    songListData = []

    for (var i = 0; i < player_song_list.length; i++) {
        song = player_song_list[i]

        html = '<div class="song amplitude-song-container amplitude-play-pause" data-amplitude-song-index="' + i + '">'
        html += '    <div class="song-now-playing-icon-container">'
        html += '        <div class="play-button-container"></div>'
        html += '            <img class="now-playing" src="player/now_playing.svg" />'
        html += '        </div>'
        html += '        <div class="song-meta-data">'
        html += '            <span class="song-title">' + song.name + '</span>'
        html += '            <span class="song-artist">' + song.artist + '</span>'
        html += '        </div>'
        html += '    <span class="song-duration">' + song.duration + '</span>'
        html += '</div>'

        songListElement.insertAdjacentHTML('beforeend', html);

        data = {
            "name": song.name,
            "artist": song.artist,
            "album": song.album,
            "url": song.url,
            "cover_art_url": song.cover_art_url,
            "visualization": 'michaelbromley_visualization',
        }

        songListData.push(data)
    }

    let songElements = document.getElementsByClassName('song');

    for (var i = 0; i < songElements.length; i++) {
        songElements[i].addEventListener('mouseover', function () {
            this.style.backgroundColor = '#00A0FF';

            this.querySelectorAll('.song-meta-data .song-title')[0].style.color = '#FFFFFF';
            this.querySelectorAll('.song-meta-data .song-artist')[0].style.color = '#FFFFFF';

            if (!this.classList.contains('amplitude-active-song-container')) {
                this.querySelectorAll('.play-button-container')[0].style.display = 'block';
            }

            this.querySelectorAll('.song-duration')[0].style.color = '#FFFFFF';
        });

        songElements[i].addEventListener('mouseout', function () {
            this.style.backgroundColor = '#FFFFFF';
            this.querySelectorAll('.song-meta-data .song-title')[0].style.color = '#272726';
            this.querySelectorAll('.song-meta-data .song-artist')[0].style.color = '#607D8B';
            this.querySelectorAll('.play-button-container')[0].style.display = 'none';
            this.querySelectorAll('.song-duration')[0].style.color = '#607D8B';
        });

        songElements[i].addEventListener('click', function () {
            this.querySelectorAll('.play-button-container')[0].style.display = 'none';
        });
    }

    Amplitude.init({
        bindings: {
            37: 'prev',
            39: 'next',
            32: 'play_pause'
        },
        debug: false,
        visualization: 'michaelbromley_visualization',
        songs: songListData,
        "callbacks": {
            'play': function () {
                document.getElementById('album-art').style.visibility = 'hidden';
                document.getElementById('large-visualization').style.visibility = 'visible';
            },

            'pause': function () {
                document.getElementById('album-art').style.visibility = 'visible';
                document.getElementById('large-visualization').style.visibility = 'hidden';
            }
        },
        waveforms: {
            sample_rate: 50
        },
        visualizations: [{
            object: MichaelBromleyVisualization,
            params: {

            }
        }]
    });

    document.getElementById('player-left-bottom').style.visibility = 'visible';

    vis_height = document.getElementById('album-art').offsetWidth + 'px';
    document.getElementById('large-visualization').style.height = vis_height

}