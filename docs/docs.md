# Guideline

## environment setup

- npm install
- npx sequelize init (first time clone/ no sequelize config)
- node dbInit.js
- npx sequelize db:seed:all

## Side notes

- unable to seed many to many relationship table :
  - Medicine_ingredients
  - Cart_details
  - Prescriptions
  - Order_details
