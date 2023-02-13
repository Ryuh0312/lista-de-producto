class Product {
  constructor(name, price, year) {
    this.name = name;
    this.price = price;
    this.year = year;
  }
}

class UI {
  addProduct(product) {
    const productList = document.getElementById("product-list");
    const element = document.createElement("div");
    element.innerHTML = `
        <div class="card text-center mb-4">
            <div class="card-body"> 
                <strong> product name</strong>: ${product.name}
                <strong> product price</strong>: ${product.price}
                <strong> product year</strong>: ${product.year}
                <a href="#" class="btn btn-danger" name="delete">delete</a>
            </div>
        </div>
        `;
    productList.appendChild(element);
    this.resetForm();
  }
  resetForm() {
    document.getElementById("product-form").reset();
  }
  deleteProduct(element) {
    if (element.name === "delete") {
      element.parentElement.parentElement.parentElement.remove();
      this.showMessage("Product Delecte Successfully", "info");
    }
  }
  showMessage(message, cssClass) {
    const div = document.createElement("div");
    div.className = `alert alert-${cssClass} mt-4`;
    div.appendChild(document.createTextNode(message));
    // Mostrando en el DOM
    const container = document.querySelector(".container");
    const app = document.querySelector("#App");
    container.insertBefore(div, app);
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 2000);
  }
}

// Evento de Dom
document
  .getElementById("product-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const year = document.getElementById("year").value;
    const product = new Product(name, price, year);
    const ui = new UI();
    if (name === '' || price === '' || year === '') {
      return ui.showMessage("Complete Fields Please", "danger");
    }
    ui.addProduct(product);
    ui.resetForm();
    ui.showMessage("Product Added Successfully", "success");
  });
document.getElementById("product-list").addEventListener("click", function (e) {
  const iu = new UI();
  iu.deleteProduct(e.target);
});
