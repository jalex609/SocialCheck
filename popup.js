function getInfo(url, callback) {
	var xmlhttp;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState === 4 && xmlhttp.status === 200) 
			callback(xmlhttp.responseText);
	}

	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

getInfo("https://hacker-news.firebaseio.com/v0/topstories.json", function(result) {
	var topstories = JSON.parse(result);	
	var articles = [];

   
	for (var idx = 0; idx < 3; idx += 1) {
		(function(idx) {
			getInfo("https://hacker-news.firebaseio.com/v0/item/" + topstories[idx] + ".json", function(storyInfo) {
				var story = JSON.parse(storyInfo);
				articles.push({title: story.title, link: story.url});
				if (articles.length == 3) {
					var tabledata = document.querySelectorAll("td");


					for (var j = 0; j < tabledata.length; j+= 1) {
						var a = document.createElement('a');
						a.setAttribute('href',articles[j].link);
						a.innerHTML = articles[j].title;
						tabledata[j].appendChild(a);
					}
				}
			});
		}) (idx);

	}
});