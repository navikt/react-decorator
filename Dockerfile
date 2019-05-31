FROM node:11.7.0 as build

# Kopier filer
COPY . app/

# Kompiler deokoratør
WORKDIR /app
RUN npm install && npm run build

# Kompiler test-applikasjon
WORKDIR /app/example
RUN npm install && npm run build

# Lag server
FROM nginx

# Kopier statiske filer
COPY --from=build /app /app
COPY --from=build /app/example/build /var/www/
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

# Definer produksjonsvller
ENV NODE_ENV production
ENV CI=true

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]