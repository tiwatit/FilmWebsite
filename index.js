$(document).ready(()=>{
    $('#searchForm').on('submit',(e)=>{
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});


async function getMovies(searchText){
    try{
        var options={
            method: 'GET',
            url: 'https://imdb8.p.rapidapi.com/auto-complete',
            params: {q: searchText},
            headers: {
              'x-rapidapi-host': 'imdb8.p.rapidapi.com',
              'x-rapidapi-key': '47a2301e36msh72d8c643ce9c419p18341bjsn4b3c44235cbc'
            }
        };
        let responce = await axios.request(options);
        let movies=responce.data.d;
        let output='';
        $.each(movies,(index,movie)=>{
            output+=`
                <div class="col-md-3">
                    <div class="well text-center">
                        <img src="${movie.i.imageUrl}" />
                        <h5>${movie.l}</h5>
                        <a onclick="movieSelected('${movie.id}')" class ="btn btn-primary" href="#">Movie Details...</a>
                    </div>
                </div>
            `;
        });
        $('#movies').html(output);
    }
    catch(e){
        console.log(e);
    }
}


function movieSelected(id){
    sessionStorage.setItem('movieId',id);
    window.location='movie.html';
    return false;
}

async function getMovie(){
    try{
    let movieId=sessionStorage.getItem('movieId');
    
    var options = {
    method: 'GET',
    url: 'https://imdb8.p.rapidapi.com/title/get-overview-details',
    params: {tconst: movieId, currentCountry: 'US'},
    headers: {
      'x-rapidapi-host': 'imdb8.p.rapidapi.com',
      'x-rapidapi-key': '47a2301e36msh72d8c643ce9c419p18341bjsn4b3c44235cbc'
    }
  };
    let responce = await axios.request(options);
    let movie =responce.data;
    let output=`
        <div class="row">
            <div class="col-md-4">
                <img src="${movie.title.image.url}" class="thumbnail"/>
            </div>
            <div class="col-md-8">
                <h2>${movie.title.title}</h2>
                    <ul class="list-group">
                        <li class="list-group-item">Genre ${movie.genres}</li>
                        <li class="list-group-item">Released ${movie.releaseDate}</li>
                        <li class="list-group-item">Ratings ${movie.ratings.rating}</li>
                    </ul>
            <div>
        </div>
        <div class="row">
            <div class="well">
                <h5>Plot</h5>
                ${movie.plotSummary.text}
                <hr>
                <a href="https://www.imdb.com${movie.id}" target="_blanc" class="btn btn-primary">View Film</a>
                <a href="index.html" class="btn btn-danger">Go Back</a>
            </div>
        </div>
    `;
    $('#movie').html(output);
    }
    catch(e){
        console.log(e);
    }
}