class FireEffect {
    constructor() { // parıltıyı oluşturma tarafı aynı zamanda / Bu, sınıfın bir örneği (nesnesi) oluşturulduğunda çalışan kurucu metot.
        this.canvas = document.getElementById('fireCanvas'); //sınıfı nesneyi ifade ediyor ve firecanvas adlı elemanı seçiyor 
         // "fireCanvas" ID'sine sahip HTML elemanını seçer ve bu elemanı `canvas` olarak tanımlar.
        this.ctx = this.canvas.getContext('2d');//canvas etiketini bağlamak için  ve 2D çizimler yapmak için bağ oluşturuyor 
        //kanvas elemanını seçer getElementById ve özel imleç sınıfını seçer    
        this.cursor = document.querySelector('.cursor-fire');   // ".cursor-fire" sınıfına sahip HTML elemanını seçer ve `cursor` olarak tanımlar. Bu, özel bir imleci temsil eder.
        this.particles = []; //Fare hareket ettiğinde "parçacıklar" oluşturulur. Her parçacık, fare imlecinin etrafında küçük bir ateş topu gibi görünür ve zamanla kaybolur.
       //this methodları tanımlamak için kullanılıyor
        this.mousePos = { x: 0, y: 0 };  // Fare imlecinin mevcut pozisyonunu (x ve y koordinatları) takip etmek için bir nesne tanımlar.
        this.lastMousePos = { x: 0, y: 0 };   // Fare imlecinin bir önceki pozisyonunu (x ve y koordinatları) takip etmek için bir nesne tanımlar.
        this.velocity = { x: 0, y: 0 };   // Fare hareketinin hızını (x ve y yönlerinde) hesaplamak için bir nesne tanımlar.    
        
        this.init();  // Sınıfın başlatma işlevini çağırır. Bu işlev, gerekli başlangıç ayarlarını yapar.
        this.animate(); // Animasyonu başlatan bir işlevi çağırır. Bu, parçacıkların hareketini ve çizimini sürekli olarak günceller.
    }

    init() {
        this.resizeCanvas();// Kanvas boyutlarını, tarayıcı penceresinin boyutlarına göre yeniden ayarlar.
        // Bu, kanvasın her zaman ekran boyutlarına uygun olmasını sağlar.
        window.addEventListener('resize', () => this.resizeCanvas());// Tarayıcı penceresi yeniden boyutlandırıldığında, `resizeCanvas` işlevini çalıştırır.
        // Böylece kanvas boyutu, pencere boyutuyla uyumlu kalır.
        
        document.addEventListener('mousemove', (e) => {  // Fare hareketi algılandığında tetiklenir.
            // `mousemove` olayını dinler ve fare pozisyonuna bağlı olarak işlemler yapar.
    
            this.lastMousePos = { ...this.mousePos };  // Fare hareket etmeden önceki pozisyonu, `lastMousePos` değişkenine kaydeder.
            // Bu, hareketin yönünü ve hızını hesaplamak için kullanılır.
            this.mousePos = { x: e.clientX, y: e.clientY }; // Fare imlecinin o anki pozisyonunu alır (`e.clientX` ve `e.clientY` ile).

            
            this.velocity = {
                x: this.mousePos.x - this.lastMousePos.x,  // X eksenindeki hareket hızı (yeni pozisyon - önceki pozisyon).
                y: this.mousePos.y - this.lastMousePos.y // Y eksenindeki hareket hızı (yeni pozisyon - önceki pozisyon).
            };

            this.cursor.style.left = `${this.mousePos.x}px`; // Özel imleci fare imlecinin X pozisyonuna taşır.
            this.cursor.style.top = `${this.mousePos.y}px`; // Özel imleci fare imlecinin Y pozisyonuna taşır.

            const speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);  // Hareket hızını hesaplar. Hız, X ve Y hızlarının karelerinin toplamının kareköküdür.
            // Bu, fare hareketinin toplam hızını verir. 
            const particleCount = Math.floor(speed * 0.8); // Hareket hızına bağlı olarak oluşturulacak parçacık sayısını belirler.
            // Daha hızlı hareket daha fazla parçacık oluşturur.
            // (Buradaki `0.8` katsayısı, parçacık yoğunluğunu ayarlar.)
    
            
            for (let i = 0; i < particleCount; i++) { // Parçacıkları oluşturmak için `createParticle` işlevini çağırır.
                this.createParticle();
            }
        });
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth; // Kanvas genişliğini, tarayıcı penceresinin genişliğine eşitler.
        this.canvas.height = window.innerHeight; // Kanvas yüksekliğini, tarayıcı penceresinin yüksekliğine eşitler.
    }
