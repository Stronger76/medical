# 🩺 Gyermekorvosi Gyógyszeradag-kalkulátor Pro (Pediatric Dosage Calculator)

Egy modern, magyar nyelvű webes gyermekorvosi gyógyszeradag-kalkulátor alkalmazás, amely tartalmazza a legújabb hazai gyermekgyógyászati dózisokat, vény nélküli és receptköteles készítményeket, FoNo VII magisztrális vényeket, vizuális fecskendő skálát, 24 órás váltott lázcsillapítási órarendet, valamint nyomtatható Szülői Adagolási Kártyát QR-kóddal.

---

## ✨ Főbb Funkciók

- **💊 Bővített Magyar Gyógyszer-adatbázis (9 Kategória)**:
  - **Láz- és fájdalomcsillapító szirupok**: Paracetamol (120mg/5ml), Ibuprofen (100mg/5ml & 200mg/5ml Forte)
  - **Kúpok & Krupp rohamoldók**: Rectodelt 100mg kúp (Prednisolon rohamoldó), Nurofen kúpok (60mg, 125mg), Germicid C kúp
  - **Köhögéscsillapítók & Nyákoldók**: Ambroxol / Halixol (15mg/5ml), ACC Junior (20mg/ml), Sinecod (1.5mg/ml száraz köhögésre)
  - **Antibiotikumok**: Amoxicillin, Augmentin Duo 457mg, Cefzil (125mg/5ml), Cedax (36mg/ml - napi 1x!), Sumamed / Azithromycin (200mg/5ml)
  - **Hányáscsillapítók & Görcsoldók**: Daedalonetta kúp, No-Spa 40mg tabletta
  - **Gyermek Orrcseppek**: Nasivin Kids (0.025%) / Nasivin Baby (0.01%) - **5 napos biztonsági korlát figyelmeztetéssel**
  - **Antihisztaminok**: Cetirizin cseppek (10mg/ml), Desloratadin szirup (0.5mg/ml)
  - **Vitaminok & Vaspótlás**: Vigantol D3 cseppek, Maltofer cseppek
  - **FoNo VII Magisztrális Vények**: *Mixtura pectoralis paed.*, *Elixirium thymi compositum*
  - **Egyedi Gyógyszer Beállítása**: tetszőleges koncentráció (mg/ml) és dózishatár megadási lehetőség.

- **💉 Vizuális Fecskendő Skála (Syringe Visualizer)**:
  - Valós idejű szirupos fecskendő grafika a pontos beadandó térfogat vizuális ellenőrzéséhez.

- **🌡️ 24-Órás Váltott Lázcsillapítás Órarend**:
  - Paracetamol és Ibuprofen 4 óránkénti felváltva adása 24 órás idővonallal.

- **📄 Nyomtatható Szülői Adagolási Kártya & QR-Kód**:
  - Nyomtatás-barát elrendezés (`@media print`).
  - Dinamikus QR-kód a szülő okostelefonjára történő közvetlen átvitelhez.
  - Egykattintásos **Vágólapra másolás** az EESZT / orvosi rendszerbe történő beillesztéshez.

- **🛡️ Biztonsági Ellenőrző Motor**:
  - Dózistúllépés (max mg/kg/nap) esetén piros riasztási sáv.

---

## 🚀 Helyi Futtatás (Local Setup)

1. **Klónozd vagy töltsd le a tárolót**:
   ```bash
   git clone https://github.com/USERNAME/pediatric-dosage-calculator.git
   cd pediatric-dosage-calculator
   ```

2. **Telepítsd a függőségeket**:
   ```bash
   npm install
   ```

3. **Indítsd el a fejlesztői szervert**:
   ```bash
   # Windows PowerShell esetén:
   npx.cmd vite

   # Vagy hagyományos Command Prompt / Linux / macOS esetén:
   npx vite
   ```

4. Nyisd meg a böngészőben: `http://localhost:5173/`

---

## 🌐 GitHub Pages Publikálás (Deployment)

### Automatizált GitHub Actions telepítés (Ajánlott)

A tároló tartalmazza a `.github/workflows/deploy.yml` fájlt. 

1. Hozz létre egy új GitHub repót a GitHub oldalán: `pediatric-dosage-calculator`.
2. Töltsd fel a kódot a `main` ágra:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Pediatric Dosage Calculator Pro"
   git branch -M main
   git remote add origin https://github.com/FELHASZNÁLÓNÉV/pediatric-dosage-calculator.git
   git push -u origin main
   ```
3. A GitHub oldalon lépj a **Settings -> Pages** menüponthoz.
4. A **Build and deployment -> Source** opciónál válaszd a **GitHub Actions** lehetőséget.
5. A GitHub Actions pár másodperc alatt automatikusan lepublikálja az alkalmazást a `https://FELHASZNÁLÓNÉV.github.io/pediatric-dosage-calculator/` címen!

---

## 📄 Licenc
MIT License - Szabadon használható és továbbfejleszthető.
