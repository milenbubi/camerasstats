# Cameras Statistics

This project provides a statistics and monitoring dashboard for the cameras website chan180.net.  
It is designed as a back-office style interface with a left-side navigation panel,
tables, and charts for analyzing visit data and traffic trends.

## Relationship with the Cameras Website

This statistics platform is directly connected to the [main cameras website](https://chan180.net).

All displayed data is collected from real user visits to the cameras' pages and processed by backend PHP scripts into aggregated statistics.

The platform acts as a back-office dashboard, providing structured views,
tables, and charts for monitoring traffic and usage patterns.

🌐 **Explore the site here:** [https://stats.chan180.net](https://stats.chan180.net)

## Technologies

- **Frontend:** React with MUI v7 (Material UI & Joy UI) for tables, dashboards, and visual components
- **Backend:** PHP scripts generating JSON-based statistics
- **Database:** MySQL
- **Hosting:** Hostinger

## File Structure

- **`/src`** – React components and logic
- **`/public`** – static files

## Getting Started

```bash
git clone https://github.com/milenbubi/camerasstats.git
cd camerasstats
yarn install
yarn run dev
```