// Parçacıklar, fare hareket ettiğinde oluşturulan ve kanvasa çizilen nesnelerdir.
// Bu nesnelerin özellikleri aşağıda tanımlanır.  
    createParticle() {
        // Burada renk değerlerini ayarlama
        const baseHue = Math.random() < 0.5 ? 10 : 30;  // Parçacığın rengini belirlemek için rastgele bir ton seçilir.
        // 10: Kırmızımsı tonlar, 30: Turuncumsu tonlar.
        const particle = { // particle çiizm tarafları oluyor // Parçacık özelliklerini tanımlayan nesne.
            x: this.mousePos.x, // Parçacığın başlangıçtaki X pozisyonu, fare imlecinin X pozisyonudur.
            y: this.mousePos.y, // Parçacığın başlangıçtaki Y pozisyonu, fare imlecinin Y pozisyonudur.
            size: Math.random() * 3 + 2,   // Parçacığın boyutu rastgele belirlenir. 2 ile 5 piksel arasında olabilir.
            speedX: this.velocity.x * (Math.random() * 0.5) + (Math.random() - 0.5) * 2,  // Parçacığın X eksenindeki hızı, fare hareket hızına ve rastgele bir faktöre bağlıdır.
            speedY: this.velocity.y * (Math.random() * 0.5) - Math.random() * 3,   // Parçacığın Y eksenindeki hızı, fare hareket hızına ve rastgele bir faktöre bağlıdır.
            life: 1, // Parçacığın yaşam süresi başlangıçta 1 olarak ayarlanır.
            color: `hsla(${baseHue}, 100%, ${50 + Math.random() * 20}%, `,  // Parçacığın rengi HSLA formatında belirlenir.
            // `baseHue`: Renk tonu (kırmızı/turuncu).
            // `100%`: Canlılık oranı.
            // `50 + rastgele bir değer`: Parçacığın parlaklık seviyesi.
            decay: 0.01 + Math.random() * 0.02,  // Parçacığın her çerçevede ne kadar hızlı kaybolacağını belirler.
            gravity: 0.1 + Math.random() * 0.1,  // Yer çekimi etkisi, parçacığın Y ekseninde aşağı doğru hızlanmasına neden olur.
            wiggle: {
                amplitude: Math.random() * 2, // Parçacığın "dalgalanma" hareketinin büyüklüğünü belirler.
                frequency: Math.random() * 0.02, // Dalgalanmanın ne kadar sık olacağını belirler.  
                offset: Math.random() * Math.PI * 2  // Dalgalanmanın başlangıç fazını belirler (rastgele bir değer).
            }
        };
        
        this.particles.push(particle);   // Yeni oluşturulan parçacığı `particles` dizisine ekler.
    }

    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) { // Parçacıklar dizisindeki her bir parçacığı işler. 
            // Ters sırada döngü yapar çünkü parçacıklar diziden silinebilir.
            const p = this.particles[i];  // Şu anki parçacığı alır.
            
            p.life -= p.decay;  // Parçacığın yaşam süresini azaltır. `decay` (azalma) oranı kadar her çerçevede eksilir.
            p.speedY += p.gravity;   // Parçacığın Y eksenindeki hızını, yer çekimi etkisiyle artırır.
            
            p.x += p.speedX + Math.sin(p.wiggle.offset + p.life * 10) * p.wiggle.amplitude;  // Parçacığın X eksenindeki konumunu günceller.
            // `wiggle` (dalgalanma) hareketi için sinus dalgası kullanılır.
            p.y += p.speedY;  // Parçacığın Y eksenindeki konumunu günceller.
            
            if (p.life <= 0) { // Eğer parçacığın yaşam süresi sıfıra ulaşırsa, diziden silinir.
                this.particles.splice(i, 1); // yavaş yavaş silinmeye başlarlar parçacıklar 
            }
        }
    }

    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);  // Kanvasın tamamını temizler, böylece eski çizimler kaybolur.
        
        this.particles.forEach(p => { // Parçacıklar dizisindeki her bir parçacığı işler.
            this.ctx.beginPath();  // Yeni bir çizim yolu başlatır.
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); // Parçacığın pozisyonunda (x, y), belirli bir boyutta bir daire çizer.
            this.ctx.fillStyle = p.color + p.life + ')';  // Parçacığın rengini ve şeffaflığını (`life`) ayarlar.
            this.ctx.fill();  // Dairenin içini doldurur.
            //Parçacıklara parıltı eklemek için kullanılan gölge ayarları
            this.ctx.shadowBlur = 20;  // Parçacığın etrafında bulanık bir parıltı oluşturur.   
            this.ctx.shadowColor = p.color + '1)';  // Gölgenin rengini belirler.
        });
    }

    animate() { //Animasyon döngüsünü başlatmak için kullanılıyo
        this.updateParticles();  // Parçacıkların özelliklerini (konum, yaşam süresi vb.) günceller.
        this.drawParticles();// Güncellenmiş parçacıkları kanvasa çizer.
        requestAnimationFrame(() => this.animate());// Animasyonu sürekli olarak çalıştırır. Tarayıcının ekran yenileme hızına göre döngüyü tekrar eder.
    }
}

