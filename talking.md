# Slajd tytułowy
Improving EEG classification of alcoholic and control subjects using DWT-CNN-BiGRU with various noise filtering techniques

# O artykule
- Autorzy: Nidhi [nidi] Patel, Jaiprakash [Dżaprakasz] Verma, Swati Jain [Słati Dżan]
- Nirma University, India
- Data wydania: 19 sierpnia 2025
- Opublikowany w: Frontiers in Neuroinfomatics

# Problemy
- Obecny sposób diagnozowania alkoholizmu opiera się o subiektywną opinię
- Sygnały EEG są podatne na zakłócenia i trudne w analizie 
Sygnały mózgowe są bardzo słabe (microvolty), podatne na zakłócenia: ruchy oczy, mruganie, sieć elektryczna

# Rozwiązanie
Zastosowanie nowatorskiego modelu DWT-CNN-BiGRU
Podział nazwy na 3 elementy

# Metody filtrujące
Eksperyment badał zastosowanie 3 metod filtrujących dane z EEG
Discrete oznacza że pracują na próbkach danych

# DCT
DCT przedstawia sygnał za pomocą sumy cosinusów o różnych częstotliwościach. 

Bardzo wydajna funkcja, koncentruje sygnał do niwlekiej ilości mających znaczenie współczynników, używa tylko liczb rzeczywistych.

Następnie odseparowane zostają komponenty o wysokiej częstotliwości, a dane są odtwarzane używając funkcji odwrotnej - IDCT.

# DFT
DFT przekształca sygnał na sumę zespolonych fal sinusoidalnych o różnych częstotliwościach, amplitudach i fazach.

Tutaj robi się bardziej skomplikowanie bo wchodzimy w rejony liczb zespolonych.

# DWT
DWT jest jeszcze ciekawsze od DCT i DFT. Dane są przepuszczane kilkakrotnie przez powiązane ze sobą filtry dolno i górno przepustowe, dajać współczynniki detali i wspołczynniki aproksymacji. 

W badaniu użyto 4 poziomowego DWT, współczynniki detali są poddawane miękkiemu progowaniu.
Sygnał jest odtwarzany przez odwrócenie DWT

# Modele
Uczone na bazie danych Kaggle


# BiLSTM
Budowa:
- Pierwsza warstwa kowolucyjna 1D - 64 filtry - Ekstrahuje lokalne cechy przestrzenne z sygnałów EEG, takie jak wzorce aktywności w obrębie kanałów. Niewielka liczba filtrów pozwala uchwycić podstawowe zależności w danych.
- Pierwsza warstwa MaxPooling1D - Redukuje wymiarowość cech oraz zmniejsza złożoność obliczeniową modelu, zachowując najistotniejsze informacje.
- Druga warstwa konwolucyjna 1D - 128 filtrów - Uczy się bardziej złożonych i abstrakcyjnych reprezentacji przestrzennych sygnału EEG, bazując na cechach wyodrębnionych wcześniej.
- Druga warstwa MaxPooling1D - Dalsza redukcja rozmiaru danych oraz zwiększenie odporności modelu na szum i drobne przesunięcia w sygnale.
- Trzecia warstwa konwolucyjna 1D - 128 filtrów - Pogłębia ekstrakcję cech, umożliwiając identyfikację wysokopoziomowych wzorców przestrzennych charakterystycznych dla sygnałów EEG.
- Trzecia warstwa MaxPooling1D - Ostatecznie kompresuje reprezentację cech przed przekazaniem ich do części sekwencyjnej modelu.

- Pierwsza dwukierunkowa warstwa LSTM - BiLSTM - Analizuje sekwencje czasowe cech w obu kierunkach (przód–tył), zachowując pełną strukturę czasową. Umożliwia uchwycenie zależności zarówno wcześniejszych, jak i późniejszych fragmentów sygnału EEG.
- Druga dwukierunkowa warstwa LSTM - BiLSTM - Agreguje informacje czasowe z całej sekwencji w jedną reprezentację, koncentrując się na najistotniejszych zależnościach temporalnych.

- Warstwa gęsta (Dense) z aktywacją Softmax - Pełni funkcję klasyfikatora. Przekształca wyuczoną reprezentację w rozkład prawdopodobieństw przypisania próbki EEG do poszczególnych klas.

- Warstwy Dropout - Stosowane po wybranych warstwach konwolucyjnych oraz po każdej warstwie LSTM. Losowo dezaktywują neurony podczas uczenia, co ogranicza przeuczenie i poprawia zdolność uogólniania modelu.

# BiGRU
Model jest bardzo podobny do modelu BiLSTM, ale warstwy LSTM zostały zastąpione warstwami GRU. Po każdej wartwie konwolucyjnej dodano także warstwę dropout.
Użycie warstwy GRU redukuje złożonść obliczeniową z jednoczesnym zachowaniem modelowania złożoności czasowych.

# Setup testowy
Z obrazka

# Badani 
W badaniu uczestniczyło 16 osób, użyto 64 elektrod na pacjenta, częstotliwośc próbkowania 256Hz, 30 badań po 1 sekundzie, bodźce pojedyncze i sparowane

# Wyniki
CNN-BiLSTM - 93% dokładności
CNN-BiGRU - 94% dokładności

Wyniki sugerują, że prostsza architektura i mniejsza ilość parametrów wpływają na bardziej wydajne uczenie się w przypadku modelu CNN-BiGRU.

# Przyszłość
Uzyskanie większej ilości danych z EEG

