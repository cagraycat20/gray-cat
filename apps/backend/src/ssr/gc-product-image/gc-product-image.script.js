document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('img.product-image').forEach((img) => {
    if (img.complete) {
      img.classList.remove('product-image-hidden');
    } else {
      img.onload = (event) => event.target.classList.remove('product-image-hidden');
    }
  });
});