# Project Structure

## Main entry points

- `index.html`: app shell, auth overlay, header, and content mount point
- `js/script.js`: startup file that wires the app together
- `server.ps1`: local static server for development

## JavaScript

- `js/data/site-content.js`: all section content in one place
- `js/modules/auth.js`: login, register, logout, forgot-password, reset-password
- `js/modules/carousel.js`: home carousel behavior
- `js/modules/content-renderer.js`: renders the big page sections from the data file
- `js/modules/intro.js`: intro background rotation
- `js/modules/interactions.js`: click ripple / press effects
- `js/modules/service-worker.js`: service worker boot logic
- `js/modules/tabs.js`: tab switching
- `js/supabase-config.js`: Supabase project URL and anon key

## CSS

- `css/base.css`: base page layout and background
- `css/header.css`: header, nav, and session area
- `css/intro.css`: login/register overlay
- `css/carousel.css`: hero carousel
- `css/items.css`: cards, media blocks, utility layouts
- `css/buttons.css`: reusable buttons
- `css/tabs.css`: content area and section utilities
- `css/animations.css`: shared animations
- `css/variables.css`: colors and design tokens

## Legacy files

- `legacy/script.js`: older unused script kept only for reference
- `legacy/style.css`: older unused stylesheet kept only for reference
