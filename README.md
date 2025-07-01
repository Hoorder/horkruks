# ⚰️ Horkruks – System do zarządzania zakładem pogrzebowym

Horkruks to nowoczesny i intuicyjny system stworzony z myślą o kompleksowym zarządzaniu firmą pogrzebową. Umożliwia sprawną organizację pracy oferując dedykowane panele dla pracowników na różnych szczeblach.

---

## 📌 Kluczowe funkcje

- Zarządzanie zleceniami pogrzebowymi
- Zarządzanie przewozem zwłok
- Obsługa klientów i dokumentacji
- Podgląd stanu danego zlecenia
- Uprawnienia zależne od roli w firmie

---

## 🧑‍💼 Role i panele w systemie

### 🔹 Pracownik
- Ustawienie statusu obecności na zleceniu
- Podgląd informacji o przydzielonym pogrzebie
- Zapisanie zadań, w których się uczestniczyło
- Podgląd stawek
- Podgląd aktualnego zespołu
- Podgląd rozliczenia z bieżącego miesiąca
- Podgląd dotychczasowych wypłat
- Podgląd historii zleceń
- Podgląd statystyk pogrzebowych
- Wyszukiwanie pogrzebu

### 🔸 Kierownik
`Te same uprawnienia co pracownik`
- Ustawienie statusu postępu zlecenia przewozu
- Ustawienie statusu postępu zlecenia pogrzebowego
- Podgląd rozszerzonych informacji o pogrzebie

### 🔶 Szef (Administrator)
- Konfigurowanie nowego zlecenia pogrzebowego
- Tworzenie nowego zlecenia przewozu
- Dodanie nowego pracownika
- Zarządzanie pracownikami
- Zarządzanie zespołami
- Podgląd dotychczasowych wypłat
- Przeglądnięcie historii zleceń
- Podgląd statystyk pogrzebowych
- Wyszukiwanie pogrzebu

---

## ⚙️ Technologia

- 🧠 Backend: `Next.js`,`Node.js`, `Nginx`, `PM2`
- 💾 Baza danych: `MySQL`
- 🌐 Frontend: `React` / `Next.js`
- 📦 Autentykacja: `IronSession`
- 📁 Przechowywanie zdjęć i faktur: `Serwer`

---

## 🚀 Uruchomienie projektu

- `Projekt jedynie w formie podglądu. Nie udostępniam bazy danych.`
- `Uruchomioną aplikację znajdziecie pod linkiem w sekcji About`
```bash
git clone https://github.com/Hoorder/horkruks.git
cd horkruks
npm install
npm run dev  # lub build i run
