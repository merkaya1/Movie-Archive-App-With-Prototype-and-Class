import {StoreElements} from './store-elements.js';
import {Film} from './film.js';
import {FilmData} from './filmdata.js';

const Main = function() {
  this.elements;
  this.movieData = [];
};

Main.prototype.init = function() {
  FilmData.init();
  this.movieData = FilmData.getData();
  console.log(this.movieData);
  this.elements = StoreElements.init();
  console.log('this.elements', this.elements);
  this.listenEvents();
  // this.staticFilmLS();
  this.appendMovies();
  
  
  //sayfa açıldığında bu kısım çalışıyor.
};

Main.prototype.staticFilmLS = function(){
 
  if(localStorage.getItem("MoviesList")===null){
    let film1 = new Film(
      'Platform',
      'Galder Gaztelu-Urrutia',
      'https://wallpapercave.com/wp/wp7307694.jpg',
      '2019-11-08'
    )
    let film2 = new Film(
      'Saving Private Ryan',
      'Steven Spielberg',
      'https://upload.wikimedia.org/wikipedia/en/a/ac/Saving_Private_Ryan_poster.jpg',
      '1998-09-11'
    )
    FilmData.getData.push(film1, film2); 
     
  }

  // staticFilm.forEach((item)=>{
  //   this.addMovieUI({item});
  // });
  
}

Main.prototype.listenEvents = function() {
  this.elements.muted.addEventListener("click", () => {this.soundMute();});
  this.elements.hidden.addEventListener("click", () => {this.listHidden();});
  this.elements.deleteAll.addEventListener("click", () => {this.deleteAllMovie();});
  this.elements.axe.addEventListener("click", () => {this.addMovie();});
  this.elements.movieBottom.addEventListener("click", (e) => {this.delMovie(e);});
  this.elements.movieBottom.addEventListener("click", (e) => {this.changeMovie(e);});
  console.log("this.listenevents", this.listenEvents);
};

/////////////////////
Main.prototype.deleteIndex = function(film){ // bir yerde çağırmadım
  this.movieData.forEach(function(item, index){
    if(item === film){
      item.splice(index,1);
    }
  })
}

// UI'a filmleri çekme
Main.prototype.appendMovies = function(){
  this.movieData.forEach((item) => {
    this.addMovieUI(item);
    console.log("this.appendMovies", this.appendMovies, item);
  })
  
}

Main.prototype.getElements = function() {  
  console.log("this.getElement", this.getElements);
  return this.elements;    
  
}

Main.prototype.soundMute = function() {
  this.elements.video.toggleAttribute("muted");
  console.log("this.soundMute", this.soundMute);
};

Main.prototype.listHidden = function() {
  this.elements.container.classList.toggle("d-none");
  console.log("this.listHidden", this.listHidden);
};

Main.prototype.deleteAllMovie = function() {
  if(confirm("are you serious ??")){
    while (this.elements.movieBottom.firstChild !== null) {
      this.elements.movieBottom.removeChild(this.elements.movieBottom.firstChild); // Daha hızlı çalışacak
    }
    this.showAlert("hepsi silindi", "success")
    localStorage.removeItem('MoviesList'); // localden hepsini silme
    
    
    
    console.log("this.deleteAllMovie", this.deleteAllMovie);
  }
 
};


Main.prototype.addMovie = function() {
  const name = this.elements.nameInput.value.trim();
  console.log(name);
  const director = this.elements.directorInput.value.trim();
  const img = this.elements.imgInput.value.trim();
  const date = this.elements.dateInput.value.trim();
  const film = new Film(name, director, img, date);
  if(name === '' || director === '' || img === '' || date === ''){
    this.showAlert("Eksik Bilgi Girdiniz!!", "danger")
    this.resetForm();
  }
  else{
    this.showAlert("Filminiz Eklendi. İyi Seyirler!!", "success");
     // console.log(film);
  FilmData.add(film);
  
  this.addMovieUI(film);

  this.resetForm();
  console.log("this.addMovie", this.addMovie);
  }

  
};


