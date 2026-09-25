const API_KEY = "ea19020f259d5870e1614df6802a6d6c";

const cards = document.getElementById("cards-noticias");

async function carregarNoticias() {

    cards.innerHTML = `
        <p>Carregando notícias...</p>
    `;

    try {

        const url =
            `https://gnews.io/api/v4/top-headlines` +
            `?category=technology` +
            `&lang=pt` +
            `&country=br` +
            `&max=6` +
            `&apikey=${API_KEY}`;

        console.log("Buscando:", url);

        const resposta = await fetch(url);

        const dados = await resposta.json();

        console.log("Resposta da API:", dados);

        if (!resposta.ok) {

            throw new Error(
                dados.errors?.join(", ") ||
                `Erro ${resposta.status}`
            );

        }

        cards.innerHTML = "";

        dados.articles.forEach(noticia => {

            const card = document.createElement("a");

            card.className = "card-link";

            card.href = noticia.url;

            card.target = "_blank";

            card.innerHTML = `
                
                <article class="card">

                    <img 
                        src="${noticia.image || 'https://via.placeholder.com/600x350'}"
                        alt="${noticia.title}"
                    >

                    <h3>
                        ${noticia.title}
                    </h3>

                    <p>
                        ${noticia.description || "Leia a notícia completa."}
                    </p>

                    <small>
                        ${noticia.source.name}
                    </small>

                </article>

            `;

            cards.appendChild(card);

        });

    } catch (erro) {

        console.error("ERRO DA API:", erro);

        cards.innerHTML = `

            <div class="erro">

                <h3>Erro ao carregar notícias</h3>

                <p>${erro.message}</p>

                <p>
                    Abra o console do navegador com F12
                    para ver mais detalhes.
                </p>

            </div>

        `;

    }

}

carregarNoticias();