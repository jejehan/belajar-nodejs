# Belajar NodeJs - Registrasi dan login user

- npm init
- npm install express --save
- setup packkage.json
    ```
    {
        ...
        "scripts": {
            "test":"...",
            "start":"nodemon index.js"
        }  
        ...
    }

    ```
- setup nodemon
    ```
    npm install -g nodemon
    ```

    untuk menjalankan ketik
    ```
    npm start
    ```

-  Seting struktur aplikasi
    ```
    - app
    --- models
    ------ user.js
    --- routes.js
    - config
    ------ auth.js
    ------ database.js
    ------ passport.js
    - views
    ------ index.ejs
    ------ signin.ejs
    ------ signup.ejs
    ------ profile.ejs
    - public
    - package.json
    - index.js

    ```

- install dependencies
    - ejs               : http://www.embeddedjs.com/
    - mongoose          : http://mongoosejs.com/
    - passport          : http://passportjs.org/
    - passport-local    : https://github.com/jaredhanson/passport-local
    - connect flash     : https://github.com/jaredhanson/connect-flash

 -

 - setup template
    - download http://startbootstrap.com/template-overviews/bare/
    - extract dan cut folder css,fonts dan js kedalam folder public
    - cut index.html kedalam folder views dan ganti .html menjadi .ejs
