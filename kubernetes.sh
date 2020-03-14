echo "deleting all services"
kubectl delete deploy,svc,pods --all
# Create the correct docker-compose using the environment files
docker-compose config > docker-compose-resolved.yaml
kompose convert -f docker-compose-resolved.yaml
kubectl apply -f .
# delete all files that expose our environ,ent
rm -rf db-headless-deployment.yaml db-headless-service.yaml docker-compose-resolved.yaml mysqlvolume-persistentvolumeclaim.yaml website-deployment.yaml website-service.yaml wp-headless-deployment.yaml wp-headless-service.yaml
