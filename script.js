document.addEventListener("DOMContentLoaded", function() {

    var playlist = document.getElementById("playlist");
  

    var currentSong = document.getElementById("current-song");
  

    var playButton = document.getElementById("play");
    var pauseButton = document.getElementById("pause");
    var nextButton = document.getElementById("next");
    var previousButton = document.getElementById("previous");
  

    var progressBar = document.getElementById("progress-bar");
  
    var fileInput = document.getElementById("file-input");
    fileInput.addEventListener("change", handleFileSelect);
  

    var songs = [];
  

    function renderPlaylist() {
      playlist.innerHTML = "";
      songs.forEach(function(song, index) {
        var listItem = document.createElement("li");
        listItem.textContent = song.title + " - " + song.artist;
        playlist.appendChild(listItem);
      });
    }
  
   
    var audio = new Audio();
  
 
    audio.addEventListener("timeupdate", updateProgressBar);
  

    function playSong() {
      
      var currentSongIndex = getCurrentSongIndex();
  
   
      var song = songs[currentSongIndex];
      currentSong.textContent = song.title + " - " + song.artist;
      audio.src = song.source;
      audio.play();
    }
  
    function pauseSong() {
        if (audio.paused) {
          
          audio.play();
        } else {
          
          audio.pause();
        }
      }
      
      function nextSong() {
        
        var currentSongIndex = getCurrentSongIndex();
      
        
        currentSongIndex++;
      
        
        if (currentSongIndex >= songs.length) {
          
          currentSongIndex = 0;
        }
      
      
        var song = songs[currentSongIndex];
        currentSong.textContent = song.title + " - " + song.artist;
        audio.src = song.source;
        audio.play();
      
        
        setCurrentSongIndex(currentSongIndex);
      }
      
      
    function previousSong() {
      
      var currentSongIndex = getCurrentSongIndex();
  

      currentSongIndex--;
  
      if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
      }
  
    
      var song = songs[currentSongIndex];
      currentSong.textContent = song.title + " - " + song.artist;
      audio.src = song.source;
      audio.play();
    }
  
    function getCurrentSongIndex() {
      
      var listItem = playlist.querySelector("li.active");
      if (listItem) {
        return Array.from(playlist.children).indexOf(listItem);
      } else {
        
        return 0;
      }
    }
  
    function handleFileSelect(event) {
      var files = event.target.files;
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var song = {
          title: file.name,
          artist: "Unknown",
          source: URL.createObjectURL(file)
        };
        songs.push(song);
      }
      renderPlaylist();
    }
  
    function updateProgressBar() {
      var progress = (audio.currentTime / audio.duration) * 100;
      progressBar.style.width = progress + "%";
    }
  

    playButton.addEventListener("click", playSong);
    pauseButton.addEventListener("click", pauseSong);
    nextButton.addEventListener("click", nextSong);
    previousButton.addEventListener("click", previousSong);
  });
  