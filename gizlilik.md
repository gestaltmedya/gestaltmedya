---
title: Gizlilik ve KVKK
permalink: /gizlilik/
kicker: "// aydınlatma metni"
subtitle: "Hangi veriyi neden işlediğimizi sade bir dille anlatıyoruz."
sitemap: false
---

Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında, **{{ site.title }}** ({{ site.url | remove: "https://" }}) ziyaretçilerini bilgilendirmek için hazırlandı.

## Veri sorumlusu

{{ site.title }}. İletişim: {% if site.social.email != "" %}[{{ site.social.email }}](mailto:{{ site.social.email }}){% else %}Hakkında sayfasındaki iletişim kanalları{% endif %}.

## Siteyi gezerken

- **Çerez kullanmıyoruz.** Reklam, takip ya da profil çıkarma amaçlı hiçbir çerez yok.
- **Barındırma:** Site GitHub Pages (GitHub Inc., ABD) üzerinde yayınlanır. GitHub, güvenlik ve hizmetin çalışması için ziyaretçinin IP adresini teknik kayıtlarında tutabilir.
- **Yazı tipleri:** Yazı tipleri Google Fonts'tan (Google LLC, ABD) yüklenir; bu sırada tarayıcın Google'a IP adresini iletir.
{% if site.goatcounter != "" %}- **Okunma istatistiği:** Hangi yazıların okunduğunu GoatCounter ile sayıyoruz. GoatCounter çerez kullanmaz, IP adresini saklamaz ve kişiyi tanımlayacak bilgi tutmaz.
{% endif %}{% if site.youtube_videolar and site.youtube_videolar.size > 0 %}- **Videolar:** Ana sayfadaki videolar, sen oynat tuşuna basana kadar YouTube'a bağlanmaz (yalnızca kapak resmi yüklenir). Oynattığında YouTube'un çerezsiz (youtube-nocookie.com) oynatıcısı açılır.
{% endif %}- **Dış bağlantılar:** Paylaşım butonları ve sosyal medya bağlantıları, sen tıklayana kadar o sitelere veri göndermez. Tıkladığında ilgili platformun kendi gizlilik kuralları geçerlidir.

{% if site.bulten.form_url != "" %}## Bülten

Bültene abone olursan **yalnızca e-posta adresini** işleriz.

- **Amaç:** Yeni yazıları ve duyuruları sana e-postayla göndermek.
- **Hukuki sebep:** Açık rızan (KVKK m. 5/1).
- **Aktarım:** Adresin, bülten hizmetini sağlayan {{ site.bulten.saglayici }} ({{ site.bulten.saglayici_ulke }}) sunucularında saklanır. Bu yurt dışı aktarım, abone olurken verdiğin açık rızaya dayanır (KVKK m. 9).
- **Süre:** Abonelikten ayrılana kadar. Her e-postanın altındaki bağlantıyla tek tıkla ayrılabilirsin; adresin listeden silinir.

{% endif %}## Bize yazdığında

E-posta ya da sosyal medya üzerinden bize ulaştığında, yalnızca sana cevap vermek için mesajını ve iletişim bilgini kullanırız. Bu bilgileri üçüncü kişilerle paylaşmayız.

## Hakların

KVKK'nın 11. maddesi uyarınca; verilerinin işlenip işlenmediğini öğrenme, bilgi isteme, düzeltilmesini ya da silinmesini isteme ve işlemeye itiraz etme hakların var. Taleplerini {% if site.social.email != "" %}[{{ site.social.email }}](mailto:{{ site.social.email }}){% else %}iletişim kanallarımız{% endif %} üzerinden iletebilirsin; en geç 30 gün içinde cevaplarız.

<p class="mono dim">son güncelleme: 21.11.2026</p>
