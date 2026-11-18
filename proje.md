# Su Takibi Uygulaması

Bu proje, kullanıcının günlük su tüketimini takip etmesini sağlar.

## Özellikler

### Su Takibi

- Kullanıcı boy, kilo, yaş ve cinsiyet bilgilerini girer.
- Tahmini günlük su ihtiyacı hesaplanır.
- Kullanıcı 250 ml, 500 ml, 750 ml veya özel miktarda su ekleyebilir.
- Günlük su hedefi ve kalan miktar gösterilir.
- Veriler tarayıcıda saklanır.

### Vücut Kitle Endeksi Takibi

- Kullanıcıya boy ve kilo formu gösterilir.
- VKİ, kilo (kg) / boy² (m) formülüyle hesaplanır.
- Sonuç, zayıf, normal kilo, fazla kilo veya obezite kategorisinde gösterilir.
- Girilen yaş ve cinsiyet profil kartında gösterilir.
- Boy-kilo oranına göre şekli ayarlanan sevimli bir avatar gösterilir; avatar tıbbi veya gerçekçi vücut ölçüsü iddiası taşımaz.
- Yaşa göre avatar genç (10-17), yetişkin (18-59) veya olgun (60+) stiline geçer; sırt çantası, kolye veya gözlük/fular gibi aksesuarlar kullanılır.

## Hesaplama Kuralları

- Temel tahmini günlük su ihtiyacı: kilo × 35 ml
- Kadınlar için cinsiyete göre 8% azaltma uygulanır.
- 60 yaş üstü kullanıcılar için ek 10% azaltma uygulanır.
- Hesaplanan su hedefi en yakın 250 ml’ye yuvarlanır.
- Veriler gün bazında tutulur ve yeni günde su kaydı sıfırlanır.

## Yazılım Teknolojisi

- HTML
- CSS
- JavaScript
