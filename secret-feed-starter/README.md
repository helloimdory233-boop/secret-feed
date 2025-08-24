
# Secret Feed — Gossip-style Anonymous Rumor Platform (Starter)

> Özgün bir tasarım ve isimle, Gossip Girl havasında anonim dedikodu/itiraf paylaşım platformu.
> Bu repo, hem **Next.js + Firebase** tabanlı bir prototip, hem de **vanilla HTML/CSS/JS** ile çalışan
> offline demo içerir. Üstüne basit **wireframe** görselleri de dahildir.

---

## Özellikler (MVP)
- Anonim gönderi paylaşma (takma ad zorunlu değil — otomatik üretilen "Guest-###").
- Feed (en yeni gönderiler).
- Gönderi detay sayfası.
- Reaksiyonlar: 🔥 (skandal), 🤔 (şüpheli), 💬 (yorum sayısı).
- Basit moderasyon alanı için placeholder.
- Mobil uyumlu, siyah–beyaz–altın esintili minimal UI.

---

## Klasörler
- `/next-secret-feed` — Next.js 14 App Router + Firebase Firestore entegrasyonlu prototip.
- `/vanilla-prototype` — Sadece HTML/CSS/JS (localStorage) ile çalışan demo.
- `/wireframes` — PNG wireframe görselleri.

---

## Hızlı Başlangıç (Vanilla Prototype)
1. `vanilla-prototype/index.html` dosyasını bir tarayıcıda aç.
2. Deneme amaçlı gönderiler localStorage'a kaydedilir. Sunucu gerekmez.

## Hızlı Başlangıç (Next.js + Firebase)
1. **Firebase**'de bir proje oluştur ve Firestore'u etkinleştir.
2. Aşağıdaki ortam değişkenlerini `.env.local` içine gir (dosya şablonu mevcut):
```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```
3. Terminalde:
```
cd next-secret-feed
npm install
npm run dev
```
4. `http://localhost:3000` adresine git.

### Firestore Güvenlik Kuralları (örnek, basit geliştirme amaçlı)
> Not: Üretim için daha sıkı kurallar gerekir.
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{postId} {
      allow read: if true;
      allow create, update: if request.time < timestamp.date(2030,1,1);
    }
    match /comments/{commentId} {
      allow read: if true;
      allow create: if request.time < timestamp.date(2030,1,1);
    }
  }
}
```

---

## Telif ve Marka Notu
- Bu proje **Gossip Girl** markasını veya tasarımını kopyalamaz. Özgün isim, logo ve stil kullanır.
- İstediğin gibi renklendirebilir, font/ikonları değiştirebilirsin.

---

## Özelleştirme Fikirleri
- Kategori/etiket sistemi (okul, iş, ünlüler vb.).
- Moderasyon paneli (küfür filtresi, raporlama).
- Gönderilerde görsel yükleme (Firebase Storage).
- E-posta doğrulamasız anonim oturum (Firebase Anonymous Auth).

İyi eğlenceler! ✨
