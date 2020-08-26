function Gallery(gallery) {
    if (!gallery) {
        throw new Error("No gallery found here, sry");
    }
    const images = Array.from(gallery.querySelectorAll("img"));
    const modal = document.querySelector(".modal");
    const prevButton = modal.querySelector(".prev");
    const nextButton = modal.querySelector(".next");
    let currentImage;

    function openModal() {
        if (modal.matches(".open")) {
            console.info("Modal already open");
            return;
        }
        modal.classList.add("open");
        window.addEventListener("keyup", handleKeyUp);
        nextButton.addEventListener("click", showNextImage);
        prevButton.addEventListener("click", showPrevImage);
    }

    function closeModal() {
        modal.classList.remove("open");
        window.removeEventListener("keyup", handleKeyUp);
        nextButton.removeEventListener("click", showNextImage);
        prevButton.removeEventListener("click", showPrevImage);
    }

    function handleClickOutside(e) {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    }

    function handleKeyUp(event) {
        if (event.key === "Escape") return closeModal();
        if (event.key === "ArrowRight") return showNextImage();
        if (event.key === "ArrowLeft") return showPrevImage();
    }

    function showNextImage() {
        showImage(currentImage.nextElementSibling || gallery.firstElementChild);
    }

    function showPrevImage() {
        showImage(
            currentImage.previousElementSibling || gallery.lastElementChild
        );
    }

    function showImage(el) {
        if (!el) {
            console.info("no image to show");
            return;
        }
        modal.querySelector("img").src = el.src;
        modal.querySelector("figcaption").textContent = el.dataset.caption;
        currentImage = el;
        openModal();
    }

    images.forEach((image) =>
        image.addEventListener("click", (e) => showImage(e.currentTarget))
    );

    images.forEach((image) => {
        image.addEventListener("keyup", (e) => {
            if (e.key === "Enter") {
                showImage(e.currentTarget);
            }
        });
    });

    modal.addEventListener("click", handleClickOutside);
}

Gallery(document.querySelector(".gallery1"));
Gallery(document.querySelector(".gallery2"));
Gallery(document.querySelector(".gallery3"));
