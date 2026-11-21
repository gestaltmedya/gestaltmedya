# GESTALT MEDYA — web sitesi

Cyberpunk / neon temalı, **tamamen ücretsiz** çalışan blog sitesi.

- **Barındırma:** GitHub Pages (ücretsiz, sınırsız süre, otomatik HTTPS)
- **Altyapı:** Jekyll (GitHub siteyi senin yerine otomatik derler — bilgisayarına bir şey kurman gerekmez)
- **Tek masraf:** zaten sahip olduğun alan adı (gestaltmedya.com)

Hazır gelen özellikler: ana sayfa, blog arşivi + anlık arama + etiket filtresi, etiketler sayfası, hakkında sayfası, 404 sayfası, okuma süresi, okuma ilerleme çubuğu, paylaşım butonları, RSS (`/feed.xml`), Google için SEO etiketleri ve site haritası (`/sitemap.xml`), mobil uyum.

---

## 1. Siteyi yayına alma (bir kerelik, ~20 dakika)

### Adım 1 — GitHub hesabı aç
[github.com](https://github.com) adresinden ücretsiz hesap aç. Kullanıcı adın önemli değil (örnek: `gestaltmedya`).

### Adım 2 — Depo (repository) oluştur
1. Sağ üstteki **+** → **New repository**
2. **Repository name:** `gestaltmedya.com` (istediğin bir ad olabilir)
3. **Public** seçili kalsın (ücretsiz GitHub Pages için gerekli)
4. **Create repository**

### Adım 3 — Dosyaları yükle
1. Yeni deponun sayfasında **uploading an existing file** bağlantısına tıkla.
2. Bu klasörün **içindeki her şeyi** (klasörün kendisini değil) sürükleyip bırak:
   `_config.yml`, `CNAME`, `index.html`, `_layouts`, `_includes`, `_posts`, `assets`, `blog`, `etiketler` vb.
   > Gizli dosyalar (`.gitignore`) görünmüyorsa sorun değil, şart değil.
   > `_site` klasörü varsa **yükleme** — o sadece bilgisayardaki önizleme kopyası.
3. Aşağıdaki **Commit changes** butonuna bas.

### Adım 4 — GitHub Pages'i aç
1. Depoda **Settings** → soldaki menüden **Pages**
2. **Source:** `Deploy from a branch`
3. **Branch:** `main` ve klasör `/ (root)` → **Save**
4. 1-2 dakika sonra site `https://KULLANICIADIN.github.io/DEPOADI/` adresinde açılır
   (henüz alan adı bağlanmadığı için tasarım bu adreste bozuk görünebilir — normal).
5. **Custom domain** kutusunda `www.gestaltmedya.com` yazdığından emin ol → **Save**.

### Adım 5 — Alan adını bağla (DNS)
Alan adını nereden aldıysan (GoDaddy, Natro, İsimtescil, Turhost, Namecheap…) o firmanın panelinde **DNS Yönetimi** bölümüne gir ve şu kayıtları ekle. Varsa eski `A` ve `www` kayıtlarını sil.

| Tür   | Ad / Host | Değer                       |
| ----- | --------- | --------------------------- |
| A     | @         | `185.199.108.153`           |
| A     | @         | `185.199.109.153`           |
| A     | @         | `185.199.110.153`           |
| A     | @         | `185.199.111.153`           |
| CNAME | www       | `KULLANICIADIN.github.io`   |

> `KULLANICIADIN` yerine kendi GitHub kullanıcı adını yaz (sonunda depo adı **olmadan**).

DNS'in yayılması 10 dakika ile birkaç saat sürebilir.

### Adım 6 — HTTPS (kilit simgesi)
DNS oturduktan sonra **Settings → Pages** sayfasına dön ve **Enforce HTTPS** kutusunu işaretle. (Kutu gri ise biraz bekle; GitHub sertifikayı otomatik hazırlıyor.)

Bitti! `gestaltmedya.com` ve `www.gestaltmedya.com` artık siteni açar. 🎉

---

## 2. Yeni blog yazısı yayınlama

Her şey tarayıcıdan, GitHub üzerinden yapılır:

1. Depoda `_posts` klasörüne gir.
2. **Add file → Create new file**
3. Dosya adı **mutlaka** şu biçimde olmalı:
   `YIL-AY-GÜN-yazi-adi.md` → örnek: `2026-12-01-yapay-zeka-ve-sanat.md`
   (dosya adında Türkçe karakter ve boşluk kullanma; tire kullan)
4. İçine şunu yapıştır ve doldur:

```markdown
---
title: "Yazının başlığı"
description: "Kartlarda ve Google'da görünecek 1-2 cümlelik özet."
kategori: teknoloji   # tek bir tane: medya, teknoloji, kultur ya da zihin
tags: [teknoloji, kültür]
image: /assets/img/kapak-gorseli.jpg   # isteğe bağlı, yoksa bu satırı sil
---

Yazının ilk paragrafı buraya.

## Ara başlık

Devamı...
```

**Kategori mi, etiket mi?** Kategori yazının ana rafıdır; her yazının tek kategorisi olur ve kartın rengi buradan gelir (Medya camgöbeği, Teknoloji mor, Kültür amber, Zihin limon). Etiketler serbesttir, istediğin kadar ekleyebilirsin. Kategorileri `_config.yml` → `kategoriler:` bölümünden değiştirebilirsin.

**Kapak görseli:** Kartlarda görsel kategori rengine boyanır, üstüne gelince gerçek rengi görünür. Yazının kendi sayfasında görsel orijinal renginde durur. Görsel koymazsan kart kategori renginde desenli bir kapakla çıkar.

**Yazar:** Yazmazsan yazı "Gestalt Medya" adına çıkar. Başka bir yazar için başa `author: kimlik` yaz (kimlikler `_data/authors.yml` içinde). Kimlik yerine doğrudan isim de yazabilirsin: `author: "Onur Avşar"`. Yazmazsan başlığın altında "Gestalt Medya · Yayın Ekibi" görünür. İsteğe bağlı editör: `editor: "Ad Soyad"`.

5. **Commit changes** → 1-2 dakika içinde yazı sitede yayında.

**Görsel eklemek için:** `assets/img` klasörüne gir → **Add file → Upload files** ile görseli yükle, sonra yazıda
`![açıklama](/assets/img/gorsel-adi.jpg)` şeklinde kullan. Görselleri yüklemeden önce [squoosh.app](https://squoosh.app) ile küçültmen siteyi hızlandırır.

**Yazıyı düzenlemek / silmek:** `_posts` içindeki dosyayı aç → kalem simgesi (düzenle) ya da üç nokta → **Delete file**.

**Taslak:** Henüz yayınlamak istemediğin yazıları `_drafts` adlı bir klasöre koyabilirsin; orada yayınlanmazlar.

> Biçim örnekleri için `_posts/2026-11-05-yazi-bicimleri-rehberi.md` dosyasına bak. Bu yazı `published: false` ile yayından gizli; yayınlamak istersen o satırı sil.

---

## 3. Sık yapılacak değişiklikler

| Ne?                              | Nerede?                                   |
| -------------------------------- | ----------------------------------------- |
| Site adı, slogan, açıklama       | `_config.yml`                             |
| Sosyal medya hesapları           | `_config.yml` → `social:` bölümü          |
| Hakkında sayfası                 | `hakkinda.md`                             |
| Yazarlar (isim, biyografi, foto) | `_data/authors.yml`                       |
| Bülten kutusunu açmak            | `_config.yml` → `bulten:` → `form_url`    |
| Ana sayfadaki YouTube videoları  | `_config.yml` → `youtube_videolar:`       |
| Gizlilik / KVKK metni            | `gizlilik.md`                             |
| Ana sayfa metinleri              | `index.html`                              |
| Renkler                          | `assets/css/style.css` → en üstteki `:root` |
| Menü bağlantıları                | `_includes/header.html`                   |

---

## 4. İleride eklenebilecekler (hepsi ücretsiz)

- **Yorumlar:** [giscus](https://giscus.app) (GitHub Discussions tabanlı)
- **Ziyaretçi istatistiği:** [GoatCounter](https://www.goatcounter.com) veya Cloudflare Web Analytics
- **E-bülten:** Substack / Buttondown ücretsiz planı
- **Yazı yazmak için panel (admin):** Pages CMS (pagescms.org) — GitHub hesabınla giriş yapıp form üzerinden yazı yazarsın
- **İletişim formu:** Formspree ücretsiz planı

---

## Bilgisayarda önizleme (isteğe bağlı, geliştiriciler için)

```bash
bundle install
bundle exec jekyll serve
```
Sonra `http://localhost:4000` adresini aç.


## Öne çıkan yazı nasıl seçilir?
- Ana sayfadaki büyük kutu, **en yeni yazının tarihinden geriye 14 gün** içinde yayınlanan yazılardan en çok okunanı gösterir. Yeni yazı gelmezse pencere kaymaz, öne çıkan yerinde kalır.
- Okunma sayısı için `_config.yml` içindeki `goatcounter:` satırına GoatCounter kodunu yaz. Boşken öne çıkan, en yeni yazıdır.
- Bir yazıyı elle sabitlemek için yazının en üstündeki ayar bölümüne `featured: true` ekle.