class CursorGlow {
    constructor() {
        this.cursor = document.querySelector('.cursor-fire');  // HTML'deki ".cursor-fire" sınıfına sahip elemanı seçer.
        // Bu eleman özel bir fare imlecini temsil eder.
        this.glowSize = 1;  // İmlecin başlangıç ölçeği. Normal boyutta başlar.
        this.glowDirection = 0.05; // Parıltının büyüme veya küçülme oranı. Pozitif bir değer büyümeyi, negatif bir değer küçülmeyi ifade eder.
        this.animate();// Animasyon döngüsünü başlatır.
    }

    animate() {
        this.glowSize += this.glowDirection;// Parıltı boyutunu artırır veya azaltır. `glowDirection` bu değişimin yönünü belirler.
        
        if (this.glowSize > 1.2) this.glowDirection = -0.05; // Eğer parıltı boyutu 1.2'den büyükse, küçültme yönüne geçer.
        if (this.glowSize < 0.8) this.glowDirection = 0.05; // Eğer parıltı boyutu 0.8'den küçükse, büyütme yönüne geçer.
        
        this.cursor.style.transform = `translate(-50%, -50%) scale(${this.glowSize})`;  // İmleci büyütmek ve küçültmek için CSS `transform` özelliğini kullanır.
        // `translate(-50%, -50%)`: İmleci merkezde tutar.
        // `scale(${this.glowSize})`: Parıltı boyutunu değiştirir.
        requestAnimationFrame(() => this.animate()); // Animasyonu sürekli olarak çalıştırır. Tarayıcının ekran yenileme hızına göre döngüyü tekrar eder.
    }
}

// iki nesne şablonunu tanımlıyor  ve efektleri başlattığımız yer 2 efekt yer alır 
window.addEventListener('DOMContentLoaded', () => {
    new FireEffect();// Ateş efektini başlatır.
    new CursorGlow(); // İmleç parıltı efektini başlatır.
});
// Kullanıcı hareket ettiğinde parçacık sayısını ve renk tonlarını belirleme.
const particleCount = Math.floor(speed * 0.8); // 0.8 değerini artırarak/azaltarak parçacık sayısını ayarla nisa 
// Hareket hızına bağlı olarak oluşturulacak parçacık sayısını ayarlar. 
// `0.8` değerini artırarak daha fazla, azaltarak daha az parçacık oluşturabilirsiniz.

const baseHue = Math.random() < 0.5 ? 10 : 30; // Renk tonunu rastgele seçer.
// `10`: Kırmızımsı tonlar.
// `30`: Turuncumsu tonlar.
