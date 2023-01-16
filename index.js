const API = "AIzaSyBu82veNvXslI7YES3j0CUrtWq8DZZqBtI";

let q="";
let search = async () => {
    let query = document.getElementById("query").value;
    let data = await getData(query);
    append(data);
    q=query;
    // console.log(data);
}

let getData = async (query) => {
    let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=AIzaSyBu82veNvXslI7YES3j0CUrtWq8DZZqBtI`;
    let res = await fetch(url);
    let data = await res.json();
    return data.items;
}

let append = (data) => {
    let container = document.getElementById("container");
    container.innerHTML = null;

    data.forEach(( { id: { videoId }, snippet: { title, thumbnails: { medium: { url }, }, }, }) => {
        let img = document.createElement("img");
        img.src = url;

        let h3 = document.createElement("h3");
        h3.innerText = title;

        let div = document.createElement("div");
        div.onclick = () => {
            saveVideo( { id: { videoId }, snippet: { title, thumbnails: { medium: { url }, }, }, })
        }
        div.setAttribute("class","video");

        div.append(img,h3);
        container.append(div);
    })
}

let saveVideo = (data) => {
    localStorage.setItem("video",JSON.stringify(data));
    window.location.href = "video.html";
}

let filter = async() => {
    let data = await getData(q);
    
    data.filter((el) => {
        return el.snippet.channelId === "UCvC4D8onUfXzvjTOM-dBfEA";
    });

    append(data)

}

let displayRes = async() => {
    let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=popularinindia&key=AIzaSyBu82veNvXslI7YES3j0CUrtWq8DZZqBtI`;
    let res = await fetch(url);
    let data = await res.json();
    append(data.items)
}