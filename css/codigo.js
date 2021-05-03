let previus = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let titulo = document.querySelector('#titulo');
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artista =document.querySelector('#artista');

let timer;
let autoplay=0;

let index_no=0;
let Playing_song=false;
 
 //create a audio element
 let track = document.createElement('audio');

 //toda lista de canciones
 let All_song =[
 {
 	name:"Cool Cat",
 	path:"music/Queen.mp3",
 	img:"img/coolcat.jpg",
 	singer:"Queen"
 },
 {
 	name:" LA HERIDA DE PARIS",
 	path:"music/SPINETTA.mp3",
 	img:"img/heridadeparis.jpg",
 	singer:"SPINETTA"
 },
 {
 	name:"Leave Me Alone",
 	path:"music/Leave.mp3",
 	img:"img/leavemealone.jpg",
 	singer:"Michael Jackson"
 },
 {
 	name:"September ",
 	path:"music/September.mp3",
 	img:"img/september.jpg",
 	singer:"Earth, Wind & Fire "
 },
 {
 	name:"Soul Intro / The Chicken",
 	path:"music/Soul.mp3",
 	img:"img/soulintro.jpg",
 	singer:"Jaco Pastorius"
 }

 ];

 //All function 

 //funcion cargar track
 function load_track(index_no){
 	clearInterval(timer);
 	reset_slider();

 	
 	track.src = All_song[index_no].path;
 	titulo.innerHTML = All_song[index_no].name;
 	track_image.src= All_song[index_no].img;
 	artista.innerHTML = All_song[index_no].singer;
 	track.load();

 	timer= setInterval(range_slider, 1000);
 	total.innerHTML = All_song.length;
 	present.innerHTML = index_no +1;
 }

 load_track(index_no);

//mute sound
function mute_sound(){
	track.volume=0;
	volume.value=0;
	volume_show.innerHTML=0;
}

 //reset song slider
 function reset_slider(){
 	slider.value= 0;
 }

 //chequea la cancion se reproducio o no
 function justplay(){
 	if(Playing_song==false){
 		playsong();
 	}else{
 		pausesong();
 	}
 }

 //play cancion
function playsong(){
  track.play();
  Playing_song = true;
  play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

 //pausar cancion
 function pausesong(){
 	track.pause();
 	Playing_song=false;
 	play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
 }

 //next song

 function next_song(){
 	if(index_no < All_song.length -1){
 		index_no += 1;	
 		load_track(index_no);
 		playsong();
 	}else{
 		index_no=0;
 		load_track(index_no);
 		playsong();
 	}

 }

//previus song

 function previus_song(){
 	if(index_no >0){
 		index_no -= 1;	
 		load_track(index_no);
 		playsong();
 	}else{
 		index_no=All_song.length;
 		load_track(index_no);
 		playsong();
 	}

 }
 //change volumen

 function volume_change(){
 	volume_show.innerHTML=recent_volume.value;
 	track.volume=recent_volume.value / 100; 	
 }

 //change slider position

 function change_duration(){
 	slider_position= track.duration * (slider.value / 100);
 	track.currentTime=slider_position;
 }


 //autoplay functiom
 function autoplay_switch(){
	if (autoplay==1){
       autoplay = 0;
       auto_play.style.background = "rgba(255,255,255,0.2)";
	}else{
       autoplay = 1;
       auto_play.style.background = "#FF8A65";
	}
}

 function range_slider(){
 	let position = 0;

 	//update position slider
 	if(!isNaN(track.duration)){
 		position=track.currentTime * (100 / track.duration);
 		slider.value=position;
 	}
 	// function will run when the song is over
       if(track.ended){
       	 play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
           if(autoplay==1){
		       index_no += 1;
		       load_track(index_no);
		       playsong();
           }
	    }
 }