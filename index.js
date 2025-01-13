import * as prismic from "https://cdn.skypack.dev/@prismicio/client";

const repositoryName = "escola-teste";
const client = prismic.createClient(repositoryName);

const init = async () => {
  const response = await client.getAllByType("atividade-projeto", {
    orderings: "my.post.date desc",
  });

  const posts = response.map(({ uid, data: post }) => {
    return {
      id: uid,
      title: prismic.asText(post.title),
      description: prismic.asText(post.description),
      thumbnail: post.thumbnail.url,
    };
  });

  posts.forEach((post) => {
    const postAsHtml = `
      <article class="project-item">
        <div class="project-content">
          <h3>${post.title}</h3>
          <p>${post.description}</p>
        </div>
        <div class="project-image">
          <img
            src="${post.thumbnail}"
            alt="${post.title}"
          />
        </div>
      </article>
    `;
  
    document.querySelector(".project-list").innerHTML += postAsHtml;
  });  
};

init();
