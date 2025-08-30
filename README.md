# AI Kitchen 🍳

A modern, AI-powered recipe management and generation web application built with React, TypeScript, and Tailwind CSS. Create, manage, and discover recipes with the help of artificial intelligence.

## ✨ Features

### 🤖 AI-Powered Recipe Generation
- **Smart Recipe Creation**: Generate recipes based on available ingredients, cuisine preferences, and dietary restrictions
- **AI Chat Assistant**: Ask cooking questions and get instant culinary guidance
- **Personalized Suggestions**: AI adapts to your preferences and cooking style

### 📝 Recipe Management
- **Create Custom Recipes**: Build your own recipe collection with detailed instructions
- **Edit & Update**: Modify existing recipes anytime
- **Recipe Library**: View and manage all your created recipes
- **Search & Filter**: Easily find specific recipes in your collection

### 🎨 Modern User Interface
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Beautiful Animations**: Smooth transitions and engaging visual effects
- **Intuitive Navigation**: Easy-to-use interface with clear navigation paths
- **Gradient Backgrounds**: Modern, eye-catching design elements

### 🔐 User Authentication
- **Secure Login/Register**: User account management with JWT authentication
- **Protected Routes**: Secure access to personal recipe features
- **Session Management**: Persistent login sessions

## 🚀 Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4 with custom animations
- **Routing**: React Router DOM 7
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Form Validation**: Zod
- **Development Tools**: ESLint, TypeScript

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Backend API** running on `http://localhost:8080` (see backend requirements below)

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd frontend
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Start Development Server
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
# or
yarn build
```

## 🔧 Configuration

### Backend API Configuration
The application expects a backend API running on `http://localhost:8080`. Update the API base URL in:

- `src/utils/api.ts`
- `src/utils/auth.ts`

### Environment Variables
Create a `.env` file in the root directory if you need to customize API endpoints:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## 📱 Usage Guide

### Getting Started
1. **Visit the Homepage**: Navigate to the main page to see the welcome screen
2. **Create Account**: Click "Register" to create a new user account
3. **Login**: Use your credentials to access the AI Kitchen features

### AI Kitchen Features
1. **Chat with AI**: Ask cooking questions in the chat section
2. **Generate Recipes**: Input ingredients, cuisine type, and dietary restrictions
3. **Create Custom Recipes**: Build your own recipe collection
4. **Manage Recipes**: Edit, delete, and view your recipes

### Recipe Management
1. **Create Recipe**: Fill out the recipe form with title, description, ingredients, and instructions
2. **Edit Recipe**: Click the edit button on any recipe to modify it
3. **Delete Recipe**: Remove recipes you no longer need
4. **View Recipe**: Click the view button to see the full recipe details

## 🏗️ Project Structure

```
src/
├── pages/                 # Application pages
│   ├── HomePage.tsx      # Landing page
│   ├── Login.tsx         # User authentication
│   ├── Register.tsx      # User registration
│   ├── AiKitchenPage.tsx # Main AI kitchen interface
│   ├── CreateRecipePage.tsx # Recipe creation/management
│   └── RecipeViewPage.tsx   # Individual recipe view
├── utils/                 # Utility functions
│   ├── api.ts            # API configuration
│   ├── auth.ts           # Authentication utilities
│   ├── PrivateRoute.tsx  # Protected route component
│   └── registerPublicApi.ts # Public API registration
├── assets/                # Static assets
├── App.tsx               # Main application component
└── main.tsx              # Application entry point
```

## 🔌 API Endpoints

The application communicates with these backend endpoints:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User authentication
- `GET /api/ai-ask` - AI chat responses
- `GET /api/generate-recipe` - AI recipe generation
- `GET /api/recipes/get-all` - Fetch all recipes
- `POST /api/recipes` - Create new recipe
- `PUT /api/recipes/:id` - Update existing recipe
- `DELETE /api/recipes/:id` - Delete recipe
- `GET /api/recipes/:id` - Get specific recipe

## 🎨 Customization

### Styling
- **Tailwind CSS**: Modify `tailwind.config.ts` for custom colors, animations, and themes
- **Custom CSS**: Add global styles in `src/index.css`
- **Component Styles**: Use Tailwind classes directly in components

### Animations
Custom animations are defined in `tailwind.config.ts`:
- `fade-in`: Smooth fade-in effect
- `fade-in-up`: Fade-in with upward movement

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Static Hosting
The built files in the `dist/` folder can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static file hosting service

### Environment Configuration
Ensure your production environment has the correct API endpoints configured.

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Verify backend server is running on `http://localhost:8080`
   - Check network connectivity
   - Verify API endpoint configuration

2. **Build Errors**
   - Clear `node_modules` and reinstall dependencies
   - Check TypeScript configuration
   - Verify all import paths are correct

3. **Authentication Issues**
   - Clear browser localStorage
   - Check JWT token validity
   - Verify backend authentication endpoints

### Development Tips

- Use browser developer tools to debug API calls
- Check console for error messages
- Verify environment variables are set correctly

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with React and TypeScript
- Styled with Tailwind CSS
- Icons provided by Lucide React
- AI integration for recipe generation and cooking assistance

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation for common solutions

---

**Happy Cooking! 🍽️✨**
