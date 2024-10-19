# Inicio proyecto express
Grupo 1 
### **Aplicación de Compra y Venta de Artesanías**

### **Descripción del Proyecto**

El proyecto consiste en el desarrollo de una **Aplicación de Compra y Venta de Artesanías**. Esta aplicación tiene como objetivo conectar a artesanos de **Bucaramanga** con compradores interesados en productos artesanales únicos y auténticos. La plataforma será solicitada y gestionada por **Campuslands**, una empresa comprometida con la promoción y comercialización de productos locales, artesanales y tecnológicos.

**Problema:**

A pesar de la rica tradición artesanal en Bucaramanga, los artesanos locales enfrentan dificultades significativas para comercializar sus productos de manera efectiva. Entre los principales problemas se encuentran:

1. *Limitada Visibilidad y Alcance*
2. *Dificultades en la Gestión de Ventas*
3. *Falta de Acceso a Recursos de Comercialización*
4. *Comunicación Ineficiente con Compradores*

### **Características Principales**

1. **Gestión de Usuarios**
- *Registro e Inicio de Sesión*
  
- **Perfiles de Usuario (Compradores):**
   - **Actualización de Información*
    
   - *Actualización de Foto de Perfil*
    
    - *Favoritos de Artesanías*

    - *Favoritos de Talleres*
     
  - *Historial de Compras*
  
  - *Talleres Inscritos*
    
   - *Lista de Cupones*
  
   - *Chat con Artesanos*

2. **Gestión de Productos**

   - *Listado de Productos*

   - *Visualización de Productos*

   - *Cupones de Descuento*

3. **Búsqueda y Filtrado**

   - *Búsqueda de Productos*

   -**Filtrado por Categorías*
   
   - *Filtrado de Talleres*
   
4. **Carrito y Proceso de Compra**

   - *Carrito de Compras*

   - *Aplicación de Cupones:*

   - *Proceso de Pago*
   
5. **Comunicación**
   - *Mensajes Directos*

6. **Talleres Artesanales**

   - *Perfil de Talleres:*


# Cómo Usar Este Proyecto

Para poder utilizar este proyecto, sigue los siguientes pasos:

1. **Instalar dependencias**: 
   Instala todas las dependencias requeridas ejecutando el siguiente comando en la terminal:

   ```bash
   npm i
   ```

   Este comando instalará todas las dependencias listadas en el archivo `package.json`.

3. **Ejecutar el proyecto**:
   Después de instalar las dependencias, inicia el proyecto con los siguientes comandos en 2 terminales diferentes, para el front y back-end respectivamente:

   ```bash
   npm run dev
   npm run start
   ```

   Esto ejecutará el servidor y el entorno de desarrollo, iniciando el programa.

4. **Acceder a la aplicación**:
   Una vez que el programa esté en ejecución, dirígete al enlace proporcionado por Vite en la terminal para visualizar la aplicación en tu navegador. Normalmente, este enlace será algo similar a:

   ```bash
    http://localhost:5173/
   ```


### Documentacion de las apis del backend

## Registro de usuario

- **Ruta POST**
`http://localhost:3000/register/auth/ruraqmaki`
- **Parámetros**:

  ```json
  {
  "nick": "profe",
  "password": "123456",
  "email": "campuslands@gmail.com"
  }
  ```

  
- **Devuelve:**

  ```json
  {
  "code": 201,
  "message": "Usuario creado satisfactoriamente"
  }
  ```

  

## Logueo de usuarios

- **Ruta POST**
`http://localhost:3000/login/auth/ruraqmaki`
- **Parámetros**:

  ```json
  {
  "username": "profe",
  "password": "123456"
  }
  ```

  
- **Devuelve:**

  ```json
  {
  "code": 200,
  "msg": "login exitoso"
  }
  ```

  

## Api de usuarios

**Base URL:** 
`http://localhost:3000/user/`

Esta API permite gestionar diferentes funcionalidades relacionadas con el usuario, incluyendo el manejo de productos en el carrito, compras, favoritos, cupones, y talleres (workshops). A continuación, se detallan las rutas disponibles:

