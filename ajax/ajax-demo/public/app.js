console.log("Hello world");

$(document).ready(() => {


    // const $h2 = $("h2"); // select h2 elements in the html
    // const $h2 = $("<h2>"); // create a new h2 element
    // $h2.text = "Some text"

    // const $h2 = $("<h2 className='food-item'>Some text</h2>")

    const createFoodItem = (foodItem) => {
        return $(`
        <article class="food-item">
            <header>
            <h2>Name: ${foodItem.name}</h2>
            <h3>Price: ${foodItem.price}</h3>
            </header>
            <hr />
            <footer>
            <h2>Tagline: ${foodItem.tagline}</h2>
            <h2>Calories: ${foodItem.calories}</h2>
            </footer>
        </article>
        `);
    };

    const renderFoodItems = (foodItems) => {
        const $container = $("#container");
        for (const foodItem of foodItems) {
            const $foodItemNode = createFoodItem(foodItem);
            // append will add it to the end
            $container.prepend($foodItemNode);
        }
    }

    const loadFoodItems = () => {
        $.ajax({
            method: "GET",
            url: "/food-items",
            dataType: "json",
            success: (foodItems) => {
                renderFoodItems(foodItems)
            },
        })
    }

    const $form = $("#new-food-item"); // grab the form

    $form.on("submit", (event) => {
        // prevent the default behavior of the form navigating away
        event.preventDefault();

        console.log("form submmited")
        // get the form data into url-encoded data
        const formData = $form.serialize()
        console.log(formData);

        // post the form data to the backend
        $.ajax({
            method: "POST",
            url: "/food-items",
            data: formData,
            success: (response) => {
                console.log("success posting form")
                loadFoodItems();
            },
        })
    })

    loadFoodItems();
});

