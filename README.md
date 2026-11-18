# Su Takibi Uygulaması

Boy ve kilo bilgilerine göre Vücut Kitle Endeksi'ni hesaplayan; kilo başına tahmini günlük su ihtiyacını belirleyen ve bugün içilen suyu kaydeden çevrim içi bir uygulama.

## Özellikler

- Boy, kilo, yaş ve cinsiyet bilgileri
- Vücut Kitle Endeksi hesaplama
- Boy ve kilo oranına göre şekillenen sevimli profil avatarı
- Yaş grubuna göre genç, yetişkin veya olgun avatar görünümü ve aksesuarları
- Kilo üzerinden tahmini günlük su hedefi hesaplama
- 250 ml, 500 ml ve 750 ml hızlı ekleme
- Özel miktarla su ekleme
- Günlük ilerleme göstergesi
- Verileri tarayıcıda saklama
- Yeni gün geldiğinde günlük içilen su miktarını sıfırlama

## Çalıştırma

1. Klasördeki `index.html` dosyasını modern bir tarayıcıda açın.
2. Boy ve kilo bilgilerini girip **Hesapla** seçeneğine basın.

Alternatif olarak proje klasöründe yerel bir sunucu başlatabilirsiniz:

```powershell
python -m http.server 8000
```

Sonra tarayıcıdan `http://localhost:8000` adresini açın.

## Hesaplama Kuralları

- **Vücut Kitle Endeksi:** kilo (kg) / boy² (m)
- **Temel tahmini su hedefi:** kilo (kg) × 35 ml
- Kadınlar için 8% azaltma, 60 yaş üzeri için ek 10% azaltma uygulanır.
- Hesaplanan sonuç en yakın 250 ml’ye yuvarlanır.

Bu uygulamanın sunduğu su hedefi genel bir tahmindir. Hamilelik, hastalık, egzersiz ve iklime göre sağlık uzmanından kişisel öneri alınmalıdır.
