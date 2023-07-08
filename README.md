# TripTip-App

TripTip-App es una aplicación de React que utiliza la API de Recomendaciones de Viajes v1.0 para mostrar y gestionar recomendaciones de lugares o experiencias poco conocidas para viajar. Permite a los usuarios buscar recomendaciones, ver detalles, publicar nuevas recomendaciones, comentar y votar las recomendaciones de otros usuarios, así como gestionar su perfil.

## Características

La aplicación de React para TripTip-App ofrece las siguientes características:

- Buscar recomendaciones por lugar, categoría o por usuario.
- Ordenar los resultados de búsqueda por votos.
- Ver detalles de una recomendación específica.
- Iniciar sesión con tu cuenta de usuario o registrarte en la plataforma.
- Publicar recomendaciones con título, categoría, lugar, descripción breve, texto y foto.
- Borrar tus propias recomendaciones.
- Publicar comentarios en las recomendaciones.
- Votar las recomendaciones de otros usuarios.
- Gestionar tu perfil, incluyendo tu foto de perfil.

## Configuración y Ejecución

Para configurar y ejecutar la aplicación TripTip-App, sigue los siguientes pasos:

1. Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/tu-usuario/TripTip-App.git
```

2. Navega hasta el directorio raíz del proyecto:

```bash
cd TripTip-App
```

3. Crea un archivo `.env` en el directorio raíz basado en el archivo `.env.example` proporcionado:

```bash
cp .env.example .env
```

4. Abre el archivo `.env` y reemplaza `API_URL` con la URL de la API de Recomendaciones de Viajes v1.0 y `YOUR_API_KEY` con tu propia clave de API.

5. Instala las dependencias del proyecto:

```bash
npm install
```

6. Inicia la aplicación:

```bash
npm run start
```

Esto iniciará la aplicación y podrás acceder a ella a través de la URL proporcionada en la línea de comandos.

## Documentación de la API

Para obtener más detalles sobre cómo interactuar con la API de Recomendaciones de Viajes v1.0, consulta la [documentación de la API](https://github.com/Manucv20/TripTip-Api/blob/main/README.md).

Siéntete libre de mejorar la aplicación front-end agregando cualquier característica adicional que consideres útil y relevante para el proyecto.
