# Guideline

## environment setup

- npm install
- delete 1_pharma in database
- nodemon app.js
- exit
- npx sequelize db:seed:all
- nodemon app.js


## Side notes

- unable to seed many to many relationship table :
  - Medicine_ingredients
  - Cart_details
  - Prescriptions
  - Order_details
