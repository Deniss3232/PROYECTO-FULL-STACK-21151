#  PROYECTO-FULL-STACK-21151

Frontend del proyecto Full Stack desarrollado para administrar series de televisión.  
Este cliente web fue construido con **HTML, CSS y JavaScript vanilla**, consumiendo una **API REST desplegada en Render** y conectada a **PostgreSQL en Neon**.

El objetivo del proyecto fue demostrar integración completa entre frontend, backend y base de datos en la nube.

---

# Sitio en producción

🔗 Frontend publicado en Netlify:

https://series-tracker-21151.netlify.app/

🔗 Backend API:

https://proyecto-full-stack-backend-21151.onrender.com

🔗 Swagger Docs:

https://proyecto-full-stack-backend-21151.onrender.com/api-docs

---

#  Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)
- Fetch API
- Netlify (deploy frontend)
- Render (deploy backend)
- Neon PostgreSQL (base de datos cloud)

---

#  Funcionalidades

##  Gestión de series

- Ver series registradas
- Agregar nuevas series
- Editar series existentes
- Eliminar series

##  Búsqueda y filtros

- Buscar por nombre
- Ordenar por ID
- Orden ascendente y descendente

##  Exportación

- Exportar listado en formato CSV

##  Diseño

- Interfaz moderna
- Responsive
- Tema oscuro elegante

---
#  como correr local mente 
- clonar repositorio git clone https://github.com/Deniss3232/PROYECTO-FULL-STACK-21151.git
- entrar a la carpeta cd PROYECTO-FULL-STACK-21151
- ejecutar servidor locar python -m http.server 5500
- abrir en el navegador http://localhost:5500

# Funcionalidades 
- Ver series registradas.
- Crear nuevas series.
- Editar series existentes.
- Eliminar series.
- Buscar series por nombre.
- Ordenar resultados.
- Exportar CSV.
- Mostrar imágenes.
- Interfaz responsive.

# Endpoints 
- GET /series
- GET /series/:id
- POST /series
- PUT /series/:id
- DELETE /series/:id

- # CORS
- El frontend está publicado en Netlify y el backend en Render, por lo que el servidor habilita CORS para permitir peticiones fetch() entre dominios distintos.

# Imagen de la pagina 
<img width="1238" height="660" alt="image" src="https://github.com/user-attachments/assets/68a8341d-5048-47b4-942d-e8cc4847113d" />

#  Estructura del proyecto

```txt
PROYECTO-FULL-STACK-21151/
│── index.html
│── styles.css
│── app.js
│── README.md
│── .gitignore

# 🔗 Enlaces importantes

## Sitio web
https://series-tracker-21151.netlify.app/

## Repositorio Frontend
https://github.com/Deniss3232/PROYECTO-FULL-STACK-21151

## Repositorio Backend
https://github.com/Deniss3232/PROYECTO-FULL-STACK-BACKEND-21151

## API Backend
https://proyecto-full-stack-backend-21151.onrender.com

## Swagger Docs
https://proyecto-full-stack-backend-21151.onrender.com/api-docs

"""

# Reflexion
Este frontend permitió aplicar consumo de APIs REST usando JavaScript puro. También ayudó a comprender cómo separar interfaz y servidor en una arquitectura Full Stack real.