---

**GET /favorite/check/:id**

- **Descripción**: Verifica si un producto con el `id` especificado está en la lista de favoritos del usuario.
- **Parámetros**:
  - `:id` (string): ID del producto a verificar.

- **Ejemplo de uso:**
  `http://localhost:3000/user/favorite/check/66f48a8f40b5da2f795aa7b0`
- **Devuelve:**
  
  ```json
  {
    "status": 200,
    "exists": true
  }
  ```
  
  

---

**GET /cart**

- **Descripción**: Obtiene todos los artículos del campo `carrito` del usuario.
- **Parámetros**: Ninguno.
- **Devuelve:**

  ```json
  {
  "status": 200,
  "data": {
    "carrito": []
  }
  }
  ```

  

---

**GET /coupons**

- **Descripción**: Obtiene todos los cupones asociados con el usuario.
- **Parámetros**: Ninguno.
- **Devuelve:**

  ```json
  {
  "status": 200,
  "data": {
    "cupones": [
      "66f46eb340b5da2f795aa7ab"
    ]
  }
  }
  ```

  
---

**GET /purchases**

- **Descripción**: Obtiene todas las compras realizadas por el usuario.
- **Parámetros**: Ninguno.
- **Devuelve:**

  ```json
  {
  "status": 200,
  "data": {
    "compras": [
      {
        "productos": [
          "66f48a8f40b5da2f795aa7af"
        ],
        "cantidad": 1,
        "total": 18000
      },
      ...
    ]
  }
  }
  ```

  
---

**GET /favorites/workshops**

- **Descripción**: Obtiene todos los talleres favoritos del usuario.
- **Parámetros**: Ninguno.
- **Devuelve:**

  ```json
  {
  "status": 200,
  "data": {
    "talleres_favoritos": [
      "651a0d9f78f9f8e9b6e8b55b"
    ]
  }
  }
  ```

  

---

**GET /subscribed/workshops**

- **Descripción**: Obtiene todos los talleres en los que el usuario está inscrito.
- **Parámetros**: Ninguno.
- **Devuelve:**

  ```json
  {
  "status": 200,
  "data": {
    "talleres_inscritos": [
      "651a0d9f78f9f8e9b6e8b55b"
    ]
  }
  }
  ```

  
---

**GET /favorites/products/details**

- **Descripción**: Obtiene los detalles de todos los productos favoritos del usuario.
- **Parámetros**: Ninguno.
- **Devuelve:**

  ```json
  {
  "status": 200,
  "data": [
    {
      "_id": "67041056d2cb2d63933a7c49",
      "favoritos": [
        {
          "_id": "66f4821b40b5da2f795aa7ad",
          "nombre": "Bazany",
          "descripcion": "Collar verde en Tagua",
          "categoria": "Joyería",
          "precio": 10000,
          "cantidad": 1,
          "dimensiones": "15 x 30 cm",
          "img": "https://artesaniasdecolombia.com.co/Documentos/Galeria/9529_bazany-collar-tagua.jpg"
        }
      ]
    }
  ]
  }
  ```

  
---

**GET /cart/details**

- **Descripción**: Obtiene los detalles de todos los productos en el carrito del usuario, incluyendo información sobre los talleres asociados.
- **Parámetros**: Ninguno.
- **Devuelve:**
  en caso de que no tenga ninguna compra

  ```json
  {
  "status": 404,
  "message": "El usuario no presenta contenido en compras"
  }
  en caso de que si tenga compra
  {
  "status": 200,
  "data": [
    {
      "_id": "67041056d2cb2d63933a7c49",
      "productos": [
        {
          "cantidad": "2",
          "productoInfo": {
            "_id": "66f48a8f40b5da2f795aa7af",
            "nombre": "Porta Velas",
            "descripcion": "Porta velas elaborado a mano en arcilla y pintado con esmaltes al horno",
            "categoria": "Cerámica",
            "precio": 10000,
            "cantidad": 1,
            "dimensiones": "5 x 10 cm",
            "img": "https://artesaniasdecolombia.com.co/Documentos/Galeria/38697_disen%CC%83o_sin_ti%CC%81tulo_(15).jpg"
          },
          "nombre_taller": "El salario"
        }
      ]
    }
  ]
  }
  ```

  
