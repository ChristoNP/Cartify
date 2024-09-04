# Cartify - Online Shopping Platform

## Overview

**Cartify** is an online shopping platform built using **TypeScript**, **Next.js**, and **MongoDB**. The platform is designed to provide users with a seamless and intuitive shopping experience. It includes essential eCommerce functionalities such as user authentication, product browsing, wishlist management, and more.

## Learning Objectives

- Build a server-side application using **TypeScript**, **Next.js**, and **MongoDB** for CRUD operations.
- Develop a web application with **Next.js** and manage navigation effectively.
- Handle authentication mechanisms in **Next.js**.
- Implement Client-Side Rendering (CSR) and Server-Side Rendering (SSR) in **Next.js**.

## Features

### User Authentication

- **Register**: Allows new users to create an account.
- **Login**: Allows existing users to log in to their accounts.

### Home Page

- **Banner Promo**: Displays a promotional banner.
- **Detail Info**: Provides detailed information about Cartify.
- **Featured Products**: Showcases featured products with a "see-all" option.

### Product List Page

- **List Products**: Displays a list of available products.
- **Search Feature**: Allows users to search for products by name, implementing a debounce feature for optimized searching.
- **Infinite Scroll Pagination**: Loads products dynamically as users scroll down the page.
- **Add to Wishlist**: Users can add products to their wishlist directly from the product list.

### Product Detail Page

- **Detail View**: Shows detailed information for a selected product.
- **Add to Wishlist**: Users can add the product to their wishlist from the detail view.
- **Meta Tags**: Dynamically implements meta tags in the head section for SEO purposes, based on product details.

### Wishlist Management

- **View Wishlist**: Displays all products added to the user's wishlist.
- **Remove from Wishlist**: Allows users to remove items from their wishlist.

## Key Functionalities

- **User Registration and Login**: Secure user authentication using **Next.js**.
- **Product Listing**: View and search for products with a debounce feature to optimize performance.
- **Infinite Scrolling**: Enhances user experience by loading products dynamically as the user scrolls.
- **Product Details**: Provides detailed information on each product and allows users to add products to the wishlist.
- **Wishlist Management**: Users can easily manage their wishlists, adding or removing products.

## Tech Stack

- **Frontend**: Next.js, TypeScript
- **Backend**: Node.js, MongoDB
- **Styling**: CSS, Tailwind CSS
- **Authentication**: JSON Web Tokens (JWT), cookies