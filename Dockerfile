# Serve the static site with nginx
FROM nginx:1.27-alpine

# Copy the whole site into nginx's web root
COPY src/ /usr/share/nginx/html/

# Expose HTTP port
EXPOSE 80