---

**GET /purchases/details**

- **Descripción**: Obtiene los detalles de todas las compras del usuario, incluyendo información sobre los talleres asociados.
- **Parámetros**: Ninguno.
- **Devuelve:**

  ```json
  {
  "status": 200,
  "data": [
    {
      "producto": {
        "_id": "66f48a8f40b5da2f795aa7b3",
        "nombre": "Mochila Wayuu",
        "descripcion": "Tejido artesanal que refleja la historia de antepasados y la naturaleza",
        "categoria": "Textilería",
        "precio": 15000,
        "cantidad": 1,
        "dimensiones": "30 x 50 cm",
        "img": "https://artesaniasdecolombia.com.co/Documentos/Galeria/39051_disen%CC%83o_sin_ti%CC%81tulo_(6).jpg"
      },
      "cantidad": 1,
      "nombre_taller": "Los Anticuarios",
      "id_taller": "651a0d9f78f9f8e9b6e8b55c",
      "usuarioId": "67041056d2cb2d63933a7c49"
    },
    ...
  ]
  ```
  
  
---

**GET /favorites/workshops/details**

- **Descripción**: Obtiene los detalles de todos los talleres favoritos del usuario.
- **Parámetros**: Ninguno.
- **Devuelve:**

  ```json
  {
  "status": 200,
  "data": [
    {
      "_id": "67041056d2cb2d63933a7c49",
      "talleres_favoritos": [
        {
          "_id": "651a0d9f78f9f8e9b6e8b55b",
          "nombre_taller": "El salario",
          "lugar": {
            "sitio": "Calle 1 # 9-79",
            "ciudad": "Bucaramanga",
            "pais": "Colombia"
          },
          "imagen": "https://artesaniasdecolombia.com.co/Documentos/Contenido/45800_32897_almacen-serresuela-artesanias-colombia-2019-g.jpeg",
          "productos": [
            "66f4821b40b5da2f795aa7ad",
            "66f48a8f40b5da2f795aa7ae",
            "66f48a8f40b5da2f795aa7af",
            "66f48a8f40b5da2f795aa7b0",
            "66f48a8f40b5da2f795aa7b1"
          ],
          "publico": "Para el publico en general",
          "encargado": "Tito Normando",
          "nombre_lugar_taller": "",
          "descripcion": "En nuestra tienda encontrará el lugar ideal para enamorarse de las tradiciones artesanales de nuestra tierra, recorrer la geografía colombiana de sur a norte a través de las piezas creadas por manos artesanas, y encontrar el regalo perfecto.",
          "video": "https://www.youtube.com/embed/IHK37AD4oy0?si=aTS5X-UAeggfsZAj",
          "QR": "",
          "duracion": "3 meses",
          "fecha_inicio": "10 de Septiembre",
          "hora": "10:00 a.m",
          "materiales": "Materiales dados en clase",
          "modalidad": "Presencial",
          "cupos": 30,
          "categoria": "joyería",
          "fecha": "2024-09-10T05:00:00.000Z",
          "videoQR": "https://www.youtube.com/watch?v=IHK37AD4oy0&ab_channel=Colombiatravel"
        }
      ]
    }
  ]
  }
  ```

  
---

**GET /subscribed/workshops/details**

