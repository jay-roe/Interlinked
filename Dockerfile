# pull official base image
FROM node:lts



# set work directory
WORKDIR /app

# install dependencies
COPY --chown=node:node package*.json ./
RUN npm install

# copy project
#COPY --chown=node:node . ./

# Can be removed once we have dependencies in package.json ? https://morioh.com/p/c3e99e32e846
RUN mkdir -p node_modules
#RUN chown -R node node_modules

# open port
EXPOSE 3000