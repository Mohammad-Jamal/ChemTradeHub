document.addEventListener("DOMContentLoaded", function() {
    // Dummy data
    const dummyData = {
        "products": [
            {
                "name": "Product 1",
                "category": "Category 1",
                "price": 20.00,
                "image": "https://designshack.net/wp-content/uploads/placeholder-image.png"
            },
            {
                "name": "Product 2",
                "category": "Category 2",
                "price": 25.00,
                "image": "https://designshack.net/wp-content/uploads/placeholder-image.png"
            },
            {
                "name": "Product 3",
                "category": "Category 1",
                "price": 30.00,
                "image": "https://designshack.net/wp-content/uploads/placeholder-image.png"
            },
           
            {
                "name": "Product 4",
                "category": "Category 2",
                "price": 35.00,
                "image": "https://designshack.net/wp-content/uploads/placeholder-image.png"
            },
            {
                "name": "Product 5",
                "category": "Category 3",
                "price": 40.00,
                "image": "https://designshack.net/wp-content/uploads/placeholder-image.png"
            },
            {
                "name": "Product 6",
                "category": "Category 1",
                "price": 45.00,
                "image": "https://designshack.net/wp-content/uploads/placeholder-image.png"
            },
            {
                "name": "Product 7",
                "category": "Category 2",
                "price": 50.00,
                "image": "https://designshack.net/wp-content/uploads/placeholder-image.png"
            },
            {
                "name": "Product 8",
                "category": "Category 3",
                "price": 55.00,
                "image": "https://designshack.net/wp-content/uploads/placeholder-image.png"
            },
            {
                "name": "Product 9",
                "category": "Category 1",
                "price": 60.00,
                "image": "https://designshack.net/wp-content/uploads/placeholder-image.png"
            },
            {
                "name": "Product 10",
                "category": "Category 2",
                "price": 65.00,
                "image": "https://designshack.net/wp-content/uploads/placeholder-image.png"
            },  
            {
                "name": "Product 11",
                "category": "Category 2",
                "price": 65.00,
                "image": "https://designshack.net/wp-content/uploads/placeholder-image.png"
            },  
            {
                "name": "Product 15",
                "category": "Category 2",
                "price": 65.00,
                "image": "https://designshack.net/wp-content/uploads/placeholder-image.png"
            },  
            {
                "name": "Product 14",
                "category": "Category 2",
                "price": 65.00,
                "image": "https://designshack.net/wp-content/uploads/placeholder-image.png"
            },  
            {
                "name": "Product 12",
                "category": "Category 2",
                "price": 65.00,
                "image": "https://designshack.net/wp-content/uploads/placeholder-image.png"
            },  
            {
                "name": "Product 13",
                "category": "Category 2",
                "price": 65.00,
                "image": "https://designshack.net/wp-content/uploads/placeholder-image.png"
            }
        ]
    };

    
    const productsList = document.getElementById("productsList");

   
    function displayProducts(products) {
        productsList.innerHTML = "";

        products.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("product");

            const image = document.createElement("img");
            image.src = product.image;
            image.alt = product.name;

            const name = document.createElement("h3");
            name.textContent = product.name;

            const category = document.createElement("p");
            category.textContent = "Category: " + product.category;

            const price = document.createElement("p");
            price.textContent = "Price: Rs." + product.price;

            productDiv.appendChild(image);
            productDiv.appendChild(name);
            productDiv.appendChild(category);
            productDiv.appendChild(price);

            productsList.appendChild(productDiv);
        });
    }


    function paginate(array, pageSize, pageNumber) {
        return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
    }


    function displayPagination(totalProducts, pageSize, currentPage) {
        const paginationDiv = document.querySelector(".pagination");
        paginationDiv.innerHTML = "";

        const totalPages = Math.ceil(totalProducts.length / pageSize);
        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement("a");
            pageLink.href = "#";
            pageLink.textContent = i;

            pageLink.addEventListener("click", function() {
                const pageProducts = paginate(dummyData.products, pageSize, i);
                displayProducts(pageProducts);
                const activeLink = document.querySelector(".pagination a.active");
                if (activeLink) {
                    activeLink.classList.remove("active");
                }
                this.classList.add("active");
            });

            paginationDiv.appendChild(pageLink);
        }


        const initialPage = currentPage || 1;
        const initialProducts = paginate(totalProducts, pageSize, initialPage);
        displayProducts(initialProducts);
        paginationDiv.querySelector(`a:nth-child(${initialPage})`).classList.add("active");
    }

    const categoryFilter = document.getElementById("filterCategory");
    const categories = [...new Set(dummyData.products.map(product => product.category))];
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    const filterCategory = document.getElementById("filterCategory");
    const filterPrice = document.getElementById("filterPrice");

    if (filterCategory && filterPrice) {
        filterCategory.addEventListener("change", applyFilters);
        filterPrice.addEventListener("change", applyFilters);
    }

    function applyFilters() {
        const categoryValue = filterCategory.value;
        const priceValue = filterPrice.value;

        let filteredProducts = dummyData.products;

        if (categoryValue !== "all") {
            filteredProducts = filteredProducts.filter(product => product.category === categoryValue);
        }

        if (priceValue === "lowToHigh") {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (priceValue === "highToLow") {
            filteredProducts.sort((a, b) => b.price - a.price);
        }

        displayPagination(filteredProducts, 12, 1);
    }
   
    function searchProducts() {
        const searchTerm = document.getElementById("searchInput").value.toLowerCase();
        const filteredProducts = dummyData.products.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
        displayPagination(filteredProducts, 12, 1);
    }

    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
    
        searchInput.addEventListener("input", searchProducts);
    }

    const searchBtn = document.getElementById("searchBtn");
    if (searchBtn) {
     
        searchBtn.addEventListener("click", searchProducts);
    }

    displayPagination(dummyData.products, 12, 1); 
});