- **Descripción**: Obtiene los detalles de todos los talleres en los que el usuario está inscrito.
- **Parámetros**: Ninguno.
- **Devuelve:**

  ```json
  {
  "status": 200,
  "data": [
    {
      "_id": "67041056d2cb2d63933a7c49",
      "talleres_inscritos": [
        {
          "_id": "651a0d9f78f9f8e9b6e8b55b",
          "nombre_taller": "El salario",
          "lugar": {
            "sitio": "Calle 1 # 9-79",
            "ciudad": "Bucaramanga",
            "pais": "Colombia"
          },
          "imagen": "https://artesaniasdecolombia.com.co/Documentos/Contenido/45800_32897_almacen-serresuela-artesanias-colombia-2019-g.jpeg",
          "productos": [
            "66f4821b40b5da2f795aa7ad",
            "66f48a8f40b5da2f795aa7ae",
            "66f48a8f40b5da2f795aa7af",
            "66f48a8f40b5da2f795aa7b0",
            "66f48a8f40b5da2f795aa7b1"
          ],
          "publico": "Para el publico en general",
          "encargado": "Tito Normando",
          "nombre_lugar_taller": "",
          "descripcion": "En nuestra tienda encontrará el lugar ideal para enamorarse de las tradiciones artesanales de nuestra tierra, recorrer la geografía colombiana de sur a norte a través de las piezas creadas por manos artesanas, y encontrar el regalo perfecto.",
          "video": "https://www.youtube.com/embed/IHK37AD4oy0?si=aTS5X-UAeggfsZAj",
          "QR": "",
          "duracion": "3 meses",
          "fecha_inicio": "10 de Septiembre",
          "hora": "10:00 a.m",
          "materiales": "Materiales dados en clase",
          "modalidad": "Presencial",
          "cupos": 30,
          "categoria": "joyería",
          "fecha": "2024-09-10T05:00:00.000Z",
          "videoQR": "https://www.youtube.com/watch?v=IHK37AD4oy0&ab_channel=Colombiatravel"
        }
      ]
    }
  ]
  }
  ```

  
---

**GET /coupons/details**

- **Descripción**: Obtiene los detalles de todos los cupones asociados con el usuario.
- **Parámetros**: Ninguno.
- **Devuelve:**

  ```json
  {
  "status": 200,
  "data": [
    {
      "_id": "66f46eb340b5da2f795aa7ab",
      "cupones": {
        "_id": "66f46eb340b5da2f795aa7ab",
        "descuento": 15,
        "codigo": "f3t5H",
        "idProductos": [
          "66f4821b40b5da2f795aa7ad",
          "66f48a8f40b5da2f795aa7ae"
        ],
        "fechaVencimiento": "2024-10-31T05:00:00.000Z"
      },
      "nombre_taller": "El salario",
      "img": "https://artesaniasdecolombia.com.co/Documentos/Galeria/9529_bazany-collar-tagua.jpg",
      "id": "66f4821b40b5da2f795aa7ad"
    }
  ]
  }
  ```

  

---

**POST /favorites/products/:id**

- **Descripción**: Agrega un producto con el `id` especificado a la lista de favoritos del usuario.
- **Parámetros**:
  - `:id` (string): ID del producto a agregar.
- **Ejemplo de uso:**
  `http://localhost:3000/user/favorites/products/66f4821b40b5da2f795aa7ad`
- **Devuelve:**
  
  ```json
  {
    "status": 200,
    "message": "Producto agregado con exito al carrito"
  }
  ```
  
  

---

**POST /cart/:id**

- **Descripción**: Agrega un producto con el `id` especificado al carrito del usuario.
- **Parámetros**:
  - `:id` (string): ID del producto a agregar.
- **Ejemplo de uso:**
  `http://localhost:3000/user/cart/66f4821b40b5da2f795aa7ad`
- **Devuelve:**
  
  ```json
  {
  "status": 200,
  "message": "Producto agregado con exito al carrito"
  }
  ```
  
  

---

