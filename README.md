# Currency Exchange Dashboard
# Your Task
Third-party APIs allow developers to build dynamic tools with real-time data. Your challenge is to build a currency exchange dashboard that displays live exchange rates between various currencies. The application will retrieve data using an API and update the UI dynamically based on user input.

Use the ExchangeRate API or similar service to fetch exchange rates. After registering for a free key, you’ll receive a base URL such as https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/USD.

You will use localStorage to store a user's most frequently used currency pairs for quick access.

# User Story
```
AS a frequent traveler or online shopper
I WANT to see live exchange rates between currencies
SO THAT I can make informed financial decisions
```
# Acceptance Criteria
```
GIVEN a currency exchange dashboard with form inputs
WHEN I select a base currency and a target currency
THEN I am shown the latest exchange rate
WHEN I convert an amount from one currency to another
THEN I see the converted amount based on the latest rate
WHEN I submit a currency pair
THEN the pair is saved in a list of recent or favorite pairs
WHEN I click on a recent currency pair
THEN I am shown the current exchange rate again
```
# Mock-Up
This application should resemble a modern financial dashboard with a clean layout, conversion calculator, and recent searches or saved pairs.