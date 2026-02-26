const searchBtn = document.getElementById('searchBtn');
const pokemonInput = document.getElementById('pokemonInput');
const pokemonCard = document.getElementById('pokemonCard');

searchBtn.addEventListener('click', () => {
    const pokemonName = pokemonInput.value.toLowerCase().trim();
    
    if (pokemonName === "") return;

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
            if (!response.ok) throw new Error("Pokémon no encontrado");
            return response.json();
        })
        .then(data => {
            renderPokemon(data);
        })
        .catch(error => {
            pokemonCard.innerHTML = `<p style="color:red;">${error.message}</p>`;
        });
});

function renderPokemon(data) {
   
    const skills = data.abilities.map(a => a.ability.name).join(', ');
    const types = data.types.map(t => t.type.name).join(', ');

    pokemonCard.innerHTML = `
        <div class="info-card">
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <h2>${data.name.toUpperCase()} (#${data.id})</h2>
            <p><strong>Tipos:</strong> ${types}</p>
            <p><strong>Habilidades:</strong> ${skills}</p>
            <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
        </div>
    `;
}