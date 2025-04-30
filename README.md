# Canvas Editor

A web-based canvas editor built with **React**, **Konva**, and **TypeScript** that allows users to:

- Upload and manipulate images on a canvas
- Add and style text with font, size, bold, italic, underline, and alignment options
- Select, drag, and transform objects
- Export the canvas to an image
- Edit and delete items using modals

## 🚀 Features

- 📐 Responsive canvas scaling
- 🖼️ Multi-image support with individual positioning and transformations
- 🔤 Rich text editing with live preview
- 🖱️ Object selection, dragging, and transforming
- 📤 Export to image (`toDataURL`) with CORS-safe support
- 🧰 Context-based state management for texts, images, and canvas

## 📦 Tech Stack

- [React](https://reactjs.org/)
- [Konva.js](https://konvajs.org/)
- [react-konva](https://github.com/konvajs/react-konva)
- [TypeScript](https://www.typescriptlang.org/)
- Context API for state sharing

## 🧪 Running Locally

### 1. Clone the project

```bash
git clone https://github.com/marcelo3macedo/canvas-editor.git
cd canvas-editor
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
```

Open http://localhost:5173 to view the app.