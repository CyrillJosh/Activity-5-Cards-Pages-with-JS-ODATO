let nid = localStorage.getItem("id");
localStorage.removeItem("id");

$(document).ready(function () {
    fetch("pokedex.json")
    .then((rawData) => rawData.json())
    .then((pokedex) => {
        let pokemon = pokedex[nid];

        let id = (10000 + pokemon["id"]).toString().substring(1);
        let name = pokemon["name"]["english"];
        let types = pokemon["type"];
        let typeHTML = "";
        types.forEach(type => {
            typeHTML += `<span class="${type}">${type}</span>`
        })
        let species = pokemon["species"];
        let description = pokemon["description"];
        let image = pokemon["image"]["hires"];
        if (image == null) {
            image = pokemon["image"]["thumbnail"];
        }
        let sprite = pokemon["image"]["sprite"];
        let height = pokemon["profile"]["height"];
        let weight = pokemon["profile"]["weight"];
        let abilities = pokemon["profile"]["ability"];
        let abilitiesHTML = "";
        abilities.forEach(ability => {
            abilitiesHTML += `<span class="${ability[0]}">${ability[0]}</span>`;
        })

        //display
        $(".pokemon-container").append(
            `<div class="container-head">
                <h3>${name}</h3>
                <img src="${sprite}">
            </div>
            <div class="pokemon-sprite">
                <img src="${image}">
                <p>${description}</p>
            </div>
            <div class="pokemon-stats">
                <div class="pokedex-data">
                </div>
                <div class="base-stats">
                    <h3>Base stats</h3>
                    <table>
                        <tbody class="stats">
                        </tbody>
                    </table>
                </div>
            </div>`
        );

        //Pokedex data
        $(".pokedex-data").append(
            `<h3>Pokedex Data</h3>
            <table>
                <tbody>
                    <tr>
                        <td>National No</td>
                        <td>${id}</td>
                    </tr>
                    <tr>
                        <td>Type</td>
                        <td>${typeHTML}</td>
                    </tr>
                    <tr>
                        <td>Species</td>
                        <td>${species}</td>
                    </tr>
                    <tr>
                        <td>Height</td>
                        <td>${height}</td>
                    </tr>
                    <tr>
                        <td>Weight</td>
                        <td>${weight}</td>
                    </tr>
                    <tr>
                        <td>Abilities</td>
                        <td>${abilitiesHTML}</td>
                    </tr>
                </tbody>
            </table>`
        )
        //Pokmon stats
        base = pokemon["base"];
        let count = 0;
        for (const stat in base) {
            $(".stats").append(
                `<tr>
                    <td>${stat}</td>
                    <td>${base[stat]}</td>
                    <td class ="stat"><div style="width: ${(base[stat]/255)*100}%"></div></td>
                </tr>`
            );
        }
    });
})