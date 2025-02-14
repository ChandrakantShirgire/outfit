function showRecommendations() {
    const outfitList = document.getElementById('outfitList');
    outfitList.innerHTML = `
        < div class="outfit">
            <h3>Casual Look</h3>
            <p>White T-shirt, Blue Jeans, and Sneakers</p>
        </div>
        <div class="outfit">
            <h3>Business Casual</h3>
            <p>Button-up Shirt, Chinos, and Loafers</p>
        </div>
        <div class="outfit">
            <h3>Evening Wear</h3>
            <p>Black Dress, Heels, and Clutch</p>
        </div>
    `;
}