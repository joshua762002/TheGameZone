function addToWishlist() {
    const item = {
      id: "game-001",
      title: document.querySelector('.game-title').innerText,
      image: document.querySelector('.game-image').src,
      genre: document.querySelector('.game-genre').innerText,
      rating: document.querySelector('.rating').innerText,
      price: document.querySelector('.price').innerText,
      age: document.querySelector('.age-limit').innerText
    };
  
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  
    // Avoid duplicates
    const exists = wishlist.find(i => i.id === item.id);
    if (exists) {
      alert("This item is already in your wishlist.");
      return;
    }
  
    wishlist.push(item);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    alert(`${item.title} added to wishlist!`);
  }
  