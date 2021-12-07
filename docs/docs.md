# Guideline

## environment setup

- npm install
- node dbInit.js
- npx sequelize db:seed --seed 20211206170643-developmentSeed.js

## Side notes

- unable to seed many to many relationship table :
  - Medicine_ingredients
  - Cart_details
  - Prescriptions
  - Order_details