Main.prototype.addMovieUI = function({name, director, img, date}) {
  const row = document.createElement("div");
    row.className = "row my-3 movie-container";
    row.innerHTML = `
                    <div class="col-3">
                        <img class="img-fluid img" src="${img}" alt="">
                    </div>
                    <div class="col-7 text-white">
                        <div class="row border-bottom">
        
                            <div class="col-4"><p>NAME</p></div>
                            <div class="col-8 "> <p class="name">${name}</p> </div>
                        </div>

                    <div class="row border-bottom">
                    
                        <div class="col-4">
                            <p>DIRECTOR</p> 
                        </div>
                        <div class="col-8">
                            <p class="director">${director}</p>
                        </div>
                    </div>

                    <div class="row border-bottom">
                        
                        <div class="col-4">
                            <p>RELEASE DATE</p> 
                        </div>
                        <div class="col-8">
                            <p class="date">${date}</p>
                        </div>
                    </div>

                    <div class="row ">
                        
                        <div class="col-4">
                            <p>MOVIE SUMMARY</p> 
                        </div>
                        <div class="col-8">
                            <small>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, dolores!</small>
                        </div>
                    </div>
                </div>

                <div class="col-2 d-flex flex-column justify-content-around  ">
                    <button  class="delete btn btn-outline-secondary w-100" id="deleteMovie">Delete</button>
                    <button  class="edit btn btn-outline-success w-100 ">Edit</button>
                </div>
                `;

  this.elements.movieBottom.prepend(row); // üste ekleme
  this.resetForm();
  console.log("this.addMovieUI", this.addMovieUI);
};
///////// uidan 
Main.prototype.movieTitle = function(e){
 // silme işleminde fildata removeda title ı gönderdiğimizcxe bosluklu gönderiyor neder  !!!!!!!!!!!!!!!!!!!!!!!
  let title = e.target.parentElement.parentElement.children[1].children[0].children[1].textContent.trim(); // istediğimiz name geliyor
  console.log(title);
  return title;
}

Main.prototype.delMovieUi = function(e){
  if(e.target.id === 'deleteMovie'){
    e.target.parentElement.parentElement.remove();
    this.showAlert("silme işlemi başarılı.", "success");
    // let name = e.target.parentElement.parentElement.children[1].children[0].children[1].textContent; // istediğimiz name geliyor
    // console.log(name);
    // return name;
  }
  
  e.preventDefault();

}


Main.prototype.delMovie = function (e){
  this.delMovieUi(e)
  let title = this.movieTitle(e)
  FilmData.remove(title);

 console.log("this.delMovie", this.delMovie);
 }

Main.prototype.changeMovie = function (e){
  if(e.target.classList.contains("edit")){
    e.target.parentElement.parentElement.remove();
    // AYRICA LOCALDENDE DİREK SİLİYOR 212. SATIRDA DELMOVİE FONKSİYONUN ALTINDA TİTLE BELİRLEDİĞİMİZ İÇİN TİTLE VERİSİNİ DATAYA OTOMATİK GÖNDERİYOR
    let movie = e.target.parentElement.parentElement;
    let movieName =movie.querySelector('.name');
    let movieDirector = movie.querySelector('.director');
    let movieBanner = movie.querySelector('.img');
    let movieDate = movie.querySelector('.date');
   

    this.elements.nameInput.value = movieName.textContent;
    this.elements.directorInput.value = movieDirector.textContent;
    this.elements.imgInput.value = movieBanner.src;
    this.elements.dateInput.value = movieDate.textContent;
    // console.log( this.elements.nameInput, this.elements.directorInput, this.elements.imgInput,this.elements.dateInput);
    this.showAlert("Film verileri inputlara gönderildi. ", "warning")
  }
}

Main.prototype.resetForm = function() {
  this.elements.nameInput.value = "";
  this.elements.directorInput.value = "";
  this.elements.imgInput.value = "";
  this.elements.dateInput.value = "";
  
  console.log("this.reserForm", this.resetForm);
};

// showAlert
Main.prototype.showAlert = function (message, type) {
  
  const div = document.createElement("div");
  div.className = `mx-auto my-2 col-7 alert alert-${type}`;
  div.textContent = message;
  // this.elements.container.prepend(div);
  this.elements.container.insertBefore(div, this.elements.container.children[1])

  console.log("this.showAlert", this.showAlert);
  setTimeout(function () {
    div.remove();
  }, 1500);
};

console.log(Main.prototype);

export {
  Main
};

