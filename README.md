# Sevdem-Monorepo

## Description

Sevdem Monorepo is created for Sevdem Homemade Sourdough Bread business, Monorepo contains two different apps, One for landing page for displaying products, Other one is admin dashboard for business. Admin Dashboard is a web application designed to help calculate the cost of recipes and track expenses for ingredients. It allows users to enter ingredient details, such as prices and measurements, and create recipes with ingredient quantities. The app then calculates the total cost of each recipe and provides visualizations of cost breakdowns. (Landing page doesn't implemented yet.)

## Features

- Enter ingredient details (price, measurement) and create recipes with quantities.
- Calculate the cost of each recipe based on ingredient prices.
- Visualize the cost breakdown of recipes using pie charts.
- Track ingredient costs and update prices as needed.
- Monitor recipe costs and adjust prices based on market fluctuations.
- Maintain a history of ingredient prices and recipe costs.
- Add recipes to the app's inventory and track ingredient stock levels.
- Generate reports on recipe costs, profits, and expenses.

## Technologies Used

- Frontend: [React](https://react.dev), [Nivo](https://nivo.rocks/), [Shadcn UI](https://ui.shadcn.com/)
- Backend: [Prisma](https://www.prisma.io/), [Planetscale](https://planetscale.com/)
- Authentication: [Clerk](https://clerk.com/)
- Deployment: [Vercel](https://vercel.com/)

## Installation

1. Clone the repository: `git clone https://github.com/av-erencelik/sevdem-monorepo.git`
2. Navigate to the project directory: `cd sevdem-monorepo`
3. Install dependencies: `npm install`
4. Configure environment variables by creating a `.env` file (refer to `.env.example` for required variables)
5. Start the development server: `npm run dev`
6. Access the application at `http://localhost:3000` (landing page)
7. Access the application at `http://localhost:3001` (admin dashboard)

## Contributing

Contributions to the Recipe Cost Calculator app are welcome! If you find any bugs or have suggestions for new features, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).