**POST /purchases/**

- **Descripción**: Agrega un producto con el `id` especificado a la lista de compras del usuario.
- **Body**:
  
  - ```json
    `
    {
    productos: [id, id, id],
    cantidad: str,
    total: str
    }
    ` (string): ID del producto a agregar.
    ```
  
    
- **Ejemplo de uso:**
  `http://localhost:3000/user/purchases/`
  **body**:
  
  ```json
  {
    "productos": ["66f4821b40b5da2f795aa7ad"],
    "cantidad": 1,
    "total": 15000
  }
  ```
  
  
- **Devuelve:**
  
  ```json
  {
    "status": 200,
    "message": "Producto agregado con exito al carrito"
  }
  ```
  
  
---

**POST /favorites/workshops/:id**

- **Descripción**: Agrega un taller con el `id` especificado a la lista de talleres favoritos del usuario.
- **Parámetros**:
  - `:id` (string): ID del taller a agregar.
- **Ejemplo de uso:**
  `http://localhost:3000/user/favorites/workshops/651a0d9f78f9f8e9b6e8b55b`
- **Devuelve:**
  
  ```json
  {
    "status": 200,
    "message": "Producto agregado con exito al carrito"
  }
  ```
  
  

---

**POST /subscribed/workshops/:id**

- **Descripción**: Agrega un taller con el `id` especificado a la lista de talleres inscritos del usuario.
- **Parámetros**:
  - `:id` (string): ID del taller a agregar.
- **Ejemplo de uso:**
  `http://localhost:3000/user/subscribed/workshops/651a0d9f78f9f8e9b6e8b55b`
- **Devuelve:**
  
  ```json
  {
    "status": 200,
    "message": "Producto agregado con exito al carrito"
  }
  ```
  
  

---

**POST /coupons/:id**

- **Descripción**: Agrega un cupón con el `id` especificado a la lista de cupones del usuario.
- **Parámetros**:
  - `:id` (string): ID del cupón a agregar.
- **Ejemplo de uso:**
  `http://localhost:3000/user/coupons/66f46eb340b5da2f795aa7ab`
- **Devuelve:**
  
  ```json
  {
    "status": 200,
    "message": "Producto agregado con exito al carrito"
  }
  ```
  
  

---

**DELETE /favorites/products/:id**

- **Descripción**: Elimina un producto con el `id` especificado de la lista de favoritos del usuario.
- **Parámetros**:
  - `:id` (string): ID del producto a eliminar.
- **Ejemplo de uso:**
  `http://localhost:3000/user/favorites/products/66f48a8f40b5da2f795aa7b0`
- **Devuelve:**
  
  ```json
  {
    "status": 200,
    "message": "Documento eliminado con exito"
  }
  ```
  
  
---

**DELETE /cart/:id**

- **Descripción**: Elimina un producto con el `id` especificado del carrito del usuario.
- **Parámetros**:
  - `:id` (string): ID del producto a eliminar.
- **Ejemplo de uso:**
  `http://localhost:3000/user/cart/66f48a8f40b5da2f795aa7b0`
- **Devuelve:**
  
  ```json
  {
    "status": 200,
    "message": "Producto eliminado del carrito con exito"
  }
  ```
  
  

---

**DELETE /favorites/workshops/:id**

- **Descripción**: Elimina un taller con el `id` especificado de la lista de talleres favoritos del usuario.
- **Parámetros**:
  - `:id` (string): ID del taller a eliminar.
- **Ejemplo de uso:**
  `http://localhost:3000/user/favorites/workshops/651a0d9f78f9f8e9b6e8b55b`
- **Devuelve:**
  
  ```json
  {
    "status": 200,
    "message": "Documento eliminado con exito"
  }
  ```
  
  

---

**DELETE /subscribed/workshops/:id**

- **Descripción**: Elimina un taller con el `id` especificado de la lista de talleres inscritos del usuario.
- **Parámetros**:
  - `:id` (string): ID del taller a eliminar.
- **Ejemplo de uso:**
  `http://localhost:3000/user/subscribed/workshops/651a0d9f78f9f8e9b6e8b55b`
- **Devuelve:**
  
  ```json
  {
    "status": 200,
    "message": "Documento eliminado con exito"
  }
  ```
  
  
---

**DELETE /coupons/:id**

- **Descripción**: Elimina un cupón con el `id` especificado de la lista de cupones del usuario.
- **Parámetros**:
  - `:id` (string): ID del cupón a eliminar.
- **Ejemplo de uso:**
  `http://localhost:3000/user/subscribed/workshops/66f46eb340b5da2f795aa7ab`
- **Devuelve:**
  
  ```json
  {
    "status": 200,
    "message": "Documento eliminado con exito"
  }
  ```
  
  

---

## Validaciones

- Las rutas que requieren un parámetro `:id` validan que dicho parámetro sea un ID válido.
- Para todas las rutas de `POST` y `DELETE`, se valida que el `id` proporcionado sea correcto y esté asociado al usuario.

---

### Notas adicionales
- Las rutas que obtienen detalles (`/details`) proveen información extendida de los productos o talleres, mostrando no solo el `id` sino también otros datos relevantes como nombre, descripción, precio, etc.



## Api de productos

**Base URL:**
`http://localhost:3000/product/`

Esta API permite gestionar los productos, incluyendo la obtención de productos por ID, por categoría, la obtención de todos los productos y la actualización de productos. A continuación, se detallan las rutas disponibles:

---

 **GET /:id**

- **Descripción**: Obtiene la información de un producto específico basado en el `id` proporcionado.
- **Parámetros**:
  - `:id` (string): ID del producto que se desea obtener.
- **Validaciones**:
  - Se valida que el `id` proporcionado sea un ID de producto válido.
- **Ejemplo de uso:**
  `http://localhost:3000/product/66f4821b40b5da2f795aa7ad`
- **Devuelve:**
  
  ```json
  {
  "_id": "66f4821b40b5da2f795aa7ad",
  "nombre": "Bazany",
  "descripcion": "Collar verde en Tagua",
  "categoria": "Joyería",
  "precio": 10000,
  "cantidad": 1,
  "dimensiones": "15 x 30 cm",
  "img": "https://artesaniasdecolombia.com.co/Documentos/Galeria/9529_bazany-collar-tagua.jpg"
  }
  ```
  
  
  
---

 **GET /find/:category**

- **Descripción**: Obtiene una lista de productos pertenecientes a una categoría específica.
- **Parámetros**:
  - `:category` (string): Nombre de la categoría por la que se desea filtrar los productos.
- **Validaciones**:
  - Se valida que la `category` proporcionada sea una categoría válida dentro del sistema.
- **Ejemplo de uso:**
  `http://localhost:3000/product/find/Joyería`
- **Devuelve:**
  
  ```json
  {
    "_id": "66f4821b40b5da2f795aa7ad",
    "nombre": "Bazany",
    "descripcion": "Collar verde en Tagua",
    "categoria": "Joyería",
    "precio": 10000,
    "cantidad": 1,
    "dimensiones": "15 x 30 cm",
    "img": "https://artesaniasdecolombia.com.co/Documentos/Galeria/9529_bazany-collar-tagua.jpg"
  }
  ```
  
  
---

 **GET /**

- **Descripción**: Obtiene una lista de todos los productos disponibles en el sistema.
- **Parámetros**: Ninguno.
- **Devuelve:**
  
  ```json
  [
    {
      "_id": "66f4821b40b5da2f795aa7ad",
      "nombre": "Bazany",
      "descripcion": "Collar verde en Tagua",
      "categoria": "Joyería",
      "precio": 10000,
      "cantidad": 1,
      "dimensiones": "15 x 30 cm",
      "img": "https://artesaniasdecolombia.com.co/Documentos/Galeria/9529_bazany-collar-tagua.jpg",
      "nombre_taller": "El salario"
    },
    ...
  ]
  ```
  
  

---

## Validaciones

- Para las rutas que incluyen el parámetro `:id` o `:category`, se aplican validaciones para asegurarse de que estos parámetros sean correctos.
- En las rutas de actualización (`PUT`), se valida que los datos del cuerpo de la solicitud contengan información válida para actualizar el producto.

---

### Notas adicionales

- La respuesta de la ruta `/` (GET) incluye un listado de todos los productos con sus respectivos detalles (nombre, precio, descripción, etc.).
- La ruta `/find/:category` permite filtrar productos por categorías específicas, devolviendo todos los productos que pertenecen a esa categoría.
- Las actualizaciones de productos deben cumplir con las validaciones establecidas y seguir el formato de datos requerido por el sistema.


## Api de talleres

**Base URL:**
`http://localhost:3000/workshops/`

Esta API permite gestionar la obtención de todos los workshops (talleres) disponibles y los productos asociados a un workshop específico. A continuación, se detallan las rutas disponibles:

---

 **GET /**

- **Descripción**: Obtiene una lista de todos los workshops (talleres) disponibles en el sistema.
- **Parámetros**: Ninguno.
- **Respuesta**:
  - Una lista de objetos de workshops con datos como:
    - `nombre`: Nombre del workshop.
    - `descripcion`: Breve descripción del workshop.
    - `fecha`: Fecha en que se realizará el workshop.
    - `ubicacion`: Ubicación donde se llevará a cabo.
    - Otros detalles relevantes del workshop.

 **Código de estado**:
  - `200 OK`: Si la solicitud se completa con éxito y retorna la lista de workshops.
  - `500 Internal Server Error`: Si ocurre un error en el servidor.

---

**GET /:workshopId/:search?**

- **Descripción**: Obtiene una lista de productos asociados a un workshop específico.
- **Parámetros**:
  - `workshopId` (requerido): El identificador único del workshop del que se desean obtener los productos.
  - `search` (opcional): Un término de búsqueda que permite filtrar los productos según el nombre o la descripción.

- **Respuesta**:
  - Una lista de productos asociados al workshop, con datos como:
    - `nombre`: Nombre del producto.
    - `descripcion`: Descripción del producto.
    - `precio`: Precio del producto.
    - Otros detalles relevantes del producto.

- **Código de estado**:
  - `200 OK`: Si la solicitud se completa con éxito y retorna los productos del workshop.
  - `404 Not Found`: Si no se encuentra un workshop con el `workshopId` proporcionado.
  - `500 Internal Server Error`: Si ocurre un error en el servidor.
- **Devuelve:**

  ```json
  - [
    {
      "_id": "651a0d9f78f9f8e9b6e8b55b",
      "nombre_taller": "El salario",
      "lugar": {
        "sitio": "Calle 1 # 9-79",
        "ciudad": "Bucaramanga",
        "pais": "Colombia"
      },
      "imagen": "https://artesaniasdecolombia.com.co/Documentos/Contenido/45800_32897_almacen-serresuela-artesanias-colombia-2019-g.jpeg",
      "productos": [
        "66f4821b40b5da2f795aa7ad",
        "66f48a8f40b5da2f795aa7ae",
        "66f48a8f40b5da2f795aa7af",
        "66f48a8f40b5da2f795aa7b0",
        "66f48a8f40b5da2f795aa7b1"
      ],
      "publico": "Para el publico en general",
      "encargado": "Tito Normando",
      "nombre_lugar_taller": "",
      "descripcion": "En nuestra tienda encontrará el lugar ideal para enamorarse de las tradiciones artesanales de nuestra tierra, recorrer la geografía colombiana de sur a norte a través de las piezas creadas por manos artesanas, y encontrar el regalo perfecto.",
      "video": "https://www.youtube.com/embed/IHK37AD4oy0?si=aTS5X-UAeggfsZAj",
      "QR": "",
      "duracion": "3 meses",
      "fecha_inicio": "10 de Septiembre",
      "hora": "10:00 a.m",
      "materiales": "Materiales dados en clase",
      "modalidad": "Presencial",
      "cupos": 30,
      "categoria": "joyería",
      "fecha": "2024-09-10T05:00:00.000Z",
      "videoQR": "https://www.youtube.com/watch?v=IHK37AD4oy0&ab_channel=Colombiatravel"
    },
    ...
    ]
  
  ---
  ```

  
### Notas adicionales:

- La ruta `GET /:workshopId/:search?` es flexible, permitiendo tanto la obtención de todos los productos de un workshop específico como la aplicación de filtros para buscar productos relacionados.
- La ruta raíz `GET /` proporciona una manera sencilla de listar todos los workshops disponibles sin ningún filtro.