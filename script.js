$('button').click(function() {
    const userInput = $('#search').val()
    // $('#results').append(`<h1>${userInput}</h1>`)

    // remove help text
    $('#help').remove()
    
    data = fetchData(userInput);
})

function fetchData(userInput) {
    

    const apiUrl = 'https://api.soundcloud.com/tracks?client_id=5aa8e389ba4e24b6106af5159ab3e344&limit=100&q='
    fetch(apiUrl + userInput)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        let result = data.map(function(item) {
            return {
                artwork_url: item.artwork_url,
                title: item.title,
                description: item.description,
                genre: item.genre,
                user: item.user.username
            }
        })

        result = result.filter(function(item) {
            return item.artwork_url
        });
        // console.log('data is', data);
        // console.log('result is', result)
        return result;
    })
    .then(displayData)
}

function displayData(data) {
    console.log('data is', data);
    data.forEach(function(track) {
        $('#results').append(constructHTML(track));
    })
}

function constructHTML(track) {
    return `
    <div class="card" style="width: 18rem;">
        <h3>${track.title}</h3>
        <img src="${track.artwork_url}">
        <p>${track.description}</p>
    </div>
    `
}