// Tüm resim kapsayıcılarını ve modalları seç
const treeContainers = document.querySelectorAll('.tree-container');// ".tree-container" sınıfına sahip tüm HTML elemanlarını seçer.
// Bu elemanlar tıklanarak modalın açılmasını sağlar.
const modals = document.querySelectorAll('.modal');// ".modal" sınıfına sahip tüm HTML elemanlarını seçer.
// Modallar, açılıp kapanan diyalog kutularıdır.
const closeButtons = document.querySelectorAll('.close-btn');// ".close-btn" sınıfına sahip tüm kapatma düğmelerini seçer.
// Bu düğmeler, tıklandığında modalları kapatır.


// Modal Açma
treeContainers.forEach(container => {// Her bir "tree-container" elemanına bir tıklama olayı ekler.
    container.addEventListener('click', () => {
        const modalId = container.getAttribute('data-modal'); 
         // Tıklanan elemanın "data-modal" adlı özelliğini alır yani seçiyo.
        // Bu özellik, hangi modalın açılacağını belirtir.
        const modal = document.getElementById(modalId);  // "data-modal" ile belirtilen ID'ye sahip modalı seçer.
        modal.style.display = 'flex';  // Seçilen modalın görünür olmasını sağlar (örneğin, flex kutu olarak).
    });
});

// Modal Kapatma
closeButtons.forEach(button => { // Her bir "close-btn" elemanına bir tıklama olayı ekler.
    button.addEventListener('click', () => {
        const modal = button.closest('.modal'); // Tıklanan kapatma düğmesinin içinde bulunduğu en yakın modalı seçer.
        modal.style.display = 'none'; // Modalın görünürlüğünü kapatır.
    });
});

// Modal Dışına Tıklama ile Kapatma
window.addEventListener('click', (event) => {// Pencereye bir tıklama olayı ekler.
    modals.forEach(modal => {// Tüm modalları kontrol eder.
        if (event.target === modal) { // Eğer modalın kendisine tıklanırsa ve kendisiyse..
            modal.style.display = 'none';  // Modalı kapatır.
        }
    });
});
