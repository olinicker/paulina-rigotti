import * as prismic from "https://cdn.skypack.dev/@prismicio/client";

const repositoryName = "escola-teste";
const client = prismic.createClient(repositoryName);

const init = async () => {
  try {
    const response = await client.getAllByType("atividade-projeto");

    const posts = response.sort((a, b) => b.uid.localeCompare(a.uid));

    const formattedPosts = posts.map(({ uid, data: post }) => ({
      id: uid,
      title: prismic.asText(post.title),
      description: prismic.asText(post.description),
      thumbnail: post.thumbnail.url,
    }));

    let postsHtml = "";
    formattedPosts.forEach((post) => {
      postsHtml += `
        <article class="project-item">
          <div class="project-content">
            <h3>${post.title}</h3>
            <p>${post.description}</p>
          </div>
          <div class="project-image">
            <img src="${post.thumbnail}" alt="${post.title}" />
          </div>
        </article>
      `;
    });

    const projectList = document.querySelector(".project-list");
    if (projectList) {
      projectList.innerHTML = postsHtml;
    }
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    document.querySelector(".project-list").innerHTML =
      "<p>Erro ao carregar os projetos.</p>";
  }
};

init();
