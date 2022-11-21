# Configuración Jest Schematic

### 1. Eliminamos los nodem-modules y el archivo package-log.json

```sh
rm -rf node_modules
rm -rf package-lock.json
```

### 2. Instalmos el paquete jest schematics y el CLI de angualr verción 12 globalmente

```sh
npm install -g @briebug/jest-schematic
npm install -g @angular/cli@12
```

### 3. Agregamos jest schematics a nuestro proyecto

```sh
ng g @briebug/jest-schematic:add
```

### 4. Modificamos el archivo package.json y cambiamos los test

```sh
"test": "ng test",
"test:coverage": "ng test --coverage",
"test:deploy": "ng test --watch=false --coverage",
```
