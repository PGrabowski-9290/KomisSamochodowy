# Backend aplikacji
### Wymagane
Utworzony plik .env w katalogu /backend
Przykładowa zawartość pliku
``` 
PORT=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
```

### Dostępne skrypty npm
#### `npm install`
Tworzy domyślne konto Administratora aplikacji w bazie danych
Wymagane wcześniej wykonanie skryptów na bazie danych tworzących strukturę bazy oraz konfiguracja dostępu do serwera MySQL w pliku `/config/dbmysql2.js`  
**Domyślne poświadczenia:**  
**Login:** admin@admin.pl  
**Hasło:** admin
