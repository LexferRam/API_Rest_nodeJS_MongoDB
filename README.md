# DOCKER NETWORK

### **Docker Network**: la manera en que funciona es que docker crea su "isolated docker network" donde los contenedores corren, cuando se desplegan dos contenedores en el mismo network ellos pueden comunicarse usando solo el nombre del contenedor sin necesidad de usar el localhost y puerto ya que estan en la misma network y aplicaciones que esten fuera de esta network deben comunicarse usando el localhost y puerto

1. En dockerHub descargar las imagenes de mongoDB y mongo-express
   * docker pull mongo
   * docker pull mongo-express
2. crear el network

#### Comando docker network

* docker network create mongo-network
* docker network ls
  
3. Crear un contenedor usando la img de mongoDB

   ```cmd
   docker run -d \
    -p 5000:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=password \
    --net mongo-network \
    --name mongodb \
    mongo
    ```

**ver logs del contenedor:**docker logs [id-contedenedor] -f(mantiene la consola activa de logs) | tail (muestra ultimos logs)

4. Crear contenedor usando la imagen de express-mongo

  ```cmd
   docker run -d \
    -p 8081:8081 \
    -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
    -e ME_CONFIG_MONGODB_ADMINPASSWORD=password \
    -e ME_CONFIG_MONGODB_SERVER=mongodb \
    --net mongo-network \
    --name mongo-express \
    mongo-express
    ```
**revisar http://localhost:8081/**

5. Conectar la aplicacion a la base de datos creada en el contenedor del paso 3(apuntar app al puerto 5000 en este caso)

6. Crear archivo docker-compose.yml que ejecute corra los contenedores.
**NOTA**: cuando se usa docker compose automaticamente se crea un betwork con los contenedores que se corren

```cmd
version: '3'
services: 
  #nombre del contenedor
  mongodb:
    image: mongo
    port:
      - 5000:27017
    environment:   
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=password
  mongo-express:
    image: mongo-express
    port: 
      -8080:8080
    environment: 
      - ME_CONFIG_MONGODB_ADMINUSERNAME=admin
      - ME_CONFIG_MONGODB_ADMINPASSWORD=password
      - ME_CONFIG_MONGODB_SERVER=mongodb
```

7. Ejecutar docker-compose:
   -f(file, archivo al que se hace referencia)

   ```cmd
   docker-compose -f mongo.yaml up
   ```

   ```cmd
   docker-compose -f mongo.yaml down
   ```

8. Desplegar nuestra app container registry de dockerhub (se debe crear un dockerfile, basandonos en la imagen de node oficial ubicada en dockerhub)
   * loguearse docker login [dockerhub]
   * tag la imagen a subir:
   **Image Naming in registry**: registryDomain/imageName:tag

   ```cmd
      docker tag [id-container-a-subir] [registryDomain/imageName:tag]

      docker push [registryDomain/imageName:tag]
   ```

**NOTA** Volumes en docker es usado para persistir la data,uno de los casos de uso contenedores con bases de datos

en nuestro host tenemos un physical file system, la manera en que los volumes funcionan es que conecta physical file system del host al virtual file system del contenedor, para que cada vez que se reconstruya el contenedor el  physical file system del host se replica en el  physical file system del contenedor

## Tipo de volumnes

**Host volumes**

-v [rutade la carpete fisica del host]:[ruta de la carpeta del contenedor]

**Anonymous volumes**

-v [ruta de carpeta que se creara en el contenedor]

**Named volumes**

-v name:[ruta de la carpeta del contenedor]