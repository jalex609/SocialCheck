function getInfo(url, callback) {
	var xmlhttp;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState === 4 && xmlhttp.status === 200) 
			callback(xmlhttp.responseText);
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function updateLinks(evt) {
	var links = document.querySelectorAll("a");
	for (var i = 0; i < links.length; i++) {
		links[i].parentNode.removeChild(links[i]);
	}

	var tablinks = document.getElementsByClassName("tablinks");
	for (var j = 0; j < tablinks.length; j++) {
		tablinks[j].className = tablinks[j].className.replace(" active", "");
	}
	evt.currentTarget.className += " active";
}


function getLinks() {

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
							var a = document.createElement("a");
							a.setAttribute("href",articles[j].link);
							a.innerHTML = articles[j].title;
							tabledata[j].appendChild(a);

						}
					}
				});
			}) (idx);

		}
	});
}


document.addEventListener('DOMContentLoaded', function() {
	document.getElementById("HN").addEventListener("click", function (event) {
		updateLinks(event); 
		setTimeout(getLinks(), 3000);
	});
});

document.addEventListener('DOMContentLoaded', function() {
	document.getElementById("Reddit").addEventListener("click", function (event) {
		updateLinks(event); 
		setTimeout(getLinks(), 3000);
	});
});

document.addEventListener('DOMContentLoaded', function() {
	document.getElementById("Github").addEventListener("click", function (event) {
		updateLinks(event); 
		setTimeout(getLinks(), 3000);
	});
});


window.addEventListener('click',function(e){
	if(e.target.href!==undefined){
		chrome.tabs.create({url:e.target.href});
	}
});