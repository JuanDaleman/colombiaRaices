# 📱 Sistema de Gestión de Iconos - Colombia Raíces

## 📍 Ubicación de Iconos

### Estructura de Carpetas

```
renderer/
├── public/
│   ├── images/           # Imágenes generales (logos, fotos)
│   │   ├── ColombiaRaicesLogo.png
│   │   ├── LogoColombiaRaicesNoFondo.png
│   │   └── ...
│   └── icons/            # Iconos específicos del sistema
│       ├── ui/           # Iconos de interfaz
│       ├── navigation/   # Iconos de navegación
│       ├── categories/   # Iconos de categorías
│       └── actions/      # Iconos de acciones
```

### Categorías de Iconos

#### 1. **Iconos de Navegación** (`/icons/navigation/`)

- `home.svg` - Inicio
- `experiences.svg` - Experiencias
- `communities.svg` - Comunidades
- `reservations.svg` - Reservas
- `profile.svg` - Perfil
- `dashboard.svg` - Panel de control

#### 2. **Iconos de Interfaz** (`/icons/ui/`)

- `search.svg` - Buscar
- `filter.svg` - Filtrar
- `menu.svg` - Menú hamburguesa
- `close.svg` - Cerrar
- `arrow-left.svg` - Flecha izquierda
- `arrow-right.svg` - Flecha derecha
- `arrow-down.svg` - Flecha abajo
- `loading.svg` - Cargando

#### 3. **Iconos de Categorías** (`/icons/categories/`)

- `cultural.svg` - Experiencias culturales
- `historical.svg` - Experiencias históricas
- `ecological.svg` - Experiencias ecológicas
- `gastronomic.svg` - Experiencias gastronómicas
- `adventure.svg` - Experiencias de aventura

#### 4. **Iconos de Acciones** (`/icons/actions/`)

- `book.svg` - Reservar
- `favorite.svg` - Favorito
- `share.svg` - Compartir
- `edit.svg` - Editar
- `delete.svg` - Eliminar
- `add.svg` - Añadir
- `star.svg` - Calificar

## 🎨 Paleta de Colores para Iconos

### Colores Principales

```css
/* Azul oscuro principal */
--primary-dark: #03222b;

/* Amarillo dorado */
--primary-yellow: #fbd338;

/* Naranja */
--primary-orange: #f47d22;

/* Café dorado */
--primary-brown: #6b5c2a;

/* Verde */
--primary-green: #569079;
```

### Estados de Iconos

```css
/* Estado normal */
.icon-normal {
  color: #03222b;
}

/* Estado hover */
.icon-hover {
  color: #fbd338;
}

/* Estado activo */
.icon-active {
  color: #f47d22;
}

/* Estado deshabilitado */
.icon-disabled {
  color: #6b5c2a;
  opacity: 0.5;
}
```

## 🛠️ Implementación en Componentes

### 1. Componente de Icono Base

```jsx
// components/common/Icon.jsx
import React from "react";

const Icon = ({
  name,
  size = 24,
  color = "#03222b",
  className = "",
  ...props
}) => {
  return (
    <img
      src={`/icons/${name}.svg`}
      alt={`${name} icon`}
      width={size}
      height={size}
      style={{ color }}
      className={`icon ${className}`}
      {...props}
    />
  );
};

export default Icon;
```

### 2. Uso en Navegación

```jsx
// components/common/Navigation.jsx
import Icon from "./Icon";

const Navigation = () => {
  return (
    <nav>
      <Link to="/">
        <Icon name="navigation/home" size={24} />
        Inicio
      </Link>
      <Link to="/experiences">
        <Icon name="navigation/experiences" size={24} />
        Experiencias
      </Link>
    </nav>
  );
};
```

### 3. Uso en Botones

```jsx
// Botón con icono
<button className="btn-primary">
  <Icon name="actions/book" size={20} color="#03222b" />
  Reservar
</button>
```

## 📥 Proceso de Reemplazo de Iconos

### 1. Preparación de Iconos

```bash
# Crear estructura de carpetas
mkdir -p renderer/public/icons/{ui,navigation,categories,actions}

# Convertir iconos a SVG (recomendado)
# Usar herramientas como Inkscape o Adobe Illustrator
```

### 2. Optimización de SVG

```bash
# Instalar SVGO para optimizar SVG
npm install -g svgo

# Optimizar iconos
svgo --folder=renderer/public/icons --recursive
```

### 3. Nomenclatura de Archivos

```
# Formato: categoria-nombre-estado.svg
navigation-home.svg
navigation-home-active.svg
ui-search.svg
ui-search-hover.svg
categories-cultural.svg
actions-book.svg
```

## 🔧 Script de Reemplazo Automático

### Script para Reemplazar Emojis por Iconos

```bash
#!/bin/bash
# scripts/replace-emojis.sh

# Función para reemplazar emojis en archivos
replace_emoji() {
  local file="$1"
  local emoji="$2"
  local icon_path="$3"

  sed -i "s/$emoji/<Icon name=\"$icon_path\" \/>/g" "$file"
}

# Reemplazos específicos
replace_emoji "renderer/src/pages/HomePage.jsx" "📸" "ui/image"
replace_emoji "renderer/src/pages/HomePage.jsx" "📍" "ui/location"
replace_emoji "renderer/src/pages/HomePage.jsx" "⏱️" "ui/time"
replace_emoji "renderer/src/pages/HomePage.jsx" "🏘️" "categories/community"

echo "✅ Emojis reemplazados por iconos personalizados"
```

## 🎯 Próximos Pasos

### Sprint 4 - Finalización

1. ✅ Añadir logo en esquina superior izquierda
2. ✅ Armonizar colores con paleta del logo
3. ✅ Especificar ubicación de iconos personalizados
4. ⏳ Implementar componente Icon base
5. ⏳ Crear iconos SVG personalizados
6. ⏳ Ejecutar script de reemplazo de emojis

### Sprint 5 - Iconos Personalizados

1. Diseñar iconos SVG con paleta de colores
2. Implementar componente Icon reutilizable
3. Reemplazar todos los emojis por iconos
4. Optimizar rendimiento de iconos
5. Documentar guía de uso de iconos

## 📋 Checklist de Implementación

- [ ] Crear estructura de carpetas de iconos
- [ ] Diseñar iconos SVG personalizados
- [ ] Implementar componente Icon
- [ ] Reemplazar emojis en HomePage
- [ ] Actualizar Navigation con iconos
- [ ] Optimizar SVG con SVGO
- [ ] Documentar uso de iconos
- [ ] Crear script de reemplazo automático

---

**Nota:** Este sistema de iconos está diseñado para ser escalable y mantenible, permitiendo fácil actualización y consistencia visual en toda la aplicación.
