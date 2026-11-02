
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function formatRupiah(angka) {
    return "Rp" + Number(angka).toLocaleString("id-ID");
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// TAMBAH PRODUK
function addCart(nama, harga) {
    cart = JSON.parse(localStorage.getItem("cart")) || [];

    let produk = cart.find(item => item.nama === nama);

    if (produk) {
        produk.jumlah++;
    } else {
        cart.push({
            nama: nama,
            harga: Number(harga),
            jumlah: 1
        });
    }

    saveCart();
    alert(nama + " berhasil ditambahkan!");
}

window.addCart = addCart;

// TAMPILKAN KERANJANG
function renderCart() {
    cart = JSON.parse(localStorage.getItem("cart")) || [];

    const container = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");

    if (!container || !totalElement) return;

    container.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = "<p>Keranjang masih kosong.</p>";
    }

    cart.forEach((item, index) => {
        let subtotal = item.harga * item.jumlah;
        total += subtotal;

        container.innerHTML += `
            <div class="cart-item">
                <strong>${item.nama}</strong>
                <p>Harga: ${formatRupiah(item.harga)}</p>
                <p>Jumlah: ${item.jumlah}</p>
                <p>Subtotal: ${formatRupiah(subtotal)}</p>
                <button onclick="hapusCart(${index})">Hapus</button>
            </div>
        `;
    });

    totalElement.innerText = formatRupiah(total);
}

function hapusCart(index) {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

window.hapusCart = hapusCart;

// CHECKOUT
function renderCheckout() {
    cart = JSON.parse(localStorage.getItem("cart")) || [];

    const summary = document.getElementById("checkout-summary");
    if (!summary) return;

    let total = cart.reduce((sum, item) =>
        sum + item.harga * item.jumlah, 0);

    summary.innerHTML = `
        <h3>Ringkasan Pesanan</h3>
        <p>${cart.map(item =>
            `${item.nama} x${item.jumlah}`
        ).join("<br>") || "Keranjang masih kosong."}</p>
        <h3>Total: ${formatRupiah(total)}</h3>
    `;
}

// FORM CHECKOUT
document.addEventListener("DOMContentLoaded", function() {
    cart = JSON.parse(localStorage.getItem("cart")) || [];

    renderCart();
    renderCheckout();

    const form = document.getElementById("checkout-form");

    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            if (cart.length === 0) {
                alert("Keranjang masih kosong!");
                return;
            }

            let nama = document.getElementById("nama").value;
            let telepon = document.getElementById("telepon").value;
            let alamat = document.getElementById("alamat").value;
            let pembayaran = document.getElementById("pembayaran").value;

            let total = cart.reduce((sum, item) =>
                sum + item.harga * item.jumlah, 0);

            alert(
                "PESANAN BERHASIL DIBUAT!\n\n" +
                "Nama: " + nama + "\n" +
                "WhatsApp: " + telepon + "\n" +
                "Alamat: " + alamat + "\n" +
                "Total: " + formatRupiah(total) + "\n" +
                "Pembayaran: " + pembayaran
            );

            cart = [];
            saveCart();
            renderCart();
            renderCheckout();
            form.reset();
        });
    }

    // JUMBOTRON
    let slideIndex = 0;
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    function showSlide(index) {
        if (slides.length === 0) return;

        slideIndex = (index + slides.length) % slides.length;

        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));

        slides[slideIndex].classList.add("active");

        if (dots[slideIndex]) {
            dots[slideIndex].classList.add("active");
        }
    }

    window.changeSlide = direction => showSlide(slideIndex + direction);
    window.currentSlide = index => showSlide(index);

    showSlide(0);

    if (slides.length > 1) {
        setInterval(() => showSlide(slideIndex + 1), 3000);
    }
});
