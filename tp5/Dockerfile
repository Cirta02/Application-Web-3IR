# Étape 1 : image de base Nginx
FROM nginx:alpine

# Copier tout le contenu du projet dans le dossier /usr/share/nginx/html
COPY . /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
