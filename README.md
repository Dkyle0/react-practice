Области хранения данных:

-   бд на json-server
-   BFF
-   redux store

Сущности приложения:

-   пользователь. БВ(список пользователей), BFF(сессия), store(отображение в браузере).
-   роль пользователя: БД(список ролей), BFF(сессия с ролью), store(использование в браузере).
-   статья: БД(список статей), store(данные для отображения в браузере).
-   комментарий: БД(список комментариев), store(данные для отображения в браузере).

Таблицы БД:

1. Пользователи - users: id , login , password , registred_at , role_id
2. Роли - roles: id , name
3. Статьи - posts: id, title , image_url , content , published_at
4. Комментарии - comments: id , author_id , post_id , content

Схема состояния на BFF:

-   сессиия текущего пользователя: login , password , role

Схема redux store на клиенте:

-   user: id , login , role_id , session
-   posts: массив posts: id , title , imageUrl , publishedAt , commentsCount
-   post: id , title , imageUrl , content publishedAt , comments : массив comment: id , author, content, publishedAt
-   users: массив user: id , login , registredAt, role_id
