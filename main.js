// main variables
let input = document.querySelector(".get-repos input");
let getBtn = document.querySelector(".get-btn");
let reposData = document.querySelector(".show-data");

getBtn.onclick = function () {
  getRepos();
};

// get repos function
function getRepos() {
  if (input.value == "") {
    // if value is empty
    reposData.innerHTML = `<span>Please write github username</span>`;
  } else {
    // fetch
    fetch(`https://api.github.com/users/${input.value}/repos`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // empty the container
        reposData.innerHTML = "";

        // loop on reposetries
        data.forEach((repo) => {
          // create the main div element
          let mainDiv = document.createElement("div");
          // create repo name text
          let repoName = document.createTextNode(repo.name);
          // append text to main div
          mainDiv.appendChild(repoName);

          // create container
          let container = document.createElement("div");
          container.className = "actions"
          
          // create repo url
          let url = document.createElement("a");
          // create repo url text
          let urlText = document.createTextNode("visit");

          // append repo url to text (anchor tag)
          url.appendChild(urlText);
          // add the href
          url.href = `https://github.com/${input.value}/${repo.name}`;

          // set attribute blank
          url.setAttribute("target", "_blank");

          // creates stars count span
          let starsSpan = document.createElement("span");
          // create stars count text
          let starsText = document.createTextNode(
            `stars ${repo.stargazers_count}`
          );
          starsSpan.appendChild(starsText)
          container.appendChild(url)
          // add stars count text to stars span
          container.appendChild(starsSpan);
          // append stars count span to main div
          mainDiv.appendChild(container);
          // add class to main div
          mainDiv.className = "repo-box";

          // append the main div to container
          reposData.appendChild(mainDiv);
        });
      });
  }
}
